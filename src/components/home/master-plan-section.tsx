"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Swords, Gavel, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(ScrollTrigger);

export function MasterPlanSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  const footerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.6,
    delay: 0.2,
  });

  return (
    <section id="master-plan" className="py-24 relative bg-black border-t-2 border-white/20 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Background Connector Line */}
        <div className="absolute left-4 md:left-1/2 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-4 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 md:hidden" />

        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 relative z-10 flex flex-col items-center">
          <SectionBadge text="Strategic Framework" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] max-w-4xl mt-4">
            The Zharnyx <span className="text-[#E60000]">Master Plan</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg font-medium max-w-2xl">
            Every phase has a filter. No one passes by luck.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-16 relative z-10">
          <TimelineItem
            phase="Phase 1"
            title="Foundation"
            period="Month 1-2"
            description="Core security fundamentals, lab setup, linux & network mastery."
            icon={<Shield size={24} />}
            alignment="left"
          />

          <TimelineItem
            phase="Phase 2"
            title="Red vs Blue Combat"
            period="Month 3-4"
            description="Offensive & defensive operations, live fire war games, team rotations."
            icon={<Swords size={24} />}
            alignment="right"
          />

          <TimelineItem
            phase="Phase 3"
            title="Tribunal & Red Zone"
            period="Month 5"
            description="Performance evaluation, remediation, and final gatekeeping exam."
            icon={<Gavel size={24} />}
            alignment="left"
          />

          <TimelineItem
            phase="Phase 4"
            title="Deployment"
            period="Month 6"
            description="3-tier placement, real-world exposure, and career launch."
            icon={<Rocket size={24} />}
            alignment="right"
          />
        </div>

        {/* Footer Badge */}
        <div ref={footerRef} className="flex justify-center mt-20 relative z-10">
          <div className="flex items-center gap-4 px-8 py-4 bg-zinc-900/40 border border-white/5 rounded-full hover:border-[#E60000]/30 transition-colors">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse delay-100" />
              <span className="w-2 h-2 rounded-full bg-[#E60000] animate-pulse delay-200" />
            </div>
            <span className="text-sm font-medium text-gray-400 tracking-wide">
              War Rooms <span className="text-white/20 mx-2">•</span> Tribunal Gatekeeping <span className="text-white/20 mx-2">•</span> 3-Tier Deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  phase: string;
  title: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  alignment: "left" | "right";
}

function TimelineItem({ phase, title, period, description, icon, alignment }: TimelineItemProps) {
  const isLeft = alignment === "left";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group flex md:items-center gap-8 md:gap-0 opacity-0",
        isLeft ? "md:flex-row -translate-x-10" : "md:flex-row-reverse translate-x-10"
      )}
    >
      {/* Content Card */}
      <div className={cn("flex-1 md:w-1/2 pl-16 md:pl-0", isLeft ? "md:pr-24" : "md:pl-24")}>
        <div className="bg-zinc-900/40 rounded-3xl border border-white/5 p-8 relative overflow-hidden transition-all duration-300 group-hover:border-[#E60000] group-hover:shadow-[8px_8px_0px_0px_#E60000] group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="flex flex-col gap-3 relative z-10">
            <span className="text-[#E60000] font-bold text-sm tracking-widest uppercase">
              {period}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-[#E60000] transition-colors duration-500">
              {title}
            </h3>
            <p className="text-gray-400 text-base leading-relaxed font-medium mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Center Icon Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center z-10 group-hover:border-[#E60000]/50 group-hover:bg-[#E60000]/10 transition-colors duration-500">
          <div className="text-white/50 group-hover:text-[#E60000] transition-colors duration-500 group-hover:drop-shadow-[0_0_15px_rgba(230,0,0,0.8)]">
            {icon}
          </div>
        </div>
      </div>

      {/* Empty Space for Grid Layout */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </div>
  );
}
