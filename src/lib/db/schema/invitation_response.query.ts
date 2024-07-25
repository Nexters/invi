"use server";

import { db } from "~/lib/db";
import {
  invitationResponses,
  type InvitationResponseInsert,
} from "~/lib/db/schema/invitation_response";

export async function getAllInvitationResponses() {
  return db.select().from(invitationResponses);
}

export async function createInvitationResponses(
  participant_name: string,
  attendance: boolean,
  reason: string,
) {
  const data: InvitationResponseInsert = {
    id: "asdf",
    participant_name: participant_name,
    attendance: attendance,
    reason: reason,
    created_at: new Date(),
  };

  const res = db.insert(invitationResponses).values(data);
  return res;
}
