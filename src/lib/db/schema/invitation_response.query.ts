"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "~/lib/db";
import {
  invitationResponses,
  type InvitationResponse,
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
      totalResponses: sql`COUNT(*)`.as("total_responses"),
      attendingCount:
        sql`SUM(CASE WHEN ${invitationResponses.attendance} = true THEN 1 ELSE 0 END)`.as(
          "attending_count",
        ),
    })
    .from(invitationResponses);

  return {
    totalResponses: Number(result[0].totalResponses),
    attendingCount: Number(result[0].attendingCount),
  };
}
