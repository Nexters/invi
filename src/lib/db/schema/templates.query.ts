"use server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { db } from "~/lib/db";
import { templates, type TemplateInsert } from "~/lib/db/schema/templates";

type CreateTemplateParams = {
  title: TemplateInsert["title"];
  description: TemplateInsert["description"];
  customFields: TemplateInsert["customFields"];
};

type UpdateTemplateParams = {
  id: string;
  title?: TemplateInsert["title"];
  description?: TemplateInsert["description"];
  customFields?: TemplateInsert["customFields"];
};

export async function getAllTemplates() {
  const result = await db.select().from(templates);
  return result;
}

export async function getById(id: string) {
  const result = await db.select().from(templates).where(eq(templates.id, id));
  return result[0];
}

export async function updateTemplate(params: UpdateTemplateParams) {
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

export async function deleteTemplate(id: string): Promise<void> {
  if (!id) {
    throw new Error("ID is required to delete a template");
  }

  try {
    await db.delete(templates).where(eq(templates.id, id));
  } catch (error) {
    console.error("Error deleting template:", error);
    throw new Error("Could not delete template");
  }
}

export async function createTemplate(
  params: CreateTemplateParams,
): Promise<void> {
  const { title, description, customFields } = params;

  const id = nanoid();

  const currentTimestamp = new Date();

  try {
    await db.insert(templates).values({
      id,
      title,
      description,
      customFields,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    throw new Error("Could not create template");
  }
}
