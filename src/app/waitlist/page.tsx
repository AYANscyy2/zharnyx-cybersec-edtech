import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { redirect } from "next/navigation";

export default async function WaitlistPage() {
    const session = await getCurrentSession();

    // If not logged in at all, redirect to auth
    if (!session) {
        redirect("/auth?mode=signup&callbackUrl=/waitlist");
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6 selection:bg-red-500/30">
            <div className="w-full max-w-2xl border-2 border-white/20 bg-[#0a0a0a] p-8 md:p-12 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none" />
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-3 h-3 bg-red-500/20" />
                    <div className="w-3 h-3 bg-red-500/40" />
                    <div className="w-3 h-3 bg-red-500" />
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4 text-red-500">
                        <Clock className="w-10 h-10" />
                        <h1 className="text-3xl md:text-4xl font-black font-mono uppercase tracking-tighter">
                            PAYMENT REQUIRED
                        </h1>
                    </div>

                    <div className="space-y-4 font-mono text-gray-400">
                        <p className="text-lg leading-relaxed text-gray-300">
                            Please select a course and complete your payment to unlock your student learning dashboard.
                        </p>

                        <div className="border border-white/10 bg-white/5 p-6 space-y-4">
                            <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                REQUIRED INITIALIZATION STEPS:
                            </h3>
                            <ul className="space-y-3 text-sm list-disc list-inside">
                                <li>Choose your specialized cybersecurity career track.</li>
                                <li>Complete the enrollment fee payment.</li>
                                <li>Once payment is verified, your student learning dashboard will instantly unlock.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                        {/* <Link
                            href="/dashboard/student"
                            className="flex-1 text-center bg-white text-black font-black py-4 uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors border-2 border-white"
                        >
                            Go to Dashboard
                        </Link> */}
                        <Link
                            href="/"
                            className="flex-1 text-center bg-transparent text-white font-black py-4 uppercase tracking-widest text-sm hover:bg-white/10 transition-colors border-2 border-white/20 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
