"use client";

import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CourseReminderSection() {
  const containerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.6,
  });

  return (
    <section className="w-full bg-black py-0 pb-24 px-6 border-b-2 border-white/20">
      <div className="max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className="relative bg-red-600 outline-2 outline-red-600 outline-offset-4 p-8 flex flex-col md:flex-row gap-8 items-center justify-between shadow-[8px_8px_0px_0px_white] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_0px_white] transition-all cursor-default"
        >
          {/* Left Content */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-black text-red-500 p-4 shrink-0 border-2 border-black">
              <AlertTriangle size={32} strokeWidth={3} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-widest">
                Final Call for May Cohort
              </h3>
              <p className="text-black/80 font-bold max-w-2xl text-sm md:text-base leading-relaxed">
                Remember, April is the final month to register for the upcoming May cohort across our SOC Analyst, VAPT, Cloud Security, and DFIR tracks.
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="shrink-0 w-full md:w-auto">
            <Link
              href="/apply"
              className="group flex items-center justify-center h-14 px-8 bg-black text-white font-black text-sm uppercase tracking-widest border-2 border-black hover:bg-transparent hover:text-black transition-colors w-full"
            >
              <span className="flex items-center gap-2">
                Secure Your Seat
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
