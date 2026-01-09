import Link from "next/link";
import { requireStudent } from "@/lib/auth/role-guard";
import { db } from "@/lib/db";
import { course, enrollment } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import StudentDashboardClient from "@/components/student/layout/student-dashboard-client";

export default async function StudentPage() {
  await requireStudent();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  // Fetch all published courses
  const allCourses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    orderBy: [desc(course.createdAt)],
  });

  // Fetch user enrollments
  const userEnrollments = await db.query.enrollment.findMany({
    where: eq(enrollment.studentId, session.user.id),
    with: {
      course: true,
    },
  });

  // Map to distinct lists
  const enrolledCourseIds = new Set(userEnrollments.map((e) => e.courseId));

  const availableCourses = allCourses.map((c) => ({
    ...c,
    isEnrolled: enrolledCourseIds.has(c.id),
  }));

  const enrolledCoursesList = userEnrollments.map((e) => ({
    id: e.course.id,
    title: e.course.title,
    // Mock progress for now
    progress: 0,
    lastAccessed: "Recently",
    totalModules: 0, // Placeholder
    completedModules: 0, // Placeholder
  }));

  return (
    <StudentDashboardClient 
        enrolledCourses={enrolledCoursesList} 
        availableCourses={availableCourses} // Passing it even if not currently used in sidebar, good for future
        userId={session.user.id}
    />
  );
}
