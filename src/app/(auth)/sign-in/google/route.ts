import { generateCodeVerifier, generateState } from "arctic";
import { google } from "~/lib/auth/lucia";
import { setPKCE } from "~/lib/auth/utils";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  // @see https://developers.google.com/identity/openid-connect/openid-connect?hl=ko#an-id-tokens-payload
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  setPKCE("google", state, codeVerifier);

  return Response.redirect(url);
}
