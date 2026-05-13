"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { revalidatePath } from "next/cache";

// ─── Update Profile Info ─────────────────────────────────────────────────────
export async function updateProfileSettings(formData: FormData) {
  const session = await getCurrentSession();
  if (!session) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string | null;
  const phone = formData.get("phone") as string | null;
  const city = formData.get("city") as string | null;
  const bio = formData.get("bio") as string | null;
  const collegeName = formData.get("collegeName") as string | null;
  const studentStatus = formData.get("studentStatus") as string | null;
  const preferredTrack = formData.get("preferredTrack") as string | null;

  try {
    await db
      .update(user)
      .set({
        ...(name ? { name: name.trim() } : {}),
        phone: phone?.trim() || null,
        city: city?.trim() || null,
        bio: bio?.trim() || null,
        collegeName: collegeName?.trim() || null,
        studentStatus: studentStatus as "College Student" | "Working Professional" | null,
        preferredTrack: preferredTrack?.trim() || null,
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update profile." };
  }
}

// ─── Update Social Links ─────────────────────────────────────────────────────
export async function updateSocialLinks(formData: FormData) {
  const session = await getCurrentSession();
  if (!session) return { success: false, error: "Unauthorized" };

  const githubUrl = formData.get("githubUrl") as string | null;
  const linkedinUrl = formData.get("linkedinUrl") as string | null;
  const websiteUrl = formData.get("websiteUrl") as string | null;
  const twitterUrl = formData.get("twitterUrl") as string | null;
  const contactEmail = formData.get("contactEmail") as string | null;

  const formatUrl = (url: string | null) => {
    if (!url || !url.trim()) return null;
    const trimmed = url.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  try {
    await db
      .update(user)
      .set({
        githubUrl: formatUrl(githubUrl),
        linkedinUrl: formatUrl(linkedinUrl),
        websiteUrl: formatUrl(websiteUrl),
        twitterUrl: formatUrl(twitterUrl),
        contactEmail: contactEmail?.trim() || null,
      })
      .where(eq(user.id, session.user.id));

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Social links updated." };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to update social links." };
  }
}

// ─── Get Full User Record ─────────────────────────────────────────────────────
export async function getFullUserRecord() {
  const session = await getCurrentSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const record = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
    });
    if (!record) return { success: false, error: "Not found" };
    return { success: true, data: record };
  } catch (err) {
    return { success: false, error: "Failed to fetch user." };
  }
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export async function deleteUserAccount() {
  const session = await getCurrentSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await db.delete(user).where(eq(user.id, session.user.id));
    return { success: true, message: "Account deleted successfully." };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to delete account." };
  }
}
