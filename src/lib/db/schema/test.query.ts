"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/lib/db";
import {
  testJobs,
  tests,
  type Test,
  type TestInsert,
  type TestJobSelect,
} from "~/lib/db/schema/test";

export async function createTest(data: TestInsert) {
  const res = await db.insert(tests).values(data);
  revalidatePath("/playground/test");
  return res;
}

export async function getTests() {
  return db.select().from(tests);
}

export async function getTestsWithTestJobs() {
  const res = await db
    .select()
    .from(tests)
    .leftJoin(testJobs, eq(tests.id, testJobs.testId));

  const groupedTests = res.reduce(
    (acc, row) => {
      const test = row.test;
      const job = row.test_job;

      if (!acc[test.id]) {
        acc[test.id] = { ...test, jobs: [] };
      }

      if (job) {
        acc[test.id].jobs.push(job);
      }

      return acc;
    },
    {} as Record<number, Test & { jobs: TestJobSelect[] }>,
  );

  return Object.values(groupedTests);
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
  revalidatePath("/playground/test");
}
