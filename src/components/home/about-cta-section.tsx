"use client";

import { Shield, Target, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";

export function AboutCTASection() {
  const labelRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.55,
  });
  const headingRef = useGsapScrollAnimation<HTMLHeadingElement>({
    direction: "up",
    duration: 0.65,
    delay: 0.05,
  });
  const featuresRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
    delay: 0.1,
    stagger: 0.12,
    childSelector: ".feature-col",
  });
  const quoteRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
    delay: 0.15,
  });
  const ctaHeadingRef = useGsapScrollAnimation<HTMLHeadingElement>({
    direction: "up",
    duration: 0.65,
  });
  const ctaSubRef = useGsapScrollAnimation<HTMLParagraphElement>({
    direction: "up",
    duration: 0.5,
    delay: 0.1,
  });
  const ctaBtnRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.55,
    delay: 0.2,
  });
  const ctaMetaRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.5,
    delay: 0.3,
  });

  return (
    <section className="py-24 relative bg-black border-t-2 border-white/20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* --- PART 1: ABOUT ZHARNYX --- */}
        <div className="text-center mb-24">
          <SectionBadge
            ref={labelRef}
            text="Who We Are"
          />

          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-20"
          >
            About{" "}
            <span className="text-red-500">
              Zharnyx
            </span>
          </h2>

          {/* 3 Column Features */}
          <div ref={featuresRef} className="grid md:grid-cols-3 gap-12 mb-20">
            <FeatureColumn
              icon={<Shield size={32} />}
              title="Built by Practitioners"
              description="Founded by working security engineers who understand real-world demands."
            />
            <FeatureColumn
              icon={<Target size={32} />}
              title="Fixing Broken Pipelines"
              description="Designed to address the gap between academic knowledge and job readiness."
            />
            <FeatureColumn
              icon={<Building2 size={32} />}
              title="Company, Not Classroom"
              description="Structured like a security organization, not an educational institution."
            />
          </div>

          {/* Manifesto Quote Box */}
          <div
            ref={quoteRef}
            className="bg-white/5 border-2 border-white/10 p-8 md:p-12 relative max-w-4xl mx-auto"
          >
            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed mb-8">
              We don&apos;t believe in mass-produced graduates. We believe in
              engineers who can walk into a SOC, a red team engagement, or a
              security architecture discussion — and deliver from day one.
            </p>
            <div className="h-px w-20 bg-red-500 mx-auto mb-8" />
            <h3 className="text-2xl md:text-3xl font-black uppercase text-white">
              &quot;Zharnyx is not education.
              <br />
              <span className="text-red-500">Zharnyx is preparation.</span>
              &quot;
            </h3>
          </div>
        </div>

        {/* --- PART 2: FINAL CTA --- */}
        <div className="text-center pt-20 border-t border-white/10">
          <h2
            ref={ctaHeadingRef}
            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4"
          >
            If You&apos;re Serious About <br />
            <span className="text-red-500">
              Cybersecurity, Apply.
            </span>
          </h2>

          <p
            ref={ctaSubRef}
            className="text-gray-400 font-mono text-sm mb-10"
          >
            This residency is selective. Not everyone gets in.
          </p>

          <div ref={ctaBtnRef}>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 text-black font-black text-xl uppercase tracking-widest border-2 border-red-600 shadow-[8px_8px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_white] transition-all"
            >
              Apply Now <ArrowRight size={24} strokeWidth={3} />
            </Link>
          </div>

          <div
            ref={ctaMetaRef}
            className="flex flex-wrap justify-center gap-6 mt-16 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest"
          >
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> 6-month
              intensive
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Limited
              seats per cohort
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" /> Next
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
    <div className="feature-col flex flex-col items-center">
      <div className="p-4 bg-white/5 border-2 border-white/20 rounded-full mb-6 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white uppercase mb-3">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
}
