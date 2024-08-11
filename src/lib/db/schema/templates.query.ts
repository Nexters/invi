"use server";
import { eq } from "drizzle-orm";

import { db } from "~/lib/db";
import { templates } from "~/lib/db/schema/templates";

type UpdateTemplateParams = {
  id: string;
  title?: string;
  description?: string;
  customFields?: Record<string, any>; // JSON data
};

export async function getAllTemplates() {
  const result = await db.select().from(templates);
  return result;
}

export async function getById(id: string) {
  const result = await db.select().from(templates).where(eq(templates.id, id));
  return result[0];
}

async function updateTemplate(params: UpdateTemplateParams) {
  const { id, ...updates } = params;

  if (!id) {
    throw new Error("ID is required to update a template");
  }

  const currentTimestamp = new Date();

  try {
    await db
      .update(templates)
      .set({
        ...updates,
        updatedAt: currentTimestamp,
      })
      .where(eq(templates.id, id));
  } catch (error) {
    console.error("Error updating template:", error);
    throw new Error("Could not update template");
  }
}
