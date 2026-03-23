ALTER TABLE "course" ADD COLUMN "level" text DEFAULT 'All Levels' NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "portfolio_stats" json;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "upcoming_cohort" text;