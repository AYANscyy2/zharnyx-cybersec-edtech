import { Shield } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

export const metadata = {
  title: "Copyright Notices | Zharnyx Academy",
  description: "Copyright notices and intellectual property information for Zharnyx Cybersecurity Academy.",
};

export default function CopyrightPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none fixed"></div>

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col gap-16">
        
        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 border-b-4 border-red-600 pb-12">
          <SectionBadge text="COPYRIGHT_NOTICES" icon={Shield} />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Copyright <span className="text-red-500">Notices</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-bold tracking-widest uppercase">
            Last updated: March 2026
          </p>
        </section>

        {/* Content Section */}
        <section className="space-y-12 text-gray-300 leading-relaxed text-lg">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">1.</span> Ownership of Content
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of Zharnyx Cybersecurity Academy or its content suppliers and is protected by Indian and international copyright laws.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">2.</span> Trademarks
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              The Zharnyx name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Zharnyx Cybersecurity Academy. You must not use such marks without our prior written permission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">3.</span> Permitted Use
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              You may view, download for caching purposes only, and print pages or other content from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">4.</span> Restrictions
            </h2>
            <p className="pl-8 border-l-2 border-white/10">
              You must not republish, sell, rent, sub-license, reproduce, duplicate, copy, or otherwise exploit material on our website for a commercial purpose without our express written consent.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="text-red-500 text-3xl">5.</span> Copyright Infringement Claims
            </h2>
            <div className="pl-8 p-6 bg-red-600/10 border-2 border-red-600 mt-4">
              <p className="font-bold text-white text-xl">
                If you believe your copyright has been infringed, contact us at <a href="mailto:legal@zharnyx.com" className="text-red-500 hover:text-red-400 underline decoration-2 underline-offset-4">legal@zharnyx.com</a>.
              </p>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
