import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tests = pgTable("test", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  number: integer("number").notNull(),
  email: text("email").notNull().unique(),
});

export type Test = typeof tests.$inferSelect;
export type TestInsert = typeof tests.$inferInsert;

export const testJobs = pgTable("test_job", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  testId: integer("test_id")
    .notNull()
    .references(() => tests.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type TestJobInsert = typeof testJobs.$inferInsert;
export type TestJobSelect = typeof testJobs.$inferSelect;
