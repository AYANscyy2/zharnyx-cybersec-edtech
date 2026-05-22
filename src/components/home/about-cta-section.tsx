"use client";

import { useEffect, useRef } from "react";
import { Shield, Target, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

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
      gsap.set([labelRef.current, ".feature-col", ".cta-sub", ".cta-btn", ".cta-meta"], { opacity: 0, y: 30 });
      gsap.set(splitHeading.words, { yPercent: 100, opacity: 0 });
      gsap.set(splitCta.words, { yPercent: 100, opacity: 0 });
      gsap.set(splitQuote.lines, { yPercent: 100, opacity: 0 });
      gsap.set(".quote-border", { scaleY: 0, transformOrigin: "top" });

      // Section 1: Who We Are
      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        animation: gsap.timeline()
          .to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
          .to(splitHeading.words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out" }, "-=0.4")
          .to(".feature-col", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.4")
          .to(".quote-border", { scaleY: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.2")
          .to(splitQuote.lines, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.6")
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
    <section ref={containerRef} className="py-32 relative bg-[#000000] border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* --- PART 1: ABOUT ZHARNYX --- */}
        <div className="mb-32">

          <div ref={labelRef} className="mb-8">
            <span className="text-[#E60000] font-mono text-sm tracking-[0.2em] uppercase font-bold">
              [ Who We Are ]
            </span>
          </div>

          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-24 max-w-4xl leading-[1.1] text-balance"
          >
            Built by engineers, <br />
            <span className="text-[#E60000]">Not Academics.</span>
          </h2>

          {/* 3 Column Features (Athletic Corporate Style) */}
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 mb-32">
            <FeatureColumn
              icon={<Shield size={32} strokeWidth={1.5} className="text-white" />}
              title="Built by Practitioners"
              description="Founded by working security engineers who understand real-world demands and actively deploy architectures."
            />
            <FeatureColumn
              icon={<Target size={32} strokeWidth={1.5} className="text-[#E60000]" />}
              title="Fixing Broken Pipelines"
              description="Designed specifically to address the massive gap between academic knowledge and actual job readiness."
            />
            <FeatureColumn
              icon={<Building2 size={32} strokeWidth={1.5} className="text-white" />}
              title="Company, Not Classroom"
              description="Structured exactly like a security organization. You operate as an analyst, not a student."
            />
          </div>

          {/* Manifesto Quote Box */}
          <div className="relative pl-8 md:pl-12 py-4 max-w-5xl">
            <div className="quote-border absolute top-0 left-0 w-[3px] h-full bg-[#E60000]" />
            <p ref={quoteRef} className="text-gray-300 text-xl md:text-3xl font-medium leading-[1.6] tracking-wide text-balance">
              "We don't believe in mass-produced graduates. We believe in
              engineers who can walk into a SOC, a red team engagement, or a
              security architecture discussion — and deliver from day one. <br className="hidden md:block" /><br className="hidden md:block" /><span className="text-white font-black uppercase tracking-widest text-lg md:text-2xl block mt-4">Zharnyx is not education. Zharnyx is preparation.</span>"
            </p>
          </div>
        </div>

        {/* --- PART 2: FINAL CTA --- */}
        <div className="pt-32 border-t border-white/10 flex flex-col items-center text-center">
          <h2
            ref={ctaHeadingRef}
            className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[1.1] mb-8 text-balance max-w-4xl"
          >
            If You're Serious About <br />
            <span className="text-[#E60000]">
              Cybersecurity.
            </span>
          </h2>

          <p
            className="cta-sub text-gray-400 font-mono text-sm md:text-base mb-12 tracking-widest uppercase"
          >
            This residency is selective. Not everyone gets in.
          </p>

          <div className="cta-btn w-full sm:w-auto">
            <Link
              href="/apply"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto h-16 px-12 bg-[#E60000] text-white font-black text-sm uppercase tracking-widest hover:-translate-y-1 hover:shadow-[0_10px_0_0_#ffffff] transition-all rounded-none"
            >
              Apply Now <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div
            className="cta-meta flex flex-wrap justify-center gap-8 mt-16 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest"
          >
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-none" /> Limited
              seats per cohort
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#E60000] rounded-none" /> Next
              cohort starting soon
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

function FeatureColumn({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="feature-col flex flex-col gap-5 border-t border-white/10 pt-8 items-start text-left">
      <div className="mb-2">
        {icon}
      </div>
      <h3 className="text-white text-lg md:text-xl font-black tracking-widest uppercase leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium tracking-wide">
        {description}
      </p>
    </div>
  );
}
