import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "~/lib/db/schema/users";

export const invitations = pgTable("invitation", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  customFields: json("custom_fields"),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date", { mode: "date" }),
  eventUrl: text("event_url"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Invitation = typeof invitations.$inferSelect;
export type InvitationInsert = typeof invitations.$inferInsert;
