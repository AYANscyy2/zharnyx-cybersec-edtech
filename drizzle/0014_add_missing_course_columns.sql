ALTER TABLE "course" ADD COLUMN IF NOT EXISTS "price" integer DEFAULT 0;
ALTER TABLE "course" ADD COLUMN IF NOT EXISTS "selling_points" json;
ALTER TABLE "course" ADD COLUMN IF NOT EXISTS "level" text DEFAULT 'All Levels' NOT NULL;
ALTER TABLE "course" ADD COLUMN IF NOT EXISTS "portfolio_stats" json;
ALTER TABLE "course" ADD COLUMN IF NOT EXISTS "upcoming_cohort" text;
