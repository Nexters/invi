"use server";

import { count, eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { invitations, type Invitation } from "~/lib/db/schema/invitations";

type UpdateInvitationParams = {
  id: string;
  title?: string;
  description?: string;
  eventDate?: Date;
  eventUrl?: string;
  customFields?: Record<string, any>;
};

export async function getAllInvitations() {
  return await db.select().from(invitations);
}

export async function getInvitationById(id: Invitation["id"]) {
  const responses = await db
    .select()
    .from(invitations)
    .where(eq(invitations.id, id));
  return responses[0];
}

export async function getInvitationsByUserId(
  userId: Invitation["userId"],
): Promise<Invitation[]> {
  return await db
    .select()
    .from(invitations)
    .where(eq(invitations.userId, userId));
}

export async function updateInvitation(params: UpdateInvitationParams) {
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

export async function existsByEventUrl(eventUrl: string) {
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
