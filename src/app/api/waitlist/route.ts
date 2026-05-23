import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { waitlistEntry, user } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

const COURSE_LABELS: Record<string, string> = {
  // Syllabus pages
  "week-0":         "Week 0 — Free Gateway",
  "foundation":     "Foundation Phase",
  "soc":            "SOC Analyst",
  "vapt":           "VAPT / Ethical Hacking",
  "cloud-security": "Cloud Security",
  "dfir":           "Digital Forensics & IR",
  // Internship tiers
  "intern-tier-1":  "Internship — Tier 1: Starter (1 Month)",
  "intern-tier-2":  "Internship — Tier 2: Core (2 Months)",
  "intern-tier-3":  "Internship — Tier 3: Deep Track (3 Months)",
};

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return NextResponse.json({ applied: false });

    const course = req.nextUrl.searchParams.get("course");
    if (!course) return NextResponse.json({ applied: false });

    const [existing] = await db
      .select({ id: waitlistEntry.id })
      .from(waitlistEntry)
      .where(and(eq(waitlistEntry.userId, session.user.id), eq(waitlistEntry.course, course)))
      .limit(1);

    return NextResponse.json({ applied: !!existing });
  } catch {
    return NextResponse.json({ applied: false });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify session via better-auth
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { course } = await req.json();

    if (!course || !COURSE_LABELS[course]) {
      return NextResponse.json({ error: "Invalid course slug" }, { status: 400 });
    }

    const courseLabel = COURSE_LABELS[course];
    const userId = session.user.id;

    // 2. Fetch full user profile (for name, email, phone)
    const [profile] = await db
      .select({ name: user.name, email: user.email, phone: user.phone })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    if (!profile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Check if entry already exists for this user + course
    const [existing] = await db
      .select({ id: waitlistEntry.id })
      .from(waitlistEntry)
      .where(and(eq(waitlistEntry.userId, userId), eq(waitlistEntry.course, course)))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { message: "Already on the waitlist for this course", alreadyExists: true },
        { status: 200 }
      );
    }

    // 4. Insert new waitlist entry
    const id = crypto.randomUUID();
    await db.insert(waitlistEntry).values({
      id,
      userId,
      name: profile.name,
      email: profile.email,
      phone: profile.phone ?? null,
      course,
      courseLabel,
      status: "pending",
    });

    return NextResponse.json(
      { message: "Successfully added to waitlist", id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[waitlist] POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
