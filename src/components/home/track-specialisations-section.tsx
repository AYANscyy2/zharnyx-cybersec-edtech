"use client";

import Link from "next/link";
import { Shield, Crosshair, Cloud, Search, ArrowRight } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";

const TRACKS = [
  {
    icon: Shield,
    color: "blue",
    title: "SOC Analyst",
    href: "/programs/soc",
    skills: [
      "Splunk & Sentinel",
      "MITRE ATT&CK Framework",
      "Threat Hunting",
      "Incident Response",
    ],
    hires: "TCS, Infosys, TN (Tamil Nadu) GCCs",
  },
  {
    icon: Crosshair,
    color: "red",
    title: "Offensive Security (VAPT)",
    href: "/programs/vapt",
    skills: [
      "Web Pentesting",
      "Network Pentesting",
      "Active Directory Attacks",
      "Bug Bounty Methodology",
    ],
    hires: "Big 4, Startups",
  },
  {
    icon: Cloud,
    color: "sky",
    title: "Cloud Security",
    href: "/programs/cloud-security",
    skills: [
      "AWS / Azure Security",
      "Identity & IAM",
      "Container Security",
      "Cloud Governance",
    ],
    hires: "MNCs, Cloud Providers",
  },
  {
    icon: Search,
    color: "purple",
    title: "Digital Forensics & IR",
    href: "/programs/dfir",
    skills: [
      "Memory Forensics",
      "Registry Analysis",
      "Malware Analysis",
      "Evidence Handling",
    ],
    hires: "Law Enforcement, Banks",
  },
];

const colorMap: Record<string, string> = {
  blue: "text-blue-500 bg-blue-500/10",
  red: "text-red-500 bg-red-500/10",
  sky: "text-sky-400 bg-sky-400/10",
  purple: "text-purple-500 bg-purple-500/10",
};

const hoverMap: Record<string, string> = {
  blue: "hover:border-blue-500 hover:shadow-[8px_8px_0px_0px_#3b82f6] hover:-translate-x-2 hover:-translate-y-2",
  red: "hover:border-red-500 hover:shadow-[8px_8px_0px_0px_#ef4444] hover:-translate-x-2 hover:-translate-y-2",
  sky: "hover:border-sky-400 hover:shadow-[8px_8px_0px_0px_#38bdf8] hover:-translate-x-2 hover:-translate-y-2",
  purple: "hover:border-purple-500 hover:shadow-[8px_8px_0px_0px_#a855f7] hover:-translate-x-2 hover:-translate-y-2",
};

const bgHoverMap: Record<string, string> = {
  blue: "from-blue-500/10",
  red: "from-red-500/10",
  sky: "from-sky-400/10",
  purple: "from-purple-500/10",
};

export function TrackSpecialisationsSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  const cardsRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.7,
    delay: 0.1,
    stagger: 0.12,
    childSelector: ".track-anim-wrapper",
  });

  return (
    <section className="w-full py-24 px-6 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4">
          <SectionBadge text="Choose Your Track" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Find your cybersecurity <br />
            <span className="text-red-500">
              specialisation
            </span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <div key={track.title} className="track-anim-wrapper h-full">
                <div
                  className={`track-card h-full group flex flex-col gap-6 p-8 bg-zinc-900/40 rounded-3xl border border-white/5 relative overflow-hidden ${hoverMap[track.color]} transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${bgHoverMap[track.color]} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                  
                  <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-2 overflow-hidden group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <div className={`absolute inset-0 ${colorMap[track.color]} opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl`}></div>
                    <div className={`absolute inset-0 ${colorMap[track.color]} opacity-10 border border-white/10 rounded-2xl`}></div>
                    <Icon size={32} strokeWidth={1.5} className={`relative z-10 ${colorMap[track.color].split(' ')[0]}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-white leading-tight relative z-10">
                    {track.title}
                  </h3>

                  <ul className="flex-1 space-y-3">
                    {track.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-gray-400 text-sm flex items-start gap-3"
                      >
                        <span className="text-red-500 font-bold mt-0.5">›</span>
                        {skill}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-sm text-gray-500 font-medium mb-1">
                      Hires at
                    </p>
                    <p className="text-gray-300 text-sm">{track.hires}</p>
                  </div>

                  <Link
                    href={track.href}
                    className="flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-colors mt-2"
                  >
                    Explore Track{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
