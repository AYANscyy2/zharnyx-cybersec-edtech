"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateProfileSettings, updateSocialLinks, deleteUserAccount } from "@/actions/student/settings";
import { authClient } from "@/lib/auth/auth-client";
import {
  User, Globe, Shield, Bell, ChevronRight,
  Github, Linkedin, Twitter, Link, Mail,
  Phone, MapPin, BookOpen, GraduationCap,
  Check, X, Loader2, Terminal, AlertTriangle,
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  city?: string | null;
  bio?: string | null;
  collegeName?: string | null;
  studentStatus?: string | null;
  preferredTrack?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  contactEmail?: string | null;
  createdAt: Date;
  emailVerified: boolean;
}

type Tab = "profile" | "social" | "account" | "notifications";

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "social", label: "Social Links", icon: Globe },
  { id: "account", label: "Account", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const TRACKS = [
  "Cloud Security", "Web Application Security", "Network Security",
  "Penetration Testing", "Digital Forensics", "Malware Analysis",
  "Incident Response", "Threat Intelligence", "DevSecOps",
];

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 border-2 font-mono text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] ${ok ? "border-green-500 bg-black text-green-400" : "border-red-500 bg-black text-red-400"}`}>
      {ok ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      {msg}
    </div>
  );
}

const NOTIF_DEFAULTS: Record<string, boolean> = {
  "New Course Announcements": true,
  "Assignment Deadlines": true,
  "Score Updates": true,
  "Platform Updates": false,
  "Marketing Emails": false,
};

export function SettingsClient({ user }: { user: UserData }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [tab, setTab] = useState<Tab>("profile");
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [notifState, setNotifState] = useState<Record<string, boolean>>(NOTIF_DEFAULTS);

  // Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg: string, ok: boolean) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const handleProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateProfileSettings(fd);
      showToast(res.success ? res.message! : res.error!, res.success);
      if (res.success && callbackUrl) {
        // Small delay so the user sees the success toast before redirect
        setTimeout(() => router.push(callbackUrl), 1200);
      }
    });
  };

  const handleSocial = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await updateSocialLinks(fd);
      showToast(res.success ? res.message! : res.error!, res.success);
    });
  };

  const handleSaveNotifs = () => {
    // Persist to localStorage as a lightweight store
    if (typeof window !== "undefined") {
      localStorage.setItem("notif_prefs", JSON.stringify(notifState));
    }
    showToast("Notification preferences saved.", true);
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "delete_my_profile") return;
    setIsDeleting(true);
    const res = await deleteUserAccount();
    if (res.success) {
      await authClient.signOut();
      router.push("/auth");
    } else {
      showToast(res.error!, false);
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">

      {/* ── Sidebar Tabs ─── */}
      <div className="lg:w-64 shrink-0">
        <div className="border-2 border-white/20 bg-black divide-y divide-white/10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-widest transition-all ${tab === t.id
                  ? "bg-white/5 text-white border-l-2 border-blue-500"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-3">
                <t.icon className="w-4 h-4" /> {t.label}
              </span>
              {tab === t.id && <ChevronRight className="w-3 h-3 text-blue-500" />}
            </button>
          ))}
        </div>

        {/* Account Meta */}
        {/* <div className="border-2 border-white/10 bg-black p-4 mt-4 space-y-3">
          <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Account Info</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <Terminal className="w-3 h-3 text-blue-500" /> {user.email}
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 ${user.emailVerified ? "bg-green-500" : "bg-yellow-500"}`} />
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              {user.emailVerified ? "Email Verified" : "Email Unverified"}
            </span>
          </div>
          <div className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">
            Member since {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
          </div>
        </div> */}
      </div>

      {/* ── Panel ─── */}
      <div className="flex-1 min-w-0">

        {/* Profile Tab */}
        {tab === "profile" && (
          <form onSubmit={handleProfile} className="space-y-0">
            <div className="border-2 border-white/20 bg-black">
              <div className="px-6 py-4 border-b-2 border-white/20 flex items-center gap-3">
                <User className="w-4 h-4 text-gray-500" />
                <h2 className="font-mono font-bold text-xs text-gray-400 uppercase tracking-widest">Profile Information</h2>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name" name="name" defaultValue={user.name} icon={User} placeholder="Your name" />
                <Field label="Phone Number" name="phone" defaultValue={user.phone} icon={Phone} placeholder="+91 9876543210" />
                <Field label="City / Location" name="city" defaultValue={user.city} icon={MapPin} placeholder="Mumbai, India" />
                <Field label="College / Institution" name="collegeName" defaultValue={user.collegeName} icon={GraduationCap} placeholder="IIT Bombay" />

                {/* Student Status Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Student Status</label>
                  <select
                    name="studentStatus"
                    defaultValue={user.studentStatus || ""}
                    className="bg-black border-2 border-white/20 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-widest appearance-none"
                  >
                    <option value="">-- Select Status --</option>
                    <option value="College Student">College Student</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                {/* Preferred Track Select */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Preferred Track</label>
                  <select
                    name="preferredTrack"
                    defaultValue={user.preferredTrack || ""}
                    className="bg-black border-2 border-white/20 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors uppercase tracking-widest appearance-none"
                  >
                    <option value="">-- Select Track --</option>
                    {TRACKS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Bio — full width */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={user.bio || ""}
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                    className="bg-black border-2 border-white/20 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none placeholder:text-gray-700"
                  />
                </div>
              </div>

              <div className="px-6 pb-6">
                <SubmitBtn pending={isPending} />
              </div>
            </div>
          </form>
        )}

        {/* Social Links Tab */}
        {tab === "social" && (
          <form onSubmit={handleSocial} className="space-y-0">
            <div className="border-2 border-white/20 bg-black">
              <div className="px-6 py-4 border-b-2 border-white/20 flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <h2 className="font-mono font-bold text-xs text-gray-400 uppercase tracking-widest">Social & Links</h2>
              </div>
              <div className="p-6 space-y-5">
                <Field label="GitHub URL" name="githubUrl" defaultValue={user.githubUrl} icon={Github} placeholder="https://github.com/username" />
                <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={user.linkedinUrl} icon={Linkedin} placeholder="https://linkedin.com/in/username" />
                <Field label="Twitter / X URL" name="twitterUrl" defaultValue={user.twitterUrl} icon={Twitter} placeholder="https://twitter.com/username" />
                <Field label="Personal Website" name="websiteUrl" defaultValue={user.websiteUrl} icon={Link} placeholder="https://yoursite.com" />
                <Field label="Contact Email" name="contactEmail" defaultValue={user.contactEmail} icon={Mail} placeholder="public@email.com" type="email" />
              </div>
              <div className="px-6 pb-6">
                <SubmitBtn pending={isPending} />
              </div>
            </div>
          </form>
        )}

        {/* Account Tab */}
        {tab === "account" && (
          <div className="space-y-4">
            <div className="border-2 border-white/20 bg-black">
              <div className="px-6 py-4 border-b-2 border-white/20 flex items-center gap-3">
                <Shield className="w-4 h-4 text-gray-500" />
                <h2 className="font-mono font-bold text-xs text-gray-400 uppercase tracking-widest">Account Details</h2>
              </div>
              <div className="p-6 space-y-5">
                <ReadonlyField label="Email Address" value={user.email} icon={Mail} />
                <ReadonlyField label="Account Role" value={user.role.replace("_", " ").toUpperCase()} icon={Shield} />
                <ReadonlyField label="Member Since" value={new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} icon={Terminal} />
                <ReadonlyField label="Email Status" value={user.emailVerified ? "Verified ✓" : "Not Verified"} icon={Mail} />
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border-2 border-red-900/50 bg-black">
              <div className="px-6 py-4 border-b-2 border-red-900/50 flex items-center gap-3">
                <X className="w-4 h-4 text-red-500" />
                <h2 className="font-mono font-bold text-xs text-red-500 uppercase tracking-widest">Danger Zone</h2>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-wider leading-relaxed mb-5">
                  These actions are irreversible. Please be absolutely certain before proceeding.
                </p>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setDeleteText("");
                  }}
                  className="flex items-center gap-2 px-5 py-3 border-2 border-red-900/50 text-red-500 font-mono text-xs uppercase tracking-widest hover:bg-red-900/20 hover:text-red-400 transition-colors shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)] hover:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <X className="w-3 h-3" /> Delete Account
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {tab === "notifications" && (
          <div className="border-2 border-white/20 bg-black">
            <div className="px-6 py-4 border-b-2 border-white/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-gray-500" />
                <h2 className="font-mono font-bold text-xs text-gray-400 uppercase tracking-widest">Notification Preferences</h2>
              </div>
              <span className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">Changes saved locally</span>
            </div>
            <div className="divide-y divide-white/10">
              {([
                { label: "New Course Announcements", desc: "Get notified when new courses are added" },
                { label: "Assignment Deadlines", desc: "Reminders 24h before deadlines" },
                { label: "Score Updates", desc: "When your assessments are graded" },
                { label: "Platform Updates", desc: "News about platform features and changes" },
                { label: "Marketing Emails", desc: "Promotions and newsletter" },
              ] as const).map((n) => {
                const enabled = notifState[n.label] ?? false;
                return (
                  <div
                    key={n.label}
                    className="px-6 py-5 flex items-center justify-between gap-6 hover:bg-white/5 transition-colors cursor-pointer select-none"
                    onClick={() => setNotifState((prev) => ({ ...prev, [n.label]: !prev[n.label] }))}
                  >
                    <div>
                      <p className={`font-mono text-xs uppercase tracking-widest transition-colors ${enabled ? "text-white" : "text-gray-500"}`}>
                        {n.label}
                      </p>
                      <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest mt-1">{n.desc}</p>
                    </div>
                    {/* Clickable Toggle */}
                    <div
                      className={`w-11 h-6 border-2 relative shrink-0 transition-all duration-200 ${enabled ? "border-green-500 bg-green-500/10" : "border-white/20 bg-white/5"
                        }`}
                    >
                      <div
                        className={`absolute top-[3px] w-3.5 h-3.5 transition-all duration-200 ${enabled ? "right-[3px] bg-green-500" : "left-[3px] bg-white/30"
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="px-6 py-4 border-t-2 border-white/10">
              <button
                onClick={handleSaveNotifs}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none active:translate-x-1 active:translate-y-1"
              >
                <Check className="w-3 h-3" /> Save Preferences
              </button>
            </div>
          </div>
        )}

      </div>

      {toast && <Toast msg={toast.msg} ok={toast.ok} />}

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-black border-2 border-red-900 w-full max-w-md shadow-[8px_8px_0px_0px_rgba(220,38,38,0.3)]">
            <div className="px-6 py-4 border-b-2 border-red-900/50 flex items-center justify-between">
              <h3 className="font-mono font-bold text-xs text-red-500 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Terminate Account
              </h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
                disabled={isDeleting}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="font-mono text-[11px] text-gray-400 uppercase tracking-wider leading-relaxed">
                This action is permanent and cannot be undone. All your progress, submissions, and data will be permanently wiped.
              </p>
              
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-3 h-3" /> Type <span className="text-red-400 font-bold select-all bg-red-900/20 px-1 py-0.5">delete_my_profile</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteText}
                  onChange={(e) => setDeleteText(e.target.value)}
                  disabled={isDeleting}
                  className="bg-black border-2 border-white/20 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-red-500 transition-colors placeholder:text-gray-700 w-full"
                  placeholder="delete_my_profile"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t-2 border-red-900/50 flex justify-end gap-4 bg-red-900/10">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 font-mono font-bold text-xs text-gray-400 hover:text-white uppercase tracking-widest transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteText !== "delete_my_profile" || isDeleting}
                className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white border-2 border-red-600 font-mono font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-red-500 transition-all shadow-[4px_4px_0px_0px_rgba(220,38,38,0.4)] hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-red-600 disabled:hover:text-white"
              >
                {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({
  label, name, defaultValue, icon: Icon, placeholder, type = "text",
}: {
  label: string; name: string; defaultValue?: string | null;
  icon: any; placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
        <Icon className="w-3 h-3" /> {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue || ""}
        placeholder={placeholder}
        className="bg-black border-2 border-white/20 text-white font-mono text-xs px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-700 w-full"
      />
    </div>
  );
}

function ReadonlyField({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
        <Icon className="w-3 h-3" /> {label}
      </label>
      <div className="border-2 border-white/10 bg-white/5 px-4 py-3 font-mono text-xs text-gray-400 uppercase tracking-widest">
        {value}
      </div>
    </div>
  );
}

function SubmitBtn({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 px-6 py-3 bg-white text-black border-2 border-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}
