"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Shield, Lock, Terminal, ShieldAlert, Cpu, Network, Code, Server, CheckSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(SplitText);

export default function FoundationPage() {
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
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        }, "-=0.6")
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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-20">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <div ref={badgeRef} className="translate-y-5 flex items-center gap-2 px-4 py-1 bg-white text-black font-bold uppercase tracking-widest text-xs border-2 border-white shadow-[4px_4px_0px_0px_red]">
            <Lock size={14} strokeWidth={3} />
            <span>PHASE 1 · ALL STUDENTS REQUIRED</span>
          </div>

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Foundation <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Phase</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            3 Months · Weeks 1–12 · Build your cybersecurity fundamentals from the ground up with hands-on labs every single week.
          </p>

          {/* Curriculum Grid */}
          <section className="w-full flex flex-col gap-16">

            {/* Month 1 */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M1</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Systems, OS & Virtualization</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 1 - 4</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard
                  icon={<Terminal className="text-red-500" size={24} />}
                  title="Linux Fundamentals & CLI Mastery"
                  desc="File system, permissions, bash scripting, cron jobs"
                />
                <ModuleCard
                  icon={<Server className="text-red-500" size={24} />}
                  title="Windows Admin & Active Directory"
                  desc="PowerShell, Event Viewer, Group Policy, domain basics"
                />
                <ModuleCard
                  icon={<ShieldAlert className="text-red-500" size={24} />}
                  title="OS Hardening & Posture"
                  desc="Securing Linux & Windows servers, CIS Benchmarks"
                />
                <ModuleCard
                  icon={<Cpu className="text-red-500" size={24} />}
                  title="Virtualization & Containers"
                  desc="Docker basics, hypervisor setup, lab infrastructure"
                />
              </div>
            </div>

            {/* Month 2 */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M2</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Networking, TCP/IP & Traffic Analysis</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 5 - 8</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard
                  icon={<Network className="text-red-500" size={24} />}
                  title="Networking Fundamentals & OSI"
                  desc="TCP/IP stack, subnetting, DNS, DHCP, ARP"
                />
                <ModuleCard
                  icon={<Shield className="text-red-500" size={24} />}
                  title="Wireshark & Packet Capture"
                  desc="Display filters, TCP streams, protocol dissection"
                />
                <ModuleCard
                  icon={<Target className="text-red-500" size={24} />}
                  title="Network Scanning & Enumeration"
                  desc="Host discovery, port scanning, service detection, NSE"
                />
                <ModuleCard
                  icon={<Code className="text-red-500" size={24} />}
                  title="Web App Basics & Vulnerabilities"
                  desc="HTTP/HTTPS, OWASP Top 10 intro, DVWA labs"
                />
              </div>
            </div>

            {/* Month 3 */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M3</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Security Frameworks, Python & Capstone</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 9 - 12</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard
                  icon={<CheckSquare className="text-red-500" size={24} />}
                  title="Cybersecurity Frameworks"
                  desc="NIST CSF, MITRE ATT&CK, Cyber Kill Chain"
                />
                <ModuleCard
                  icon={<Code className="text-red-500" size={24} />}
                  title="Python for Security"
                  desc="Scripting basics, requests library, building scanners"
                />
                <ModuleCard
                  icon={<Terminal className="text-red-500" size={24} />}
                  title="Python Tools & API Integration"
                  desc="VirusTotal API, log parsers, automated recon scripts"
                />
                <ModuleCard
                  icon={<ShieldAlert className="text-red-500" size={24} />}
                  title="Foundation Capstone Exam"
                  desc="48-Hour Security Audit: scanning, analysis, report writing"
                  highlight
                />
              </div>
            </div>

          </section>

          {/* Deliverables CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Foundation Deliverables</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Foundation is required for all tracks</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/auth?mode=signup"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
              >
                Start Your Journey
              </Link>
              <Link
                href="/programs"
                className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                View All Programs <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ModuleCard({ icon, title, desc, highlight }: { icon: React.ReactNode, title: string, desc: string, highlight?: boolean }) {
  return (
    <div className={`p-6 bg-black border-2 transition-colors flex flex-col gap-3 group ${highlight ? "border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] bg-red-600/5 hover:translate-x-1 hover:-translate-y-1" : "border-white/20 hover:border-white/40"}`}>
      <div className="flex items-start justify-between">
        <div className="p-2 bg-white/5 border border-white/10 inline-block">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-2 leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-sans">{desc}</p>
    </div>
  )
}

// Simple Target Icon
function Target({ className, size }: { className?: string, size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
