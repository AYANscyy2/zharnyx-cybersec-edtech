"use server";

import { db } from "@/lib/db";
import {
  user,
  enrollment,
  course,
  doubtSession,
  weekMentor,
  courseWeek,
  courseMonth,
} from "@/lib/db/schema";
import { eq, and, desc, gte, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getEnrolledCourses(studentId: string) {
  try {
    const enrolledCourses = await db
      .select({
        id: course.id,
        title: course.title,
      })
      .from(enrollment)
      .innerJoin(course, eq(enrollment.courseId, course.id))
      .where(eq(enrollment.studentId, studentId));

    return { success: true, data: enrolledCourses };
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return { success: false, error: "Failed to fetch enrolled courses" };
  }
}

export async function getCourseMentors(courseId: string) {
  try {
    // Determine mentors by looking at who is assigned to weeks in this course
    // Need to join: course -> courseMonth -> courseWeek -> weekMentor -> user
    const mentors = await db
      .selectDistinct({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      })
      .from(weekMentor)
      .innerJoin(courseWeek, eq(weekMentor.weekId, courseWeek.id))
      .innerJoin(courseMonth, eq(courseWeek.monthId, courseMonth.id))
      .innerJoin(user, eq(weekMentor.mentorId, user.id))
      .where(eq(courseMonth.courseId, courseId));

    return { success: true, data: mentors };
  } catch (error) {
    console.error("Error fetching course mentors:", error);
    return { success: false, error: "Failed to fetch mentors" };
  }
}

export async function createDoubtRequest(data: {
  studentId: string;
  courseId: string;
  mentorId?: string;
  topic: string;
  description: string;
}) {
  try {
    // 1. Check rate limit: Max 3 requests in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentRequests = await db
      .select({ count: count() })
      .from(doubtSession)
      .where(
        and(
          eq(doubtSession.studentId, data.studentId),
          gte(doubtSession.createdAt, sevenDaysAgo)
        )
      );

    const requestCount = recentRequests[0]?.count || 0;

    if (requestCount >= 3) {
      return {
        success: false,
        error: "You have reached the limit of 3 doubt requests per week.",
      };
    }

    // 2. Create the request
    await db.insert(doubtSession).values({
      id: crypto.randomUUID(),
      studentId: data.studentId,
      courseId: data.courseId,
      mentorId: data.mentorId || null,
      topic: data.topic,
      description: data.description,
      status: "pending",
    });

    revalidatePath("/dashboard/student");
    return { success: true };
  } catch (error) {
    console.error("Error creating doubt request:", error);
    return { success: false, error: "Failed to create doubt request" };
  }
}

export async function getStudentDoubtSessions(studentId: string) {
  try {
    const sessions = await db
      .select({
        id: doubtSession.id,
        topic: doubtSession.topic,
        description: doubtSession.description,
        status: doubtSession.status,
        createdAt: doubtSession.createdAt,
        scheduledAt: doubtSession.scheduledAt,
        meetLink: doubtSession.meetLink,
        courseTitle: course.title,
        mentorName: user.name,
      })
      .from(doubtSession)
      .leftJoin(course, eq(doubtSession.courseId, course.id))
      .leftJoin(user, eq(doubtSession.mentorId, user.id))
      .where(eq(doubtSession.studentId, studentId))
      .orderBy(desc(doubtSession.createdAt));

    return { success: true, data: sessions };
  } catch (error) {
    console.error("Error fetching doubt sessions:", error);
    return { success: false, error: "Failed to fetch doubt sessions" };
  }
}
