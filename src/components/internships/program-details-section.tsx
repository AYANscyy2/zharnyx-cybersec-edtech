"use client";

import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { Shield, Zap, Target, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { toast } from "sonner";

const TIERS = [
  {
    icon: Shield,
    title: "Tier 1: Starter",
    duration: "1 Month",
    projects: "1 Project",
    price: "₹3,500",
    desc: "Ideal for a short break. Get hands-on with fundamental operations and validate your skills.",
    perks: ["Certificate of Completion", "GitHub Portfolio Integration", "Basic Threat Modeling"],
    color: "blue",
  },
  {
    icon: Zap,
    title: "Tier 2: Core",
    duration: "2 Months",
    projects: "2 Projects",
    price: "₹6,500",
    desc: "Build a real portfolio with solo and collaborative projects. Deep dive into active defense.",
    perks: ["Advanced Letter of Recommendation", "Live Target Practice", "Team-Based Operations"],
    color: "purple",
  },
  {
    icon: Target,
    title: "Tier 3: Deep Track",
    duration: "3 Months",
    projects: "3 Projects",
    price: "₹8,999",
    desc: "The ultimate transformation ending with a Demo Day presentation to our hiring partners.",
    perks: ["Hiring Partner Exposure", "Demo Day Presentation", "Full SOC / PT Simulation"],
    color: "red",
  },
];

const hoverMap: Record<string, string> = {
  blue: "hover:border-blue-500",
  purple: "hover:border-purple-500",
  red: "hover:border-red-600",
};

const iconBgMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-500 border-blue-500",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500",
  red: "bg-red-600/10 text-red-500 border-red-600",
};

export function ProgramDetailsSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  
  const cardsRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
    delay: 0.1,
    stagger: 0.15,
    childSelector: ".tier-card",
  });

  return (
    <section id="program-details" className="w-full py-24 px-6 bg-black border-t-2 border-white/10 relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
        <div ref={headerRef} className="text-center space-y-4 max-w-3xl flex flex-col items-center">
          <SectionBadge text="Pan-India Program" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            India's First Project-Driven <br />
            <span className="text-red-500">
              Cybersecurity Internship
            </span>
          </h2>
          <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xl text-center mx-auto mt-4">
            Track-specialised. Real-world scenarios. No generic tutorials. Progression is earned through successful project delivery.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {TIERS.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.title}
                className={`tier-card group flex flex-col p-8 bg-[#050505] border-2 border-white/10 ${hoverMap[tier.color]} transition-colors relative focus-within:ring-2`}
              >
                <div className={`p-4 border-2 w-fit mb-6 ${iconBgMap[tier.color]}`}>
                  <Icon size={28} />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black uppercase text-white tracking-widest leading-none">
                    {tier.title.split(":")[0]} <br />
                    <span className="text-gray-500 text-lg">{tier.title.split(":")[1]}</span>
                  </h3>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-gray-300 uppercase tracking-widest font-mono">
                    {tier.duration}
                  </div>
                  <div className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-gray-300 uppercase tracking-widest font-mono">
                    {tier.price}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                  {tier.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-300 font-medium">
                      <span className="text-red-500 shrink-0 font-bold mt-0.5">›</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toast.info("courses will be live soon")}
                  className="mt-auto group relative flex items-center justify-center h-14 w-full bg-white/5 border-2 border-white/20 hover:border-white text-white font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    Apply Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
