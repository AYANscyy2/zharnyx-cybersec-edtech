CREATE TABLE "assessment" (
	"id" text PRIMARY KEY NOT NULL,
	"week_id" text NOT NULL,
	"title" text NOT NULL,
	"timer" integer,
	"questions" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "assessment_response" (
	"id" text PRIMARY KEY NOT NULL,
	"assessment_id" text NOT NULL,
	"student_id" text NOT NULL,
	"answers" json NOT NULL,
	"score" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image" text,
	"status" text DEFAULT 'unpublished' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_month" (
	"id" text PRIMARY KEY NOT NULL,
	"course_id" text NOT NULL,
	"title" text NOT NULL,
	"type" text DEFAULT 'common' NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_week" (
	"id" text PRIMARY KEY NOT NULL,
	"month_id" text NOT NULL,
	"title" text NOT NULL,
	"order" integer NOT NULL,
	"team" text,
	"is_project" boolean DEFAULT false NOT NULL,
	"content" text,
	"resources" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_submission" (
	"id" text PRIMARY KEY NOT NULL,
	"week_id" text NOT NULL,
	"student_id" text NOT NULL,
	"github_url" text,
	"live_url" text,
	"demo_url" text,
	"description" text,
	"score" integer,
	"review" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "week_mentor" (
	"id" text PRIMARY KEY NOT NULL,
	"week_id" text NOT NULL,
	"mentor_id" text NOT NULL,
	"assigned_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_week_id_course_week_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."course_week"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_response" ADD CONSTRAINT "assessment_response_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "assessment_response" ADD CONSTRAINT "assessment_response_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_month" ADD CONSTRAINT "course_month_course_id_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_week" ADD CONSTRAINT "course_week_month_id_course_month_id_fk" FOREIGN KEY ("month_id") REFERENCES "public"."course_month"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_submission" ADD CONSTRAINT "project_submission_week_id_course_week_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."course_week"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_submission" ADD CONSTRAINT "project_submission_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "week_mentor" ADD CONSTRAINT "week_mentor_week_id_course_week_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."course_week"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "week_mentor" ADD CONSTRAINT "week_mentor_mentor_id_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "assessment_weekId_idx" ON "assessment" USING btree ("week_id");--> statement-breakpoint
CREATE INDEX "assessment_response_assessmentId_idx" ON "assessment_response" USING btree ("assessment_id");--> statement-breakpoint
CREATE INDEX "assessment_response_studentId_idx" ON "assessment_response" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "course_month_courseId_idx" ON "course_month" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "course_week_monthId_idx" ON "course_week" USING btree ("month_id");--> statement-breakpoint
CREATE INDEX "project_submission_weekId_idx" ON "project_submission" USING btree ("week_id");--> statement-breakpoint
CREATE INDEX "project_submission_studentId_idx" ON "project_submission" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "week_mentor_weekId_idx" ON "week_mentor" USING btree ("week_id");--> statement-breakpoint
CREATE INDEX "week_mentor_mentorId_idx" ON "week_mentor" USING btree ("mentor_id");