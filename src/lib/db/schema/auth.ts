import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "~/lib/db/schema/user";

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
