"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Terminal } from "lucide-react";

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
          <div ref={badgeRef} className="translate-y-5 flex items-center gap-2 px-4 py-1.5 bg-white text-black font-bold uppercase tracking-widest text-xs border-2 border-white shadow-[4px_4px_0px_0px_red]">
            <Terminal size={14} strokeWidth={3} />
            <span>FULL CURRICULUM</span>
          </div>

          <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
            28 Weeks. <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">Every Detail.</span>
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

            {/* Curriculum Grid */}
            <section className="w-full mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  <div
                    key={`week-${item.week}`}
                    className="bg-[#080808] border border-white/10 rounded-xl p-6 flex flex-col gap-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase">
                      <span className="text-[#ff3b3b]">Week {item.week}</span>
                      <span className="text-gray-600">{item.category}</span>
                    </div>

                    <h3 className="text-white font-bold text-lg leading-snug">
                      {item.title}
                    </h3>

                    <div className="mt-auto text-sm font-mono pt-4">
                      <span className="text-[#ff3b3b]">Tools: </span>
                      <span className="text-gray-500">{item.tools}</span>
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
