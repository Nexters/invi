ALTER TABLE "invitation" ALTER COLUMN "custom_fields" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_event_url_unique" UNIQUE("event_url");