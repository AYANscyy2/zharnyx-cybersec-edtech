"use client";

import { CheckCircle2, ShieldCheck, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import confetti from "canvas-confetti";

function CheckoutSuccessPageInner() {
  const searchParams = useSearchParams();
  const track = searchParams.get("track") || "Specialization Track";
  const plan = searchParams.get("plan") || "Internship Program";

  useEffect(() => {
    // Fire a dark-mode friendly confetti combination
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#dc2626', '#ef4444', '#fca5a5', '#000000', '#ffffff'] // Red, Black, White
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#dc2626', '#ef4444', '#fca5a5', '#000000', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative font-mono overflow-hidden">
      
      {/* Background Matrix/Noise vibe */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center text-center space-y-10">
        
        {/* Minimalist Red Shield */}
        <div className="relative group">
          <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-24 h-24 border-2 border-red-600 bg-red-600/10 flex items-center justify-center relative z-10 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
            <ShieldCheck size={48} strokeWidth={2.5} className="text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500 text-green-500 text-xs font-bold uppercase tracking-widest mb-2">
            <CheckCircle2 size={14} />
            Payment Verified
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Access Granted.<br />
            <span className="text-red-500">Welcome to the Academy.</span>
          </h1>
          
          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed border-l-4 border-red-600 pl-4 py-1 text-left">
            Your Pan-India Internship seat is secured for <span className="text-white font-bold">{plan}</span> focusing on <span className="text-white font-bold">{track}</span>. Your onboarding materials and lab integrations are ready.
          </p>
        </div>

        {/* Action */}
        <Link
          href="/dashboard"
          className="group relative w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-colors hover:shadow-[8px_8px_0px_0px_white]"
        >
          <span className="flex items-center gap-3">
            INITIALIZE STUDENT DASHBOARD
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        
        <div className="flex items-center gap-2 text-gray-600 text-xs uppercase font-bold tracking-widest mt-8">
          <Terminal size={14} />
          Terminal Session Established
        </div>

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CheckoutSuccessPageInner />
    </Suspense>
  );
}
