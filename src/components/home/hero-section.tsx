"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(SplitText);

interface HeroSectionProps {
  course?: {
    months: any[];
    level: string;
    price: number | null;
  };
}

export function HeroSection({ course }: HeroSectionProps) {
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SplitText setup
      const splitHeading = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "overflow-hidden pb-2",
      });
      const splitSubtext = new SplitText(subtextRef.current, {
        type: "lines",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline();

      // Initial state
      gsap.set(splitHeading.words, { yPercent: 100, opacity: 0 });
      gsap.set(splitSubtext.lines, { yPercent: 100, opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      if (featuresRef.current) {
        gsap.set(featuresRef.current.children, { opacity: 0, y: 20 });
      }

      document.body.style.overflow = "hidden";

      // Progress Counter Animation (0% to 100% over 3.5s)
      const progressProxy = { val: 0 };
      tl.to(progressProxy, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (progressRef.current) {
            // padStart ensures it looks like 00%, 05%, 100% for a cleaner tech vibe
            progressRef.current.innerText = Math.round(progressProxy.val).toString().padStart(2, '0') + "%";
          }
        }
      }, 0);

      // --- PART 1: INTRO SEQUENCE ---
      tl.to(ringRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }, 0);
      tl.to(textRef.current, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.5, ease: "expo.out" }, 0);

      // Spin more (540 degrees = 1.5 turns)
      tl.to(ringRef.current, { rotation: 540, duration: 2, ease: "power1.inOut" }, 1.5);
      tl.to(introOverlayRef.current, { scale: 1.05, duration: 2, ease: "power1.inOut" }, 1.5);

      tl.to(introOverlayRef.current, {
        y: "-100vh", opacity: 0, duration: 1.2, ease: "power4.inOut", onComplete: () => {
          document.body.style.overflow = "auto";
        }
      }, 3.5);

      // --- PART 2: HERO REVEAL ---
      tl.to(splitHeading.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out"
      }, 4.2);

      tl.to(splitSubtext.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, 4.5);

      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 4.8);

      if (featuresRef.current) {
        tl.to(featuresRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, 5.0);
      }

      return () => {
        splitHeading.revert();
        splitSubtext.revert();
      };
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-center pt-24 pb-12 sm:pt-32 sm:pb-24">

      {/* BACKGROUND: ULTRA CLEAN PURE BLACK */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[#000000]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-red-900/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>

      {/* --- INTRO OVERLAY (ABSOLUTE) --- */}
      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#000000] origin-center"
      >
        <div className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96">
          <div
            ref={ringRef}
            className="absolute inset-0 rounded-full border border-red-600/30 scale-75 opacity-0"
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-red-500"></div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-red-500"></div>
            <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-[2px] h-4 bg-red-500"></div>
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-[2px] h-4 bg-red-500"></div>
          </div>

          <div
            ref={textRef}
            className="text-white font-black text-xl sm:text-2xl md:text-4xl tracking-[0.5em] ml-[0.5em] opacity-0 scale-95 blur-md"
          >
            ZHARNYX
          </div>
        </div>

        {/* Loading Progress */}
        <div
          ref={progressRef}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-white font-mono text-sm md:text-base tracking-widest font-bold opacity-80"
        >
          00%
        </div>
      </div>

      {/* --- MAIN HERO CONTENT --- */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center text-center mt-12 md:mt-0">

        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-white leading-[1.15] md:leading-[1.1] max-w-4xl lg:max-w-6xl text-balance"
        >
          Where Serious <span className="text-[#E60000]">Cybersecurity</span> Careers Begin.
        </h1>

        {/* Subtext */}
        <div className="mt-8 md:mt-10 max-w-2xl lg:max-w-3xl">
          <p
            ref={subtextRef}
            className="text-sm sm:text-base md:text-lg text-gray-400 font-medium tracking-wide leading-relaxed text-balance"
          >
            Zharnyx is India's first integrated 4-track cybersecurity institute — built to train, certify, and place the next generation of security professionals.
            <br className="hidden sm:block" />
            <span className="text-white font-bold mt-4 block text-xs sm:text-sm uppercase tracking-widest opacity-80">SOC Analysis · VAPT · DFIR · Cloud Security</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center"
        >
          <Link
            href="/programs"
            className="group relative flex items-center justify-center h-12 sm:h-14 px-8 sm:px-10 bg-[#E60000] text-white font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-red-700 transition-colors w-full sm:w-auto rounded-none"
          >
            <span className="flex items-center gap-2">
              View Blueprint
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/pricing"
            className="group flex items-center justify-center h-12 sm:h-14 px-8 sm:px-10 border border-white/20 bg-transparent text-white font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full sm:w-auto rounded-none"
          >
            Get Started
          </Link>
        </div>

        {/* 3-Column Features */}
        <div
          ref={featuresRef}
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-16 w-full text-left"
        >
          {/* Feature 1 */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
            <span className="text-red-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">[ 01 ]</span>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">A Curriculum Built Around Real Roles</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Every module maps to what employers are actively hiring — SOC Analyst, Penetration Tester, Incident Responder, Cloud Security Engineer. No filler. Pure skill-building.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
            <span className="text-red-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">[ 02 ]</span>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">Specialize Deep. Stand Out Completely.</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Pick one track and master it — SOC, VAPT, DFIR, or Cloud Security. That depth is exactly what makes a Zharnyx Certified graduate different from the rest.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
            <span className="text-red-500 font-mono text-[10px] sm:text-xs tracking-widest uppercase">[ 03 ]</span>
            <h3 className="text-white text-base sm:text-lg font-bold tracking-wide">We Stay With You Until You're Hired.</h3>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Resume prep, mock interviews, referrals to top security firms — Zharnyx Certified professionals get placed across India's fastest-growing cybersecurity sector.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
}