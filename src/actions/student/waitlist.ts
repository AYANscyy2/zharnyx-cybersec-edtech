"use server";

import { db } from "@/lib/db";
import { waitlistEntry } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getMyWaitlistEntries(userId: string) {
  try {
    const rows = await db
      .select({
        id: waitlistEntry.id,
        course: waitlistEntry.course,
        courseLabel: waitlistEntry.courseLabel,
        status: waitlistEntry.status,
        appliedAt: waitlistEntry.createdAt,
      })
      .from(waitlistEntry)
      .where(eq(waitlistEntry.userId, userId))
      .orderBy(desc(waitlistEntry.createdAt));

    return { success: true, data: rows };
  } catch {
    return { success: false, data: [] };
  }
}
