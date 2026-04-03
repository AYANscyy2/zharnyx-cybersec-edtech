"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  Shield,
  Crosshair,
  Cloud,
  Search,
  ArrowRight,
  Layers,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const TRACKS = [
  {
    icon: Shield,
    color: "blue",
    colorClasses: {
      border: "border-blue-500",
      text: "text-blue-500",
      bg: "bg-blue-500/10",
      hover: "hover:border-blue-500",
    },
    label: "Defenders",
    title: "SOC Analyst",
    code: "SOC",
    href: "/programs/soc",
    months: "Months 4–6",
    desc: "Become the first line of defence. Master SIEM platforms (Splunk & Sentinel), threat hunting, MITRE ATT&CK mapping, and lead real-time incident response operations.",
    skills: ["Splunk & Microsoft Sentinel", "Threat Hunting & MITRE ATT&CK", "Incident Response Lifecycle", "SOC Operations & Playbooks"],
  },
  {
    icon: Crosshair,
    color: "red",
    colorClasses: {
      border: "border-red-500",
      text: "text-red-500",
      bg: "bg-red-500/10",
      hover: "hover:border-red-500",
    },
    label: "Attackers",
    title: "Offensive Security (VAPT)",
    code: "VAPT",
    href: "/programs/vapt",
    months: "Months 4–6",
    desc: "Think like an adversary. Master web app penetration testing, Active Directory attacks, red team operations, and deliver professional-grade VAPT reports.",
    skills: ["Web App & API Pentesting", "Active Directory Exploitation", "Red Team Operations", "Bug Bounty Methodology"],
  },
  {
    icon: Cloud,
    color: "sky",
    colorClasses: {
      border: "border-sky-400",
      text: "text-sky-400",
      bg: "bg-sky-400/10",
      hover: "hover:border-sky-400",
    },
    label: "Architects",
    title: "Cloud Security",
    code: "CLOUD",
    href: "/programs/cloud-security",
    months: "Months 4–6",
    desc: "Secure modern cloud infrastructure. Master AWS/Azure security, IAM design, Kubernetes hardening, DevSecOps pipelines, and cloud compliance frameworks.",
    skills: ["AWS & Azure Security", "IAM & Zero Trust", "Container & K8s Security", "Infrastructure as Code"],
  },
  {
    icon: Search,
    color: "purple",
    colorClasses: {
      border: "border-purple-500",
      text: "text-purple-500",
      bg: "bg-purple-500/10",
      hover: "hover:border-purple-500",
    },
    label: "Investigators",
    title: "Digital Forensics & IR",
    code: "DFIR",
    href: "/programs/dfir",
    months: "Months 4–6",
    desc: "Follow the evidence. Master disk and memory forensics, malware analysis, incident reconstruction, and produce court-admissible investigation reports.",
    skills: ["Disk & Memory Forensics", "Malware Analysis & Triage", "Network Forensics (PCAP)", "Forensic Report Writing"],
  },
];

export default function SpecializationPage() {
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
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.8 })
        .from(split.words, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.2 }, "-=0.6")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-20">

        {/* Header */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="PHASE 2 · MONTHS 4–6" icon={Layers} />
          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Choose Your <span className="text-red-500">Specialization</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">

          {/* Intro strip */}
          <div className="w-full flex flex-col md:flex-row gap-8 items-start">
            <p className="flex-1 text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left">
              Phase 2 is where your career direction is decided. After completing the 3-month Foundation, you choose one of four elite specialization tracks and spend Months 4–6 going deep.
            </p>
            <div className="shrink-0 flex flex-col gap-3 text-sm text-gray-500 font-mono">
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Prerequisite: Foundation complete</span>
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Duration: 3 months (12 weeks)</span>
              <span className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Ends with a live-fire track capstone</span>
            </div>
          </div>

          {/* 4 Track Cards */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            {TRACKS.map((track) => {
              const Icon = track.icon;
              return (
                <div
                  key={track.code}
                  className={`group bg-[#050505] border-2 border-white/20 ${track.colorClasses.hover} transition-colors p-8 flex flex-col gap-6 relative overflow-hidden`}
                >
                  {/* Ghost icon watermark */}
                  <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <Icon size={180} />
                  </div>

                  {/* Top row */}
                  <div className="flex items-center justify-between z-10">
                    <div className={`p-3 border-2 ${track.colorClasses.border} ${track.colorClasses.bg} ${track.colorClasses.text}`}>
                      <Icon size={24} />
                    </div>
                    <span className={`font-bold uppercase tracking-widest text-xs ${track.colorClasses.text}`}>
                      {track.label}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="z-10">
                    <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-1">{track.months}</p>
                    <h2 className="text-2xl md:text-3xl font-black uppercase text-white leading-tight">{track.title}</h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed z-10 font-sans">{track.desc}</p>

                  {/* Skills list */}
                  <ul className="flex flex-col gap-2 z-10">
                    {track.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="text-red-500 font-bold">›</span>
                        {skill}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={track.href}
                    className={`mt-auto flex items-center justify-between font-bold uppercase tracking-wider text-sm text-gray-500 group-hover:${track.colorClasses.text} transition-colors z-10`}
                  >
                    <span>Explore {track.code} Track</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </section>

          {/* How to choose */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <Layers className="text-red-500" size={28} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">How to Choose Your Track</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "Want to protect?", a: "SOC Analyst — monitor, detect, and respond to threats in real enterprise environments.", color: "border-blue-500/40" },
                { q: "Want to attack?", a: "VAPT — ethically hack web apps, networks, and corporate AD forests for money.", color: "border-red-500/40" },
                { q: "Love infrastructure?", a: "Cloud Security — own the modern attack surface. AWS, Azure, containers, DevSecOps.", color: "border-sky-400/40" },
                { q: "Follow the evidence?", a: "DFIR — investigate breaches, analyze malware, and reconstruct what the attacker did.", color: "border-purple-500/40" },
              ].map(({ q, a, color }) => (
                <div key={q} className={`p-6 bg-black border-2 ${color} flex flex-col gap-3`}>
                  <p className="text-white font-black uppercase tracking-wider text-lg">{q}</p>
                  <p className="text-gray-400 text-sm leading-relaxed font-sans">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Ready to Specialize?</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Complete Foundation first, then choose your path.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/pricing"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] flex items-center justify-center gap-3"
              >
                Enroll Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/foundation"
                className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                View Foundation <ArrowRight size={18} />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
