import { Shield } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

export const metadata = {
  title: "Terms & Conditions | Zharnyx Academy",
  description: "Terms and conditions of service for Zharnyx Cybersecurity Academy.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none fixed"></div>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 border-b-4 border-red-600 pb-12">
          <SectionBadge text="TERMS_OF_SERVICE" icon={Shield} />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Terms & <span className="text-red-500">Conditions</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">
            Last updated: March 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="space-y-12 text-gray-300 leading-relaxed text-lg">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">1.</span> Enrollment Terms
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              Enrollment is subject to availability. Cohort sizes are limited to ensure quality. Enrollment is confirmed upon receipt of payment or approved EMI arrangement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">2.</span> Pricing & GST
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              All published prices include 18% GST. Prices are subject to revision for future cohorts. Current pricing is valid for the next scheduled batch only.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">3.</span> Refund & Cancellation
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              Refund requests must be submitted within 7 days of enrollment. After the program begins, partial refunds may be available based on modules not yet started. Contact our team for specific cases.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">4.</span> Placement Disclaimer
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              Zharnyx provides structured placement support including resume building, mock interviews, Demo Day, and application assistance. We do not guarantee job placement.
            </p>
          </div>

          <div className="space-y-4 bg-red-600/5 p-6 border-2 border-red-600/30">
            <h2 className="text-2xl font-black text-red-500 uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-600 text-3xl">5.</span> Lab Environment Usage
            </h2>
            <p className="pl-8 border-l-2 border-red-500/30 text-white font-medium">
              Students must use lab environments strictly for educational purposes within the program. Any unauthorized access, data exfiltration, or malicious activity will result in immediate dismissal.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">6.</span> Ethical Hacking Conduct
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              All penetration testing and security assessment skills taught must be used ethically and legally. Students agree to only test systems they have explicit authorization to assess.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">7.</span> Intellectual Property
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              All curriculum materials, lab environments, and proprietary content are the intellectual property of Zharnyx Cybersecurity Academy. Redistribution is prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">8.</span> Governing Law
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              These terms are governed by the laws of Tamil Nadu, India. Any disputes shall be subject to the jurisdiction of courts in Coimbatore, Tamil Nadu.
            </p>
          </div>

        </section>
      </main>
    </div>
  );
}
