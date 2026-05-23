"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import { toast } from "@/components/shared/toast";
import { Award, Loader2, CheckCircle, AlertCircle, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "checking" | "idle" | "loading" | "success" | "error";

interface ApplyButtonProps {
  courseSlug: string;
  collapsed?: boolean;
  className?: string;
}

/** A profile is considered complete when phone + preferredTrack are filled */
function isProfileComplete(user: any): boolean {
  return !!(user?.phone && user?.preferredTrack);
}

export function ApplyButton({ courseSlug, collapsed, className }: ApplyButtonProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("checking");

  // On mount, check waitlist status for logged-in users
  useEffect(() => {
    if (isPending) return;
    if (!session?.user) { setStatus("idle"); return; }

    fetch(`/api/waitlist?course=${courseSlug}`)
      .then(r => r.json())
      .then(data => setStatus(data.applied ? "success" : "idle"))
      .catch(() => setStatus("idle"));
  }, [session, isPending, courseSlug]);

  const handleClick = async () => {
    // ── Not logged in → signup with callbackUrl ──────────────────────────────
    if (!session?.user) {
      router.push(`/auth?mode=signup&callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    // ── Profile incomplete → toast + redirect to settings ───────────────────
    if (!isProfileComplete(session.user)) {
      toast.error("Complete your profile first", {
        description: "Add your phone number and preferred track before applying.",
        duration: 5000,
        action: {
          label: "Go to Settings",
          onClick: () =>
            router.push(
              `/dashboard/settings?callbackUrl=${encodeURIComponent(pathname)}`
            ),
        },
      });
      return;
    }

    // ── Guard against double-submit ──────────────────────────────────────────
    if (status === "success" || status === "loading" || status === "checking") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: courseSlug }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        toast.error("Something went wrong", { description: data.error ?? "Try again." });
        return;
      }

      setStatus("success");
      toast.success("You're on the waitlist! 🎉", {
        description: "We'll reach out soon with next steps.",
        duration: 6000,
      });
    } catch {
      setStatus("error");
      toast.error("Network error", { description: "Check your connection and try again." });
    }
  };

  const config: Record<Status, { label: string; Icon: any; cls: string }> = {
    checking: { label: "Checking...",   Icon: Loader2,     cls: "bg-white/5 text-gray-600 cursor-not-allowed" },
    idle:     { label: "Apply Now",     Icon: Award,       cls: "bg-red-600 hover:bg-red-500 text-black" },
    loading:  { label: "Joining...",    Icon: Loader2,     cls: "bg-red-600/50 text-black cursor-not-allowed" },
    success:  { label: "You're In! ✓", Icon: CheckCircle, cls: "bg-green-600/15 text-green-400 border border-green-600/30 cursor-default" },
    error:    { label: "Try Again",     Icon: AlertCircle, cls: "bg-orange-600 hover:bg-orange-500 text-black" },
  };

  // If logged in but profile incomplete, override button appearance
  const profileIncomplete = !!session?.user && !isProfileComplete(session.user) && !isPending && status !== "checking";
  const { label, Icon, cls } = profileIncomplete
    ? { label: "Complete Profile", Icon: UserCircle, cls: "bg-yellow-600/15 text-yellow-400 border border-yellow-600/30 hover:bg-yellow-600/25" }
    : config[status];

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading" || status === "checking" || isPending}
      className={cn(
        "flex items-center justify-center gap-2 py-2.5 font-black text-[10px] uppercase tracking-widest transition-all w-full",
        collapsed ? "px-2" : "px-4",
        cls,
        className,
      )}
      title={collapsed ? label : undefined}
    >
      <Icon
        size={13}
        className={cn((status === "loading" || status === "checking") && "animate-spin")}
      />
      {!collapsed && label}
    </button>
  );
}
