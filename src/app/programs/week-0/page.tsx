"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Unlock, ShieldAlert, ArrowRight, PlayCircle, BookOpen, Terminal, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const curriculumData = [
  {
    "month": 0,
    "title": "The Hook & Orientation",
    "weeks": [
      {
        "week": 0,
        "title": "The Hook",
        "theme": "Free · Certificate on completion · Gateway to enrollment",
        "modules": [
          {
            "id": "M1",
            "title": "The Invisible War — What Hackers Are Doing Right Now",
            "description": "Real-time breach stories, live threat maps, why every company on earth is a target. Students feel the urgency immediately.",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "What Is Cybersecurity — The 4 Domains That Protect the World",
            "description": "SOC, VAPT, DFIR, Cloud Security — explained with stories, not jargon. Students understand the full landscape in 20 minutes.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "A Day in the Life — SOC Analyst, Ethical Hacker, Forensics Investigator, Cloud Security Engineer",
            "description": "4 career paths, 4 mini-stories. Real job scenarios. Students start imagining themselves in these roles.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "How Hackers Think — The Attacker Mindset (No Jargon)",
            "description": "Social engineering, phishing, basic recon explained through real-world stories. No tools needed — pure mindset shift.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "The Salary Reality — Cybersecurity Jobs in India and Global",
            "description": "Honest numbers: fresher salaries, 2-year growth, remote opportunities, global demand. Connects learning to income.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Your First Look Inside — What You Will Learn at Zharnyx",
            "description": "Walkthrough of the full learning journey, what foundations build, what core tracks deliver, what certifications mean.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Your Cybersecurity Readiness — Mini Assessment + Certificate",
            "description": "Short interactive quiz, personalized track recommendation, shareable Zharnyx Week 0 certificate. The conversion trigger.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function WeekZeroPage() {
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

      tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1 })
        .from(split.words, { yPercent: 100, opacity: 0, duration: 1.2, stagger: 0.2 }, "-=0.6")
        .to(contentRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-20">

        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <SectionBadge ref={badgeRef} text="FREE GATEWAY" icon={Unlock} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Week 0 — <span className="text-red-500">Free Gateway</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            1 Week · 7 Modules · Free Forever. Begin your journey into cybersecurity without spending a dime. Understand the attacker mindset, explore career paths, and earn your first certificate.
          </p>

          <section className="w-full flex flex-col gap-24">
            {curriculumData.map((month) => (
              <div key={month.month} className="flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4 border-b-2 border-white/20 pb-6">
                  <span className="text-6xl md:text-7xl font-black text-red-500 opacity-80 leading-none">W0</span>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">{month.title}</h2>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mt-2">1 Week · 7 Modules</p>
                  </div>
                </div>

                <div className="flex flex-col gap-16">
                  {month.weeks.map((week) => (
                    <div key={week.week} className="flex flex-col gap-6">
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold uppercase text-white tracking-wider flex items-center gap-4">
                          <span className="bg-red-600/20 text-red-500 border border-red-600/50 px-3 py-1 text-sm">WEEK {week.week}</span>
                          {week.title}
                        </h3>
                        <p className="text-gray-400 font-mono text-base mt-2 border-l-2 border-white/20 pl-3 ml-1">{week.theme}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {week.modules.map((mod) => (
                          <ModuleCard key={mod.id} module={mod} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <Link
            href="/auth?callbackUrl=/waitlist"
            className="group w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-white/10 hover:border-red-500 bg-white/5 hover:bg-red-500/5 p-6 transition-all mt-8"
          >
            <div className="shrink-0 px-3 py-1 border border-red-500/60 text-red-500 text-xs font-black uppercase tracking-widest">
              CERT
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Week 0 Certification</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Complete the mini-assessment at the end of Week 0 to earn a shareable Zharnyx certificate and get a personalized track recommendation based on your strengths.
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap">
              Get Certified <ArrowRight size={12} />
            </span>
          </Link>

          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Start Your Journey</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Free Forever. No Credit Card Required.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/auth?callbackUrl=/waitlist"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
              >
                Start Week 0 Free
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function getIconForType(type: string) {
  switch (type.toLowerCase()) {
    case "demo":
      return <PlayCircle className="text-red-500" size={18} />;
    case "theory":
      return <BookOpen className="text-blue-500" size={18} />;
    case "lab":
      return <Terminal className="text-green-500" size={18} />;
    case "career":
      return <Briefcase className="text-purple-500" size={18} />;
    case "capstone":
      return <ShieldAlert className="text-red-600" size={18} />;
    default:
      return <Target className="text-gray-500" size={18} />;
  }
}

function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case "demo":
      return "text-red-400 bg-red-400/10 border-red-400/20";
    case "theory":
      return "text-blue-400 bg-blue-400/10 border-blue-400/20";
    case "lab":
      return "text-green-400 bg-green-400/10 border-green-400/20";
    case "career":
      return "text-purple-400 bg-purple-400/10 border-purple-400/20";
    case "capstone":
      return "text-red-500 bg-red-600/20 border-red-500/50";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
}

function ModuleCard({ module }: { module: any }) {
  const isChallenge = module.id === "M7" || module.type.toLowerCase() === "capstone";
  
  return (
    <div className={`p-5 bg-black border-2 transition-all flex flex-col gap-3 group relative overflow-hidden ${isChallenge ? "border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] md:col-span-2 lg:col-span-3 bg-red-600/5 hover:translate-x-1 hover:-translate-y-1" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}>
      {isChallenge && (
        <div className="absolute top-0 right-0 bg-red-600 text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
          Milestone
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider border ${getTypeColor(module.type)}`}>
          {getIconForType(module.type)}
          <span>{module.type}</span>
        </div>
        <span className="text-white/20 font-black text-xl">{module.id}</span>
      </div>
      <h3 className={`font-bold uppercase tracking-tight text-white mt-2 leading-tight ${isChallenge ? 'text-xl md:text-2xl' : 'text-base md:text-lg'}`}>
        {module.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed font-sans mt-auto">{module.description}</p>
    </div>
  )
}
