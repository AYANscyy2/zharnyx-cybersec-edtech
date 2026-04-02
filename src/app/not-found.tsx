"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404_FATAL_ERROR");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    const original = "404_PAGE_NOT_FOUND";
    let iterations = 0;

    const interval = setInterval(() => {
      setGlitchText(
        original
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iterations)) {
              return original[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= original.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden relative">
      {/* Background Matrix/Noise vibe */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center">
        
        {/* Main Terminal Card */}
        <div className="w-full bg-black border-2 border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-hidden">
          
          {/* Header */}
          <div className="bg-red-600/10 border-b-2 border-red-600 p-6 flex flex-col items-center justify-center text-center space-y-2">
            <h1 className="text-red-500 font-black text-2xl uppercase tracking-widest flex items-center gap-3">
              <AlertTriangle className="animate-pulse" size={28} />
              SYSTEM_FAULT
            </h1>
            <p className="text-gray-400 text-xs tracking-wider uppercase">Critical Navigation Failure Detected</p>
          </div>

          <div className="p-8 space-y-8 text-left">
            
            {/* Error Readout */}
            <div className="space-y-4">
              <h2 className="text-red-500 font-black tracking-widest text-3xl md:text-4xl uppercase break-all inline-block">
                {glitchText}
              </h2>
              
              <div className="bg-white/5 border-l-4 border-red-600 p-4 space-y-2">
                <p className="text-gray-400 text-sm md:text-base tracking-wider flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">&gt;</span> 
                  <span>The requested sector does not exist on this server.</span>
                </p>
                <p className="text-gray-400 text-sm md:text-base tracking-wider flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">&gt;</span> 
                  <span>Unauthorized access attempts have been logged.</span>
                </p>
                <p className="text-gray-400 text-sm md:text-base tracking-wider flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">&gt;</span> 
                  <span>Rerouting to secure perimeter...</span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link href="/" className="block">
              <button className="w-full group relative px-8 py-5 bg-red-600 text-black font-black text-lg uppercase tracking-wider transition-all hover:-translate-y-1">
                <span className="flex items-center justify-center gap-3">
                  INITIATE SYSTEM REBOOT
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>

          </div>
        </div>
        
        {/* Pulsing cursor at the bottom for flair */}
        <div className="mt-12 flex justify-center">
            <div className="h-6 w-3 bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
        </div>
      </div>
    </div>
  );
}
