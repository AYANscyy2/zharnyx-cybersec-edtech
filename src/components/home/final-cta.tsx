"use client";
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react";

export const FinalCta=()=>{

      const ctaHeadingRef = useRef<HTMLHeadingElement>(null);

    return(
      <section className="w-full bg-black py-24 px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl pt-16 border-t border-white/10 flex flex-col items-center text-center">
          <h2
            ref={ctaHeadingRef}
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 text-balance max-w-4xl"
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
              href="/programs"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto h-16 px-12 bg-[#E60000] text-white font-bold text-base tracking-wide hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(230,0,0,0.4)] transition-all rounded-full"
            >
              Explore Programs <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
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
        </div>
      </section>
    )
}