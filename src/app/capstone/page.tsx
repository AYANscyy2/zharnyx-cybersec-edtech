"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Shield, Crosshair, Cloud, Search, ArrowRight, Zap, Target, BookOpen, AlertOctagon } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

export default function CapstonePage() {
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

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-24">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="WEEK 25 · CAPSTONE SIMULATION" icon={Zap} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            72-Hour <span className="text-red-500">Live-Fire</span> Exercise
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-24 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            The ultimate test. All four tracks come together in a real-time, cross-team cybersecurity simulation. SOC defends. VAPT attacks. Cloud secures. DFIR investigates.
          </p>

          {/* The Simulation Grid */}
          <section className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

              {/* SOC */}
              <div className="bg-[#050505] border-2 border-white/20 p-8 flex flex-col gap-6 hover:border-blue-500 transition-colors group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield size={200} className="text-blue-500" />
                </div>
                <div className="flex items-center justify-between z-10">
                  <div className="p-3 border-2 border-blue-500 bg-blue-500/10 text-blue-500">
                    <Shield size={24} />
                  </div>
                  <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Defenders</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white z-10">SOC Students</h3>
                <p className="text-gray-400 leading-relaxed z-10">
                  Defend a live corporate network. Monitor SIEM alerts, triage threats, coordinate incident response in real-time.
                </p>
              </div>

              {/* VAPT */}
              <div className="bg-[#050505] border-2 border-white/20 p-8 flex flex-col gap-6 hover:border-red-500 transition-colors group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Crosshair size={200} className="text-red-500" />
                </div>
                <div className="flex items-center justify-between z-10">
                  <div className="p-3 border-2 border-red-500 bg-red-500/10 text-red-500">
                    <Crosshair size={24} />
                  </div>
                  <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Attackers</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white z-10">VAPT Students</h3>
                <p className="text-gray-400 leading-relaxed z-10">
                  Attack the SOC-defended network. Find vulnerabilities, exploit them, and document findings in a professional report.
                </p>
              </div>

              {/* Cloud */}
              <div className="bg-[#050505] border-2 border-white/20 p-8 flex flex-col gap-6 hover:border-sky-400 transition-colors group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Cloud size={200} className="text-sky-400" />
                </div>
                <div className="flex items-center justify-between z-10">
                  <div className="p-3 border-2 border-sky-400 bg-sky-400/10 text-sky-400">
                    <Cloud size={24} />
                  </div>
                  <span className="text-sky-400 font-bold uppercase tracking-widest text-sm">Architects</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white z-10">Cloud Students</h3>
                <p className="text-gray-400 leading-relaxed z-10">
                  Secure the Azure/AWS infrastructure. Configure firewalls, manage IAM roles, and detect misconfigurations during the assault.
                </p>
              </div>

              {/* DFIR */}
              <div className="bg-[#050505] border-2 border-white/20 p-8 flex flex-col gap-6 hover:border-purple-500 transition-colors group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Search size={200} className="text-purple-500" />
                </div>
                <div className="flex items-center justify-between z-10">
                  <div className="p-3 border-2 border-purple-500 bg-purple-500/10 text-purple-500">
                    <Search size={24} />
                  </div>
                  <span className="text-purple-500 font-bold uppercase tracking-widest text-sm">Investigators</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white z-10">DFIR Students</h3>
                <p className="text-gray-400 leading-relaxed z-10">
                  Analyze the aftermath. Perform memory forensics, trace attacker movement, and build a comprehensive timeline of the breach.
                </p>
              </div>

            </div>
          </section>

          {/* Portfolio Outputs */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <BookOpen className="text-red-500" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Portfolio Outputs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Full Executive Pentest Report", "Incident Timeline & Indicators", "SIEM Architecture Diagram", "Cloud Compliance Review"].map((doc, i) => (
                <div key={i} className="py-6 px-4 border-2 border-white/10 flex flex-col items-center justify-center text-center bg-white/5 hover:bg-white/10 hover:border-red-500 transition-colors group gap-3">
                  <Target size={24} className="text-gray-500 group-hover:text-red-500 transition-colors" />
                  <span className="font-bold uppercase tracking-widest text-sm text-gray-300 group-hover:text-white transition-colors">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">Ready for the Challenge?</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Prove your skills in a simulated enterprise environment and graduate with real-world experience.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/pricing"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] flex items-center justify-center gap-3"
              >
                Enroll Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
