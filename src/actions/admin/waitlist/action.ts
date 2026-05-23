"use server";

import { db } from "@/lib/db";
import { waitlistEntry, user } from "@/lib/db/schema";
import { eq, ilike, or, desc, count, sql } from "drizzle-orm";

export interface WaitlistRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  course: string;
  courseLabel: string;
  status: string;
  appliedAt: Date;
}

export async function getWaitlistEntries({
  page = 1,
  limit = 10,
  query = "",
  courseFilter = "",
  statusFilter = "",
}: {
  page?: number;
  limit?: number;
  query?: string;
  courseFilter?: string;
  statusFilter?: string;
}) {
  try {
    const offset = (page - 1) * limit;

    const conditions = [];
    if (query) {
      conditions.push(
        or(
          ilike(waitlistEntry.name, `%${query}%`),
          ilike(waitlistEntry.email, `%${query}%`),
          ilike(waitlistEntry.phone, `%${query}%`)
        )
      );
    }
    if (courseFilter) conditions.push(eq(waitlistEntry.course, courseFilter));
    if (statusFilter) conditions.push(eq(waitlistEntry.status, statusFilter as any));

    const whereClause = conditions.length > 0 ? sql`${conditions.reduce((a, b) => sql`${a} AND ${b}`)}` : undefined;

    const [rows, [{ total }]] = await Promise.all([
      db
        .select({
          id: waitlistEntry.id,
          name: waitlistEntry.name,
          email: waitlistEntry.email,
          phone: waitlistEntry.phone,
          course: waitlistEntry.course,
          courseLabel: waitlistEntry.courseLabel,
          status: waitlistEntry.status,
          appliedAt: waitlistEntry.createdAt,
        })
        .from(waitlistEntry)
        .where(whereClause)
        .orderBy(desc(waitlistEntry.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(waitlistEntry).where(whereClause),
    ]);

    return {
      success: true,
      data: rows as WaitlistRow[],
      meta: { total: Number(total), totalPages: Math.ceil(Number(total) / limit) },
    };
  } catch (err) {
    console.error("[getWaitlistEntries]", err);
    return { success: false, data: [], meta: { total: 0, totalPages: 0 } };
  }
}

export async function updateWaitlistStatus(id: string, status: "pending" | "contacted" | "enrolled" | "rejected") {
  try {
    await db.update(waitlistEntry).set({ status }).where(eq(waitlistEntry.id, id));
    return { success: true };
  } catch (err) {
    console.error("[updateWaitlistStatus]", err);
    return { success: false, error: "Failed to update status" };
  }
}
