"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { Founder } from "@/data/founders";

interface FounderCardProps {
  founder: Founder;
  onKnowMore: () => void;
}

export function FounderCard({ founder, onKnowMore }: FounderCardProps) {
  return (
    <div className="founder-card group relative rounded-3xl border border-white/5 bg-zinc-900/40 overflow-hidden flex flex-col items-center p-8 text-center transition-all duration-300 hover:border-[#E60000] hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#E60000]">
      {/* Neo-brutalist red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full mb-6 relative z-10 group-hover:border-[#E60000]/40 transition-colors overflow-hidden">
        <img 
          src={founder.image} 
          alt={founder.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white tracking-tight">{founder.name}</h3>
        <p className="text-[#E60000] font-medium uppercase text-xs tracking-wider mt-2">{founder.role}</p>
        
        {/* Short description - only used on home but safe to include or hide */}
        {founder.shortDesc && (
            <p className="text-gray-400 text-sm leading-relaxed mt-4 opacity-80 group-hover:opacity-100 transition-opacity font-medium">
                {founder.shortDesc}
            </p>
        )}
      </div>

      <div className="w-8 h-px bg-white/10 mt-6 group-hover:bg-[#E60000]/30 transition-colors relative z-10"></div>

      {/* Interaction Footnote */}
      <div className="mt-8 relative z-10 flex flex-wrap justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
        <button
          onClick={onKnowMore}
          className="px-5 py-2 rounded-full border border-[#E60000]/50 bg-[#E60000]/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E60000] transition-all cursor-pointer shadow-[0_4px_14px_0_rgb(230,0,0,0.39)]"
        >
          know more
        </button>
        <div className="flex gap-2">
          <a href={`mailto:${founder.contact.email}`} className="p-2 rounded-full bg-white/5 hover:bg-[#E60000] text-gray-400 hover:text-white transition-all" title="Email">
            <Mail size={12} />
          </a>
          {founder.contact.linkedin && (
            <a href={founder.contact.linkedin} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-[#E60000] text-gray-400 hover:text-white transition-all" title="LinkedIn">
              <Linkedin size={12} />
            </a>
          )}
          {founder.contact.github && (
            <a href={founder.contact.github} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-[#E60000] text-gray-400 hover:text-white transition-all" title="GitHub">
              <Github size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
