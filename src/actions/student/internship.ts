"use server";

import { db } from "@/lib/db";
import { internshipEnrollment } from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { createId } from "@paralleldrive/cuid2";
import { eq, desc, and } from "drizzle-orm";

export async function createInternshipEnrollment(data: {
  track: string;
  tier: string;
  paymentStatus: "paid" | "pending";
  amount: number;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Check if there is an existing pending enrollment for this exact track
  const [existingPending] = await db
    .select()
    .from(internshipEnrollment)
    .where(
      and(
        eq(internshipEnrollment.studentId, session.user.id),
        eq(internshipEnrollment.track, data.track),
        eq(internshipEnrollment.paymentStatus, "pending")
      )
    )
    .limit(1);

  if (existingPending) {
    // Escalate pending enrollment to paid (or update amount)
    await db
      .update(internshipEnrollment)
      .set({
        paymentStatus: data.paymentStatus,
        tier: data.tier,
        amount: data.amount,
      })
      .where(eq(internshipEnrollment.id, existingPending.id));

    return { success: true, id: existingPending.id };
  }

  // Otherwise, create a brand new enrollment
  const newId = createId();

  await db.insert(internshipEnrollment).values({
    id: newId,
    studentId: session.user.id,
    track: data.track,
    tier: data.tier,
    paymentStatus: data.paymentStatus,
    amount: data.amount,
  });

  return { success: true, id: newId };
}

export async function getExistingInternshipEnrollments() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, data: [] };
  }

  const existing = await db
    .select()
    .from(internshipEnrollment)
    .where(
      and(
        eq(internshipEnrollment.studentId, session.user.id),
        eq(internshipEnrollment.paymentStatus, "pending")
      )
    )
    .orderBy(desc(internshipEnrollment.enrolledAt));

  return { success: true, data: existing };
}
