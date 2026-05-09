"use client";

import { Cloud, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export function FloatingChatbot() {
  const pathname = usePathname();

  // Hide on dashboard and auth pages to prevent clutter
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/auth")) {
    return null;
  }

  const handleClick = () => {
    toast.info("Coming Soon", {
      description: "Our AI Cybersecurity Assistant is currently under development.",
      className: "border-2 border-red-600 bg-black text-white font-mono",
    });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-50 flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-red-600 text-white border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group rounded-none"
      aria-label="Open AI Assistant"
    >
      <Cloud className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </button>
  );
}
