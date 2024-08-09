import { cookies } from "next/headers";
import { lucia } from "~/lib/auth/lucia";

export type Auth = Awaited<ReturnType<typeof lucia.validateSession>>;

export const getAuth = async (): Promise<Auth> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return { user: null, session: null };

  const result = await lucia.validateSession(sessionId);
  try {
    if (result.session?.fresh) {
      setSessionCookie(result.session.id);
    }
    if (!result.session) {
      invalidateSessionCookie();
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return result;
};

export const invalidateAuth = async (sessionId: string) => {
  await lucia.invalidateSession(sessionId);
  invalidateSessionCookie();
};

export const createSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  setSessionCookie(session.id);
  return session;
};

export const setSessionCookie = (sessionId: string) => {
  const sessionCookie = lucia.createSessionCookie(sessionId);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

export const invalidateSessionCookie = () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};
