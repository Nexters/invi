"use server";

import { count, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "~/lib/db";
import {
  invitations,
  type InvitationInsert,
} from "~/lib/db/schema/invitations";

type CreateInvitationParams = Omit<
  InvitationInsert,
  "id" | "createdAt" | "updatedAt"
>;

type UpdateInvitationParams = {
  id: string;
  title?: string;
  description?: string;
  eventDate?: Date;
  eventUrl?: string;
  customFields?: Record<string, any>;
};

export async function createInvitation(
  params: CreateInvitationParams,
): Promise<InvitationInsert> {
  const id = nanoid();
  const currentTimestamp = new Date();

  try {
    const res = await db
      .insert(invitations)
      .values({
        ...params,
        id,
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
      .returning();
    return res[0];
  } catch (error) {
    console.error("Error creating invitation:", error);
    throw new Error("Could not create invitation");
  }
}

async function updateInvitation(params: UpdateInvitationParams) {
  const { id, ...updates } = params;

  if (!id) {
    throw new Error("ID is required to update an invitation");
  }

  try {
    await db
      .update(invitations)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(invitations.id, id));
  } catch (error) {
    console.error("Error updating invitation:", error);
    throw new Error("Could not update invitation");
  }
}

async function existsByEventUrl(eventUrl: string) {
  try {
    const result = await db
      .select({ count: count() })
      .from(invitations)
      .where(eq(invitations.eventUrl, eventUrl));

    return result[0].count > 0;
  } catch (error) {
    console.error("Error checking existence by event url:", error);
    throw new Error("Could not check existence by event url");
  }
}
