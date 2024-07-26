CREATE TABLE IF NOT EXISTS "invitation_response" (
	"id" uuid PRIMARY KEY NOT NULL,
	"participant_name" text NOT NULL,
	"attendance" boolean NOT NULL,
	"reason" text,
	"created_at" timestamp NOT NULL
);
