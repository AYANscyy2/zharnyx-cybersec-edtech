"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { ArrowRight, Play, ArrowUpRight, User, ChevronRight } from "lucide-react";
import LightRays from "@/components/LightRays";

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
  const bannerRef  = useRef<HTMLDivElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const tagsRef    = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const cardsRef       = useRef<HTMLDivElement>(null);
  const tickerRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SplitText setup for heading
      const splitHeading = new SplitText(headingRef.current, {
        type: "words",
        wordsClass: "inline-block pb-2",
      });

      const tl = gsap.timeline();

      // Initial state
      gsap.set(splitHeading.words, { yPercent: 100, opacity: 0 });
      gsap.set(bannerRef.current, { opacity: 0, y: -12 });
      gsap.set(avatarsRef.current, { opacity: 0, x: -20 });
      gsap.set(ctaRef.current, { opacity: 0, y: 20 });
      gsap.set(tagsRef.current, { opacity: 0, y: 20 });
      gsap.set(rightColumnRef.current, { opacity: 0, scale: 0.95 });
      if (cardsRef.current) {
        gsap.set(cardsRef.current.children, { opacity: 0, y: 40 });
      }

      // Infinite ticker scroll
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          xPercent: -50,
          duration: 14,
          ease: "none",
          repeat: -1,
        });
      }

      // Progress Counter Animation (0% to 100% over 3.5s)
      const progressProxy = { val: 0 };
      tl.to(progressProxy, {
        val: 100,
        duration: 3.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (progressRef.current) {
            progressRef.current.innerText = Math.round(progressProxy.val).toString().padStart(2, '0') + "%";
          }
        }
      }, 0);

      // --- PART 1: INTRO SEQUENCE ---
      tl.to(ringRef.current, { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" }, 0);
      tl.to(textRef.current, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.5, ease: "expo.out" }, 0);

      // Spin more
      tl.to(ringRef.current, { rotation: 540, duration: 2, ease: "power1.inOut" }, 1.5);
      tl.to(introOverlayRef.current, { scale: 1.05, duration: 2, ease: "power1.inOut" }, 1.5);

      tl.to(introOverlayRef.current, {
        y: "-100vh", opacity: 0, duration: 1.2, ease: "power4.inOut"
      }, 3.5);

      // --- HERO REVEAL ---
      tl.to(splitHeading.words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "power4.out"
      }, 4.0);

      tl.to(bannerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
      }, 4.0);

      tl.to(avatarsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 4.4);

      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 4.6);

      tl.to(tagsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, 4.8);

      tl.to(rightColumnRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, 4.4);

      if (cardsRef.current) {
        gsap.set(cardsRef.current, { opacity: 1 });
        tl.to(cardsRef.current.children, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "linear"
        }, 4.6);
      }

      return () => {
        splitHeading.revert();
      };
    });

    return () => {
      ctx.revert();
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] overflow-hidden flex flex-col justify-center pt-24 pb-12 sm:pt-32 sm:pb-24">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[#000000]">
        <div className="absolute inset-0 opacity-60">
          <LightRays
            raysOrigin="top-center"
            raysColor="#EF0000"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="w-full h-full"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-red-900/5 rounded-full blur-[100px] pointer-events-none"></div>
      </div>



      {/* --- INTRO OVERLAY --- */}
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
        <div
          ref={progressRef}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-white font-mono text-sm md:text-base tracking-widest font-bold opacity-80"
        >
          00%
        </div>
      </div>

      {/* --- MAIN HERO CONTENT --- */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mt-12 md:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 justify-center items-center">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-start gap-8 md:gap-10">

            {/* ── HERO BANNER — scrolling ticker ──────────────── */}
            <Link
              href="/programs/week-0"
              ref={bannerRef as any}
              className="w-full overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-red-600/30 backdrop-blur-sm transition-all group cursor-pointer flex items-center"
              style={{ opacity: 0 }}
            >
              {/* FREE badge — fixed left */}
              <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-[#E60000] border-r border-red-800 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap font-mono">FREE</span>
              </div>

              {/* Scrolling ticker */}
              <div className="overflow-hidden flex-1">
                <div ref={tickerRef} className="flex whitespace-nowrap py-2.5">
                  {Array(2).fill(null).map((_, i) => (
                    <span key={i} className="inline-flex items-center gap-10 px-8 text-[11px] font-mono font-bold uppercase tracking-widest text-gray-300">
                      <span className="text-white">Week 0 — Free Gateway Course is Now Live</span>
                      <span className="text-[#E60000]">◆</span>
                      <span>Start Your Cybersecurity Journey at Zero Cost</span>
                      <span className="text-[#E60000]">◆</span>
                      <span>No Prerequisites · No Payment · Just Skills</span>
                      <span className="text-[#E60000]">◆</span>
                      <span>Explore the Curriculum Now</span>
                      <span className="text-[#E60000]">◆</span>
                      <span>Linux · Networking · Threat Basics · CTF Intro</span>
                      <span className="text-[#E60000]">◆</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow — fixed right */}
              <div className="shrink-0 flex items-center gap-1 px-4 py-2.5 text-[#E60000] group-hover:text-white transition-colors border-l border-white/10">
                <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tighter text-white leading-[1.05] uppercase"
            >
              WHERE SERIOUS<br />
              <span className="text-[#E60000]">CYBERSECURITY</span><br />
              CAREERS BEGIN
            </h1>

            <div ref={avatarsRef} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border-2 border-black z-30 flex items-center justify-center overflow-hidden">
                  <User className="text-gray-400 w-6 h-6" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 border-2 border-black z-20 flex items-center justify-center overflow-hidden">
                  <User className="text-gray-400 w-6 h-6" />
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-600 border-2 border-black z-10 flex items-center justify-center overflow-hidden">
                  <User className="text-gray-300 w-6 h-6" />
                </div>
              </div>
              <span className="text-white text-lg sm:text-2xl font-bold tracking-widest uppercase">PROFESSIONALS</span>
            </div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6 mt-2">
              <Link 
                href="/programs" 
                className="group flex items-center justify-between w-full sm:w-auto sm:min-w-[220px] h-14 sm:h-16 rounded-full border border-white/20 bg-transparent pl-6 sm:pl-8 pr-2 hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium text-sm sm:text-base tracking-wide mr-4">View Blueprint</span>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#E60000] group-hover:text-white transition-colors shrink-0">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link 
                href="/pricing" 
                className="group flex items-center justify-center w-full sm:w-auto h-14 sm:h-16 px-8 rounded-full bg-[#E60000] hover:bg-red-700 text-white transition-colors"
              >
                <span className="font-medium text-sm sm:text-base tracking-wide">Get Started</span>
              </Link>

              {/* <button className="flex items-center gap-4 group mt-2 sm:mt-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-[#E60000] group-hover:text-white transition-colors shrink-0">
                  <Play size={20} fill="currentColor" className="ml-1" />
                </div>
                <span className="text-white text-xs sm:text-sm font-medium text-left leading-snug whitespace-nowrap">
                  Watch<br/>Introduction
                </span>
              </button> */}
            </div>

            <div ref={tagsRef} className="flex flex-wrap gap-3 mt-2">
              {['SOC Analysis', 'VAPT', 'DFIR', 'Cloud Security'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] sm:text-xs text-gray-300 font-medium uppercase tracking-wider hover:border-white/30 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div ref={rightColumnRef} className="relative w-full flex items-center justify-center lg:justify-center mt-8 lg:mt-0 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Hero Illustration */}
            <img
              src="https://ik.imagekit.io/modelia123aistudio/zharnyx_cybersecurity_hero.svg?updatedAt=1779483085596"
              alt="Zharnyx Cybersecurity Hero"
              className="relative z-10 w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-auto object-contain pointer-events-none drop-shadow-2xl"
              style={{ clipPath: 'polygon(0 40px, 40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)' }}
            />
          </div>

        </div>

        {/* BOTTOM CARDS ROW */}
        <div ref={cardsRef} className="grid grid-cols-1 opacity-0 md:grid-cols-3 gap-6 mt-16 lg:mt-20 relative z-20">
          
          {/* Card 1 - Red */}
          <div 
            className="bg-[#E60000] card p-6 sm:p-8 min-h-[200px] flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-300 cursor-pointer" 
            style={{ clipPath: 'polygon(0 0, 65% 0, 75% 24px, 100% 24px, 100% 100%, 0 100%)', borderRadius: '16px' }}
          >
            <div>
              <span className="text-white/50 font-mono text-[10px] sm:text-xs tracking-widest uppercase block mb-4">[ 01 ] PROGRAM</span>
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-wide leading-snug pr-4">
                A Curriculum Built Around Real Roles
              </h3>
            </div>
            <div className="mt-8">
              <span className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wider block">
                EMPLOYMENT ASSISTANCE
              </span>
            </div>
          </div>

          {/* Card 2 - Light Grey */}
          <div 
            className="bg-[#E5E5E5] card p-6 sm:p-8 min-h-[200px] flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-300 cursor-pointer" 
            style={{ clipPath: 'polygon(0 0, 60% 0, 70% 24px, 100% 24px, 100% 100%, 0 100%)', borderRadius: '16px' }}
          >
            <ArrowUpRight size={24} className="absolute top-8 right-6 text-black opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            <div>
              <span className="text-black/60 font-mono text-[10px] sm:text-xs tracking-widest uppercase block mb-4">[ 02 ] DEEP DIVE</span>
              <h3 className="text-black text-lg sm:text-xl font-bold tracking-wide leading-snug pr-12">
                Specialize Deep.<br/>Stand Out Completely.
              </h3>
            </div>
            <div className="text-black text-4xl sm:text-6xl font-black mt-6 opacity-30 group-hover:opacity-100 transition-opacity">
              *
            </div>
          </div>

          {/* Card 3 - Red Variant */}
          <div 
            className="bg-[#E60000] card p-6 sm:p-8 min-h-[200px] flex flex-col justify-between relative group hover:-translate-y-2 transition-transform duration-300 cursor-pointer" 
            style={{ clipPath: 'polygon(0 0, 60% 0, 70% 24px, 100% 24px, 100% 100%, 0 100%)', borderRadius: '16px' }}
          >
            <ArrowUpRight size={24} className="absolute top-8 right-6 text-white opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            <div>
              <span className="text-white/50 font-mono text-[10px] sm:text-xs tracking-widest uppercase block mb-4">[ 03 ] OUTCOME</span>
              <h3 className="text-white text-lg sm:text-xl font-bold tracking-wide leading-snug pr-12">
                We Stay With You Until You're Hired.
              </h3>
            </div>
            <div className="text-white text-4xl sm:text-6xl font-black mt-6">
              100%
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}