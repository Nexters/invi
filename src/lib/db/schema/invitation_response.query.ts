"use server";

import { eq } from "drizzle-orm";
import { db } from "~/lib/db";
import {
  invitationResponses,
  type InvitationResponse,
} from "~/lib/db/schema/invitation_response";

export async function getAllInvitationResponses() {
  return db.select().from(invitationResponses);
}

export async function getInvitationResponseById(id: InvitationResponse["id"]) {
  const responses = await db
    .select()
    .from(invitationResponses)
    .where(eq(invitationResponses.id, id));
  return responses[0];
}
