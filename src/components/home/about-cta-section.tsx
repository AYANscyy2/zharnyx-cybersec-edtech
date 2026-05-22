"use client";

import { useEffect, useRef } from "react";
import { Shield, Target, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export function AboutCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const ctaHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize SplitText
      const splitHeading = new SplitText(headingRef.current, { type: "words,lines", linesClass: "overflow-hidden pb-2" });
      const splitCta = new SplitText(ctaHeadingRef.current, { type: "words,lines", linesClass: "overflow-hidden pb-2" });
      const splitQuote = new SplitText(quoteRef.current, { type: "lines", linesClass: "overflow-hidden" });

      // Initial States
      gsap.set([labelRef.current, ".feature-col-wrapper", ".cta-sub", ".cta-btn", ".cta-meta", ".manifesto-box"], { opacity: 0, y: 30 });
      gsap.set(splitHeading.words, { yPercent: 100, opacity: 0 });
      gsap.set(splitCta.words, { yPercent: 100, opacity: 0 });
      gsap.set(splitQuote.lines, { yPercent: 100, opacity: 0 });
      gsap.set(".header-border", { scaleY: 0, transformOrigin: "top" });

      // Section 1: Who We Are
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        animation: gsap.timeline()
          .to(".header-border", { scaleY: 1, duration: 0.8, ease: "power3.inOut" })
          .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
          .to(splitHeading.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }, "-=0.4")
          .to(".manifesto-box", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .to(splitQuote.lines, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
          .to(".feature-col-wrapper", { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4")
      });

      // Section 2: Final CTA
      ScrollTrigger.create({
        trigger: ctaHeadingRef.current,
        start: "top 80%",
        animation: gsap.timeline()
          .to(splitCta.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" })
          .to(".cta-sub", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .to(".cta-btn", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
          .to(".cta-meta", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      });

      return () => {
        splitHeading.revert();
        splitCta.revert();
        splitQuote.revert();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* --- PART 1: ABOUT ZHARNYX --- */}
        <div>

          {/* Header Block with Red Line */}
          <div className="relative pl-6 md:pl-8 mb-16">
            <div className="header-border absolute top-0 left-0 w-[3px] h-full bg-[#E60000]" />
            
            <div ref={labelRef} className="mb-6">
              <span className="text-[#E60000] text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono font-bold bg-[#E60000]/10 px-3 py-1.5 border border-[#E60000]/20 rounded-sm inline-block">
                [ Who We Are ]
              </span>
            </div>

            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.05] uppercase"
            >
              Built by engineers, <br />
              <span className="text-[#E60000]">not academics.</span>
            </h2>
          </div>

          {/* Manifesto Box */}
          <div className="manifesto-box relative bg-zinc-900/40 border border-white/5 p-8 md:p-16 mb-24 rounded-3xl overflow-hidden group hover:border-[#E60000]/20 transition-colors duration-500">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden group-hover:opacity-[0.05] transition-opacity duration-500">
              <span className="text-[6rem] md:text-[12rem] font-black text-white whitespace-nowrap leading-none tracking-tighter">
                MANIFESTO
              </span>
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <p ref={quoteRef} className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed tracking-wide italic mb-8">
                "We don't believe in mass-produced graduates. We believe in engineers who can walk into a SOC, a red team engagement, or a security architecture discussion — and deliver from day one."
              </p>
              <div className="text-white font-black tracking-tight text-xl md:text-2xl uppercase">
                <span className="text-[#E60000]">Zharnyx is not education.</span> Zharnyx is preparation.
              </div>
            </div>
          </div>

          {/* 3 Column Features (Horizontal Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            <FeatureColumn
              icon={<Shield size={28} strokeWidth={2} className="text-[#E60000]" />}
              title="Built by Practitioners"
              description="Founded by working security engineers who understand real-world demands and actively deploy architectures."
            />
            <FeatureColumn
              icon={<Target size={28} strokeWidth={2} className="text-[#E60000]" />}
              title="Fixing Broken Pipelines"
              description="Designed specifically to address the massive gap between academic knowledge and actual job readiness."
            />
            <FeatureColumn
              icon={<Building2 size={28} strokeWidth={2} className="text-[#E60000]" />}
              title="Company, Not Classroom"
              description="Structured exactly like a security organization. You operate as an analyst, not a student."
            />
          </div>
        </div>

        {/* --- PART 2: FINAL CTA --- */}
        {/* <div className="pt-32 border-t border-white/10 flex flex-col items-center text-center">
          <h2
            ref={ctaHeadingRef}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 text-balance max-w-4xl"
          >
            If You're Serious About <br />
            <span className="text-[#E60000]">
              Cybersecurity.
            </span>
          </h2>

          <p
            className="cta-sub text-gray-400 text-sm md:text-base mb-12 tracking-wide font-medium"
          >
            This residency is selective. Not everyone gets in.
          </p>

          <div className="cta-btn w-full sm:w-auto">
            <Link
              href="/apply"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto h-16 px-12 bg-[#E60000] text-white font-bold text-base tracking-wide hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(230,0,0,0.4)] transition-all rounded-full"
            >
              Apply Now <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div
            className="cta-meta flex flex-wrap justify-center gap-8 mt-16 text-xs text-gray-500 font-medium tracking-wide"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full" /> Limited
              seats per cohort
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E60000] rounded-full" /> Next
              cohort starting soon
            </span>
          </div>
        </div> */}

      </div>
    </section>
  );
}

function FeatureColumn({
  icon,
  title,
  description,
  className
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("feature-col-wrapper opacity-0 translate-y-16", className)}>
      <div className="group flex flex-col items-start text-left bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:border-[#E60000] transition-all duration-300 hover:shadow-[8px_8px_0px_0px_#E60000] hover:-translate-x-2 hover:-translate-y-2 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Top Header Row of Card */}
        <div className="w-full flex justify-between items-start mb-8 relative z-10">
          <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-500 shrink-0">
            <div className="absolute inset-0 bg-[#E60000] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
            <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:border-[#E60000]/30 transition-colors duration-500"></div>
            <div className="relative z-10 group-hover:drop-shadow-[0_0_15px_rgba(230,0,0,0.8)] transition-all duration-500">{icon}</div>
          </div>

          {/* Status Pill */}
          {/* <div className="flex items-center gap-2 mt-1 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E60000] animate-pulse"></div>
            <span className="text-[#E60000] text-[10px] font-mono font-bold tracking-widest uppercase">
              Status: Active
            </span>
          </div> */}
        </div>
        
        <h3 className="text-white text-lg font-black uppercase tracking-tight mb-3 group-hover:text-[#E60000] transition-colors duration-500 relative z-10">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed font-medium relative z-10">
          {description}
        </p>
      </div>
    </div>
  );
}
