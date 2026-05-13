import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { getFullUserRecord } from "@/actions/student/settings";
import { HubUserControls } from "@/components/dashboard/hub/user-controls";
import { SettingsClient } from "@/components/dashboard/settings/settings-client";
import { Settings, Terminal } from "lucide-react";

export default async function SettingsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/auth");

  const result = await getFullUserRecord();
  if (!result.success || !result.data) redirect("/dashboard");

  const u = result.data;

  return (
    <div className="w-full h-full text-white pb-10">

      {/* ── Header Bar ─────────────────────────────────────────────────────── */}
      <div className="w-full bg-[#0a0a0a] border-b-2 border-white/20 relative overflow-hidden">
        {/* Grid BG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="sgrid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M 4 0 L 0 0 0 4" fill="none" stroke="#3b82f6" strokeWidth="0.15" />
          </pattern>
          <rect width="100" height="100" fill="url(#sgrid)" />
        </svg>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-5 relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-blue-500 bg-black flex items-center justify-center shrink-0 shadow-[3px_3px_0px_0px_#3b82f6]">
              <Settings className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tighter leading-none text-white">
                User Settings
              </h1>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-blue-500" /> {u.email}
              </p>
            </div>
          </div>
          <HubUserControls />
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 mt-6">
        <SettingsClient
          user={{
            name: u.name,
            email: u.email,
            role: u.role,
            phone: u.phone,
            city: u.city,
            bio: u.bio,
            collegeName: u.collegeName,
            studentStatus: u.studentStatus,
            preferredTrack: u.preferredTrack,
            githubUrl: u.githubUrl,
            linkedinUrl: u.linkedinUrl,
            websiteUrl: u.websiteUrl,
            twitterUrl: u.twitterUrl,
            contactEmail: u.contactEmail,
            createdAt: u.createdAt,
            emailVerified: u.emailVerified,
          }}
        />
      </div>
    </div>
  );
}
