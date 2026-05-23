import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { getEnrolledCourses, getAllSubmissions, getCourseContent } from "@/actions/student/dashboard";
import { getFullUserRecord } from "@/actions/student/settings";
import { getMyWaitlistEntries } from "@/actions/student/waitlist";
import {
  Shield,
  Terminal,
  Activity,
  Trophy,
  Target,
  ArrowRight,
  Award,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  ExternalLink,
  Clock,
  ChevronRight,
} from "lucide-react";
import { HubUserControls } from "@/components/dashboard/hub/user-controls";
import { ProfileTrackers } from "@/components/dashboard/profile/profile-trackers";
import type { CourseProgress, ActivityEntry } from "@/components/dashboard/profile/profile-trackers";

export default async function ProfilePage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const userRole = session.user.role;
  const userName = session.user.name;
  const userEmail = session.user.email;

  const profileIncomplete = !session.user.phone || !(session.user as any).preferredTrack || !session.user.city;

  // Fetch full user record for social links
  const userRecordResult = await getFullUserRecord();
  const userRecord = userRecordResult.success && userRecordResult.data ? userRecordResult.data : null;

  const socials = [
    { label: "GitHub", url: userRecord?.githubUrl, icon: Github },
    { label: "LinkedIn", url: userRecord?.linkedinUrl, icon: Linkedin },
    { label: "Twitter", url: userRecord?.twitterUrl, icon: Twitter },
    { label: "Website", url: userRecord?.websiteUrl, icon: Globe },
    { label: "Email", url: userRecord?.contactEmail ? `mailto:${userRecord.contactEmail}` : null, icon: Mail },
  ].filter((s) => !!s.url);

  // ── 1. Fetch all enrolled courses ─────────────────────────────────────────
  const coursesResult = await getEnrolledCourses(session.user.id);
  const enrolledCourses = coursesResult.success && coursesResult.data ? coursesResult.data : [];

  // ── 2. Compute progress for EVERY course concurrently ─────────────────────
  const courseProgressData: CourseProgress[] = await Promise.all(
    enrolledCourses.map(async (course: any) => {
      const contentResult = await getCourseContent(session.user.id, course.id);
      let completedWeeks = 0;
      let totalWeeks = 0;
      if (contentResult.success && contentResult.data) {
        const allWeeks = contentResult.data.flatMap((m: any) => m.weeks || []);
        totalWeeks = allWeeks.length;
        completedWeeks = allWeeks.filter((w: any) => w.isCompleted).length;
      }
      const progressPercentage = totalWeeks > 0 ? Math.floor((completedWeeks / totalWeeks) * 100) : 0;
      return {
        courseId: course.id,
        title: course.title ?? course.name ?? "Untitled Course",
        progressPercentage,
        completedWeeks,
        totalWeeks,
      };
    })
  );

  // Overall progress = average across all courses
  const overallProgress =
    courseProgressData.length > 0
      ? Math.floor(courseProgressData.reduce((sum, c) => sum + c.progressPercentage, 0) / courseProgressData.length)
      : 0;

  // ── 3. Fetch submissions for activity + streak ─────────────────────────────
  let recentActivities: ActivityEntry[] = [];
  let allActivities: ActivityEntry[] = [];
  let calculatedStreak = 0;

  const submissionsResult = await getAllSubmissions(session.user.id);
  if (submissionsResult.success && submissionsResult.data) {
    const { assessments, projects } = submissionsResult.data;

    const rawActivities = [
      ...assessments.map((a: any) => ({
        type: "assessment" as const,
        text: `Assessment: ${a.assessment?.title || "Unknown Assessment"}`,
        date: new Date(a.submittedAt).toISOString(),
        status: a.status,
      })),
      ...projects.map((p: any) => ({
        type: "project" as const,
        text: `Project: ${p.week?.projectTitle || "Project Submission"}`,
        date: new Date(p.createdAt).toISOString(),
        status: p.status,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const timeAgo = (iso: string) => {
      const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
      if (seconds < 60) return "Just now";
      if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
      if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
      return `${Math.floor(seconds / 86400)}d ago`;
    };

    allActivities = rawActivities.map((a) => ({ ...a, time: timeAgo(a.date) }));
    recentActivities = allActivities.slice(0, 6);

    if (recentActivities.length === 0) {
      recentActivities = [{ type: "info", text: "No recent activity found", date: new Date().toISOString(), time: "Start learning!" }];
    }

    // Streak calculation
    if (rawActivities.length > 0) {
      const uniqueDates = Array.from(
        new Set(rawActivities.map((a) => a.date.split("T")[0]))
      ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

      const todayStr = new Date().toISOString().split("T")[0];
      const yesterStr = new Date(Date.now() - 86400000).toISOString().split("T")[0];

      if (uniqueDates.includes(todayStr) || uniqueDates.includes(yesterStr)) {
        let testDate = new Date(uniqueDates.includes(todayStr) ? todayStr : yesterStr);
        for (let i = 0; i < uniqueDates.length; i++) {
          const f = testDate.toISOString().split("T")[0];
          if (uniqueDates.includes(f)) {
            calculatedStreak++;
            testDate = new Date(testDate.getTime() - 86400000);
          } else break;
        }
      }
    }
  }

  const userStats = {
    rank: userRole === "admin" ? "ROOT ACCESS" : userRole === "mentor" ? "ELITE" : "SCRIPT KIDDIE",
    points: (session.user as any).totalScore?.toString() || "0",
    modulesDone: `${overallProgress}%`,
    streak: calculatedStreak,
  };

  // ── 4. Fetch Waitlist Entries ──────────────────────────────────────────────
  const waitlistResult = await getMyWaitlistEntries(session.user.id);
  const waitlistEntries = waitlistResult.success ? waitlistResult.data : [];

  return (
    <div className="w-full h-full text-white pb-10">

      {/* ── Compact Banner + Header ─────────────────────────────────────── */}
      <div className="w-full bg-[#0a0a0a] border-b-2 border-white/20 relative overflow-hidden">
        {/* Cyber grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#22c55e" strokeWidth="0.15" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-6 relative z-10">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Initial + Name + Meta */}
            <div className="flex items-center gap-5">
              {/* Initial Block */}
              <div className="w-16 h-16 border-2 border-green-500 bg-black flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_#22c55e]">
                <span className="text-3xl font-mono font-black text-green-500 select-none">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-black font-mono uppercase tracking-tighter leading-none text-white">
                    {userName}
                  </h1>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-500 border border-green-500 font-mono text-[10px] font-bold uppercase tracking-widest">
                    {userStats.rank}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1.5 text-gray-500 font-mono text-xs uppercase tracking-widest flex-wrap">
                  <span className="flex items-center gap-1.5 text-blue-500">
                    <Terminal className="w-3 h-3" /> @{userName.toLowerCase().replace(/\s+/g, "")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {(session.user as any).city || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Controls + Incomplete badge */}
            <div className="flex items-center gap-3 shrink-0">
              {profileIncomplete && (
                <Link
                  href="/auth?mode=complete-profile"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border-2 border-yellow-500 text-yellow-400 font-mono text-[10px] uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all"
                >
                  <Activity className="w-3 h-3 animate-pulse" /> Complete Profile
                </Link>
              )}
              <HubUserControls />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Bar ─────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-white/20 divide-x divide-white/10">
          {[
            { label: "Total Points", value: userStats.points, color: "text-red-500" },
            { label: "Overall Progress", value: userStats.modulesDone, color: "text-green-500" },
            { label: "Courses Enrolled", value: `${enrolledCourses.length}`, color: "text-blue-500" },
            { label: "Active Streak", value: `${calculatedStreak}d`, color: "text-orange-500" },
          ].map((s) => (
            <div key={s.label} className="px-6 py-4 flex flex-col gap-1">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{s.label}</span>
              <span className={`font-mono font-black text-xl leading-none ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-3 space-y-4">

          {/* Socials */}
          {socials.length > 0 && (
            <div className="border-2 border-white/20 bg-black p-4">
              <h3 className="font-mono font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
                <Globe className="w-3 h-3" /> Socials
              </h3>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-10 h-10 border-2 border-white/10 bg-black flex items-center justify-center group hover:border-white/40 hover:bg-white/5 transition-all"
                  >
                    <s.icon className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          <div className="border-2 border-white/20 bg-black p-4">
            <h3 className="font-mono font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-4 border-b border-white/10 pb-3 flex items-center gap-2">
              <Shield className="w-3 h-3" /> Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {[Shield, Trophy, Award].map((Icon, i) => (
                <div key={i} className="w-10 h-10 border-2 border-white/10 flex items-center justify-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <Icon className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
            <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mt-3">Complete modules to earn badges</p>
          </div>

          {/* System Log */}
          <div className="border-2 border-white/20 bg-black">
            <div className="px-4 py-3 border-b-2 border-white/20 flex justify-between items-center">
              <h3 className="font-mono font-bold text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" /> System Log
              </h3>
              <span className="text-[9px] font-mono bg-white/10 px-2 py-0.5 text-gray-400">LIVE</span>
            </div>
            <div className="p-4 space-y-0">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex gap-3 relative group">
                  {i !== recentActivities.length - 1 && (
                    <div className="absolute left-[5px] top-3 bottom-[-12px] w-[1px] bg-white/10 group-hover:bg-white/30 transition-colors" />
                  )}
                  <div className="relative mt-1 shrink-0 w-3 h-3 z-10 bg-black flex items-center justify-center">
                    <div className="w-1.5 h-1.5 border border-white/40 bg-black group-hover:border-blue-500 group-hover:bg-blue-500 transition-all" />
                  </div>
                  <div className="pb-4 group-hover:translate-x-0.5 transition-transform w-full min-w-0">
                    <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wide group-hover:text-white transition-colors truncate">
                      {act.type === "info" ? act.text : (
                        <>
                          <span className={act.type === "project" ? "text-purple-500" : "text-green-500"}>[{act.type.slice(0,4)}]</span>{" "}
                          {act.text.replace(`${act.type === "project" ? "Project" : "Assessment"}: `, "")}
                        </>
                      )}
                    </p>
                    <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-9 space-y-6">

          {/* My Waitlisted Courses — Dropdown Widget */}
          {waitlistEntries.length > 0 && (
            <details className="group border-2 border-white/20 bg-black transition-colors" open>
              <summary className="flex items-center justify-between px-6 py-4 border-b-2 border-white/20 bg-transparent cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform" />
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <h2 className="font-mono font-black text-sm uppercase tracking-widest text-white">My Waitlisted Courses</h2>
                </div>
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{waitlistEntries.length} course{waitlistEntries.length !== 1 && 's'}</span>
              </summary>

              <div className="divide-y divide-white/10 group-open:animate-in group-open:slide-in-from-top-2 group-open:fade-in duration-200">
                {waitlistEntries.map((entry: any) => {
                  const slugRouteMap: Record<string, string> = {
                    'week-0':         '/programs/week-0',
                    'foundation':     '/programs/foundation',
                    'soc':            '/programs/soc',
                    'vapt':           '/programs/vapt',
                    'cloud-security': '/programs/cloud-security',
                    'dfir':           '/programs/dfir',
                    'intern-tier-1':  '/internships',
                    'intern-tier-2':  '/internships',
                    'intern-tier-3':  '/internships',
                  };
                  const statusStyle: Record<string, string> = {
                    pending:   'text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/10',
                    contacted: 'text-blue-400 border-blue-500/50 hover:bg-blue-500/10',
                    enrolled:  'text-green-400 border-green-500/50 hover:bg-green-500/10',
                    rejected:  'text-red-400 border-red-500/50 hover:bg-red-500/10',
                  };
                  const href = slugRouteMap[entry.course] ?? '/programs';
                  return (
                    <Link
                      key={entry.id}
                      href={href}
                      className="flex items-center justify-between px-6 py-5 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                        <div>
                          <p className="font-mono font-bold text-xs uppercase tracking-widest text-white hover:text-yellow-400 transition-colors">
                            {entry.courseLabel}
                          </p>
                          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                            Applied {new Date(entry.appliedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }).toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 group/btn">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 border transition-colors ${statusStyle[entry.status] ?? 'text-gray-500 border-white/20 hover:bg-white/5'}`}>
                          {entry.status}
                        </span>
                        <ExternalLink size={14} className="text-gray-600 group-hover/btn:text-white transition-colors" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </details>
          )}

          <ProfileTrackers
            courseProgressData={courseProgressData}
            allActivities={allActivities}
            streak={calculatedStreak}
            totalPoints={parseInt(userStats.points) || 0}
          />
        </div>
      </div>
    </div>
  );
}

