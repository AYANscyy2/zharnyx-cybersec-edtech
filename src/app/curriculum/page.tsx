"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Terminal } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

type Category = "All" | "Foundation" | "SOC" | "VAPT" | "Cloud" | "DFIR" | "Career";

const FILTERS: Category[] = ["All", "Foundation", "SOC", "VAPT", "Cloud", "DFIR", "Career"];

const CURRICULUM_DATA = [
  { week: 1, category: "Foundation", title: "Linux Fundamentals & CLI Mastery", tools: "Ubuntu, VirtualBox" },
  { week: 2, category: "Foundation", title: "Windows Administration & AD Basics", tools: "Windows Server, PowerShell" },
  { week: 3, category: "Foundation", title: "Virtualization & Lab Environment", tools: "VirtualBox, VMware" },
  { week: 4, category: "Foundation", title: "OS Hardening & Security Baselines", tools: "PFSense, Iptables" },
  { week: 5, category: "Foundation", title: "Networking Fundamentals & OSI Model", tools: "Packet Tracer" },
  { week: 6, category: "Foundation", title: "Wireshark & Packet Capture Analysis", tools: "Wireshark, tcpdump" },
  { week: 7, category: "Foundation", title: "Python for Cybersecurity (Scripting)", tools: "Python, VS Code" },
  { week: 8, category: "Foundation", title: "Cryptography & PKI Basics", tools: "OpenSSL, GPG" },
  { week: 9, category: "Foundation", title: "Web Technologies & REST APIs", tools: "Burp proxy, Postman" },
  { week: 10, category: "Foundation", title: "Database Concepts & Basic SQL", tools: "MySQL, SQLite" },
  { week: 11, category: "Foundation", title: "Cloud Fundamentals (AWS/Azure)", tools: "AWS Console, Azure Portal" },
  { week: 12, category: "Foundation", title: "Foundation Capstone Project", tools: "Integrated Labs" },

  { week: 13, category: "SOC", title: "Splunk & Microsoft Sentinel (SOC)", tools: "Splunk, Sentinel, SPL, KQL" },
  { week: 14, category: "SOC", title: "Dashboard Design & Alert Triage (SOC)", tools: "Splunk Dashboards" },
  { week: 15, category: "SOC", title: "Alert Triage — 50 Alerts Exercise (SOC)", tools: "SIEM platforms" },
  { week: 16, category: "SOC", title: "SLA Tracking & SOC Metrics (SOC)", tools: "SIEM, ticketing" },
  { week: 17, category: "SOC", title: "MITRE ATT&CK & Sigma Rules (SOC)", tools: "MITRE Navigator, Sigma" },
  { week: 18, category: "SOC", title: "Zeek, Suricata & NSM (SOC)", tools: "Zeek, Suricata" },

  { week: 19, category: "VAPT", title: "OSINT & Reconnaissance (VAPT)", tools: "Maltego, Shodan, Nmap" },
  { week: 20, category: "VAPT", title: "Active Scanning & Enumeration (VAPT)", tools: "Nessus, OpenVAS" },
  { week: 21, category: "VAPT", title: "Web Application Pentesting (VAPT)", tools: "Burp Suite Pro, OWASP ZAP" },
  { week: 22, category: "VAPT", title: "Network Exploitation (VAPT)", tools: "Metasploit, CrackMapExec" },

  { week: 23, category: "Cloud", title: "AWS Security & IAM Policies (Cloud)", tools: "AWS CLI, CloudTrail" },
  { week: 24, category: "Cloud", title: "Azure Security Center & Misconfigs (Cloud)", tools: "Azure AD, Defender" },

  { week: 25, category: "DFIR", title: "Memory Forensics & Malware Triage (DFIR)", tools: "Volatility, FTK Imager" },
  { week: 26, category: "DFIR", title: "Incident Response Playbooks (DFIR)", tools: "TheHive, Cortex XSOAR" },

  { week: 27, category: "Career", title: "Resume Building & ATS Optimization", tools: "LinkedIn, GitHub" },
  { week: 28, category: "Career", title: "Demo Day & Placement Support", tools: "Mock Interviews, Portfolios" },
];

export default function CurriculumPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
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

  const filteredData = CURRICULUM_DATA.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 font-sans bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none fixed"></div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <SectionBadge ref={badgeRef} text="FULL CURRICULUM" icon={Terminal} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
            28 Weeks. <span className="text-red-500">Every Detail.</span>
          </h1>

          <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-12 w-full">
            <p className="text-lg text-gray-400 font-medium max-w-2xl">
              Filter by phase or track. Every week shows objectives, tools, and deliverables.
            </p>

            {/* Filters */}
            <section className="flex flex-wrap justify-center gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-all ${activeFilter === filter
                    ? "bg-[#ff3b3b] text-white shadow-[0_0_15px_rgba(255,59,59,0.3)]"
                    : "bg-transparent text-gray-400 border border-white/20 hover:border-white/50 hover:text-white"
                    }`}
                >
                  {filter}
                </button>
              ))}
            </section>

            {/* Curriculum Horizontal List */}
            <section className="w-full mt-12">
              <div className="flex flex-col gap-4">
                {filteredData.map((item) => (
                  <div
                    key={`week-${item.week}`}
                    className="bg-[#080808] border border-white/5 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 group hover:border-red-500/30 transition-all hover:bg-white/2"
                  >
                    {/* Week Indicator */}
                    <div className="flex flex-col items-start md:items-center min-w-[100px] shrink-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#ff3b3b] mb-1">
                        PROTOCOL_PHASE
                      </span>
                      <span className="text-2xl md:text-3xl font-black text-white">
                        W_{item.week.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="bg-white/5 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-gray-500 border border-white/10">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg md:text-xl leading-tight group-hover:text-red-500 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Tools Section */}
                    <div className="flex flex-col items-start md:items-end min-w-[200px] shrink-0 gap-2">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                        Required_Toolkit
                      </span>
                      <div className="flex flex-wrap md:justify-end gap-2 text-xs font-mono">
                        {item.tools.split(', ').map(tool => (
                          <span key={tool} className="text-gray-400 bg-white/5 px-2 py-1 rounded-sm border border-white/5">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
