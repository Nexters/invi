import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const invitationResponses = pgTable("invitation_response", {
  id: text("id").primaryKey().notNull(),
  participant_name: text("participant_name").notNull(),
  attendance: boolean("attendance").notNull(),
  reason: text("reason"),
  created_at: timestamp("created_at").notNull(),
});

export type InvitationResponse = typeof invitationResponses.$inferSelect;
export type InvitationResponseInsert = typeof invitationResponses.$inferInsert;