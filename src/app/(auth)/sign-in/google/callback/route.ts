import { OAuth2RequestError } from "arctic";
import ky from "ky";
import { cookies } from "next/headers";
import { google } from "~/lib/auth/lucia";
import { createSession } from "~/lib/auth/utils";
import { findOrCreateUser } from "~/lib/db/schema/users.query";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get(`google_oauth_state`)?.value;
  const codeVerifier = cookies().get(`google_oauth_code_verifier`)?.value;

  if (!code || !storedState || !codeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    // @see https://arctic.js.org/providers/google
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    // @see https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload
    const user = await ky("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).json<{
      sub: string;
      name: string;
      given_name: string;
      picture: string;
      email: string;
    }>();
    console.log(":user", user);

    const dbUser = await findOrCreateUser({
      name: user.name,
      email: user.email,
      provider: "google",
    });

    await createSession(dbUser.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/dashboard",
      },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(e.message, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
