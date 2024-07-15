import { cookies } from "next/headers";
import { cache } from "react";
import { lucia, type OAuthKey } from "~/lib/auth/lucia";
import { env } from "~/lib/env";

export type Auth = ReturnType<typeof lucia.validateSession>;

export const getAuth = cache(async (): Promise<Auth> => {
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
});

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

export const invalidateSessionCookie = async () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

// @see https://arcticjs.dev/guides/oauth2-pkce
export const setPKCE = (key: OAuthKey, state: string, codeVerifier: string) => {
  cookies().set(`${key}_oauth_state`, state, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  cookies().set(`${key}_oauth_code_verifier`, codeVerifier, {
    path: "/",
    secure: env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
  });
};

export const getPKCE = (key: OAuthKey) => {
  const storedState = cookies().get(`${key}_oauth_state`)?.value ?? null;
  const codeVerifier = cookies().get(`${key}_oauth_code_verifier`)?.value;

  return { storedState, codeVerifier };
};
