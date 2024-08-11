"use server";

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
      .where(invitations.id.eq(id));
  } catch (error) {
    console.error("Error updating invitation:", error);
    throw new Error("Could not update invitation");
  }
}
