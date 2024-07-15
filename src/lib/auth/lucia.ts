import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Google, Kakao } from "arctic";
import { Lucia } from "lucia";
import { Naver } from "~/lib/auth/naver-provider";
import { db } from "~/lib/db";
import { sessions } from "~/lib/db/schema/auth";
import { users } from "~/lib/db/schema/user";
import { env } from "~/lib/env";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "strict" : undefined,
      domain: "invi.my",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      name: attributes.name,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
}

// OAuth
export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  env.GOOGLE_REDIRECT_URI,
);

export const kakao = new Kakao(
  env.KAKAO_CLIENT_ID,
  env.KAKAO_CLIENT_SECRET,
  env.KAKAO_REDIRECT_URI,
);

export const naver = new Naver(
  env.NAVER_CLIENT_ID,
  env.NAVER_CLIENT_SECRET,
  env.NAVER_REDIRECT_URI,
);
