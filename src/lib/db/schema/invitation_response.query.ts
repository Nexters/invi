"use server";

import { db } from "~/lib/db";
import { invitationResponses } from "~/lib/db/schema/invitation_response";

export async function getAllInvitationResponses() {
  return db.select().from(invitationResponses);
}
