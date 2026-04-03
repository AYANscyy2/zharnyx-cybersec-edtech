"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Crosshair, Shield, Terminal, ArrowRight, Zap, Cloud, Code } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

export default function ProgramsPage() {
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

      // Initial state: blank
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

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

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="Curriculum Overview" icon={Terminal} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            7 Months. 4 Tracks. <br />
            <span className="text-red-500">
              100% Hands-On.
            </span>
          </h1>

          <p className="para opacity-0 translate-y-5 text-lg md:text-xl text-gray-400 font-medium max-w-2xl border-l-4 border-red-600 pl-4 text-left">
            Our program is structured in 3 phases — Foundation, Specialization, and Career Launch. Every student builds a portfolio of real deliverables.
          </p>
        </section>

        <div ref={contentRef} className="w-full flex flex-col items-center gap-16 opacity-0">
          {/* 3 Phases Grid */}
          <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhaseCard
              step="01"
              title="Foundation"
              href="/foundation"
              desc="All students start here. Master systems, networking, security fundamentals, and Python scripting. Build your first lab environment."
            />
            <PhaseCard
              step="02"
              title="Specialization"
              href="/specialization"
              desc="Choose your track — SOC, VAPT, Cloud Security, or DFIR. Deep dive into real tools and industry scenarios."
              highlight
            />
            <PhaseCard
              step="03"
              title="Career Launch"
              href="/capstone"
              desc="72-hour live-fire capstone, resume optimization, mock interviews, Demo Day with hiring partners, and placement support."
            />
          </section>

          {/* Tracks Section */}
          <section className="w-full mt-12 flex flex-col items-center gap-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Choose Your Path</h2>
              <p className="text-gray-400 uppercase tracking-widest text-sm font-bold">4 Complete Packages</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <TrackCard
                id="soc"
                title="SOC Analyst"
                href="/programs/soc"
                icon={<Shield size={32} className="text-red-500" />}
                bullets={["Threat Hunting", "SIEM (Splunk/Sentinel)", "Incident Response", "Network Traffic Analysis"]}
              />
              <TrackCard
                id="vapt"
                title="VAPT"
                href="/programs/vapt"
                icon={<Crosshair size={32} className="text-red-500" />}
                bullets={["Web App Penetration Testing", "Network Vulnerability Assessment", "Exploit Development", "Report Writing"]}
              />
              <TrackCard
                id="cloud"
                title="Cloud Security"
                href="/programs/cloud-security"
                icon={<Cloud size={32} className="text-red-500" />}
                bullets={["AWS/Azure Security", "IAM Implementation", "Infrastructure as Code", "Cloud Compliance"]}
              />
              <TrackCard
                id="dfir"
                title="DFIR"
                href="/programs/dfir"
                icon={<Terminal size={32} className="text-red-500" />}
                bullets={["Digital Forensics", "Malware Analysis", "Memory Forensics", "Chain of Custody"]}
              />
            </div>
          </section>

          {/* Certification Callout — single banner */}
          <Link
            href="/certifications"
            className="group w-full flex flex-col sm:flex-row items-start sm:items-center gap-5 border-2 border-white/10 hover:border-red-500 bg-white/2 hover:bg-red-500/5 px-6 py-5 transition-all"
          >
            <div className="flex items-center gap-2 shrink-0">
              {["ZSA", "ZPT", "ZCS", "ZDF"].map((code) => (
                <span key={code} className="px-2 py-0.5 border border-red-500/50 text-red-500 text-xs font-black tracking-widest">
                  {code}
                </span>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm uppercase tracking-wide mb-0.5">Zharnyx Certification Authority</p>
              <p className="text-gray-500 text-sm font-sans">Every track is engineered to prepare you for a corresponding hands-on practical certification — no MCQs, ever. Currently in active development.</p>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap">
              Learn More <ArrowRight size={12} />
            </span>
          </Link>

          {/* Standalone Modules */}
          <section className="w-full max-w-4xl p-8 border-2 border-white/20 bg-black/40 relative mt-12">
            <div className="absolute -top-4 left-6 bg-black px-2 text-sm font-bold text-red-500 uppercase tracking-widest">
              Standalone Modules
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Zap className="text-yellow-500" />
                  AI for Cybersecurity
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  Optional standalone course covering AI/ML applications in cybersecurity — threat detection, anomaly analysis, and automated response.<br /><br />
                  Can't commit to the full 7 months? Take individual phases.
                </p>
              </div>
              <div className="shrink-0 flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Available to all students</span>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider border-2 border-white/20 transition-all text-center">
                  Pricing on Request
                </button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="flex flex-col items-center text-center mt-12 space-y-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
              Ready to Choose Your Track?
            </h2>
            <p className="text-gray-400 max-w-xl">
              Enrollment slots are limited per cohort. Apply now to secure your spot.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/pricing"
                className="group relative px-10 py-4 bg-red-600 text-white font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[6px_6px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
              >
                Enroll Now
              </Link>
              <Link
                href="/curriculum"
                className="px-10 py-4 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                Full Curriculum
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

function PhaseCard({ step, title, desc, highlight, href }: { step: string; title: string; desc: string; highlight?: boolean; href?: string }) {
  const inner = (
    <div className={`p-6 border-2 flex flex-col gap-4 transition-colors h-full ${highlight ? 'border-red-600 bg-red-600/5' : 'border-white/20 bg-black/40 hover:border-white/40'}`}>
      <span className={`text-5xl font-black opacity-20 ${highlight ? 'text-red-500' : 'text-white'}`}>{step}</span>
      <h3 className="text-2xl font-bold uppercase tracking-wide text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      {href && <span className="text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors mt-auto pt-2 flex items-center gap-1">Learn more →</span>}
    </div>
  );
  if (href) {
    return (
      <Link href={href} className="group block">
        {inner}
      </Link>
    );
  }
  return inner;
}

function TrackCard({ id, title, icon, bullets, href }: { id: string; title: string; icon: React.ReactNode; bullets: string[]; href: string }) {
  return (
    <div id={id} className="group p-8 border-2 border-white/20 bg-black relative transition-all hover:translate-x-1 hover:-translate-y-1 hover:border-red-500 hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col">
      <div className="mb-6">{icon}</div>
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Foundation + {title} <br /><span className="text-red-500 shrink-0 text-sm tracking-widest">+ Placement</span></h3>
      <ul className="space-y-3 mb-8 flex-1">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
            <Code size={16} className="text-red-600 shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link href={href} className="mt-auto flex items-center justify-between text-white font-bold uppercase tracking-wider text-sm group-hover:text-red-500 transition-colors">
        <span>Explore Track</span>
        <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
  )
}
