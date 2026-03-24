"use client";

import Link from "next/link";
import { Shield, Crosshair, Cloud, Search, ArrowRight } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";

const TRACKS = [
  {
    icon: Shield,
    color: "blue",
    title: "SOC Analyst",
    skills: [
      "Splunk & Sentinel",
      "MITRE ATT&CK Framework",
      "Threat Hunting",
      "Incident Response",
    ],
    hires: "TCS, Infosys, Chennai GCCs",
  },
  {
    icon: Crosshair,
    color: "red",
    title: "Offensive Security (VAPT)",
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
  blue: "border-blue-500 text-blue-500 bg-blue-500/10",
  red: "border-red-500 text-red-500 bg-red-500/10",
  sky: "border-sky-400 text-sky-400 bg-sky-400/10",
  purple: "border-purple-500 text-purple-500 bg-purple-500/10",
};

const hoverMap: Record<string, string> = {
  blue: "hover:border-blue-500",
  red: "hover:border-red-500",
  sky: "hover:border-sky-400",
  purple: "hover:border-purple-500",
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
    childSelector: ".track-card",
  });

  return (
    <section className="w-full py-24 px-6 font-mono bg-black">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
        <div ref={headerRef} className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-white text-black font-bold uppercase tracking-widest text-xs border-2 border-white shadow-[4px_4px_0px_0px_red]">
            Choose Your Track
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Find Your Cybersecurity{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Specialisation
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
              <div
                key={track.title}
                className={`track-card group flex flex-col gap-6 p-8 bg-[#050505] border-2 border-white/10 ${hoverMap[track.color]} transition-colors`}
              >
                <div className={`p-3 border-2 w-fit ${colorMap[track.color]}`}>
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-black uppercase text-white leading-tight">
                  {track.title}
                </h3>

                <ul className="flex-1 space-y-2">
                  {track.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-gray-400 text-sm flex items-start gap-2"
                    >
                      <span className="text-red-500 font-bold mt-0.5">›</span>
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t-2 border-white/10">
                  <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-1">
                    Hires at
                  </p>
                  <p className="text-gray-400 text-sm">{track.hires}</p>
                </div>

                <Link
                  href="/programs"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors"
                >
                  Explore Track{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
