ALTER TABLE "template" ALTER COLUMN "custum_fields" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "profile_image";