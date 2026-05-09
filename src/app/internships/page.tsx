"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

import { ProgramDetailsSection } from "@/components/internships/program-details-section";
import { CourseReminderSection } from "@/components/internships/course-reminder-section";

gsap.registerPlugin(SplitText);

export default function InternshipsPage() {
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
        .to(".cta-buttons", {
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
          <SectionBadge ref={badgeRef} text="Active Enrollments" icon={Terminal} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Pan-India Cybersecurity <br />
            <span className="text-red-500">
              Internships & Courses.
            </span>
          </h1>

          <p className="para opacity-0 translate-y-5 text-lg md:text-xl text-gray-400 font-medium max-w-2xl border-l-4 border-red-600 pl-4 text-left">
            Our Pan-India Internships are officially LIVE. Enrollments for our complete 7-Month Track-Specialised Courses are now open. First cohort begins in May.
          </p>

          <div className="cta-buttons opacity-0 translate-y-5 flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center items-center">
            <Link
              href="#program-details"
              className="group relative flex items-center justify-center h-14 w-full sm:w-auto px-8 bg-red-600 text-black font-black text-sm uppercase tracking-widest border-2 border-red-600 hover:translate-x-[3px] hover:translate-y-[3px] transition-transform"
            >
              <span className="absolute inset-0 bg-white translate-x-[5px] translate-y-[5px] -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform border-2 border-white" />
              <span className="flex items-center gap-2">
                Apply for Internship
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/pricing"
              className="flex items-center justify-center h-14 w-full sm:w-auto px-8 bg-transparent text-white font-black text-sm uppercase tracking-widest border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors"
            >
              Enroll in May Cohort
            </Link>
          </div>
        </section>

        {/* Content Section containing the other blocks */}
        <div ref={contentRef} className="w-full flex flex-col items-center opacity-0 mt-8">


          {/* Block 3: Pan-India Internship Program (3-Column Layout) */}
          <ProgramDetailsSection />

          {/* Block 4: Course Reminder Footer */}
          <CourseReminderSection />
        </div>
      </main>
    </div>
  );
}
