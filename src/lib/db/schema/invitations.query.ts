"use server";

import { count, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getAuth } from "~/lib/auth/utils";
import { db } from "~/lib/db";
import {
  invitations,
  type Invitation,
  type InvitationInsert,
} from "~/lib/db/schema/invitations";

type CreateInvitationParams = Omit<
  InvitationInsert,
  "id" | "userId" | "eventUrl" | "createdAt" | "updatedAt"
>;

type UpdateInvitationParams = {
  id: Invitation["id"];
  title?: Invitation["title"];
  customFields?: Invitation["customFields"];
  eventUrl?: Invitation["eventUrl"];
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

export async function getInvitationByEventUrl(eventUrl: string) {
  const responses = await db
    .select()
    .from(invitations)
    .where(eq(invitations.eventUrl, eventUrl));
  return responses[0];
}

export async function getInvitationsByUserId(): Promise<Invitation[]> {
  const auth = await getAuth();

  if (!auth.user) {
    throw new Error("No Auth");
  }

  return await db
    .select()
    .from(invitations)
    .where(eq(invitations.userId, auth.user.id));
}

export async function createInvitation(
  params: CreateInvitationParams,
): Promise<InvitationInsert> {
  const auth = await getAuth();

  if (!auth.user) {
    throw new Error("No Auth");
  }

  const id = nanoid();
  const currentTimestamp = new Date();

  try {
    const res = await db
      .insert(invitations)
      .values({
        ...params,
        id,
        userId: auth.user.id,
        eventUrl: id,
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

export async function deleteInvitation(id: Invitation["id"]): Promise<boolean> {
  try {
    const result = await db
      .delete(invitations)
      .where(eq(invitations.id, id))
      .returning({ deletedId: invitations.id });

    if (result.length === 0) {
      console.warn(`No invitation found with id: ${id}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error deleting invitation:", error);
    throw new Error("Could not delete invitation");
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
