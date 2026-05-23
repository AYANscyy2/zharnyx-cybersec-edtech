"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Check, Shield, Terminal, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export default function PricingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router=useRouter()
  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      // Split heading into lines and words — same as /about
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      // Set overflow hidden on line-masks
      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: everything hidden
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      // 1. Badge appears
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      })
        // 2. Words slide up
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        }, "-=0.6")
        // 3. Reveal the rest of the content
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8");

      return () => { split.revert(); };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-24 overflow-hidden font-mono bg-[#000000] text-white">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-8">
          <SectionBadge ref={badgeRef} text="Investment in Your Future" icon={Shield} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-white uppercase leading-[1.1] text-balance">
            Affordable By <br />
            <span className="text-[#E60000]">
              Design
            </span>
          </h1>
        </section>

        <div ref={contentRef} className="w-full flex flex-col items-center gap-24 opacity-0">
          
          {/* Phase 1: Foundations */}
          <section className="w-full flex flex-col gap-10">
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white shrink-0">Phase 1: Foundations</h2>
              <div className="h-[2px] w-full bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Gateway */}
              <PricingCard
                title="Week 0 Free Gateway"
                tagLabel="FREE FOREVER"
                price="₹0"
                subtext="7 modules · no card needed · certificate on completion"
                color="white"
                features={[
                  "The Invisible War — real breach stories",
                  "4 domain intro: SOC, VAPT, DFIR, Cloud",
                  "Career & salary reality session",
                  "Track recommendation quiz",
                  "Week 0 shareable certificate",
                  "Gateway to enrollment — always free"
                ]}
              />

              {/* Trial */}
              <PricingCard
                title="Month 1 — Foundations L1"
                tagLabel="TRIAL — RISK FREE"
                price="₹499"
                priceSuffix="/ first month"
                subtext="28 modules · 4 weeks · ZF-1 preview cert"
                color="white"
                features={[
                  "Networking: DNS, TCP/IP, Wireshark lab",
                  "Linux & Windows OS security",
                  "Security fundamentals & CIA triad",
                  "Track decision week (Week 4)",
                  "ZF-1 certificate preview on completion"
                ]}
              />

              {/* Most Popular */}
              <PricingCard
                title="Foundations L2 & L3"
                tagLabel="MOST POPULAR"
                price="₹699"
                priceSuffix="/ month"
                subtext="₹998 total · 56 modules · ZF certification"
                color="red"
                highlight
                features={[
                  "Python & Bash scripting for security",
                  "Web app security — OWASP Top 10, Burp Suite",
                  "Threat intelligence & SIEM fundamentals",
                  "Cloud basics & compliance frameworks",
                  "Active Directory & enterprise networking",
                  "Zharnyx Foundations (ZF) certification"
                ]}
              />
            </div>
          </section>

          {/* Phase 2: Specialization & Experience */}
          <section className="w-full flex flex-col gap-10">
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white shrink-0">Phase 2: Specialization & Experience</h2>
              <div className="h-[2px] w-full bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
              {/* Core Track */}
              <PricingCard
                title="SOC / VAPT / DFIR / Cloud Security"
                tagLabel="CORE TRACK"
                price="₹2,699"
                priceSuffix="/ 3 months total"
                subtext="Pick 1 track · ₹999/mo billed monthly OR ₹2,699 upfront"
                color="white"
                features={[
                  "All labs — unlimited access for 3 months",
                  "AI doubt-solving tutor included",
                  "Completion certificate: ZSA / ZPT / ZDF / ZCS",
                  "LinkedIn skill badge on completion",
                  "Job board access — Zharnyx placement network",
                  "Live mentor sessions — 2 per month"
                ]}
              />

              {/* Internship */}
              <PricingCard
                title="Online Internship — Any 1 Track"
                tagLabel="INTERNSHIP ADD-ON"
                price="₹499"
                priceSuffix="/ 1 month"
                subtext="AI, Cloud, Cyber, Data Analytics, DevOps · 25 real projects"
                color="white"
                features={[
                  "Pick 1 real-world problem from 25 in your track",
                  "4 mentor check-ins across 4 weeks",
                  "GitHub portfolio project — yours to keep",
                  "Walkthrough video + written documentation",
                  "Verified internship certificate (48-hr issuance)",
                  "Resume-ready project with mentor sign-off"
                ]}
              />
            </div>
          </section>


          {/* FAQ Section */}
          <section className="w-full max-w-4xl flex flex-col gap-8 mt-12">
            <div className="text-left mb-4">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <Terminal className="text-[#E60000]" /> Pricing FAQ
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <FaqItem
                q="Is the pricing final?"
                a="Yes, the prices shown include 18% GST. There are no surprise infrastructure fees, hidden lab costs, or extra charges at the end of the program."
              />
              <FaqItem
                q="What does 'Student Trust Framework' mean?"
                a="It means we don't lock you into massive upfront payments. You can try the Month 1 Trial with minimal risk before committing to the full Foundations or Core Tracks."
              />
              <FaqItem
                q="Are there EMI options?"
                a="Yes! We partner with NBFCs to provide No-Cost EMI options for 3, 6, and 9 months to make sure finances don't block your tech career."
              />
              <FaqItem
                q="Can I get a refund?"
                a="We offer a 7-day money-back guarantee for the Foundation Phase if you feel the training style isn't right for you. Subsequent specialized phases are non-refundable once content access is granted."
              />
            </div>
          </section>

          {/* Final CTA */}
          <section className="flex flex-col items-center text-center mt-12 space-y-10 border-t border-white/10 pt-20 w-full">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase text-balance leading-[1.1]">
              Ready to Invest in Your <span className="text-[#E60000]">Future?</span>
            </h2>
            <p className="text-gray-400 max-w-xl font-bold uppercase tracking-widest text-sm">
              Limited seats per cohort. Secure your spot today.
            </p>
            <button
              onClick={() => router.push("/programs")}
              className="group relative px-12 py-5 bg-[#E60000] text-white font-black text-sm uppercase tracking-widest hover:-translate-y-1 transition-transform shadow-[0_10px_0_0_#ffffff] cursor-pointer rounded-none flex items-center gap-3"
            >
              Explore Courses<ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

function PricingCard({ 
  title, 
  tagLabel, 
  price, 
  priceSuffix, 
  subtext, 
  highlight, 
  features, 
  color 
}: { 
  title: string, 
  tagLabel: string, 
  price: string, 
  priceSuffix?: string, 
  subtext: string, 
  highlight?: boolean, 
  features: string[], 
  color: "white" | "red" | "gray" 
}) {
  const borderColor = highlight ? "border-[#E60000]" : "border-white/20";
  const shadowColor = highlight ? "shadow-[8px_8px_0px_0px_#E60000]" : "hover:border-white/50";
  const tagColor = highlight ? "bg-[#E60000] text-white border-[#E60000]" : "bg-white/5 text-gray-300 border-white/20";

  return (
    <div className={`flex flex-col p-8 border-2 ${borderColor} bg-[#000000] relative transition-all duration-300 hover:-translate-y-2 ${shadowColor} rounded-none`}>
      
      {highlight && (
        <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 bg-[#E60000] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] border-2 border-[#E60000] shadow-[2px_2px_0px_0px_white] whitespace-nowrap z-10">
          Most Popular
        </div>
      )}

      <div className="mb-6 flex flex-col items-start gap-4">
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] border ${tagColor}`}>
          {tagLabel}
        </span>
        <h3 className="text-xl md:text-2xl font-black text-white leading-tight">{title}</h3>
      </div>

      <div className="mb-8 border-b border-white/10 pb-8 flex-col flex gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-black text-[#E60000]">{price}</span>
          {priceSuffix && <span className="text-gray-400 text-sm font-bold">{priceSuffix}</span>}
        </div>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-wide leading-relaxed">{subtext}</p>
      </div>

      <ul className="flex-1 space-y-4 mb-10">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={18} className="text-[#E60000] shrink-0 mt-0.5" strokeWidth={3} />
            <span className="text-gray-300 text-sm font-medium leading-relaxed">{feat}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => toast.info("Enrollment will be live soon")}
        className={`w-full py-4 text-center font-black text-sm uppercase tracking-[0.15em] border-2 transition-all cursor-pointer rounded-none ${highlight
          ? "bg-[#E60000] text-white border-[#E60000] hover:bg-transparent"
          : "bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5"
          }`}
      >
        Select Plan
      </button>
    </div>
  )
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-white/10 bg-[#000000] overflow-hidden transition-colors hover:border-white/30 rounded-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-hidden"
      >
        <h4 className="text-base md:text-lg font-bold text-white pr-8">{q}</h4>
        <div className="shrink-0 text-[#E60000]">
          {open ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
        </div>
      </button>

      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="text-gray-400 text-sm md:text-base border-t border-white/10 pt-4 leading-relaxed font-medium">
          {a}
        </p>
      </div>
    </div>
  )
}
