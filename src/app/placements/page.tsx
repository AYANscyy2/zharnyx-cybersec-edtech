"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Briefcase, Building2, TrendingUp, Award, CheckSquare, ArrowRight, ShieldCheck, FileText, Users, Target } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(SplitText);

export default function PlacementsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: blank
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        }, "-=0.6")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-24">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <div ref={badgeRef} className="translate-y-5 flex items-center gap-2 px-4 py-1 bg-white text-black font-bold uppercase tracking-widest text-xs border-2 border-white shadow-[4px_4px_0px_0px_red]">
            <Briefcase size={14} strokeWidth={3} />
            <span>PLACEMENT & CAREERS</span>
          </div>

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            From Training to <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Career Launch</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-24 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left">
            Structured placement support — not just a certificate. We help you get hired.
          </p>

          {/* Hiring Partners */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <Building2 className="text-red-500" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Hiring Partners</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Top-Tier MSSPs", "Global Big 4", "Fintech Sec Teams", "Startup SOCs", "Cloud Providers", "Gov Tech Defense", "Red Team Boutiques", "Enterprise IT"].map((partner, i) => (
                <div key={i} className="py-8 px-4 border-2 border-white/10 flex items-center justify-center text-center bg-white/5 hover:bg-white/10 hover:border-red-500 transition-colors group">
                  <span className="font-bold uppercase tracking-widest text-sm text-gray-400 group-hover:text-white transition-colors">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Placement Support Includes */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <ShieldCheck className="text-red-500" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Placement Support Includes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SupportCard
                icon={<FileText size={24} className="text-red-500" />}
                title="Resume & Profile Building"
                desc="Crafting an ATS-friendly cybersecurity resume and optimizing your LinkedIn profile for recruiters."
              />
              <SupportCard
                icon={<Users size={24} className="text-red-500" />}
                title="Mock Interviews"
                desc="Technical and HR mock interviews with industry veterans to eliminate interview anxiety."
              />
              <SupportCard
                icon={<Target size={24} className="text-red-500" />}
                title="Direct Referrals"
                desc="Leveraging our active network of CISOs and security managers for direct resume drops."
              />
            </div>
          </section>

          {/* Salary Ranges */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <TrendingUp className="text-red-500" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Salary Ranges</h2>
            </div>

            <div className="bg-black border-2 border-white/20 p-1 divide-y-2 divide-white/20 w-full">
              <SalaryRow role="SOC Analyst L1" exp="Fresher / 0-1 yr" range="₹4.0L - ₹7.0L" />
              <SalaryRow role="VAPT / Pentester L1" exp="Fresher / 0-1 yr" range="₹5.0L - ₹8.5L" />
              <SalaryRow role="Cloud Security Engineer" exp="1-3 yrs" range="₹8.0L - ₹14.0L" />
              <SalaryRow role="DFIR Analyst" exp="1-3 yrs" range="₹7.5L - ₹12.0L" />
            </div>
          </section>

          {/* Recommended Certifications */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
              <Award className="text-red-500" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight text-white">Recommended Certifications</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["CompTIA Security+", "eJPT / OSCP", "BTL1 / CCD", "AWS Security Spec."].map((cert, i) => (
                <div key={i} className="p-6 border-2 border-white/20 flex flex-col items-center justify-center text-center gap-3 hover:border-red-500 hover:-translate-y-1 transition-all bg-black group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                    <CheckSquare size={48} className="text-red-500" />
                  </div>
                  <Award size={32} className="text-gray-500 group-hover:text-red-500 transition-colors z-10" />
                  <span className="font-bold uppercase tracking-wider text-white z-10">{cert}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">Ready to Launch Your Career?</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Placement support is included in every full program package.</p>
            </div>

            <Link
              href="/auth?mode=signup"
              className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white] flex items-center gap-3"
            >
              Enroll Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}


function SupportCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 bg-black border-2 border-white/20 hover:border-red-500 transition-colors flex flex-col gap-4 group">
      <div className="p-3 bg-white/5 border border-white/10 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-white leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function SalaryRow({ role, exp, range }: { role: string, exp: string, range: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 px-6 hover:bg-white/5 transition-colors gap-4">
      <div className="flex flex-col">
        <span className="font-bold text-lg text-white uppercase tracking-tight">{role}</span>
        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{exp}</span>
      </div>
      <div className="text-xl md:text-2xl font-black text-red-500 tracking-tighter">
        {range}
      </div>
    </div>
  )
}
