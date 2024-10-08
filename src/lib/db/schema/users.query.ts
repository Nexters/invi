"use server";

import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { db } from "~/lib/db";
import { sessions } from "~/lib/db/schema/auth";
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

export async function getUserByEmail(email: string) {
  const userList = await db.select().from(users).where(eq(users.email, email));
  return userList.at(0);
}

export async function findOrCreateUser(user: Omit<UserInsert, "id">) {
  let dbUser = await getUserByEmail(user.email);

  if (!dbUser) {
    dbUser = await createUser(user);
  }

  return dbUser;
}

export async function deleteUser(id: string): Promise<void> {
  if (!id) {
    throw new Error("ID is required to delete a user");
  }

  try {
    const result = await db.delete(users).where(eq(users.id, id));

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user");
  }
}

export async function logout(userId: string) {
  try {
    db.delete(sessions).where(eq(sessions.userId, userId));
    console.log(`User ${userId} logged out successfully.`);
  } catch (error) {
    console.error("Error logging out user:", error);
    throw new Error("Could not log out user");
  }
}
