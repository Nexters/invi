"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/lib/db";
import { tests, type Test, type TestInsert } from "~/lib/db/schema/test";

export async function createTest(data: TestInsert) {
  const res = await db.insert(tests).values(data);
  revalidatePath("/playground/test");
  return res;
}

export async function getTests() {
  return db.select().from(tests);
}

export async function getTestById(id: Test["id"]) {
  return db.select().from(tests).where(eq(tests.id, id));
}

export async function updateTest(
  id: Test["id"],
  data: Partial<Omit<Test, "id">>,
) {
  await db.update(tests).set(data).where(eq(tests.id, id));
}

export async function deleteTest(id: Test["id"]) {
  await db.delete(tests).where(eq(tests.id, id));
}
