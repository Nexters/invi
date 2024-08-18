ALTER TABLE "invitation" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invitation" ALTER COLUMN "event_url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "template" ALTER COLUMN "custum_fields" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invitation" ADD COLUMN "thumbnail_url" text;--> statement-breakpoint
ALTER TABLE "template" ADD COLUMN "thumbnail_url" text;--> statement-breakpoint
ALTER TABLE "invitation" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "invitation" DROP COLUMN IF EXISTS "event_date";