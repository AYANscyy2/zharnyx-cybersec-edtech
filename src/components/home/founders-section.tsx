"use client";

import Link from "next/link";
import { ArrowRight, Users, X, Mail, Linkedin, Github, Twitter } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";
import { useState, useEffect } from "react";
import { FOUNDERS_DATA } from "@/data/founders";
import { FounderCard } from "@/components/shared/founder-card";

export function FoundersSection() {
  const [selectedFounder, setSelectedFounder] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure hydration is complete before rendering data-driven content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  
  const linkRef = useGsapScrollAnimation<HTMLAnchorElement>({
    direction: "up",
    duration: 0.5,
    delay: 0.35,
  });

  if (!isMounted) return null;

  return (
    <section className="w-full py-24 px-6 font-mono bg-black border-t-2 border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4 flex flex-col items-center">
          <SectionBadge text="Leadership" icon={Users} />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Meet the{" "}
            <span className="text-red-500">
              Founders
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {Object.values(FOUNDERS_DATA).map((founder) => (
             <FounderCard 
                key={founder.name}
                founder={founder}
                onKnowMore={() => setSelectedFounder(founder.name)}
             />
          ))}
        </div>

        <Link
          ref={linkRef}
          href="/about"
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1 mt-4"
        >
          More About Us <ArrowRight size={16} />
        </Link>
      </div>

      {/* Global Dossier Modal Overlay */}
      <div
        className={`fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 transition-all duration-500 ease-out ${selectedFounder ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSelectedFounder(null)}
      >
        <div
          className={`bg-black border border-white/10 border-t-4 border-t-red-600 p-8 md:p-10 max-w-4xl w-full relative transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-[0_0_50px_-12px_rgba(220,38,38,0.3)] max-h-[90vh] overflow-y-auto ${selectedFounder ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button with glow */}
          <button
            onClick={() => setSelectedFounder(null)}
            className="absolute top-6 right-6 text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300 group cursor-pointer z-10"
            title="Close"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {selectedFounder && (
            <div className="flex flex-col md:flex-row gap-10 items-start">
               {/* Founder Portrait in Modal */}
               <div className="shrink-0 w-32 h-32 md:w-56 md:h-56 border-2 border-red-600 shadow-[6px_6px_0px_0px_white] overflow-hidden">
                <img 
                  src={FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].image} 
                  alt={selectedFounder}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-8 flex-1 w-full">
                <div className="space-y-2">
                  <span className="text-red-500 font-black uppercase text-xs tracking-[0.3em] block font-mono">/ FOUNDER_DOSSIER</span>
                  <h3 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tighter leading-none">
                    {selectedFounder}
                  </h3>
                  <p className="text-red-600 font-bold uppercase text-[11px] tracking-widest pl-1">
                    {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].role}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-red-600 via-red-600/50 to-transparent"></div>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed pl-6 font-medium italic">
                    "{FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].longDesc}"
                  </p>
                </div>

                {/* Responsibilities Section */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-white/40 font-mono">Core Responsibilities</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                    {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].responsibilities.map((resp, i) => (
                      <li key={i} className="text-gray-500 text-[11px] flex items-center gap-2 font-mono">
                        <div className="w-1.5 h-1.5 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,1)]"></div>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact & Network Table */}
                <div className="pt-6 border-t border-white/10 overflow-hidden">
                  <div className="grid grid-cols-[100px_1fr] border border-white/10 font-mono">
                    <div className="p-4 bg-white/5 border-r border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500">Contact</div>
                    <div className="p-4 border-b border-white/10 flex flex-wrap gap-4 items-center">
                      <a href={`mailto:${FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.email}`} className="text-white text-xs hover:text-red-500 transition-colors flex items-center gap-2">
                        <Mail size={14} className="text-red-600" /> {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.email}
                      </a>
                      {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.linkedin && (
                        <a href={FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.linkedin} target="_blank" className="text-white text-xs hover:text-red-500 transition-colors flex items-center gap-2">
                          <Linkedin size={14} className="text-red-600" /> LinkedIn
                        </a>
                      )}
                      {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.github && (
                        <a href={FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.github} target="_blank" className="text-white text-xs hover:text-red-500 transition-colors flex items-center gap-2">
                          <Github size={14} className="text-red-600" /> GitHub
                        </a>
                      )}
                      {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.twitter && (
                        <a href={FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].contact.twitter} target="_blank" className="text-white text-xs hover:text-red-500 transition-colors flex items-center gap-2">
                          <Twitter size={14} className="text-red-600" /> X
                        </a>
                      )}
                    </div>
                    <div className="p-4 bg-white/5 border-r border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500">Platforms</div>
                    <div className="p-4 text-xs text-gray-400 font-medium whitespace-pre-line">
                      {FOUNDERS_DATA[selectedFounder as keyof typeof FOUNDERS_DATA].platforms}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
