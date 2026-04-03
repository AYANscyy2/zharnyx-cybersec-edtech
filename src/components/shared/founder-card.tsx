"use client";

import { Mail, Linkedin, Github } from "lucide-react";
import { Founder } from "@/data/founders";

interface FounderCardProps {
  founder: Founder;
  onKnowMore: () => void;
}

export function FounderCard({ founder, onKnowMore }: FounderCardProps) {
  return (
    <div className="founder-card group relative border-2 border-white/20 bg-black overflow-hidden flex flex-col items-center p-8 text-center transition-all duration-300 hover:border-red-500 hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_white]">
      {/* Glitch overlay on hover */}
      <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none"></div>

      <div className="w-24 h-24 bg-white/10 border-2 border-white/30 rounded-full mb-6 relative z-10 group-hover:border-white transition-colors overflow-hidden">
        <img 
          src={founder.image} 
          alt={founder.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
        />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col items-center">
        <h3 className="text-2xl font-black uppercase text-white tracking-tight">{founder.name}</h3>
        <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest mt-2">{founder.role}</p>
        
        {/* Short description - only used on home but safe to include or hide */}
        {founder.shortDesc && (
            <p className="text-gray-400 text-sm leading-relaxed mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                {founder.shortDesc}
            </p>
        )}
      </div>

      <div className="w-8 h-px bg-white/20 mt-6 group-hover:bg-white transition-colors relative z-10"></div>

      {/* Interaction Footnote */}
      <div className="mt-8 relative z-10 flex flex-wrap justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
        <button
          onClick={onKnowMore}
          className="px-4 py-1.5 border-2 border-red-600 bg-transparent text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all cursor-pointer shadow-[2px_2px_0px_0px_white]"
        >
          know more
        </button>
        <div className="flex gap-2">
          <a href={`mailto:${founder.contact.email}`} className="p-2 border border-white/20 hover:border-red-500 text-white hover:text-red-500 transition-all" title="Email">
            <Mail size={12} />
          </a>
          {founder.contact.linkedin && (
            <a href={founder.contact.linkedin} target="_blank" className="p-2 border border-white/20 hover:border-red-500 text-white hover:text-red-500 transition-all" title="LinkedIn">
              <Linkedin size={12} />
            </a>
          )}
          {founder.contact.github && (
            <a href={founder.contact.github} target="_blank" className="p-2 border border-white/20 hover:border-red-500 text-white hover:text-red-500 transition-all" title="GitHub">
              <Github size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
