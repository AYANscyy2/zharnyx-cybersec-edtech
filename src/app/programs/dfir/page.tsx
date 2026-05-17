"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Search, Database, SearchCode, Fingerprint, Lock, ShieldAlert, ArrowRight, PlayCircle, BookOpen, Terminal, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const curriculumData = [
  {
    "month": 1,
    "title": "Digital Forensics Core",
    "weeks": [
      {
        "week": 1,
        "title": "Forensic Methodology and Disk Forensics",
        "theme": "Autopsy · FTK · Evidence acquisition",
        "modules": [
          {
            "id": "M1",
            "title": "Forensic Science Principles — Locard's Exchange and the Digital World",
            "description": "Chain of custody, evidence integrity, write blockers, forensic imaging. The non-negotiable fundamentals.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Disk Imaging — dd, FTK Imager, and Verification Hashing",
            "description": "Creating forensic images, MD5/SHA256 verification, imaging speed vs integrity tradeoffs, storage considerations.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "File System Forensics — NTFS, FAT32, ext4 Deep Dive",
            "description": "MFT analysis, $USN journal, deleted file recovery, timestamps (MACB times), file slack space.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Autopsy Deep Dive — Timeline Analysis, Keyword Search, and Artefact Recovery",
            "description": "Full Autopsy workflow, building timelines, keyword search across images, recovering deleted files and browsing history.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Windows Artefacts — LNK Files, Jump Lists, Shellbags, Recycle Bin",
            "description": "Artefacts that prove user activity even after deletion. Critical for reconstructing attacker and user timelines.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Browser Forensics — History, Cookies, Cache, Downloads Across All Browsers",
            "description": "Chrome, Firefox, Edge artefact locations. Extracting browsing history from SQLite databases manually.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 1 Lab — Acquire and Analyse a Suspect USB Drive Image",
            "description": "Students receive a raw disk image of a USB used in a corporate data theft scenario. Must recover deleted evidence.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 2,
        "title": "Windows Registry and System Forensics",
        "theme": "Registry hives · Execution artifacts · Amcache",
        "modules": [
          {
            "id": "M1",
            "title": "The Windows Registry Structure — Hives, Keys, Values, and Timestamps",
            "description": "How the registry is structured on disk, location of hives, dirty hives and transaction logs, manual parsing concepts.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "System Information and Hardware Artefacts — Registry Forensics Part 1",
            "description": "Extracting OS version, timezone, computer name, network connections, and USB device history via Registry Explorer.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "User Activity and Execution Artefacts — Registry Forensics Part 2",
            "description": "UserAssist, Shellbags, RecentDocs, RunMRU — tracking exactly what a user clicked and executed on the system.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Evidence of Execution Outside Registry — Prefetch, Shimcache, Amcache",
            "description": "The big three execution indicators. Proving a program ran, when it ran, where it ran from, and its size/hash.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Windows Event Log Analysis — Security, System, and Application Logs",
            "description": "Parsing EVTX files, critical event IDs for logons (4624), process creation (4688), service installations (7045).",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Advanced Event Logs — PowerShell, Task Scheduler, WMI Logging",
            "description": "Detecting living-off-the-land techniques through specific operational logs. Finding malicious script blocks.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 2 Lab — Reconstruct a Compromise Timeline Using Windows Artefacts",
            "description": "Students parse registry and event logs from an infected machine to prove when the attacker landed and what they ran.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 3,
        "title": "Linux Forensics and Memory Analysis",
        "theme": "Linux logs · Volatility 3 · RAM triage",
        "modules": [
          {
            "id": "M1",
            "title": "Linux Forensic Architecture — File System, Configuration, and Logs",
            "description": "/var/log analysis, syslog, auth.log, bash history, cron jobs, user management configuration files.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Linux Live Triage and Artefact Collection — LinEnterprise Triage",
            "description": "Using native commands and automation scripts to collect volatile data from a compromised Linux server.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Memory Forensics Concepts — Volatile vs Non-Volatile Data",
            "description": "Why RAM holds the ground truth. What disappears on reboot. Capturing RAM using LiME (Linux) and FTK Imager (Windows).",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Volatility 3 Framework — Process Trees and Network Connections in RAM",
            "description": "Mastering Volatility commands: pslist, pstree, psscan, netscan. Finding hidden processes and active C2 connections.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Advanced Memory Analysis — Code Injection, Rootkits, and Malicious Drivers",
            "description": "Malfind command deep dive. Detecting injected code, DLL injection, hook detection, extracting suspicious binaries from RAM.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Extracting Credentials and Configuration Data From Memory",
            "description": "Dumping LSASS process from memory, pulling Wi-Fi passwords, finding encryption keys and active configuration files.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 3 Lab — Analyse a Memory Dump From a Ransomware-Infected Host",
            "description": "Students run Volatility 3 on a provided RAM capture to identify the parent malware process, its C2 IP, and injected DLLs.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 4,
        "title": "Network Forensics and Month 1 Capstone",
        "theme": "PCAP analysis · Wireshark · Zeek · Report writing",
        "modules": [
          {
            "id": "M1",
            "title": "Network Forensic Collection — Full Packet Capture vs NetFlow vs Metadata",
            "description": "When to use each data source, collection architectures, performance and storage impacts of network logging.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Wireshark Mastery for Incident Responders — Advanced Filtering and Streams",
            "description": "Display filters, follow TCP/HTTP streams, extracting objects from PCAPs, bandwidth graphs, identifying anomalous traffic protocol spikes.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Automated Traffic Analysis — Zeek (Bro) Log Parsing and Extraction",
            "description": "Navigating Zeek conn.log, dns.log, http.log, files.log. Using command line tools (awk, grep, jq) to parse metadata.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Detecting Malicious Network Patterns — C2 Beacons, Exfiltration, Tunneling",
            "description": "Spotting repetitive beacon intervals, data exfiltration over DNS/ICMP, identifying Cobalt Strike traffic patterns.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Forensic Report Writing Standards — Presenting Evidence to Courts vs Executives",
            "description": "Executive summaries, evidence preservation sections, technical analysis, conclusions. Maintaining legal defensibility.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Chain of Custody and Evidence Management Workflow Documentation",
            "description": "Documenting your forensic process step-by-step. Standard operating procedures (SOPs) for enterprise DFIR labs.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 1 Capstone — Full Forensic Investigation and Legally Defensible Report",
            "description": "Students receive a disk image + network capture of an insider threat case. Must investigate and submit formal report.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 2,
    "title": "Incident Response and Advanced Analysis",
    "weeks": [
      {
        "week": 5,
        "title": "Enterprise Incident Response and Triage",
        "theme": "KAPE · Velociraptor · Enterprise triage",
        "modules": [
          {
            "id": "M1",
            "title": "Enterprise IR Frameworks — NIST SP 800-61 vs ISO/IEC 27035",
            "description": "Preparation, Detection/Analysis, Containment/Eradication, Post-Incident Activity. Real-world incident lifecycle management.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Rapid Triage Concepts — Why Full Disk Imaging Fails in Enterprise IR",
            "description": "The need for speed. Collecting only critical forensic targets. Live response vs dead response in multi-thousand host networks.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "KAPE (Kroll Artefact Parser and Extractor) — Automating Artifact Collection",
            "description": "Targets and Modules configurations. Collecting all Windows execution and system artefacts across a fleet in under 2 minutes.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Velociraptor — Open-Source Enterprise Hunting and Endpoint Triage",
            "description": "Deploying Velociraptor, creating hunts, collecting artifacts from hundreds of machines simultaneously via VQL (Velociraptor Query Language).",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Enterprise Threat Hunting — Searching for Lateral Movement and Persistence",
            "description": "Hunting for unauthorized scheduled tasks, unexpected service creation, local admin additions across enterprise networks.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Scoping an Incident — Identifying the Extent of a Breach",
            "description": "Patient Zero discovery, lateral movement tracking, timeline synchronization across multiple compromised enterprise hosts.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 5 Lab — Execute a Fleet-Wide Hunt for a Hidden Attacker Backdoor",
            "description": "Students use Velociraptor to hunt across a 20-node simulated network to find and isolate an active threat actor.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 6,
        "title": "Malware Analysis for Incident Responders",
        "theme": "Static analysis · Dynamic analysis · Flare-VM",
        "modules": [
          {
            "id": "M1",
            "title": "Malware Analysis Goals — Identification, IOC Extraction, Scope Verification",
            "description": "Why IR analysts do malware analysis. Basic vs advanced splits. Safety protocols: sandboxing and isolation.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Basic Static Analysis — Hashes, Strings, PE Headers, and Packing Detection",
            "description": "Using PEview, Pestudio, strings, Detect It Easy. Finding compiled functionality, strings, imported APIs without execution.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Setting Up an Isolated Malware Analysis Lab — Flare-VM and Remnux",
            "description": "Configuring secure host-only networking, snapshots, simulating internet services with INetSim and FakeNet-NG safely.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Basic Dynamic Analysis — Monitoring File System, Registry, and Network Activity",
            "description": "Running malware safely while tracking with Procmon, Process Hacker, Regshot, Wireshark. Finding host mutations.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Analyzing Common Infection Vectors — Malicious Documents, Scripts, and ISOs",
            "description": "Deobfuscating malicious VBA macros, PowerShell loaders, LNK-based payloads, and OneNote execution paths.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Extracting IOCs From Malware for SIEM and EDR Ingestion",
            "description": "Creating actionable detection indicators (IPs, domains, registry keys, hashes) from raw laboratory sample run logs.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 6 Lab — Basic Static and Dynamic Analysis of a Real Malware Sample",
            "description": "Students detonate an unknown executable in a safe lab sandbox, determine its function, and extract all infrastructure C2 IOCs.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 7,
        "title": "Cloud Forensics and Incident Response",
        "theme": "AWS IR · Azure logs · Container breaches",
        "modules": [
          {
            "id": "M1",
            "title": "Cloud Forensics Challenges — The Loss of Physical Media Control",
            "description": "Ecosystem changes, API-based evidence tracking, ephemeral infrastructure, logs as primary target vs disk captures.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "AWS Incident Response — CloudTrail, GuardDuty, and VPC Flow Logs Analysis",
            "description": "Parsing massive CloudTrail JSON layers, identifying compromised IAM credentials, finding malicious AWS API calls via Athena.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "AWS Endpoint Acquisition — Forensic Snapshots of EC2 Instances",
            "description": "Isolating compromised instances network-side, taking EBS snapshots, attaching snapshots to forensic workstations for parsing.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Azure AD (Entra ID) and Office 365 Breach Investigations",
            "description": "Tracking sign-in logs, unified audit logs (UAL), discovering malicious mail forwarding configurations, OAuth app abuse analysis.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Container and Kubernetes Forensics — Investigating Microservices Breaches",
            "description": "Reviewing container runtime logs, auditing cluster entry points, capturing active container storage allocations on node compromise.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Automated Cloud IR Architectures — Security Playbooks and Lambdas",
            "description": "Designing automated response configurations: auto-revoking credentials on leak, automated instance isolation patterns.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 7 Lab — Investigate an Multi-Stage AWS Enterprise Environment Breach",
            "description": "Students parse complex CloudTrail datasets to map an attacker's movement from compromised access keys to data database exfil.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 8,
        "title": "Advanced Threat Hunting and Month 2 Capstone",
        "theme": "Complex attack chains · Log synthesis · Threat hunt",
        "modules": [
          {
            "id": "M1",
            "title": "Advanced Threat Hunting — Formulating Hypotheses from Intelligence Data",
            "description": "Translating indicators into behavioral hunting scripts. Hunting beyond standard single-host alert boundaries.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Synthesizing Host, Network, and Application Logs for Consolidated Analysis",
            "description": "Correlating endpoint process events with network traffic flow timelines to identify silent command and control tunnels.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Investigating Advanced Living-off-the-Land Attack Frameworks",
            "description": "Tracking administrative tool abuse: uncovering malicious WMI tracking, WinRM tunneling, and scheduled persistence loops.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Memory Forensics at Scale — Fleet Profiling and Deviation Hunting",
            "description": "Using automation scripts to compare volatile memory states across production blocks to identify outliers.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Month 2 Assessment Technical Review",
            "description": "Comprehensive practical prep question set matching major advanced incident handling concepts taught across Month 1 and 2.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Incident Timeline Visualization Techniques — Plaso and Log2Timeline",
            "description": "Processing structural system disk dumps through automated parsing loops to generate master CSV chronological threat timelines.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Month 2 Capstone — Enterprise Threat Hunting and Multi-Host Response Simulation",
            "description": "Students handle an untracked, complex network-wide simulation block: hunt endpoints, identify entry vectors, and contain threats.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 3,
    "title": "Real-World Practice, Certification and Career",
    "weeks": [
      {
        "week": 9,
        "title": "Real-World IR Cases and Ransomware Response",
        "theme": "Ransomware negotiation · Live breach simulations",
        "modules": [
          {
            "id": "M1",
            "title": "Anatomy of a Modern Ransomware Incident — From Initial Access to Extortion",
            "description": "The current ransomware landscape: access brokers, double extortion models, threat actor groups (LockBit, BlackCat TTPs).",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Handling the Golden Hour — The Critical First 60 Minutes of a Breach",
            "description": "Emergency triage protocols, when to pull network plugs, containment strategies without altering critical forensic traces.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Log Analysis for Ransomware Incidents — Tracking Exfiltration Targets",
            "description": "Analyzing file server access logs, firewall configurations, Rclone usage, mega.nz upload artifacts to prove data leakage.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Legal and Compliance Reporting Requirements — CERT-In Notifications",
            "description": "Understanding compliance laws in India, required timelines for cyber incident notifications to government centers.",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Ransomware Negotiation and Recovery Lifecycle Management",
            "description": "Understanding how response firms interact with actors, insurance mechanics, decryption tool validation, recovery pathing.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Post-Incident Eradication and Environment Hardening Frameworks",
            "description": "Safely rebuilding Active Directory structures, mass password resets, configuration remediation to block re-entry.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 9 Lab — Reconstruct a Corporate Ransomware Attack Lifecycle",
            "description": "Students receive a multi-system corporate triage dump and must determine exactly when exfil occurred and sample entry vectors.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 10,
        "title": "Interview Preparation and DFIR Portfolio",
        "theme": "Resume · Mock interviews · Indian consulting market",
        "modules": [
          {
            "id": "M1",
            "title": "Structuring the Professional DFIR Resume for Consulting vs Enterprise SOC Roles",
            "description": "Highlighting analysis tools, laboratory process knowledge, and documentation capabilities clearly for top-tier hiring firms.",
            "type": "Career"
          },
          {
            "id": "M2",
            "title": "Top 40 Forensic and Incident Handling Technical Interview Questions",
            "description": "Deep-dive scenario question structures asked by global consulting groups and managed security providers. Answer breakdowns.",
            "type": "Career"
          },
          {
            "id": "M3",
            "title": "Building a Defensible Public Portfolio — Case Study Documentation and Tools",
            "description": "How to legally document non-proprietary investigation walk-throughs and scripts on open channels to show hands-on competency.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Navigating the Indian DFIR Hiring Landscape — Big 4, MDRs, and Banks",
            "description": "Analyzing service provider tiers, internal response engineering paths, and typical corporate entry tracking patterns.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Expert Witness Testimony Basics and Digital Forensic Ethics",
            "description": "How forensic analysts report evidence within legal systems, cross-examination rules, maintaining absolute data neutrality.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "The DFIR Career Matrix — Analyst to Incident Commander to Advisory Director",
            "description": "Mapping long-term professional skill needs, compensation brackets, and specialization choices across modern handling domains.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Week 10 Lab — Live Case Confrontation Mock Interview with Feedback Loops",
            "description": "45-minute proctored mock interview challenge: students defend an investigation finding timeline directly to a senior consulting lead.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 11,
        "title": "ZDF Certification Preparation",
        "theme": "Comprehensive review · Investigation prep · Mock exams",
        "modules": [
          {
            "id": "M1",
            "title": "ZDF Examination Operational Formats and Scoring Weights",
            "description": "Breakdown of the formal evaluation matrix: 90-minute technical theory block paired with a 6-hour forensic laboratory case.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Comprehensive Review Block 1 — Artifact Analysis and Storage Parsing",
            "description": "Synthesis of host filesystem tracks, Registry pathways, Windows/Linux operation logging indicators, and memory states.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Comprehensive Review Block 2 — Network Flow, Cloud Metrics, Malware Tracking",
            "description": "Consolidated review of traffic pattern parsing, CloudTrail structures, and isolated static sandbox execution indicators.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "ZDF Mock Technical Theory Exam Evaluation",
            "description": "Full-length timed practice challenge matching real exam conditions, complete with deep structural answer rationales.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "ZDF Mock Practical Lab Prep — 6-Hour Simulation Workblock",
            "description": "Rigorous mock run: students extract multi-source system evidence, run baseline timelines, and structure report formats.",
            "type": "Capstone"
          },
          {
            "id": "M6",
            "title": "Targeted Competency Reconstruction and Guided Fix Blocks",
            "description": "Personalized mentor interactive support targeted at clearing trace gaps or analysis delays discovered during mock testing.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Exam-Day Time Optimization and Evidence Note-Taking Strategy",
            "description": "Best practices for maintaining clean data logs under tight timelines, structure mapping, and report template styling.",
            "type": "Career"
          }
        ]
      },
      {
        "week": 12,
        "title": "ZDF Certification Exam and Graduation",
        "theme": "Exam · Certification · Placement launch",
        "modules": [
          {
            "id": "M1",
            "title": "ZDF Theory Exam — 40 Questions, 90 Minutes",
            "description": "Proctored theory examination covering all 3 months of DFIR curriculum. Covers forensic methodology, tools, IR frameworks, and malware analysis. Pass mark: 70%.",
            "type": "Capstone"
          },
          {
            "id": "M2",
            "title": "ZDF Practical Exam — 6-Hour Forensic Investigation With Report Submission",
            "description": "Proctored practical: students receive multi-source evidence and must produce a complete, legally-formatted forensic investigation report.",
            "type": "Capstone"
          },
          {
            "id": "M3",
            "title": "ZDF Certificate Issued — Zharnyx Digital Forensics Certification",
            "description": "Digital certificate with unique ID and QR verification. Shared with hiring partners. LinkedIn post template and endorsement request guide provided.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Placement Kickoff — Profile Submission to Zharnyx Hiring Partners",
            "description": "Resume reviewed and submitted to active hiring partner network across DFIR, IR consulting, and managed security firms. Interview scheduling begins.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Graduation — Cohort Celebration and Zharnyx Dragons Alumni Badge",
            "description": "Cohort graduation session, alumni Discord access, mentorship continuity for 90 days, Zharnyx Dragons badge for LinkedIn and GitHub.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "30-Day Post-Graduation Job Search Support",
            "description": "Weekly mentor check-ins, job application review, interview preparation support, continued lab and tool access for 30 days post-graduation.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Continuous Learning Path — From ZDF to GCFE, GCFA, and Malware Analysis",
            "description": "GCFE and GCFA preparation roadmap, advanced malware analysis course recommendations, threat intelligence career pathway.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function DFIRPage() {
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
          <SectionBadge ref={badgeRef} text="PHASE 2 · SPECIALIZATION" icon={Search} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            DFIR — Digital Forensics <span className="text-red-500">Core Track</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            3 Months · Weeks 1–12 · The science of investigating breaches. Master disk forensics, memory analysis, and enterprise incident response. Target Role: DFIR Analyst.
          </p>

          <section className="w-full flex flex-col gap-24">
            {curriculumData.map((month) => (
              <div key={month.month} className="flex flex-col gap-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4 border-b-2 border-white/20 pb-6">
                  <span className="text-6xl md:text-7xl font-black text-red-500 opacity-80 leading-none">M{month.month}</span>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">{month.title}</h2>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mt-2">4 Weeks · 28 Modules</p>
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
            href="/certifications"
            className="group w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-white/10 hover:border-red-500 bg-white/5 hover:bg-red-500/5 p-6 transition-all mt-8"
          >
            <div className="shrink-0 px-3 py-1 border border-red-500/60 text-red-500 text-xs font-black uppercase tracking-widest">
              ZDF
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Zharnyx Digital Forensics Certification</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                This track is engineered to prepare you for the upcoming <span className="text-white font-bold">ZDF</span> (Zharnyx Digital Forensics) certification — a massive 6-hour practical exam where you will reconstruct a full enterprise breach timeline.
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap">
              View Certifications <ArrowRight size={12} />
            </span>
          </Link>

          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Secure Your Spot</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Enroll in the DFIR Track</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/auth?callbackUrl=/checkout/internship"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
              >
                Apply for Cohort
              </Link>
              <Link
                href="/programs"
                className="px-8 py-4 border-2 border-white/20 text-white font-bold text-lg uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                View All Programs <ArrowRight size={18} />
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
  const isChallenge = module.id === "M7" || module.id === "Z3" || module.type.toLowerCase() === "capstone";
  
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
