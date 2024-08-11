"use server";

import { db } from "~/lib/db";
import { templates } from "~/lib/db/schema/templates";

export async function getAllTemplates() {
  const result = await db.select().from(templates);
  return result;
}

export async function getById(id: string) {
  const result = await db.select().from(templates).where(eq(templates.id, id));
  return result[0];
}
