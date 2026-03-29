import { Shield } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

export const metadata = {
  title: "Privacy Policy | Zharnyx Academy",
  description: "Privacy policy and data protection compliance for Zharnyx Cybersecurity Academy.",
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none fixed"></div>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 border-b-4 border-red-600 pb-12">
          <SectionBadge text="PRIVACY_POLICY" icon={Shield} />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Privacy <span className="text-red-500">Policy</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">
            Last updated: March 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="space-y-12 text-gray-300 leading-relaxed text-lg">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">1.</span> Introduction
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              Zharnyx Cybersecurity Academy ("Zharnyx", "we", "us") is committed to protecting the privacy of our students, visitors, and users in compliance with the Digital Personal Data Protection (DPDP) Act, 2023 of India.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">2.</span> Data We Collect
            </h2>
            <ul className="pl-8 border-l-2 border-white/10 space-y-2 list-none">
              <li><span className="text-red-500 font-bold mr-2">›</span> <strong className="text-white">Personal information:</strong> Name, email, phone number, city</li>
              <li><span className="text-red-500 font-bold mr-2">›</span> <strong className="text-white">Student portal data:</strong> Login credentials, course progress, submissions</li>
              <li><span className="text-red-500 font-bold mr-2">›</span> <strong className="text-white">Payment information:</strong> Processed through secure third-party gateways</li>
              <li><span className="text-red-500 font-bold mr-2">›</span> <strong className="text-white">Communication data:</strong> Messages via contact form or WhatsApp</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">3.</span> How We Use Data
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              We use collected data for enrollment processing, course delivery, placement support, communication about programs, and improving our services. GST data is processed as required by Indian tax law.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">4.</span> Third-Party Services
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              We use third-party services for payment processing and video hosting. These providers have their own privacy policies and we ensure they comply with applicable data protection standards.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">5.</span> Student Consent
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              By enrolling in our programs, students consent to the collection and processing of their personal data as described in this policy. Students may request data access, correction, or deletion by contacting us.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">6.</span> Contact
            </h2>
            <div className="pl-8 p-6 bg-red-600/10 border-2 border-red-600 mt-4">
              <p className="font-bold text-white text-xl">
                For data-related requests, contact us at <a href="mailto:hello@zharnyx.com" className="text-red-500 hover:text-red-400 underline decoration-2 underline-offset-4">hello@zharnyx.com</a> or through our enrollment form.
              </p>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
