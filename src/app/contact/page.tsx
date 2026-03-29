"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Send } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import { ContactForm } from "@/components/contact/contact-form";

gsap.registerPlugin(SplitText);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      // Split heading into lines and words
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      // Set overflow hidden on line-masks
      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: everything hidden
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      // 1. Badge appears
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
        }, "-=0.6")
        .to(".para", {
          opacity: 1,
          duration: 0.6,
        }, "-=0.6")
        // 3. Reveal the rest of the content
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

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-16">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="Establishing Direct Uplink" icon={Send} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Connect With Our <br />
            <span className="text-red-500">
              Tactical Command
            </span>
          </h1>

          <p className="para opacity-0 translate-y-5 text-gray-400 max-w-2xl mx-auto text-sm md:text-base border-l-2 border-red-600 pl-4 py-1">
            Our operators are standing by to assist with deployment inquiries,
            partnership proposals, and general reconnaissance.
          </p>
        </section>

        <div ref={contentRef} className="w-full opacity-0">
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
