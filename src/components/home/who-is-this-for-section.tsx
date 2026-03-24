"use client";

import { GraduationCap, Briefcase, RefreshCw } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";

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
    childSelector: ".persona-card",
  });

  return (
    <section className="w-full py-24 px-6 font-mono bg-black border-t-2 border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Who Is This{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              For?
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            If you can commit to the process, the program is built for you.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {PERSONAS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="persona-card flex flex-col gap-6 p-8 border-2 border-white/10 bg-[#050505] hover:border-red-600 transition-colors group"
              >
                <div className="p-3 border-2 border-red-600 bg-red-600/10 text-red-500 w-fit">
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase text-white">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-white/10">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-gray-400 font-bold uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
