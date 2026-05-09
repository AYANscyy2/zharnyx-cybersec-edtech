"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, Network, Building2, MapPin, Tag, Mail } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const PARTNERS = [
  {
    name: "Petadot",
    initial: "P",
    type: "Core Partner",
    track: "All Tracks",
    location: "TN (Tamil Nadu)",
    color: "red",
    desc: "Our founding placement partner. Petadot exclusively hires from Zharnyx cohorts for their cybersecurity consulting engagements.",
  },
  {
    name: "Briskinfosec",
    initial: "B",
    type: "Core Partner",
    track: "VAPT / DFIR",
    location: "Tamil Nadu",
    color: "red",
    desc: "A dedicated cybersecurity firm offering penetration testing and forensic services. Direct hiring pipeline for VAPT and DFIR graduates.",
  },
  {
    name: "StrongBox IT",
    initial: "S",
    type: "Core Partner",
    track: "SOC / Cloud",
    location: "TN (Tamil Nadu)",
    color: "red",
    desc: "End-to-end security solutions provider. Actively recruits SOC analysts and cloud security engineers from our talent pipeline.",
  },
  {
    name: "TCS",
    initial: "T",
    type: "Hiring Partner",
    track: "SOC Track",
    location: "TN (Tamil Nadu)",
    color: "white",
    desc: "Tata Consultancy Services cybersecurity practice recruits SOC analysts from our certified cohorts for enterprise client deployments.",
  },
  {
    name: "Infosys",
    initial: "I",
    type: "Hiring Partner",
    track: "SOC Track",
    location: "TN (Tamil Nadu)",
    color: "white",
    desc: "Infosys Cyber Security Center of Excellence evaluates our SOC graduates for threat intelligence and incident response roles.",
  },
  {
    name: "HCL Tech",
    initial: "H",
    type: "Hiring Partner",
    track: "SOC / VAPT",
    location: "TN (Tamil Nadu)",
    color: "white",
    desc: "HCL's global cybersecurity division recruits dual-skilled professionals from both our SOC and offensive security tracks.",
  },
  {
    name: "Zoho Corp",
    initial: "Z",
    type: "Hiring Partner",
    track: "Cloud Track",
    location: "TN (Tamil Nadu)",
    color: "white",
    desc: "Zoho's internal security team sources Cloud Security engineers directly from our cohorts for their infrastructure hardening operations.",
  },
  {
    name: "Freshworks",
    initial: "F",
    type: "Hiring Partner",
    track: "Cloud Track",
    location: "TN (Tamil Nadu)",
    color: "white",
    desc: "Freshworks recruits cloud-native security talent from our program to secure their SaaS product infrastructure and DevSecOps pipelines.",
  },
  {
    name: "CERT-In",
    initial: "C",
    type: "Govt. Body",
    track: "DFIR Track",
    location: "Govt. of India",
    color: "white",
    desc: "India's national CERT recognizes our DFIR curriculum and provides referral pathways for graduates pursuing government cybersecurity roles.",
  },
  {
    name: "CTS InfoSec",
    initial: "C",
    type: "Hiring Partner",
    track: "VAPT Track",
    location: "Tamil Nadu",
    color: "white",
    desc: "Cognizant Technology Solutions InfoSec arm sources penetration testers and red team operators from our VAPT specialization cohort.",
  },
];

const STATS = [
  { value: "10+", label: "Hiring Partners" },
  { value: "93%", label: "Placement Rate" },
  { value: "₹6L+", label: "Avg. Starting CTC" },
  { value: "30 days", label: "Avg. Time to Offer" },
];

export default function PartnersPage() {
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
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();
      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1, delay: 0.8 })
        .from(split.words, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=0.6")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-20">

        {/* Block 1: Hero */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="HIRING_NETWORK" icon={Network} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            The Zharnyx <br />
            <span className="text-red-500">Collaborated Companies</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 w-full flex flex-col items-center gap-20">

          {/* Subheadline + Stats */}
          <div className="w-full flex flex-col md:flex-row gap-10 items-start max-w-6xl">
            <div className="flex-1">
              <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left font-sans leading-relaxed">
                We don't just train you; we connect you. Our curriculum is directly aligned with the hiring demands of top cybersecurity firms and MNCs across Tamil Nadu and India.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 shrink-0">
              {STATS.map(({ value, label }) => (
                <div key={label} className="border-2 border-white/10 bg-white/2 px-6 py-4 text-center">
                  <p className="text-2xl font-black text-red-500">{value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 2: Partner Grid */}
          {/* <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/10 pb-4">
              <Building2 className="text-red-500" size={24} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">Partner Companies</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PARTNERS.map((p) => (
                <div
                  key={p.name}
                  className="group bg-[#050505] border-2 border-white/10 hover:border-red-500 transition-all duration-300 p-6 flex flex-col gap-5 relative overflow-hidden"
                >
                
                  <div className="absolute -bottom-4 -right-4 text-[80px] font-black text-white/3 group-hover:text-red-500/5 transition-colors leading-none select-none pointer-events-none">
                    {p.initial}
                  </div>
                  <div className="flex items-start justify-between gap-3 z-10">
                   
                    <div className={`w-12 h-12 border-2 flex items-center justify-center font-black text-xl shrink-0 transition-colors ${p.color === "red"
                        ? "border-red-500 bg-red-500/10 text-red-500 group-hover:bg-red-500/20"
                        : "border-white/20 bg-white/5 text-white group-hover:border-red-500 group-hover:text-red-400"
                      }`}>
                      {p.initial}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border ${p.type === "Core Partner"
                          ? "border-red-500/60 text-red-500 bg-red-500/10"
                          : p.type === "Govt. Body"
                            ? "border-sky-500/60 text-sky-400 bg-sky-500/10"
                            : "border-white/20 text-gray-400"
                        }`}>
                        {p.type}
                      </span>
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-red-400 transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[10px] text-gray-600 uppercase tracking-widest">
                        <MapPin size={10} /> {p.location}
                      </span>
                      <span className="text-white/10">|</span>
                      <span className="flex items-center gap-1 text-[10px] text-gray-600 uppercase tracking-widest">
                        <Tag size={10} /> {p.track}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm leading-relaxed font-sans z-10 flex-1">{p.desc}</p>
                </div>
              ))}
            </div>
          </section> */}

          {/* Block 3: Placement CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500 mb-4">For Employers</p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-3">
                Become a collaborated Partner
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed">
                Are you looking for deployment-ready Tier-1 cybersecurity talent? Hire directly from our specialized cohorts — SOC analysts, penetration testers, cloud security engineers, and DFIR investigators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest border-2 border-red-600 hover:-translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]"
              >
                <Mail size={16} />
                Contact Placement Cell
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <Link
                href="/programs"
                className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/20 text-white font-black text-sm uppercase tracking-widest hover:border-white hover:bg-white/5 transition-colors"
              >
                View Our Curriculum
              </Link> */}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
