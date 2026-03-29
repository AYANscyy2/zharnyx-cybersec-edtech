"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";

const FOUNDERS = [
  {
    name: "Sanjai R",
    role: "Founder & CEO",
    desc: "Visionary behind Zharnyx. Building Tamil Nadu's cybersecurity talent pipeline.",
    initials: "SR",
  },
  {
    name: "Harish",
    role: "Co-Founder — Curriculum",
    desc: "Designed the 28-week curriculum with real-world tool integration.",
    initials: "H",
  },
  {
    name: "Antony",
    role: "Co-Founder — Placements",
    desc: "Connects students to hiring partners across Coimbatore & Chennai.",
    initials: "A",
  },
];

export function FoundersSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  const cardsRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
    delay: 0.1,
    stagger: 0.13,
    childSelector: ".founder-card",
  });
  const linkRef = useGsapScrollAnimation<HTMLAnchorElement>({
    direction: "up",
    duration: 0.5,
    delay: 0.35,
  });

  return (
    <section className="w-full py-24 px-6 font-mono bg-black border-t-2 border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Meet the{" "}
            <span className="text-red-500">
              Founders
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className="founder-card flex flex-col gap-6 p-8 border-2 border-white/10 bg-[#050505] hover:border-white/30 transition-colors"
            >
              {/* Avatar */}
              <div className="w-16 h-16 border-2 border-red-600 bg-red-600/10 flex items-center justify-center text-2xl font-black text-red-500">
                {f.initials}
              </div>

              <div>
                <h3 className="text-xl font-black text-white uppercase">
                  {f.name}
                </h3>
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest mt-1">
                  {f.role}
                </p>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        <Link
          ref={linkRef}
          href="/about"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1"
        >
          More About Us <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
