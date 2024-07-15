import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { google } from "~/lib/auth/lucia";
import { env } from "~/lib/env";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  // @see https://developers.google.com/identity/openid-connect/openid-connect?hl=ko#an-id-tokens-payload
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  // @see https://arcticjs.dev/guides/oauth2-pkce
  cookies().set("google_oauth_state", state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });
  cookies().set("google_oauth_code_verifier", codeVerifier, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  });

  return Response.redirect(url);
}
