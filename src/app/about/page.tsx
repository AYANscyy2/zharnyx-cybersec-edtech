"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Shield, Target, MapPin, Users, Zap, BookOpen, Briefcase, Award, Terminal, User, X, Mail, Linkedin, Github, Twitter } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { useState } from "react";
import { FOUNDERS_DATA } from "@/data/founders";
import { FounderCard } from "@/components/shared/founder-card";

gsap.registerPlugin(SplitText);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedFounder, setSelectedFounder] = useState<string | null>(null);

  useEffect(() => {

    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      // Split heading into lines and words
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      // Set overflow hidden on line-masks
      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: everything hidden
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      // 1. Badge appears
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        }, "-=0.6")
        // 3. Reveal the rest of the content
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="Serving TN (Tamil Nadu)" icon={MapPin} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight ">
            Tamil Nadu's Own <br />
            <span className="text-red-500">
              Cybersecurity Academy
            </span>
          </h1>
        </section>

        <div ref={contentRef} className="relative w-full flex flex-col items-center gap-24 opacity-0">
          {/* Mission + Vision */}
          <section id="mission" className="w-full flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Target className="text-red-500" size={32} />
                The Problem We Solve
              </h2>
              <div className="space-y-4 text-gray-300 border-l-2 border-red-600 pl-6 py-2">
                <p>
                  The industry gap is widening. Students are graduating with theoretical degrees but no hands-on experience defending real networks.
                </p>
                <p>
                  <strong>Our Mission:</strong> To bridge this gap by transforming motivated individuals into deploy-ready cybersecurity professionals through intense, lab-first training.
                </p>
                <p>
                  <strong>Our Vision:</strong> To make Tamil Nadu the premier hub for elite cybersecurity talent in India.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full bg-red-600/10 border-2 border-red-600 p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Core Philosophy</h3>
              <p className="text-gray-300 font-medium font-mono text-sm leading-relaxed">
                &gt; Theory is useless without execution.<br />
                &gt; Defense requires understanding offense.<br />
                &gt; Resilience is built in the lab.<br />
                &gt; No gated knowledge.
              </p>
            </div>
          </section>

          {/* Differentials / What Makes Us Different */}
          <section id="differentials" className="w-full space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">What Makes Us Different</h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We ripped up the standard academic playbook. Here is how we build engineers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DiffCard
                icon={<Terminal className="text-red-500" size={24} />}
                title="Real Lab-First Learning"
                desc="Forget slideshows. 80% of your time is spent in simulated corporate networks, breaking and defending infrastructure."
              />
              <DiffCard
                icon={<Briefcase className="text-red-500" size={24} />}
                title="Tamil Nadu Focused Placements"
                desc="We partner directly with companies based in TN (Tamil Nadu) to map our curriculum to their hiring needs."
              />
              <DiffCard
                icon={<Users className="text-red-500" size={24} />}
                title="Buddy System Learning"
                desc="Cybersecurity is a team sport. We pair you with senior peers and mentors to accelerate your technical growth."
              />
              <DiffCard
                icon={<Zap className="text-red-500" size={24} />}
                title="Affordable by Design"
                desc="High-quality infosec education shouldn't cause debt. Our pricing is transparent and heavily discounted for foundation phases."
              />
              <DiffCard
                icon={<BookOpen className="text-red-500" size={24} />}
                title="Structured End-to-End"
                desc="From your first Linux command to negotiating your first salary offer, we guide you through all 3 phases."
              />
              <DiffCard
                icon={<Award className="text-red-500" size={24} />}
                title="4 Specialized Tracks"
                desc="Don't be a generalist. Specialize in SOC, VAPT, Cloud Security, or DFIR to stand out to recruiters."
              />
            </div>
          </section>

          {/* Founders */}
          <section id="founders" className="w-full space-y-12 mb-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Meet the Founders</h2>
              <p className="text-red-500 font-bold uppercase tracking-widest text-sm mt-4">The team behind the academy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {Object.values(FOUNDERS_DATA).map((founder) => (
                    <FounderCard
                        key={founder.name}
                        founder={founder}
                        onKnowMore={() => setSelectedFounder(founder.name)}
                    />
                ))}
            </div>
          </section>

        </div>
      </main>

      {/* Global Modal Overlay - Moved to root to avoid parent transform interference */}
      <div
        className={`fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6 transition-all duration-500 ease-out ${selectedFounder ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
              {/* Founder Image in Modal */}
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
    </div>
  );
}

function DiffCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-black border-2 border-white/20 hover:border-red-500 transition-colors group flex flex-col gap-4">
      <div className="p-3 bg-white/5 w-fit border border-white/10 group-hover:bg-red-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-red-500 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
