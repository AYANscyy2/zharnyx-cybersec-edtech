"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

const COLLEGES = [
  { name: "VIT Vellore", abbr: "VIT" },
  { name: "Anna University", abbr: "AU" },
  { name: "SRM Institute", abbr: "SRM" },
  { name: "SSN College", abbr: "SSN" },
  { name: "PSG Tech", abbr: "PSG" },
  { name: "Amrita Vishwa", abbr: "AMR" },
  { name: "Sathyabama", abbr: "SAT" },
  { name: "Kumaraguru", abbr: "KCT" },
];

const EXTENDED_COLLEGES = [...COLLEGES, ...COLLEGES, ...COLLEGES];

export function CollaboratedCollegesSection() {
  return (
    <section className="w-full bg-black py-16 flex flex-col items-center border-b border-white/10 overflow-hidden relative">
      <div className="w-full flex justify-center mb-10">
        <div className="border border-white/20 px-4 py-2 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            Collaborated Colleges
          </span>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden mb-12">
        <div className="absolute left-0 top-0 w-24 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-24 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max" style={{ animation: "scroll-slow 40s linear infinite" }}>
          {EXTENDED_COLLEGES.map((college, idx) => (
            <div key={idx} className="flex items-center gap-4 mx-4 group border-2 border-white/10 bg-zinc-950 px-6 py-4 hover:border-red-600 transition-colors min-w-[280px]">
              {/* Logo Placeholder */}
              <div className="w-12 h-12 bg-white/5 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 transition-colors">
                <span className="font-black text-gray-500 group-hover:text-red-500 text-sm tracking-tighter">
                  {college.abbr}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-sm text-white uppercase tracking-wider group-hover:text-red-500 transition-colors">
                  {college.name}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-0.5">
                  Campus Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/colleges"
        className="pb-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-red-500 transition-all flex items-center gap-1.5 group"
      >
        [ See All Supported Campuses <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span> ]
      </Link>

      <style>{`
        @keyframes scroll-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
