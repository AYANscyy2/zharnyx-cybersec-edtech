"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Lock } from "lucide-react";

interface PaymentHandoffProps {
  amount: number;
  plan: string;
  track: string;
  tierKey: string;
}

export function PaymentHandoff({ amount, plan, track, tierKey }: PaymentHandoffProps) {
  const router = useRouter();
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    // Simulate terminal connection lines
    const timeline = [
      "Initializing secure handoff protocols...",
      "Generating one-time cryptographic key...",
      "Bypassing standard proxies...",
      `Amount verified: INR ${amount.toLocaleString()}`,
      `Payload locked: ${plan} | ${track}`,
      "Establishing connection to payment gateway (RAZORPAY_API_V2)...",
      "Gateway responded. Status: 200 OK",
      "Awaiting user authorization...",
    ];

    let currentLine = 0;
    
    // Add logs one by one
    const interval = setInterval(() => {
      if (currentLine < timeline.length) {
        setLogs(prev => [...prev, timeline[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        
        // After logs finish, wait a bit and pretend Razorpay success callback fired
        setTimeout(async () => {
          try {
            const { createInternshipEnrollment } = await import("@/actions/student/internship");
            await createInternshipEnrollment({
              track,
              tier: tierKey,
              paymentStatus: "paid",
              amount: amount,
            });
          } catch(e) {
            console.error("Failed to register internship.", e);
          }
          // Route to success page
          router.push(`/checkout/success?track=${encodeURIComponent(track)}&plan=${encodeURIComponent(plan)}`);
        }, 1500);
      }
    }, 400); // Speed of terminal output

    return () => clearInterval(interval);
  }, [router, amount, plan, track, tierKey]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden">
      
      {/* Background Matrix/Noise vibe */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <div className="w-full max-w-2xl relative z-10 text-left">
        <div className="flex items-center gap-3 text-red-500 mb-8 border-b-2 border-red-500/20 pb-4">
          <Lock className="animate-pulse" size={24} />
          <h2 className="text-xl font-black uppercase tracking-widest">Secure Payment Link Established</h2>
        </div>
        
        <div className="space-y-2">
          {logs.map((log, index) => (
            <p key={index} className="text-sm md:text-base text-gray-400 font-mono tracking-tight flex items-start gap-2">
              <span className="text-red-500 shrink-0">&gt;</span>
              <span>{log}</span>
            </p>
          ))}
          
          {/* Pulsing cursor at the end */}
          <div className="h-4 w-2 bg-red-600 animate-pulse mt-4 inline-block shadow-[0_0_8px_rgba(220,38,38,0.8)]"></div>
        </div>
      </div>
      
    </div>
  );
}
