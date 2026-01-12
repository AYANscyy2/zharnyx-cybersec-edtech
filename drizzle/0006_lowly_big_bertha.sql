ALTER TABLE "enrollment" ALTER COLUMN "currency" SET DEFAULT 'INR';--> statement-breakpoint
-- ALTER TABLE "assessment" ADD COLUMN "deadline" timestamp;--> statement-breakpoint
-- ALTER TABLE "course" ADD COLUMN "price" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "selling_points" json;--> statement-breakpoint
-- ALTER TABLE "assessment" DROP COLUMN "timer";