"use server";

import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { users, type UserInsert } from "~/lib/db/schema/users";

export async function createUser(data: UserInsert) {
  const res = await db.insert(users).values(data).returning();
  return res[0];
}

export async function getUser(id: string) {
  const userList = await db.select().from(users).where(eq(users.id, id));
  return userList.at(0);
}
