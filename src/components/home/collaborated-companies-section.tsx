"use client";

import React from "react";
import { Building2 } from "lucide-react";

const COMPANIES = [
  "TCS", "INFOSYS", "HCL TECH", "ZOHO", "FRESHWORKS", "DELOITTE", "PWC", "PALO ALTO", "CYBERARK"
];

const EXTENDED = [...COMPANIES, ...COMPANIES, ...COMPANIES];

export function CollaboratedCompaniesSection() {
  return (
    <section className="w-full bg-[#040404] py-20 border-y border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="w-full flex justify-center mb-16 relative z-10">
        <div className="border border-red-600 bg-red-600/10 px-4 py-2 flex items-center gap-3">
          <Building2 size={16} className="text-red-500" />
          <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em]">
            Collaborated Companies
          </span>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Left/Right Fades */}
        <div className="absolute left-0 top-0 w-32 h-full bg-linear-to-r from-[#040404] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-linear-to-l from-[#040404] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max" style={{ animation: "scroll-fast 30s linear infinite" }}>
          {EXTENDED.map((company, idx) => (
            <div key={idx} className="flex items-center mx-8">
              <span className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white hover:text-red-500 transition-colors cursor-default whitespace-nowrap tracking-tight">
                {company}
              </span>
              <span className="text-white/20 mx-12 text-3xl font-black">*</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
