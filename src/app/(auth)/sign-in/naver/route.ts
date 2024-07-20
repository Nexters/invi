import { generateState } from "arctic";
import { naver } from "~/lib/auth/lucia";

export async function GET(): Promise<Response> {
  const state = generateState();

  const url = naver.createAuthorizationURL(state);

  return Response.redirect(url);
}
