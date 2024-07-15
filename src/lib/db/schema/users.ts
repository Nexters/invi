import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const providerEnum = pgEnum("provider", ["google", "kakao", "naver"]);

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  provider: providerEnum("provider"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
