"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, Briefcase, ShieldAlert, Users, Target, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function WhyZharnyxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.to(".why-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Staggered grid items
      gsap.to(".why-item-wrapper", {
        scrollTrigger: {
          trigger: ".why-grid",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
      
      // CTA Animation
      gsap.to(".why-cta", {
        scrollTrigger: {
          trigger: ".why-cta",
          start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header matched to inspiration */}
        <div className="why-header text-center mb-24 flex flex-col items-center opacity-0 translate-y-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] max-w-4xl">
            A platform for total immersion in <span className="text-[#E60000]">cyber operations</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg font-medium">
            Operatives rate our residency 9 out of 10. Here is why:
          </p>
        </div>

        {/* Structured staggered layout */}
        <div className="why-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-8 lg:gap-12">
            <WhyItem 
              icon={<Activity size={32} className="text-[#E60000]" />}
              title="Learning Method"
              bad="Theory-based learning"
              good="Simulation-based operations"
              desc="Step out of theory. Engage in high-stress, real-world simulations designed to mirror actual enterprise environments."
            />
            <WhyItem 
              icon={<Briefcase size={32} className="text-[#E60000]" />}
              title="Validation & Proof"
              bad="Certificates as proof"
              good="Portfolio & verified work"
              desc="Don't just collect certificates. Build a provable track record of completed missions, incident reports, and successful pentests."
            />
            <WhyItem 
              icon={<ShieldAlert size={32} className="text-[#E60000]" />}
              title="Career Advancement"
              bad="Hope for placement"
              good="Gatekeeping & tiers"
              desc="Progress is earned, not given. Advance through rigorous tiers that validate your operational readiness before you reach the field."
            />
          </div>

          {/* Column 2 (Offset top for masonry feel) */}
          <div className="flex flex-col gap-8 lg:gap-12 lg:mt-32">
            <WhyItem 
              icon={<Users size={32} className="text-[#E60000]" />}
              title="Training Environment"
              bad="Self-paced isolation"
              good="Pressure-tested cohorts"
              desc="Train alongside a curated squad of top-tier talent. Our intensive environment ensures you are pushed to your absolute limits."
            />
            <WhyItem 
              icon={<Target size={32} className="text-[#E60000]" />}
              title="Curriculum Focus"
              bad="Generic curriculum"
              good="War room missions"
              desc="Face live-fire scenarios where every second counts. Defend, attack, and strategize under the same pressure as a real SOC or Red Team."
            />
          </div>
        </div>

        <div className="why-cta mt-32 flex justify-center opacity-0 translate-y-5">
          <button onClick={() => router.push("/programs")} className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#E60000] text-white font-bold text-sm uppercase tracking-widest transition-all rounded-full hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(230,0,0,0.4)]">
            Explore Courses
          </button>
        </div>
      </div>
    </section>
  );
}

function WhyItem({ icon, title, bad, good, desc }: { icon: React.ReactNode, title: string, bad: string, good: string, desc: string }) {
  return (
    <div className="why-item-wrapper opacity-0 translate-y-16">
      <div className="group flex flex-col items-start text-left bg-zinc-900/40 border border-white/5 p-8 md:p-10 rounded-3xl hover:border-[#E60000] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#E60000] hover:-translate-x-2 hover:-translate-y-2 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="mb-6 relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 shrink-0 z-10">
          <div className="absolute inset-0 bg-[#E60000] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
          <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:border-[#E60000]/30 transition-colors duration-500"></div>
          <div className="relative z-10 group-hover:drop-shadow-[0_0_15px_rgba(230,0,0,0.8)] transition-all duration-500">{icon}</div>
        </div>
        <h3 className="text-white text-2xl font-bold tracking-tight mb-4 group-hover:text-[#E60000] transition-colors duration-500 relative z-10">{title}</h3>
        
        <div className="flex flex-col gap-3 mb-6 w-full relative z-10">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="w-6 h-6 rounded-full bg-gray-900/80 border border-gray-800 flex items-center justify-center shrink-0">
              <X size={12} className="text-gray-500" strokeWidth={3} />
            </div>
            <span className="text-sm font-medium line-through decoration-gray-600/50">{bad}</span>
          </div>
          <div className="flex items-center gap-3 text-white">
            <div className="w-6 h-6 rounded-full bg-[#E60000]/10 border border-[#E60000]/30 flex items-center justify-center shrink-0 group-hover:bg-[#E60000] transition-colors duration-300">
              <Check size={12} className="text-[#E60000] group-hover:text-white transition-colors duration-300" strokeWidth={4} />
            </div>
            <span className="text-sm md:text-base font-bold tracking-wide group-hover:text-[#E60000] transition-colors duration-300">{good}</span>
          </div>
        </div>

        <p className="text-gray-400 text-base leading-relaxed font-medium pt-5 border-t border-white/10 relative z-10">{desc}</p>
      </div>
    </div>
  );
}