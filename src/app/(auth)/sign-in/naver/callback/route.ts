import { OAuth2RequestError } from "arctic";
import ky from "ky";
import { naver } from "~/lib/auth/lucia";
import { createSession } from "~/lib/auth/utils";
import { findOrCreateUser } from "~/lib/db/schema/users.query";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const errorCode = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (!code || !state) {
    return new Response(errorDescription, {
      status: errorCode ? parseInt(errorCode) : 400,
    });
  }

  try {
    const tokens = await naver.validateAuthorizationCode(code, state);
    const accessToken = tokens.accessToken();

    // @see https://developers.naver.com/docs/login/devguide/devguide.md#3-4-5-접근-토큰을-이용하여-프로필-api-호출하기
    const res = await ky("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).json<{
      resultcode: string;
      message: string;
      response: {
        id: string;
        nickname: string;
        profile_image: string;
        email: string;
        name: string;
      };
    }>();
    console.log(":res", res);

    const dbUser = await findOrCreateUser({
      name: res.response.name,
      email: res.response.email,
      provider: "naver",
    });

    await createSession(dbUser.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/pg/sign-in",
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
