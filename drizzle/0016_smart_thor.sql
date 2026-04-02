CREATE TABLE "internship_enrollment" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"track" text NOT NULL,
	"tier" text NOT NULL,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"amount" integer,
	"currency" text DEFAULT 'INR',
	"enrolled_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "internship_enrollment" ADD CONSTRAINT "internship_enrollment_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "internship_enrollment_studentId_idx" ON "internship_enrollment" USING btree ("student_id");