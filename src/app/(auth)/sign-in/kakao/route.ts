import { generateState } from "arctic";
import { kakao } from "~/lib/auth/lucia";

export async function GET(): Promise<Response> {
  const state = generateState();

  // @see
  const url = kakao.createAuthorizationURL(state, ["account_email", "profile"]);

  return Response.redirect(url);
}
