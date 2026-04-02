"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

export function HeroBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000 fill-mode-both">
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 bg-black border border-red-600/30 shadow-[0_0_15px_rgba(220,38,38,0.15)] rounded-none group hover:border-red-600/60 transition-colors">

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1 pr-6">
          <div className="shrink-0 font-mono text-xs font-bold text-red-500 tracking-widest uppercase bg-red-600/10 px-2 py-1 border border-red-600/20">
            [ FREE INTERNSHIP PREVIEW ]
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-sm md:text-base tracking-wide">
              Launch your Cybersecurity Career with our Virtual Internships.
            </span>
            <span className="text-gray-400 text-xs md:text-sm mt-0.5">
              Experience the exact training our elite tracks receive. Week 0 foundational access is completely free.
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="w-full md:w-auto shrink-0 mt-2 md:mt-0">
          <Link
            href="/internships"
            className="inline-flex items-center justify-center w-full md:w-auto h-10 px-6 bg-transparent text-red-500 font-bold text-xs uppercase tracking-wider border border-red-600 hover:bg-red-600 hover:text-white transition-colors gap-2 group/btn"
          >
            CLAIM FREE ACCESS
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
