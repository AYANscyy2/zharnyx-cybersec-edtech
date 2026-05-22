"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono overflow-hidden relative">
      {/* Background Matrix/Noise vibe for Athletic Corporate */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center relative z-10">

        {/* Left Column - Content */}
        <div className="space-y-6 flex flex-col items-start px-4 md:px-8">

          {/* Stark Line above 404 - Athletic Corporate style */}
          <div className="w-32 h-2 bg-red-600 mb-4 rounded-none"></div>

          {/* 404 Text */}
          <div className="relative">
            <h1 className="text-8xl md:text-[150px] font-black tracking-tighter text-white leading-none uppercase drop-shadow-[4px_4px_0px_rgba(220,38,38,1)]">
              404
            </h1>
          </div>

          {/* Error Text */}
          <div className="space-y-4 mt-8 bg-white/5 border-l-4 border-red-600 p-6 rounded-none">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
              System Disconnected
            </h2>
            <p className="text-gray-400 max-w-sm text-sm md:text-base leading-relaxed tracking-wider uppercase">
              <span className="text-red-500 font-bold mr-2">&gt;</span>
              The Page you are looking for doesn't exist or has been rerouted.
            </p>
          </div>

          {/* CTA Button */}
          <Link href="/" className="mt-8 block w-full md:w-auto">
            <button className="w-full md:w-auto group relative px-8 py-4 bg-red-600 text-black hover:bg-red-500 rounded-none font-black text-sm md:text-base tracking-widest uppercase transition-all duration-300 flex items-center justify-center md:justify-start gap-4">
              BACK TO HOMEPAGE
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Right Column - Athletic Corporate Graphic (Brutalist Robot/Plug) */}
        <div className="hidden md:flex justify-center items-center relative h-[400px] md:h-[600px]">

          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Brutalist Robot Head */}
            <div className="relative group hover:-translate-y-2 transition-transform duration-500">
              <div className="relative bg-black border-4 border-white p-12 rounded-none shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center justify-center gap-6">
                {/* Eyes */}
                <div className="relative flex gap-8">
                  <div className="w-8 h-8 bg-red-600 rounded-none animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                  <div className="w-8 h-8 bg-red-600 rounded-none animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]" style={{ animationDelay: '0.5s' }}></div>
                </div>
                {/* Mouth/Grill */}
                <div className="flex gap-2">
                  <div className="w-2 h-6 bg-white"></div>
                  <div className="w-2 h-6 bg-white"></div>
                  <div className="w-2 h-6 bg-white"></div>
                  <div className="w-2 h-6 bg-white"></div>
                </div>
              </div>

              {/* Robot Antenna/Ears */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-none"></div>
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-12 bg-white rounded-none"></div>
              {/* Top Antenna */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2 h-12 bg-white rounded-none"></div>
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-6 h-4 bg-red-600 rounded-none shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
            </div>

            {/* Plugs representing disconnection - Brutalist Style */}
            <div className="flex gap-8 mt-24 items-center justify-center relative">
              {/* Left Plug (Live) */}
              <div className="relative flex items-center -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-24 h-4 bg-white rounded-none"></div>
                <div className="bg-black border-4 border-white p-4 rounded-none flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
                  <div className="w-4 h-8 bg-red-600 rounded-none"></div>
                  <div className="w-4 h-8 bg-red-600 rounded-none"></div>
                </div>
              </div>

              {/* Disconnected Gap/Spark */}
              <div className="text-red-600 font-black text-4xl animate-bounce">
                X
              </div>

              {/* Right Plug (Dead) */}
              <div className="relative flex items-center rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="bg-black border-4 border-gray-600 p-4 rounded-none flex flex-col gap-2 shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
                  <div className="w-8 h-4 bg-gray-600 rounded-none"></div>
                  <div className="w-8 h-4 bg-gray-600 rounded-none"></div>
                </div>
                <div className="w-24 h-4 bg-gray-600 rounded-none"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
