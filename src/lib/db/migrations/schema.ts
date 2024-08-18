import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const provider = pgEnum("provider", ["google", "kakao", "naver"]);

export const test = pgTable(
  "test",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    number: integer("number").notNull(),
    email: text("email").notNull(),
  },
  (table) => {
    return {
      test_email_unique: unique("test_email_unique").on(table.email),
    };
  },
);

export const test_job = pgTable("test_job", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  test_id: integer("test_id")
    .notNull()
    .references(() => test.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull(),
});

export const invitation_response = pgTable("invitation_response", {
  id: text("id").primaryKey().notNull(),
  participant_name: text("participant_name").notNull(),
  attendance: boolean("attendance").notNull(),
  reason: text("reason"),
  created_at: timestamp("created_at", { mode: "string" }).notNull(),
  invitation_id: text("invitation_id").references(() => invitation.id),
});

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    provider: provider("provider"),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    email: text("email").notNull(),
    profile_image: text("profile_image"),
  },
  (table) => {
    return {
      user_email_unique: unique("user_email_unique").on(table.email),
    };
  },
);

export const session = pgTable("session", {
  id: text("id").primaryKey().notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
  expires_at: timestamp("expires_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
});

export const invitation = pgTable(
  "invitation",
  {
    id: text("id").primaryKey().notNull(),
    user_id: text("user_id")
      .notNull()
      .references(() => user.id),
    custom_fields: json("custom_fields").notNull(),
    title: text("title").notNull(),
    event_url: text("event_url").notNull(),
    created_at: timestamp("created_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    updated_at: timestamp("updated_at", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
    thumbnail_url: text("thumbnail_url"),
  },
  (table) => {
    return {
      invitation_event_url_unique: unique("invitation_event_url_unique").on(
        table.event_url,
      ),
    };
  },
);

export const template = pgTable("template", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  description: text("description"),
  custum_fields: json("custum_fields"),
  created_at: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  updated_at: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  }).notNull(),
  thumbnail_url: text("thumbnail_url"),
});
