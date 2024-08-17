"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getAuth,
  invalidateAuth,
  invalidateSessionCookie,
} from "~/lib/auth/utils";

export async function signOutAction(redirectUrl = "/") {
  const { session } = await getAuth();
  if (!session) {
    invalidateSessionCookie();
    return { error: "Unauthorized" };
  }

  await invalidateAuth(session.id);

  const headersList = headers();
  const referer = headersList.get("referer") || "/";
  const currentUrl = new URL(referer).pathname;
  if (currentUrl === redirectUrl) {
    return { refresh: true };
  } else {
    redirect(redirectUrl);
  }
}
