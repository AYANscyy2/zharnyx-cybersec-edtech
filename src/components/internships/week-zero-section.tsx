"use client";

import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

export function WeekZeroSection() {
  const containerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
  });

  return (
    <section className="w-full py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div
          ref={containerRef}
          className="relative overflow-hidden border-2 border-red-600 bg-[#050505] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none" />

          {/* Left Content */}
          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-start">
              <SectionBadge text="Lead Magnet" icon={PlayCircle} className="mb-0" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
              Experience Our <br />
              <span className="text-red-500">Teaching for Free</span> <br />
              with Week 0.
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-red-600 pl-6 font-mono">
              Not sure if this is the right fit? Week 0 is our permanently free gateway module. Get access to 5 self-paced sessions (~8 hours of content) covering cybersecurity basics, career paths, and lab setups. See exactly how we teach before you commit.
            </p>

            <div className="pt-6">
              <Link
                href="/week0"
                className="group relative inline-flex flex-col sm:flex-row items-center justify-center h-14 px-8 bg-red-600 text-black font-black text-sm uppercase tracking-widest border-2 border-red-600 hover:translate-x-[3px] hover:translate-y-[3px] transition-transform w-full sm:w-auto"
              >
                <span className="absolute inset-0 bg-white translate-x-[5px] translate-y-[5px] -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform border-2 border-white" />
                <span className="flex items-center gap-2">
                  <PlayCircle size={18} />
                  Start Week 0 for Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-2" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Visual elements */}
          <div className="md:w-1/3 shrink-0 relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 border-2 border-white/10 bg-black">
              <div className="text-2xl font-black text-red-500">01</div>
              <div className="font-bold text-white uppercase text-sm tracking-wider">Cybersecurity Basics</div>
            </div>
            <div className="flex items-center gap-4 p-4 border-2 border-white/10 bg-black ml-4">
              <div className="text-2xl font-black text-red-500">02</div>
              <div className="font-bold text-white uppercase text-sm tracking-wider">Career Pathways</div>
            </div>
            <div className="flex items-center gap-4 p-4 border-2 border-red-600 bg-red-600/10 ml-8 relative">
              <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600" />
              <div className="text-2xl font-black text-white">03</div>
              <div className="font-bold text-white uppercase text-sm tracking-wider">Full Lab Setup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
