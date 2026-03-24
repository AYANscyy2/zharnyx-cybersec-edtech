"use client";

import { useEffect, useRef } from "react";
import { X, Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

export function WhyZharnyxSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Header animation
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Quote animation
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.65, delay: 0.15, ease: "power3.out" });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Left column stagger
  useEffect(() => {
    const col = leftColRef.current;
    if (!col) return;

    const header = col.querySelector(".col-header") as HTMLElement;
    const items = col.querySelectorAll<HTMLElement>(".compare-item");

    gsap.set([header, ...Array.from(items)], { opacity: 0, x: -40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(header, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.15,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(col);
    return () => observer.disconnect();
  }, []);

  // Right column stagger
  useEffect(() => {
    const col = rightColRef.current;
    if (!col) return;

    const header = col.querySelector(".col-header") as HTMLElement;
    const items = col.querySelectorAll<HTMLElement>(".compare-item");

    gsap.set([header, ...Array.from(items)], { opacity: 0, x: 40 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(header, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" });
          gsap.to(items, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.15,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(col);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-black border-2 border-white shadow-[4px_4px_0px_0px_#333] text-xs font-bold uppercase tracking-widest mb-6">
            <AlertTriangle size={14} strokeWidth={3} className="text-red-600" />
            <span>Problem Statement</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
            <div className="text-gray-500 line-through decoration-red-600 decoration-4">
              Why Courses Fail.
            </div>
            <div className="text-red-500 mt-2">Why Zharnyx Exists.</div>
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Traditional Column */}
          <div ref={leftColRef}>
            <div className="col-header text-center mb-8 p-4 border-2 border-white/20 bg-white/5">
              <h3 className="text-xl font-bold font-mono text-gray-400 uppercase tracking-widest">
                Traditional Courses
              </h3>
            </div>
            <div className="space-y-4">
              <CompareItem isPositive={false} text="Theory-based learning" />
              <CompareItem isPositive={false} text="Certificates as proof" />
              <CompareItem isPositive={false} text="Hope for placement" />
              <CompareItem isPositive={false} text="Self-paced isolation" />
              <CompareItem isPositive={false} text="Generic curriculum" />
            </div>
          </div>

          {/* Zharnyx Column */}
          <div ref={rightColRef} className="relative">
            <div className="col-header text-center mb-8 p-4 bg-red-600 border-2 border-red-600 shadow-[4px_4px_0px_0px_white] relative z-10">
              <h3 className="text-xl font-black font-mono text-black uppercase tracking-widest">
                Zharnyx Residency
              </h3>
            </div>
            <div className="space-y-4 relative z-10">
              <CompareItem isPositive={true} text="Simulation-based operations" />
              <CompareItem isPositive={true} text="Portfolio & verified work" />
              <CompareItem isPositive={true} text="Gatekeeping & deployment tiers" />
              <CompareItem isPositive={true} text="Pressure-tested cohorts" />
              <CompareItem isPositive={true} text="War room missions" />
            </div>
          </div>
        </div>

        {/* Brutalist Quote */}
        <div
          ref={quoteRef}
          className="mt-24 p-8 border-2 border-white text-center max-w-4xl mx-auto shadow-[8px_8px_0px_0px_#ef4444] bg-black hover:-translate-y-1 hover:-translate-x-1 transition-transform group cursor-default"
        >
          <p className="text-xl md:text-3xl text-white font-bold uppercase tracking-tight">
            &ldquo;We don&apos;t teach cybersecurity. <br className="hidden md:block" />
            <span className="text-red-500 bg-white/10 px-2">
              We operationalize it.
            </span>
            &rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

function CompareItem({
  isPositive,
  text,
}: {
  isPositive: boolean;
  text: string;
}) {
  return (
    <div
      className={cn(
        "compare-item flex items-center gap-4 p-4 border-2 text-base font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]",
        isPositive
          ? "border-red-600 bg-black text-white shadow-[4px_4px_0px_0px_#ef4444] hover:shadow-[6px_6px_0px_0px_#ef4444]"
          : "border-white/20 bg-transparent text-gray-500 hover:border-white/40 hover:text-gray-300"
      )}
    >
      <div
        className={cn(
          "shrink-0 p-1 border-2",
          isPositive
            ? "border-red-500 text-red-500 bg-white"
            : "border-gray-600 text-gray-600"
        )}
      >
        {isPositive ? (
          <Check size={16} strokeWidth={4} />
        ) : (
          <X size={16} strokeWidth={4} />
        )}
      </div>
      <span>{text}</span>
    </div>
  );
}