"use server";

import { count, eq, sql, sum } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "~/lib/db";
import {
  invitationResponses,
  type InvitationResponse,
  type InvitationResponseInsert,
} from "~/lib/db/schema/invitation_response";

type CreateInvitationResponseParams = Omit<
  InvitationResponseInsert,
  "id" | "created_at"
>;

export async function getAllInvitationResponses() {
  return await db.select().from(invitationResponses);
}

export async function getInvitationResponseById(invitation_id: InvitationResponse["invitation_id"]) {
  const responses = await db
    .select()
    .from(invitationResponses)
    .where(eq(invitationResponses.invitation_id, invitation_id));

  return responses as InvitationResponse[];
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
  params: CreateInvitationResponseParams,
): Promise<InvitationResponseInsert> {
  const id = nanoid();
  const currentTimestamp = new Date();

  try {
    const res = await db
      .insert(invitationResponses)
      .values({
        ...params,
        id,
        created_at: currentTimestamp,
      })
      .returning();

    return res[0];
  } catch (error) {
    console.error("Error creating invitatio response:", error);
    throw new Error("Could not create invitation response");
  }
}
