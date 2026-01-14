"use server";

import { db } from "@/lib/db";
import {
  course,
  courseMonth,
  courseWeek,
  enrollment,
  studentProgress,
  assessment,
  assessmentResponse,
  projectSubmission,
  user,
} from "@/lib/db/schema";
import { eq, and, desc, asc, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Get student overview stats
 */
export async function getStudentStats(studentId: string) {
  try {
    const enrollments = await db.query.enrollment.findMany({
      where: eq(enrollment.studentId, studentId),
    });

    const completedWeeks = await db.query.studentProgress.findMany({
      where: and(
        eq(studentProgress.studentId, studentId),
        eq(studentProgress.isCompleted, true)
      ),
    });

    // Calculate score (mock logic or real avg)
    const assessmentScores = await db.query.assessmentResponse.findMany({
      where: eq(assessmentResponse.studentId, studentId),
    });
    
    let totalScore = 0;
    let count = 0;
    assessmentScores.forEach(a => {
        if(a.score !== null) {
            totalScore += a.score;
            count++;
        }
    });
    
    const avgScore = count > 0 ? (totalScore / count).toFixed(1) : 0;

    return {
      success: true,
      data: {
        enrolledCourses: enrollments.length,
        completedModules: completedWeeks.length,
        avgScore: avgScore,
        attendance: "95%", // Placeholder for now
      },
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { success: false, error: "Failed to fetch stats" };
  }
}

/**
 * Get enrolled courses
 */
export async function getEnrolledCourses(studentId: string) {
  try {
    const enrollments = await db.query.enrollment.findMany({
      where: eq(enrollment.studentId, studentId),
      with: {
        course: true,
      },
    });

    return { success: true, data: enrollments.map((e) => e.course) };
  } catch (error) {
    console.error("Error fetching courses:", error);
    return { success: false, error: "Failed to fetch courses" };
  }
}

/**
 * Get Course Content with Locking Logic
 */
export async function getCourseContent(studentId: string, courseId: string) {
  try {
    // 1. Get entire course structure
    const months = await db.query.courseMonth.findMany({
      where: eq(courseMonth.courseId, courseId),
      with: {
        weeks: {
          orderBy: asc(courseWeek.order),
          with: {
             assessments: true,
             projectSubmissions: {
                where: eq(projectSubmission.studentId, studentId)
             }
             // We can't easily fetch filtered relations for assessmentResponse here
             // without complex queries, so we might fetch them separately or filter JS side
          }
        },
      },
      orderBy: asc(courseMonth.order),
    });

    // 2. Get student progress for this course (all weeks)
    // We need completion status to determine locks
    const progress = await db.query.studentProgress.findMany({
      where: eq(studentProgress.studentId, studentId),
    });
    
    const completedWeekIds = new Set(
        progress.filter(p => p.isCompleted).map(p => p.weekId)
    );

    // 3. Process Locking Logic
    // Flatten weeks to check order dependencies if they cross months?
    // Usually locking is sequential across the whole course.
    // Let's assume global order or strictly sequential based on position.
    
    let allWeeks: any[] = [];
    months.forEach(m => {
        if(m.weeks) allWeeks.push(...m.weeks);
    });
    
    // Sort all weeks just in case
    // Assuming month order + week order defines the sequence
    // A simpler approach: Week N is locked if Week N-1 is NOT in completedWeekIds.
    // Week 1 is always unlocked.
    
    // We need to know the "previous" week for every week.
    // Let's assign a global index or sort.
    
    // Re-structure data for UI
    const structuredData = months.map(month => {
       const weeksWithLockStatus = month.weeks.map((week, index) => {
           // Find previous week in the global sequence
           // This is slightly expensive to find "previous" dynamically if we just iterate months
           // simpler: Iterating sequentially and maintaining a "isUnlocked" state?
           return { ...week, isLocked: false, isCompleted: completedWeekIds.has(week.id) };
       });
       return { ...month, weeks: weeksWithLockStatus };
    });

    // Second pass to apply locks
    // We need a flat list to check "previous"
    const flatWeeks = structuredData.flatMap(m => m.weeks);
    
    for (let i = 0; i < flatWeeks.length; i++) {
        if (i === 0) {
            flatWeeks[i].isLocked = false; // First week always unlocked
        } else {
            const prevWeek = flatWeeks[i - 1];
            // Locked if previous week is NOT completed
            flatWeeks[i].isLocked = !prevWeek.isCompleted;
        }
    }

    return { success: true, data: structuredData };
  } catch (error) {
    console.error("Error fetching course content:", error);
    return { success: false, error: "Failed to fetch content" };
  }
}

/**
 * Get all submissions (Assignment & Project)
 */
export async function getAllSubmissions(studentId: string) {
   try {
     const assessments = await db.query.assessmentResponse.findMany({
        where: eq(assessmentResponse.studentId, studentId),
        with: {
            assessment: {
                with: {
                    week: {
                        with: {
                            month: {
                                with: { course: true }
                            }
                        }
                    }
                }
            }
        },
        orderBy: desc(assessmentResponse.submittedAt)
     });

     const projects = await db.query.projectSubmission.findMany({
        where: eq(projectSubmission.studentId, studentId),
        with: {
            week: {
                with: {
                    month: {
                        with: { course: true }
                    }
                }
            }
        },
        orderBy: desc(projectSubmission.createdAt)
     });

     return { success: true, data: { assessments, projects } };
   } catch (error) {
     console.error("Error fetching submissions:", error);
     return { success: false, error: "Failed to fetch submissions" };
   }
}

/**
 * Get Approved Projects for Profile
 */
export async function getApprovedProjects(studentId: string) {
    try {
        const approvedProjects = await db.query.projectSubmission.findMany({
            where: and(
                eq(projectSubmission.studentId, studentId),
                eq(projectSubmission.status, "graded")
            ),
             with: {
                week: {
                    with: {
                        month: {
                            with: { course: true }
                        }
                    }
                }
            },
            orderBy: desc(projectSubmission.createdAt)
        });
        
        return { success: true, data: approvedProjects };
    } catch(error) {
        console.error("Error fetching approved projects:", error);
         return { success: false, error: "Failed to fetch projects" };
    }
}

/**
 * Update Profile
 */
export async function updateProfile(studentId: string, data: Partial<typeof user.$inferSelect>) {
    try {
        await db.update(user).set({
            bio: data.bio,
            githubUrl: data.githubUrl,
            linkedinUrl: data.linkedinUrl,
            websiteUrl: data.websiteUrl,
            twitterUrl: data.twitterUrl,
            contactEmail: data.contactEmail,
            resumeUrl: data.resumeUrl,
            topProjects: data.topProjects,
            updatedAt: new Date()
        }).where(eq(user.id, studentId));

        revalidatePath("/dashboard/profile");
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

/**
 * Submit Assignment and Auto-Complete Week
 */
export async function submitAssignment(studentId: string, assessmentId: string, weekId: string, url: string) {
    try {
        // 1. Check if submission exists
        const existing = await db.query.assessmentResponse.findFirst({
            where: and(
                eq(assessmentResponse.studentId, studentId),
                eq(assessmentResponse.assessmentId, assessmentId)
            )
        });

        if (existing) {
             await db.update(assessmentResponse).set({
                submissionUrl: url,
                submittedAt: new Date(),
                status: "pending" // Resubmit resets status? Or keeps it? Let's say pending.
            }).where(eq(assessmentResponse.id, existing.id));
        } else {
            await db.insert(assessmentResponse).values({
                id: crypto.randomUUID(),
                studentId,
                assessmentId,
                submissionUrl: url,
                status: "pending"
            });
        }

        // 2. Mark week as completed? 
        // Logic: If this is the *only* assessment or required item.
        // For simplicity, let's assume submitting the assessment marks the week as done.
        // In a complex app, we'd check if ALL assessments in the week are done.
        // Let's check if there are other assessments in this week...
        // For now, AUTO COMPLETE WEEK on submission.
        
        await markWeekAsCompleted(studentId, weekId);

        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (error) {
        console.error("Error submitting assignment:", error);
        return { success: false, error: "Failed to submit assignment" };
    }
}

/**
 * Submit Project and Auto-Complete Week
 */
export async function submitProject(studentId: string, weekId: string, data: {
    githubUrl?: string,
    liveUrl?: string,
    demoUrl?: string,
    description: string
}) {
    try {
         const existing = await db.query.projectSubmission.findFirst({
            where: and(
                eq(projectSubmission.studentId, studentId),
                eq(projectSubmission.weekId, weekId)
            )
        });

        if (existing) {
             await db.update(projectSubmission).set({
                githubUrl: data.githubUrl,
                liveUrl: data.liveUrl,
                demoUrl: data.demoUrl,
                description: data.description,
                status: "pending",
                updatedAt: new Date()
            }).where(eq(projectSubmission.id, existing.id));
        } else {
            await db.insert(projectSubmission).values({
                id: crypto.randomUUID(),
                studentId,
                weekId,
                githubUrl: data.githubUrl,
                liveUrl: data.liveUrl,
                demoUrl: data.demoUrl,
                description: data.description,
                status: "pending"
            });
        }
        
        await markWeekAsCompleted(studentId, weekId);

        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (error) {
        console.error("Error submitting project:", error);
        return { success: false, error: "Failed to submit project" };
    }
}

// Helper to mark week complete
async function markWeekAsCompleted(studentId: string, weekId: string) {
    const existing = await db.query.studentProgress.findFirst({
        where: and(
            eq(studentProgress.studentId, studentId),
            eq(studentProgress.weekId, weekId)
        )
    });

    if (!existing) {
        await db.insert(studentProgress).values({
            id: crypto.randomUUID(),
            studentId,
            weekId,
            isCompleted: true,
            completedAt: new Date(),
            isUnlocked: true
        });
    } else if (!existing.isCompleted) {
        await db.update(studentProgress)
            .set({ isCompleted: true, completedAt: new Date() })
            .where(eq(studentProgress.id, existing.id));
    }
}
