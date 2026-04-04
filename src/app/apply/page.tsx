"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { 
  ArrowRight, 
  User, 
  Building2, 
  GraduationCap, 
  Terminal, 
  FolderKanban,
  Code
} from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

export default function ApplyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: hidden/offset
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
        }, "-=0.6")
        .to(".para", {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative opacity-0 min-h-screen pt-32 pb-20 overflow-hidden font-mono text-white bg-black">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
      
      {/* Decorative Grid from original but subtler */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none opacity-30" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">
        
        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge 
            ref={badgeRef} 
            text="Terminal_Application_v1.0" 
            icon={Terminal} 
            className="translate-y-5 opacity-0" 
          />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Join the Registry. <br />
            <span className="text-red-500">
              Choose Your Role.
            </span>
          </h1>

          <p className="para opacity-0 translate-y-5 text-lg md:text-xl text-gray-400 font-medium max-w-2xl border-l-4 border-red-600 pl-4 text-left font-mono">
            Identify your operational role to proceed with the clearance process. Access requires authentication. Secure your position in the Zharnyx ecosystem.
          </p>
        </section>

        <div ref={contentRef} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0">
          <ApplyCard 
            title="Student"
            desc="Join the residency. Train in live war games. Get deployed to elite security teams."
            icon={<GraduationCap size={32} className="text-red-500" />}
            href="/programs"
            cta="Start Residency"
            bullets={["7 Months Hands-on", "4 Specialized Tracks", "Placement Support"]}
          />
          <ApplyCard 
            title="Internship"
            desc="Pan-India remote cybersecurity internship tiers. Real-world project experience."
            icon={<FolderKanban size={32} className="text-red-500" />}
            href="/internships"
            cta="View Tiers"
            bullets={["Remote Operations", "Tiered Learning", "ZCA Certification Ready"]}
          />
          <ApplyCard 
            title="Mentor"
            desc="Experienced security architects ready to lead cohorts and offensive operations."
            icon={<User size={32} className="text-red-500" />}
            href="/apply/mentor"
            cta="Begin Application"
            bullets={["Technical Leadership", "Curriculum Design", "Real-world Mentoring"]}
          />
          <ApplyCard 
            title="Hiring Partner"
            desc="Organizations seeking pre-vetted, operationally ready security talent."
            icon={<Building2 size={32} className="text-red-500" />}
            href="/apply/recruiter"
            cta="Initialize Request"
            bullets={["Access Verified Talent", "Custom Skill Mapping", "Fast-track Hiring"]}
          />
          <ApplyCard 
            title="Partner Agency"
            desc="Drive growth and revenue by partnering with us. Expand your cybersecurity reach."
            icon={<Building2 size={32} className="text-red-500" />}
            href="/apply/partner-agency"
            cta="Join Network"
            bullets={["Strategic Synergy", "Shared Ecosystem", "Market Expansion"]}
          />
        </div>
      </main>
    </div>
  );
}

function ApplyCard({ 
  title, 
  desc, 
  icon, 
  href, 
  cta, 
  bullets 
}: { 
  title: string; 
  desc: string; 
  icon: React.ReactNode; 
  href: string; 
  cta: string;
  bullets: string[];
}) {
  return (
    <div className="group p-8 border-2 border-white/20 bg-black relative transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        {title} <br />
        <span className="text-red-500 shrink-0 text-sm tracking-widest">+ Access Clearance</span>
      </h3>
      <p className="text-gray-400 text-sm font-mono mb-8 leading-relaxed">
        {desc}
      </p>
      
      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-400 text-xs uppercase tracking-wider font-bold">
            <Code size={14} className="text-red-600 shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        href={href} 
        className="mt-auto flex items-center justify-between text-white font-bold uppercase tracking-wider text-sm group-hover:text-red-500 transition-colors pt-4 border-t border-white/10"
      >
        <span>{cta}</span>
        <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
  );
}
