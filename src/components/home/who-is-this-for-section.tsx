"use client";

import { GraduationCap, Briefcase, RefreshCw } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";

const PERSONAS = [
  {
    icon: GraduationCap,
    title: "College Students",
    desc: "Final year or recent grads in CS, IT, or ECE who want a real cybersecurity job — not just a certificate to add to a resume.",
    tags: ["B.E / B.Tech", "MCA", "BCA", "Final Year"],
  },
  {
    icon: Briefcase,
    title: "IT Professionals",
    desc: "Sysadmins, network engineers, or developers looking to pivot into cybersecurity and double their earning potential.",
    tags: ["Sysadmin", "Network Eng.", "Dev to Cyber", "1–5 yrs exp"],
  },
  {
    icon: RefreshCw,
    title: "Career Returners",
    desc: "Anyone who took a break from tech and wants to re-enter with one of the most in-demand and future-proof skills available.",
    tags: ["Career Break", "Re-skilling", "Remote-Ready"],
  },
];

export function WhoIsThisForSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  const cardsRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
    delay: 0.1,
    stagger: 0.13,
    childSelector: ".persona-anim-wrapper",
  });

  return (
    <section className="w-full py-24 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4 flex flex-col items-center">
          <SectionBadge text="Target Audience" icon={GraduationCap} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Who is this{" "}
            <span className="text-[#E60000]">
              for?
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-medium">
            If you can commit to the process, the program is built for you.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="persona-anim-wrapper h-full">
                <div
                  className="persona-card h-full flex flex-col gap-6 p-8 rounded-3xl bg-zinc-900/40 border border-white/5 relative overflow-hidden hover:border-[#E60000] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#E60000] transition-all duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-2 overflow-hidden group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <div className="absolute inset-0 bg-[#E60000] opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl"></div>
                    <div className="absolute inset-0 bg-[#E60000]/10 border border-[#E60000]/20 rounded-2xl"></div>
                    <Icon size={32} strokeWidth={1.5} className="relative z-10 text-[#E60000]" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white relative z-10">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 font-medium">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-black/40 border border-white/10 text-xs text-gray-400 font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
