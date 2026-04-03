"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowRight, GraduationCap, MapPin, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const HUBS = [
  {
    region: "Chennai Hub",
    color: "red",
    colleges: [
      "Anna University",
      "SSN College of Engineering",
      "Rajalakshmi Engineering College",
      "Saveetha Engineering College",
      "Hindustan Institute of Technology",
      "SRM Institute of Science & Technology",
      "Velammal Engineering College",
      "Sri Sairam Engineering College",
    ],
  },
  {
    region: "Coimbatore Hub",
    color: "red",
    colleges: [
      "PSG College of Technology",
      "Coimbatore Institute of Technology (CIT)",
      "Sri Krishna College of Engineering",
      "Kongu Engineering College",
      "SNS College of Technology",
      "Amrita School of Engineering",
      "KPR Institute of Engineering & Technology",
    ],
  },
  {
    region: "Trichy & South",
    color: "white",
    colleges: [
      "NIT Trichy",
      "Thiagarajar College of Engineering, Madurai",
      "Mepco Schlenk Engineering College, Virudhunagar",
      "Francis Xavier Engineering College, Tirunelveli",
    ],
  },
  {
    region: "Other Regions",
    color: "white",
    colleges: [
      "Vellore Institute of Technology (VIT)",
      "Sona College of Technology, Salem",
      "Bannari Amman Institute of Technology, Erode",
    ],
  },
];

const STATS = [
  { value: "38", label: "Districts Served" },
  { value: "22+", label: "Partner Colleges" },
  { value: "1000+", label: "Students Enrolled" },
  { value: "100%", label: "Online Access" },
];

export default function CollegesPage() {
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
          <SectionBadge ref={badgeRef} text="ACADEMIC_ALLIANCES" icon={GraduationCap} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
            Empowering <br />
            <span className="text-red-500">Tamil Nadu's Campuses</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 w-full flex flex-col items-center gap-20">

          {/* Subheadline + Stats */}
          <div className="w-full flex flex-col md:flex-row gap-10 items-start max-w-6xl">
            <div className="flex-1">
              <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left font-sans leading-relaxed">
                Serving all 38 districts. From Anna University to local engineering hubs, Zharnyx is upgrading the cybersecurity skill level of students across the state.
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

          {/* Block 2: College Directory */}
          <section className="w-full space-y-8">
            <div className="flex items-center gap-4 border-b-2 border-white/10 pb-4">
              <BookOpen className="text-red-500" size={24} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">College Directory</h2>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600 border border-white/10 px-2 py-1 ml-auto">
                Tamil Nadu · 38 Districts
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HUBS.map((hub) => (
                <div
                  key={hub.region}
                  className={`bg-[#050505] border-2 p-6 flex flex-col gap-4 ${
                    hub.color === "red" ? "border-red-600/40" : "border-white/10"
                  }`}
                >
                  {/* Hub Header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className={`flex items-center gap-2 ${hub.color === "red" ? "text-red-500" : "text-gray-400"}`}>
                      <MapPin size={14} />
                      <span className="text-xs font-black uppercase tracking-widest">{hub.region}</span>
                    </div>
                    <span className="ml-auto text-[10px] text-gray-700 font-bold uppercase tracking-widest">
                      {hub.colleges.length} colleges
                    </span>
                  </div>

                  {/* College List */}
                  <ul className="flex flex-col gap-2">
                    {hub.colleges.map((college) => (
                      <li key={college} className="flex items-center gap-3 group">
                        <GraduationCap
                          size={12}
                          className={`shrink-0 transition-colors ${
                            hub.color === "red"
                              ? "text-red-500/50 group-hover:text-red-500"
                              : "text-gray-700 group-hover:text-gray-400"
                          }`}
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-sans leading-snug">
                          {college}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Block 3: CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8">
            <div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Users size={16} className="text-red-500" />
                <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">Open to All</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-3">
                Don't see your college?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto font-sans leading-relaxed">
                You don't need formal college affiliation to join our cohorts. If you study in Tamil Nadu, you belong here. Our internships and courses are open to any aspirant ready to work hard.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest border-2 border-red-600 hover:-translate-y-0.5 transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]"
              >
                Enroll as a Student
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/internships"
                className="flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/20 text-white font-black text-sm uppercase tracking-widest hover:border-white hover:bg-white/5 transition-colors"
              >
                View Internships
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
