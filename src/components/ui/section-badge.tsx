import React from "react";
import { type LucideIcon } from "lucide-react";

interface SectionBadgeProps {
  text: string;
  icon?: LucideIcon;
  className?: string;
}

export const SectionBadge = React.forwardRef<HTMLDivElement, SectionBadgeProps>(
  ({ text, icon: Icon, className }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col items-center gap-2 mb-4 group ${className}`}>
        <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-[0.34em] text-[10px] md:text-xs">
          {Icon && <Icon size={14} strokeWidth={3} className="shrink-0" />}
          <span>{text}</span>
        </div>
        <div className="relative w-28 h-px">
          {/* The Glow Line */}
          <div className="absolute inset-x-0 top-0 h-full bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.9),0_0_24px_rgba(220,38,38,0.4)]" />
          {/* Tapered side masks for the pointed look */}
          <div className="absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-black to-transparent" />
        </div>
      </div>
    );
  }
);

SectionBadge.displayName = "SectionBadge";
