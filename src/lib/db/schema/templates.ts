import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const templates = pgTable("template", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  customFields: json("custum_fields"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Template = typeof templates.$inferSelect;
export type TemplateInsert = typeof templates.$inferInsert;
