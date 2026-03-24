"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Swords, Gavel, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";

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
    <section id="master-plan" className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-4xl relative">
        {/* Background Connector Line */}
        <div className="absolute left-4 md:left-1/2 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 hidden md:block" />
        <div className="absolute left-4 top-32 bottom-32 w-1 bg-white/10 -translate-x-1/2 md:hidden" />

        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 relative z-10">
          <div className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 font-bold">
            // Strategic Framework
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            The Zharnyx <span className="text-purple-500">Master Plan</span>
          </h2>
          <p className="text-gray-400 mt-4 font-mono text-sm uppercase tracking-wide">
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
            color="blue"
            alignment="left"
            delay={0}
          />

          <TimelineItem
            phase="Phase 2"
            title="Red vs Blue Combat"
            period="Month 3-4"
            description="Offensive & defensive operations, live fire war games, team rotations."
            icon={<Swords size={24} />}
            color="purple"
            alignment="right"
            delay={0}
          />

          <TimelineItem
            phase="Phase 3"
            title="Tribunal & Red Zone"
            period="Month 5"
            description="Performance evaluation, remediation, and final gatekeeping exam."
            icon={<Gavel size={24} />}
            color="red"
            alignment="left"
            delay={0}
          />

          <TimelineItem
            phase="Phase 4"
            title="Deployment"
            period="Month 6"
            description="3-tier placement, real-world exposure, and career launch."
            icon={<Rocket size={24} />}
            color="red"
            alignment="right"
            delay={0}
          />
        </div>

        {/* Footer Badge */}
        <div ref={footerRef} className="flex justify-center mt-20">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border-2 border-white/10 rounded-full">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse delay-100" />
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse delay-200" />
            </div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              War Rooms • Tribunal Gatekeeping • 3-Tier Deployment
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
  color: "blue" | "purple" | "red";
  alignment: "left" | "right";
  delay: number;
}

function TimelineItem({ phase, title, period, description, icon, color, alignment }: TimelineItemProps) {
  const isLeft = alignment === "left";
  const ref = useRef<HTMLDivElement>(null);

  const colorMap = {
    blue: {
      border: "border-blue-600",
      text: "text-blue-500",
      bg: "bg-blue-600",
      shadow: "shadow-[8px_8px_0px_0px_#2563eb]",
    },
    purple: {
      border: "border-purple-600",
      text: "text-purple-500",
      bg: "bg-purple-600",
      shadow: "shadow-[8px_8px_0px_0px_#9333ea]",
    },
    red: {
      border: "border-red-600",
      text: "text-red-500",
      bg: "bg-red-600",
      shadow: "shadow-[8px_8px_0px_0px_#ef4444]",
    },
  };

  const theme = colorMap[color];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        x: isLeft ? -60 : 60,
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
  }, [isLeft]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex md:items-center gap-8 md:gap-0",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      {/* Content Card */}
      <div className={cn("flex-1 md:w-1/2 pl-16 md:pl-0", isLeft ? "md:pr-24" : "md:pl-24")}>
        <div
          className={cn(
            "p-6 bg-black border-2 relative group hover:-translate-y-1 transition-transform",
            "border-white",
            theme.shadow
          )}
        >
          {/* Colored Top Bar */}
          <div className={cn("absolute top-0 left-0 w-full h-1", theme.bg)} />

          <div className="flex flex-col gap-2">
            <span className={cn("font-mono text-xs uppercase tracking-widest", theme.text)}>
              {period}
            </span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              {title}
            </h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Center Icon Node */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
        <div
          className={cn(
            "w-12 h-12 bg-black border-2 flex items-center justify-center z-10",
            theme.border,
            theme.text
          )}
        >
          {icon}
        </div>
      </div>

      {/* Empty Space for Grid Layout */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </div>
  );
}
