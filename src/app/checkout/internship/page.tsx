"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Terminal, Shield, Zap, Target, Lock, ArrowRight, Loader2 } from "lucide-react";
import { PaymentHandoff } from "./payment-handoff";
import { createInternshipEnrollment, getExistingInternshipEnrollments } from "@/actions/student/internship";

const TIERS = {
  "1": { name: "TIER 1 STARTER — 1 MONTH", basePrice: 3500 },
  "2": { name: "TIER 2 CORE — 2 MONTHS", basePrice: 6500 },
  "3": { name: "TIER 3 DEEP TRACK — 3 MONTHS", basePrice: 8999 },
};

const TRACKS = [
  "SOC Analyst",
  "VAPT",
  "Cloud Security",
  "DFIR",
];

function CheckoutPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");
  const { data: session, isPending } = useSession();

  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isProcessingPayLater, setIsProcessingPayLater] = useState(false);
  const [pendingEnrollments, setPendingEnrollments] = useState<any[]>([]);
  const [isLoadingPending, setIsLoadingPending] = useState(true);

  // Authentication & Completeness Redirect Logic
  useEffect(() => {
    if (isPending) return;
    
    const currentUrl = encodeURIComponent(`/checkout/internship?tier=${tierParam || "1"}`);
    
    if (!session) {
      // Redirect to specific auth page with callback URL
      router.push(`/auth?mode=signup&callbackUrl=${currentUrl}`);
    } else if (!session.user.phone || !session.user.preferredTrack) {
      // Missing mandatory enrollment fields (e.g. Google Sign in bypass)
      router.push(`/auth?mode=complete-profile&callbackUrl=${currentUrl}`);
    }
  }, [session, isPending, router, tierParam]);

  useEffect(() => {
    if (!isPending && session && session.user.phone && session.user.preferredTrack) {
      getExistingInternshipEnrollments().then((res: any) => {
        if (res.success && res.data) {
          setPendingEnrollments(res.data);
          const targetTrack = searchParams.get("track");
          if (targetTrack) {
            setSelectedTrack(targetTrack);
          } else if (res.data.length > 0) {
            setSelectedTrack(res.data[0].track);
          } else if ((session.user as any).preferredTrack) {
            setSelectedTrack((session.user as any).preferredTrack);
          }
        }
        setIsLoadingPending(false);
      });
    } else if (!isPending) {
      setIsLoadingPending(false);
    }
  }, [session, isPending, searchParams]);

  if (isPending || !session || isLoadingPending) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-red-600" size={32} />
          <p className="text-gray-500 uppercase tracking-widest text-xs">Verifying authorization and data...</p>
        </div>
      </div>
    );
  }

  // Selected Tier Data -> Override with Database Tier if pending
  const activePending = pendingEnrollments.find(e => e.track === selectedTrack);
  const activeTierParam = activePending ? activePending.tier : tierParam;
  const tierKey = (activeTierParam && TIERS[activeTierParam as keyof typeof TIERS]) ? activeTierParam : "1";
  const tierData = TIERS[tierKey as keyof typeof TIERS];

  // Pricing Logic
  const basePrice = tierData.basePrice;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;

  // Handle Payment Execution
  const handlePayment = () => {
    if (!selectedTrack) {
      alert("Please select a specialization track before proceeding.");
      return;
    }
    setIsProcessingPayment(true);
  };

  const handlePayLater = async () => {
    if (!selectedTrack) {
      alert("Please select a specialization track before proceeding.");
      return;
    }
    setIsProcessingPayLater(true);
    try {
      await createInternshipEnrollment({
        track: selectedTrack,
        tier: tierKey,
        paymentStatus: "pending",
        amount: total,
      });
      router.push(`/checkout/success?track=${encodeURIComponent(selectedTrack)}&plan=${encodeURIComponent(tierData.name)}`);
    } catch (error) {
      console.error(error);
      alert("Failed to register. Please try again.");
      setIsProcessingPayLater(false);
    }
  };

  // If processing payment, render the handoff transitional screen
  if (isProcessingPayment) {
    return <PaymentHandoff amount={total} plan={tierData.name} track={selectedTrack!} tierKey={tierKey} />;
  }

  return (
    <div className="min-h-screen bg-black text-white py-24 px-4 font-mono overflow-x-hidden relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">

        {/* User Status Bar */}
        {/* <div className="w-full bg-white/5 border border-white/10 p-3 flex items-center justify-between text-xs tracking-widest uppercase"> */}
        {/* <span className="text-gray-500">System_Clearance_Level</span> */}
        {/* <div className="flex items-center gap-2"> */}
        {/* <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> */}
        {/* <span className="text-green-500 font-bold">Authenticated: {session?.user?.name || ""}</span> */}
        {/* </div> */}
        {/* </div> */}

        {/* Main Terminal Card */}
        <div className="bg-black border-2 border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] overflow-hidden">

          {/* Header */}
          {/* <div className="bg-red-600/10 border-b-2 border-red-600 p-6 flex flex-col items-center justify-center text-center space-y-2">
            <h1 className="text-red-500 font-black text-xl uppercase tracking-widest flex items-center gap-2">
              <Terminal size={20} />
              &gt; FINALIZE_DEPLOYMENT
            </h1>
            <p className="text-gray-400 text-xs tracking-wider uppercase">Configure operational parameters before initialization</p>
          </div> */}

          <div className="p-8 space-y-8">

            {/* Locked Selection */}
            <div className="space-y-2">
              <h2 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} className="text-gray-500" /> Locked Selection
              </h2>
              <div className="w-full bg-white/5 border-l-4 border-red-600 p-4">
                <p className="text-red-400 font-black tracking-widest text-lg">{tierData.name}</p>
              </div>
            </div>

            {/* Track Selector */}
            <div className="space-y-4 text-left">
              <h2 className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Target size={14} className="text-gray-500" /> Select Specialization Track
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRACKS.map((track) => {
                  const isTrackPending = pendingEnrollments.some(e => e.track === track);
                  const isSelected = selectedTrack === track;

                  return (
                    <button
                      key={track}
                      onClick={() => setSelectedTrack(track)}
                      className={`p-4 border-2 text-left uppercase text-sm tracking-wider font-bold transition-all relative
                        ${isSelected
                          ? 'bg-red-600/10 border-red-600 text-red-500'
                          : 'bg-transparent border-white/20 text-gray-400 hover:border-white/50'
                        }
                      `}
                    >
                      {track}
                      {isTrackPending && (
                        <span className="block text-[10px] text-red-500 mt-1 uppercase tracking-widest font-black">
                          (Pending Payment)
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="space-y-4 pt-6 text-left border-t border-white/10">
              <h2 className="text-white text-xs font-bold uppercase tracking-wider">Financial Overview</h2>

              <div className="bg-white/5 p-6 border border-white/10 space-y-3 font-mono text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Base Program Fee</span>
                  <span>₹{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10 mt-3">
                  <span>Total Investment</span>
                  <span className="text-red-500">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 text-center">
              {activePending && (
                <div className="mb-6 bg-red-950/20 border-2 border-red-600/30 p-4 text-center shadow-[4px_4px_0px_0px_rgba(220,38,38,0.2)]">
                  <p className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={14} className="shrink-0" /> PENDING ENROLLMENT DETECTED FOR THIS TRACK.
                  </p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={!selectedTrack || isProcessingPayLater || isProcessingPayment}
                className={`w-full group relative px-8 py-5 text-black font-black text-lg uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed ${selectedTrack ? 'bg-red-600 hover:-translate-y-1' : 'bg-red-900 border-2 border-red-900 text-gray-400'
                  }`}
              >
                <span className={`flex items-center justify-center gap-3 ${selectedTrack ? '' : 'opacity-70'}`}>
                  {isProcessingPayment ? <Loader2 className="animate-spin" size={20} /> : "PROCEED TO SECURE PAYMENT"}
                  {!isProcessingPayment && <ArrowRight size={20} className={selectedTrack ? 'group-hover:translate-x-1 transition-transform' : ''} />}
                </span>
              </button>

              {!activePending && (
                <>
                  <div className="flex items-center gap-4 text-gray-500 whitespace-nowrap pt-2 pb-2">
                    <div className="h-px bg-white/10 w-full"></div>
                    <span className="text-xs uppercase font-bold tracking-widest">or</span>
                    <div className="h-px bg-white/10 w-full"></div>
                  </div>

                  <button
                    onClick={handlePayLater}
                    disabled={!selectedTrack || isProcessingPayLater || isProcessingPayment}
                    className={`w-full group relative px-8 py-4 bg-transparent border-2 font-black text-md uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed ${selectedTrack ? 'border-white text-white hover:bg-white/10 hover:-translate-y-1' : 'border-white/20 text-gray-500'
                      }`}
                  >
                    <span className="flex items-center justify-center gap-3">
                      {isProcessingPayLater ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "REGISTER NOW, PAY LATER"
                      )}
                    </span>
                  </button>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-2 block">
                    Week 0 cohort content will be unlocked immediately.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 uppercase tracking-widest text-xs">Initializing...</p>
        </div>
      </div>
    }>
      <CheckoutPageInner />
    </Suspense>
  );
}
