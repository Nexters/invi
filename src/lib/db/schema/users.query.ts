"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { db } from "~/lib/db";
import { users, type UserInsert } from "~/lib/db/schema/users";

export async function createUser(data: Omit<UserInsert, "id">) {
  const res = await db
    .insert(users)
    .values({ ...data, id: generateId(15) })
    .returning();
  return res[0];
}

export async function getUser(id: string) {
  const userList = await db.select().from(users).where(eq(users.id, id));
  return userList.at(0);
}

export async function getUserByName(name: string) {
  const userList = await db.select().from(users).where(eq(users.name, name));
  return userList.at(0);
}
