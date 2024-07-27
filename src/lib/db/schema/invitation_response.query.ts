"use server";

import { count, eq, sql, sum } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "~/lib/db";
import {
  invitationResponses,
  type InvitationResponse,
  type InvitationResponseInsert,
} from "~/lib/db/schema/invitation_response";

export async function getAllInvitationResponses() {
  return await db.select().from(invitationResponses);
}

export async function getInvitationResponseById(id: InvitationResponse["id"]) {
  const responses = await db
    .select()
    .from(invitationResponses)
    .where(eq(invitationResponses.id, id));
  return responses[0];
}

export async function getInvitationResponseStats() {
  const result = await db
    .select({
      totalResponses: count(),
      attendingCount: sum(
        sql`CASE WHEN ${invitationResponses.attendance} = true THEN 1 ELSE 0 END`,
      ).as("attending_count"),
    })
    .from(invitationResponses);

  return {
    totalResponses: Number(result[0].totalResponses),
    attendingCount: Number(result[0].attendingCount),
  };
}

export async function createInvitationResponses(
  participant_name: string,
  attendance: boolean,
  reason?: string,
) {
  const data: InvitationResponseInsert = {
    id: nanoid(),
    participant_name: participant_name,
    attendance: attendance,
    reason: reason,
    created_at: new Date(),
  };

  const res = db.insert(invitationResponses).values(data);
  return res;
}
