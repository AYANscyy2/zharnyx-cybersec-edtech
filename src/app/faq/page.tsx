"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  Shield,
  CreditCard,
  BookOpen,
  Briefcase,
  Award,
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import Link from "next/link";

gsap.registerPlugin(SplitText);

const FAQ_CATEGORIES = [
  {
    id: "program",
    label: "Program",
    icon: BookOpen,
    faqs: [
      {
        q: "What is the Zharnyx Internship Program?",
        a: "Zharnyx is a lab-first cybersecurity internship designed for college students and working professionals in Tamil Nadu. You get a dedicated specialization track (SOC, VAPT, Cloud Security, or DFIR), real-world lab scenarios, mentor-led guidance, and a certificate upon completion.",
      },
      {
        q: "Who is eligible to apply?",
        a: "Anyone 18+ from Tamil Nadu who is seriously committed to building a career in cybersecurity. You don't need prior experience — just a strong drive to learn. We evaluate based on motivation, not marks.",
      },
      {
        q: "How long is the internship?",
        a: "The foundation internship runs for 1 month (Tier 1). Extended tracks run for 3 months or 6 months depending on the tier you enroll in.",
      },
      {
        q: "Is this online or offline?",
        a: "The program is primarily online with structured weekly lab sessions, live mentor calls, and async module access. Physical workshops across TN (Tamil Nadu) are conducted quarterly.",
      },
      {
        q: "What are the 4 specialization tracks?",
        a: "We offer: (1) SOC Analyst — real-time threat detection & SIEM operations. (2) VAPT — ethical hacking, pen testing web/mobile/network. (3) Cloud Security — AWS/Azure security architecture & hardening. (4) DFIR — digital forensics & incident response.",
      },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
    faqs: [
      {
        q: "What is the fee structure?",
        a: "Tier 1 (1 month) starts at ₹3,500 + 18% GST = ₹4,130 total. Extended tiers have their own pricing visible on the checkout page. We believe good security education should be affordable.",
      },
      {
        q: "Can I pay later after registering?",
        a: "Yes. We offer a 'Register Now, Pay Later' option that unlocks Week 0 (orientation content). Full course content is unlocked upon payment completion.",
      },
      {
        q: "Are there any scholarships or discounts?",
        a: "We offer merit-based discounts and referral credits. If you're from an economically weaker background, reach out to us directly at support@zharnyx.in — we handle it case by case.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept UPI, debit/credit cards, and net banking via our secure payment gateway. All transactions are encrypted and GST compliant.",
      },
    ],
  },
  {
    id: "learning",
    label: "Learning",
    icon: Shield,
    faqs: [
      {
        q: "Do I need my own laptop?",
        a: "Yes — a laptop with at least 8GB RAM and 50GB free disk space is recommended for lab environments. We'll guide you through setting up your lab on day one.",
      },
      {
        q: "What tools and platforms will I use?",
        a: "You'll work with industry-standard tools: Kali Linux, Wireshark, Burp Suite, Splunk, Metasploit, AWS/Azure sandboxes, Autopsy (forensics), and more depending on your track.",
      },
      {
        q: "How are labs structured?",
        a: "Labs are broken into weekly missions. Each mission has a briefing, hands-on tasks inside a sandboxed environment, a debrief session with your mentor, and a submission checklist.",
      },
      {
        q: "Is there a live component or is it all self-paced?",
        a: "Both. Module content is async and available 24/7. Weekly live sessions with mentors are scheduled every Saturday for doubt resolution and live CTF challenges.",
      },
    ],
  },
  {
    id: "career",
    label: "Career",
    icon: Briefcase,
    faqs: [
      {
        q: "Will I get a certificate?",
        a: "Yes. Upon completion, you'll receive a Zharnyx Completion Certificate with your track specialization. Advanced tiers also include a Zharnyx Certification Authority credential (industry-mapped).",
      },
      {
        q: "Do you help with placement?",
        a: "We partner with companies in TN (Tamil Nadu) actively hiring for cybersecurity roles. Top performers get direct referrals, resume review sessions, and mock interview prep.",
      },
      {
        q: "How experienced are the mentors?",
        a: "Our mentors are working professionals with 3–10 years in the field — SOC analysts, pen testers, cloud security engineers, and DFIR specialists at active companies. Not academics — practitioners.",
      },
      {
        q: "What roles can I target after completion?",
        a: "Depending on your track: SOC Analyst (L1/L2), Junior Penetration Tester, Cloud Security Associate, Incident Responder, Junior Forensic Analyst. Several of our graduates are placed in Tier 1 IT firms in Tamil Nadu.",
      },
    ],
  },
];

export default function FAQPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState("program");

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
        .from(split.words, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.2 }, "-=0.6")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;
  const totalFaqs = FAQ_CATEGORIES.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="Frequently Asked Questions" icon={HelpCircle} className="translate-y-5 opacity-0" />
          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Every Question,{" "}
            <br />
            <span className="text-red-500">Answered.</span>
          </h1>
        </section>

        <div ref={contentRef} className="relative w-full flex flex-col items-center gap-24 opacity-0">

          {/* Category Tabs + Accordion */}
          <section className="w-full space-y-8">
            {/* Tab Nav */}
            <div className="flex flex-wrap gap-3">
              {FAQ_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 border-2 font-bold uppercase text-xs tracking-widest transition-all duration-200 ${
                      isActive
                        ? "border-red-600 bg-red-600/10 text-red-500 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.4)]"
                        : "border-white/20 bg-white/5 text-gray-400 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <Icon size={14} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Accordion */}
            <div className="space-y-3">
              {activeData.faqs.map((item, i) => {
                const key = `${activeCategory}-${i}`;
                const isOpen = !!openItems[key];
                return (
                  <div
                    key={key}
                    className={`border-2 transition-all duration-300 ${
                      isOpen ? "border-red-500 bg-red-950/10" : "border-white/15 bg-white/3 hover:border-white/30"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                    >
                      <span className={`font-bold text-sm md:text-base uppercase tracking-wide transition-colors ${isOpen ? "text-red-400" : "text-white group-hover:text-red-400"}`}>
                        {item.q}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180 text-red-500" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="border-l-2 border-red-600 pl-5 py-1">
                          <p className="text-gray-300 text-sm leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Stats Row */}
          <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Questions Answered", value: `${totalFaqs}+` },
              { label: "Specialization Tracks", value: "4" },
              { label: "Mentor Experience", value: "3–10 Yrs" },
              { label: "Placement Partners", value: "Active" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 border-2 border-white/20 flex flex-col gap-1 hover:border-red-500 transition-colors group">
                <span className="text-3xl md:text-4xl font-black text-red-500 group-hover:text-white transition-colors">{stat.value}</span>
                <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">{stat.label}</span>
              </div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="w-full flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <MessageSquare className="text-red-500" size={32} />
                Still Have a Question?
              </h2>
              <div className="space-y-4 text-gray-300 border-l-2 border-red-600 pl-6 py-2">
                <p>
                  Our team responds to every genuine inquiry. If you aren't sure whether cybersecurity is right for you, reach out and we'll tell you straight.
                </p>
                <p>
                  <strong>No sales pitch.</strong> Just honest guidance on whether Zharnyx is the right fit for your goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-black font-bold uppercase tracking-wider text-sm border-2 border-red-600 hover:translate-x-1 hover:translate-y-1 transition-transform group relative"
                >
                  <span className="absolute inset-0 bg-white translate-x-1.5 translate-y-1.5 -z-10 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                  Contact Us <ArrowRight size={16} />
                </Link>
                <Link
                  href="/auth?mode=signup"
                  className="flex items-center gap-2 px-6 py-3 bg-transparent text-white font-bold uppercase tracking-wider text-sm border-2 border-white/30 hover:border-white transition-colors"
                >
                  Enroll Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full bg-red-600/10 border-2 border-red-600 p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award size={20} className="text-red-500" /> Quick Facts
              </h3>
              <p className="text-gray-300 font-medium font-mono text-sm leading-relaxed">
                &gt; Applications open year-round.<br />
                &gt; New cohorts start monthly.<br />
                &gt; All mentors are active practitioners.<br />
                &gt; No hidden fees. Ever.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
