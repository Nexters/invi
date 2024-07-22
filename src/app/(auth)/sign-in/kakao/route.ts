import { generateState } from "arctic";
import { kakao } from "~/lib/auth/lucia";

export async function GET(): Promise<Response> {
  const state = generateState();

  // @see https://developers.kakao.com/docs/latest/ko/kakaologin/prerequisite#consent-item
  const url = kakao.createAuthorizationURL(state, ["account_email"]);

  return Response.redirect(url);
}
