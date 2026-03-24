"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Shield, Target, MapPin, Users, Zap, BookOpen, Briefcase, Award, Terminal } from "lucide-react";

gsap.registerPlugin(SplitText);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
          <div ref={badgeRef} className="translate-y-5 flex items-center gap-2 px-4 py-1 bg-red-600 text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white]">
            <MapPin size={14} strokeWidth={3} />
            <span>Serving Coimbatore & Chennai</span>
          </div>

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight ">
            Tamil Nadu's Own <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Cybersecurity Academy
            </span>
          </h1>
        </section>

        <div ref={contentRef} className="w-full flex flex-col items-center gap-24 opacity-0">
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
                desc="We partner directly with companies based in Chennai and Coimbatore to map our curriculum to their hiring needs."
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
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">Meet the Founders</h2>
              <p className="text-red-500 font-bold uppercase tracking-widest text-sm mt-4">The team behind the academy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FounderCard name="Sanjai R" role="Co-Founder & Lead Instructor" />
              <FounderCard name="Harish" role="Co-Founder & Operations" />
              <FounderCard name="Antony" role="Co-Founder & Curriculum Director" />
            </div>
          </section>

        </div>
      </main>
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

function FounderCard({ name, role }: { name: string, role: string }) {
  return (
    <div className="group relative border-2 border-white/20 bg-black overflow-hidden flex flex-col items-center p-8 text-center transition-all hover:border-red-500 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_white]">
      {/* Glitch overlay on hover */}
      <div className="absolute inset-0 bg-red-600/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none"></div>

      <div className="w-24 h-24 bg-white/10 border-2 border-white/30 rounded-full mb-6 flex items-center justify-center relative z-10 group-hover:border-white transition-colors">
        <Shield size={32} className="text-gray-500 group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-2xl font-black uppercase text-white relative z-10">{name}</h3>
      <p className="text-red-500 font-bold uppercase text-xs tracking-widest mt-2 relative z-10">{role}</p>

      <div className="w-8 h-1 bg-white/20 mt-6 group-hover:bg-white transition-colors relative z-10"></div>
    </div>
  )
}
