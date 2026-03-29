"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { ArrowRight, Shield, Terminal, Crosshair } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

interface HeroSectionProps {
  course?: {
    months: any[];
    level: string;
    price: number | null;
  };
}

export function HeroSection({ course }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headline1Ref = useRef<HTMLSpanElement>(null);
  const headline2Ref = useRef<HTMLSpanElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const redLineRef = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split headlines by words + lines (lines give us the overflow mask container)
      const split1 = new SplitText(headline1Ref.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });
      const split2 = new SplitText(headline2Ref.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      // Split subtext by lines only
      const splitSub = new SplitText(subtextRef.current, {
        type: "lines",
        linesClass: "line-mask",
      });

      // All line-mask elements get overflow hidden so words clip inside
      gsap.set([...split1.lines, ...split2.lines, ...splitSub.lines], {
        overflow: "hidden",
        display: "block",
      });

      // Red line starts at width 0
      gsap.set(redLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Master timeline
      const tl = gsap.timeline();

      // 1. Badge
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 18,
        duration: 1,
        delay: 1,
      })

        // 2. Headline 1 — words punch up through line masks
        .from(
          split1.words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.9,
            stagger: 0.2,
          },
          "-=0.5"
        )

        // 3. Headline 2 — same, overlaps
        .from(
          split2.words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.7"
        )

        // 4. Subtext lines rise up
        .from(
          splitSub.lines,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.13,
          },
          "-=0.55"
        )

        // 5. Red underline draws left → right immediately after subtext
        .to(
          redLineRef.current,
          {
            scaleX: 1,
            duration: 1
          },
          "-=0.6"
        )

        // 6. Tags
        .from(
          tagsRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.9
          },
          "-=0.6"
        )
        .to(".button", {
          opacity: 1,
          y: 0,
          duration: 0.9
        }, "-=0.9")

      // 7. CTA buttons — stagger each child


      return () => {
        split1.revert();
        split2.revert();
        splitSub.revert();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-36 pb-10"
    >
      {/* Background noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-8">
        {/* Badge */}
        <SectionBadge ref={badgeRef} text="Zharnyx // Cyber-EdTech" icon={Terminal} />

        {/* Hero Content */}
        <div className="flex flex-col items-center text-center max-w-5xl space-y-6">

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.15] uppercase flex flex-col items-center gap-1 w-full">
            <span ref={headline1Ref} className="block w-full">
              From Student to
            </span>
            <span
              ref={headline2Ref}
              className="block w-full text-red-500"
            >
              Security Consultant
            </span>
          </h1>

          {/* Subtext with animated red underline */}
          <div className="relative w-full flex flex-col items-center">
            <p
              ref={subtextRef}
              className="text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl font-medium text-center pb-4"
            >
              A 6-month career residency producing{" "}
              <span className="bg-white text-black px-1">Day-1-ready engineers</span>{" "}
              via live war games &amp; SOC operations.
            </p>
            {/* Animated red underline — draws left to right */}
            <span
              ref={redLineRef}
              className="block h-[3px] w-full max-w-2xl bg-red-600 origin-left"
            />
          </div>

          {/* Tags */}
          <div
            ref={tagsRef}
            className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-red-500"
          >
            <span className="flex items-center gap-1">
              <Crosshair size={12} /> Live Operations
            </span>
            <span className="text-gray-600">/</span>
            <span className="flex items-center gap-1">
              <Shield size={12} /> Client Deployments
            </span>
          </div>

          {/* CTA Buttons — both same height via h-14 */}
          <div
            ref={ctaRef}
            className="flex button translate-y-5 opacity-0 flex-col sm:flex-row gap-4 mt-6 w-full justify-center items-center"
          >
            <Link
              href="/#master-plan"
              className="group  relative flex items-center justify-center h-14 px-8 bg-red-600 text-black font-bold text-sm uppercase tracking-wider border-2 border-red-600 hover:translate-x-[3px] hover:translate-y-[3px] transition-transform w-full sm:w-auto"
            >
              {/* brutalist shadow block */}
              <span className="absolute inset-0 bg-white translate-x-[5px] translate-y-[5px] -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform border-2 border-white" />
              <span className="flex items-center gap-2">
                View Blueprint
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/auth?mode=signup"
              className=" group   flex items-center justify-center h-14 px-8 bg-transparent text-white font-bold text-sm uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-colors w-full sm:w-auto"
            >
              Get Started
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}