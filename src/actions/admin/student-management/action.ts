"use server";

import { db } from "@/lib/db";
import { eq, like, or, sql, desc } from "drizzle-orm";
import { user, assessmentResponse, projectSubmission, internshipEnrollment, enrollment, course } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";


// Get All Users
export async function getAllUsers({
    page = 1,
    limit = 10,
    query = "",
    role = "all",
}: {
    page?: number;
    limit?: number;
    query?: string;
    role?: string;
}) {
    try {
        await requireAdmin();

        const offset = (page - 1) * limit;

        const searchCondition = query
            ? or(like(user.name, `%${query}%`), like(user.email, `%${query}%`))
            : undefined;

        const roleCondition = role && role !== "all"
            ? eq(user.role, role as "admin" | "mentor" | "student")
            : undefined;

        // Combine conditions using AND logic if both exist, or use whichever exists
        // simplified logic: and(search, role)
        // drizzle-orm 'and' handles undefineds gracefully usually, but let's be explicit
        const whereClause = searchCondition && roleCondition
            ? sql`${searchCondition} and ${roleCondition}`
            : searchCondition || roleCondition;

        const [users, totalCountResult] = await Promise.all([
            db
                .select()
                .from(user)
                .where(whereClause)
                .limit(limit)
                .offset(offset)
                .orderBy(user.createdAt),
            db
                .select({ count: sql<number>`count(*)` })
                .from(user)
                .where(whereClause),
        ]);

        const totalCount = Number(totalCountResult[0]?.count || 0);
        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            data: users,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}


// Update User Role
export async function updateUserRole(userId: string, newRole: "admin" | "mentor" | "student") {
    try {
        await requireAdmin();
        await db
            .update(user)
            .set({ role: newRole })
            .where(eq(user.id, userId));

        revalidatePath("/admin/user-management");
        return { success: true, message: "User role updated successfully" };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to update user role" };
    }
}

// Get User Progress
export async function getUserProgress(userId: string) {
    try {
        await requireAdmin();

        const [assessments, projects] = await Promise.all([
            db.query.assessmentResponse.findMany({
                where: eq(assessmentResponse.studentId, userId),
                with: {
                    assessment: true,
                }
            }),
            db.query.projectSubmission.findMany({
                where: eq(projectSubmission.studentId, userId),
                with: {
                    week: true,
                }
            })
        ]);

        return {
            success: true,
            data: {
                assessments,
                projects,
            }
        };

    } catch (error) {
        console.error("Error fetching user progress:", error);
        return { success: false, error: "Failed to fetch user progress" };
    }
}

// Get New User Applications (Recently signed up)
export async function getNewUserApplications({
    page = 1,
    limit = 10,
    query = "",
}: {
    page?: number;
    limit?: number;
    query?: string;
}) {
    try {
        await requireAdmin();

        const offset = (page - 1) * limit;

        const searchCondition = query
            ? or(like(user.name, `%${query}%`), like(user.email, `%${query}%`))
            : undefined;

        const [users, totalCountResult] = await Promise.all([
            db
                .select({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    studentStatus: user.studentStatus,
                    preferredTrack: user.preferredTrack,
                    collegeName: user.collegeName,
                    message: user.message,
                    imageUrl: user.imageUrl,
                    createdAt: user.createdAt,
                    paymentStatus: internshipEnrollment.paymentStatus,
                })
                .from(user)
                .leftJoin(internshipEnrollment, eq(user.id, internshipEnrollment.studentId))
                .where(searchCondition)
                .limit(limit)
                .offset(offset)
                .orderBy(desc(user.createdAt)),
            db
                .select({ count: sql<number>`count(*)` })
                .from(user)
                .where(searchCondition),
        ]);

        const totalCount = Number(totalCountResult[0]?.count || 0);
        const totalPages = Math.ceil(totalCount / limit);

        return {
            success: true,
            data: users,
            meta: {
                totalCount,
                totalPages,
                currentPage: page,
                limit,
            },
        };
    } catch (error) {
        console.error("Error fetching new users:", error);
        return { success: false, error: "Failed to fetch new users" };
    }
}

// Approve User Access (Grant Payment Processed)
export async function approveUserAccess(userId: string) {
    try {
        await requireAdmin();

        const [targetUser] = await db.select().from(user).where(eq(user.id, userId));
        if (!targetUser) return { success: false, error: "User not found" };

        const [existingEnrollment] = await db
            .select()
            .from(internshipEnrollment)
            .where(eq(internshipEnrollment.studentId, userId));

        if (existingEnrollment) {
            await db
                .update(internshipEnrollment)
                .set({ paymentStatus: "paid" })
                .where(eq(internshipEnrollment.id, existingEnrollment.id));
        } else {
            const { createId } = await import("@paralleldrive/cuid2");
            await db.insert(internshipEnrollment).values({
                id: createId(),
                studentId: userId,
                track: targetUser.preferredTrack || "Undecided",
                tier: "Standard",
                paymentStatus: "paid",
                amount: 0,
            });
        }

        revalidatePath("/dashboard/admin");
        return { success: true, message: "Access granted successfully" };
    } catch (error) {
        console.error("Error approving access:", error);
        return { success: false, error: "Failed to approve access" };
    }
}

// Reject User Access
export async function rejectUserAccess(userId: string) {
    try {
        await requireAdmin();

        const [existingEnrollment] = await db
            .select()
            .from(internshipEnrollment)
            .where(eq(internshipEnrollment.studentId, userId));

        if (existingEnrollment) {
            await db
                .update(internshipEnrollment)
                .set({ paymentStatus: "cancelled" })
                .where(eq(internshipEnrollment.id, existingEnrollment.id));
        } else {
            const { createId } = await import("@paralleldrive/cuid2");
            const [targetUser] = await db.select().from(user).where(eq(user.id, userId));
            await db.insert(internshipEnrollment).values({
                id: createId(),
                studentId: userId,
                track: targetUser?.preferredTrack || "Undecided",
                tier: "Standard",
                paymentStatus: "cancelled",
                amount: 0,
            });
        }

        revalidatePath("/dashboard/admin");
        return { success: true, message: "Access rejected" };
    } catch (error) {
        console.error("Error rejecting access:", error);
        return { success: false, error: "Failed to reject access" };
    }
}

// Get all enrollments (standard + internship) for a user
export async function getUserEnrollments(userId: string) {
    try {
        await requireAdmin();

        const standardCourses = await db
            .select({
                id: enrollment.id,
                courseId: enrollment.courseId,
                courseTitle: course.title,
                paymentStatus: enrollment.paymentStatus,
                enrolledAt: enrollment.enrolledAt,
                type: sql<string>`'standard'`,
            })
            .from(enrollment)
            .leftJoin(course, eq(enrollment.courseId, course.id))
            .where(eq(enrollment.studentId, userId));

        const internships = await db
            .select({
                id: internshipEnrollment.id,
                courseId: internshipEnrollment.track,
                courseTitle: internshipEnrollment.track,
                paymentStatus: internshipEnrollment.paymentStatus,
                enrolledAt: internshipEnrollment.enrolledAt,
                type: sql<string>`'internship'`,
            })
            .from(internshipEnrollment)
            .where(eq(internshipEnrollment.studentId, userId));

        const combined = [...standardCourses, ...internships].sort(
            (a, b) => new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
        );

        return { success: true, data: combined };
    } catch (error) {
        console.error("Error fetching user enrollments:", error);
        return { success: false, error: "Failed to fetch user enrollments" };
    }
}

// Update Standard Enrollment Status
export async function updateEnrollmentStatus(enrollmentId: string, status: "paid" | "pending" | "cancelled") {
    try {
        await requireAdmin();
        await db
            .update(enrollment)
            .set({ paymentStatus: status })
            .where(eq(enrollment.id, enrollmentId));

        revalidatePath("/dashboard/admin");
        return { success: true, message: `Access ${status === 'paid' ? 'approved' : 'removed'} successfully` };
    } catch (error) {
        console.error("Error updating enrollment status:", error);
        return { success: false, error: "Failed to update enrollment status" };
    }
}

// Update Internship Enrollment Status
export async function updateInternshipEnrollmentStatus(enrollmentId: string, status: "paid" | "pending" | "cancelled") {
    try {
        await requireAdmin();
        await db
            .update(internshipEnrollment)
            .set({ paymentStatus: status })
            .where(eq(internshipEnrollment.id, enrollmentId));

        revalidatePath("/dashboard/admin");
        return { success: true, message: `Access ${status === 'paid' ? 'approved' : 'removed'} successfully` };
    } catch (error) {
        console.error("Error updating internship enrollment status:", error);
        return { success: false, error: "Failed to update internship enrollment status" };
    }
}

