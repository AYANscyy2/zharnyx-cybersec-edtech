"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

export async function updateStudentProfile(data: {
  phone: string;
  city: string;
  studentStatus: string;
  preferredTrack: string;
  collegeName?: string;
  message?: string;
  imageUrl: string;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db
    .update(user)
    .set({
      phone: data.phone,
      city: data.city,
      studentStatus: data.studentStatus as any,
      preferredTrack: data.preferredTrack,
      collegeName: data.collegeName,
      message: data.message,
      imageUrl: data.imageUrl,
    })
    .where(eq(user.id, session.user.id));

  return { success: true };
}
