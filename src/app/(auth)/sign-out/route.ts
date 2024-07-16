import {
  getAuth,
  invalidateAuth,
  invalidateSessionCookie,
} from "~/lib/auth/utils";

export async function GET(): Promise<Response> {
  const { session } = await getAuth();

  if (!session) {
    invalidateSessionCookie();
    return Response.redirect("/");
  }

  await invalidateAuth(session.id);

  return Response.redirect("/");
}
