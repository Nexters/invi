"use server";

import { count, eq } from "drizzle-orm";
import { db } from "~/lib/db";
import { invitations } from "~/lib/db/schema/invitations";

type UpdateInvitationParams = {
  id: string;
  title?: string;
  description?: string;
  eventDate?: Date;
  eventUrl?: string;
  customFields?: Record<string, any>;
};

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

async function existsByEventUrl(event_url: string) {
  try {
    const result = await db
      .select({ count: count() })
      .from(invitations)
      .where(eq(invitations.eventUrl, event_url));

    return result[0].count > 0;
  } catch (error) {
    console.error("Error checking existence by event_url:", error);
    throw new Error("Could not check existence by event_url");
  }
}
