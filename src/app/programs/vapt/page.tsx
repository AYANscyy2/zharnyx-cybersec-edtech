"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Crosshair, Lock, Terminal, ShieldAlert, Cpu, Network, Code, Server, CheckSquare, ArrowRight, PlayCircle, BookOpen, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const curriculumData = [
  {
    "month": 1,
    "title": "Penetration Testing Foundations",
    "weeks": [
      {
        "week": 1,
        "title": "Recon and OSINT for Pentesters",
        "theme": "Passive recon · Active recon · Attack surface mapping",
        "modules": [
          {
            "id": "M1",
            "title": "Penetration Testing Methodology — Scoping, Rules of Engagement, Reporting",
            "description": "Legal framework, scope documents, what makes a pentest legal vs illegal. Professional standards every ethical hacker must know.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Passive OSINT — Building a Target Profile Without Touching the Network",
            "description": "Shodan, Censys, Google dorking, LinkedIn recon, certificate transparency logs, WHOIS, DNS history.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Active Recon — Nmap Mastery, Service Enumeration, OS Fingerprinting",
            "description": "Full Nmap flag coverage, NSE scripts, version detection, timing options, stealth scanning techniques.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Subdomain Enumeration and DNS Recon",
            "description": "Amass, Subfinder, DNSrecon, Certificate Transparency. Finding forgotten subdomains that expose attack surface.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Attack Surface Mapping — From OSINT to a Target Profile",
            "description": "Compiling all recon data into an attack surface map. Prioritising targets. Building the engagement plan.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Vulnerability Scanning — Nessus, OpenVAS, Nuclei",
            "description": "Automated vulnerability discovery, reading scanner output, understanding CVSS scores, triaging false positives.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 1 Lab — Full Recon on a Target Lab Network",
            "description": "Students complete passive + active recon on a provided lab target and submit a full attack surface report.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 2,
        "title": "Web Application Penetration Testing",
        "theme": "Burp Suite · OWASP · SQL injection · Auth attacks",
        "modules": [
          {
            "id": "M1",
            "title": "Burp Suite Pro — Intercepting, Repeating, and Manipulating HTTP Traffic",
            "description": "Proxy setup, Intercept, Repeater, Intruder, Scanner — mastering the single most important VAPT tool.",
            "type": "Lab"
          },
          {
            "id": "M2",
            "title": "SQL Injection — Manual Exploitation and Automated Tools (SQLMap)",
            "description": "Union-based, error-based, blind SQLi — finding and exploiting manually, then with SQLMap. Extraction and escalation.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Cross-Site Scripting — Stored, Reflected, DOM-Based Exploitation",
            "description": "XSS payload crafting, filter bypass techniques, session hijacking via XSS, BeEF framework introduction.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Broken Authentication and Session Management Attacks",
            "description": "JWT attacks, session fixation, cookie manipulation, brute force with Hydra and Burp Intruder.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "IDOR, SSRF, and XXE — Business Logic and Advanced Web Vulnerabilities",
            "description": "Finding and exploiting insecure direct object references, server-side request forgery, XML entity injection.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "API Security Testing — REST, GraphQL, and OAuth Vulnerabilities",
            "description": "API enumeration, broken object-level auth, mass assignment, GraphQL introspection abuse, OAuth token theft.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 2 Lab — Full Web App Pentest on DVWA and HackTheBox Web Challenges",
            "description": "Students complete a structured web app pentest, finding and exploiting multiple vulnerability classes. Report submitted.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 3,
        "title": "Network Penetration Testing",
        "theme": "Exploitation · Metasploit · Pivoting",
        "modules": [
          {
            "id": "M1",
            "title": "Metasploit Framework — From Search to Shell",
            "description": "Module types, exploits vs payloads, meterpreter, post-exploitation modules. The complete Metasploit workflow.",
            "type": "Lab"
          },
          {
            "id": "M2",
            "title": "Service Exploitation — SMB, FTP, SSH, RDP, Web Servers",
            "description": "Exploiting common service vulnerabilities — EternalBlue, misconfigured FTP, SSH key attacks, RDP brute force.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Password Attacks — Cracking, Spraying, and Credential Stuffing",
            "description": "Hashcat, John the Ripper, wordlists, rainbow tables, NTLM hash cracking. Password spray strategies.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Privilege Escalation — Linux and Windows Local PrivEsc Techniques",
            "description": "SUID binaries, sudo misconfigs, kernel exploits (Linux), unquoted service paths, token impersonation (Windows).",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Pivoting and Tunnelling — Moving Through a Network After Initial Access",
            "description": "SSH tunnelling, Chisel, Ligolo, proxychains — reaching internal network segments from an initial foothold.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Post-Exploitation — Persistence, Credential Harvesting, Data Exfiltration",
            "description": "Maintaining access, dumping credentials with Mimikatz, exfiltrating data covertly, cleaning up traces.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 3 Lab — Full Network Pentest on a Multi-Machine Lab Environment",
            "description": "Students compromise an initial foothold, pivot through segments, and reach the domain controller. Full chain required.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 4,
        "title": "Active Directory Attacks and Report Writing",
        "theme": "Kerberoasting · Lateral movement · Professional reports",
        "modules": [
          {
            "id": "M1",
            "title": "Active Directory Enumeration — BloodHound, PowerView, and ADRecon",
            "description": "Mapping AD relationships, finding attack paths to Domain Admin, identifying misconfigurations with BloodHound.",
            "type": "Lab"
          },
          {
            "id": "M2",
            "title": "Kerberoasting, AS-REP Roasting, and Pass the Hash",
            "description": "Extracting and cracking Kerberos tickets, targeting accounts without pre-auth, lateral movement with NTLM hashes.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "DCSync, Golden Ticket, and Silver Ticket Attacks",
            "description": "Replicating domain credentials, forging Kerberos tickets for persistent privileged access. Detection implications.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Professional Pentest Report Writing — Executive Summary to Technical Findings",
            "description": "Report structure, CVSS scoring, remediation recommendations, writing findings that clients actually understand.",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Sample Report Walkthrough — Reading and Writing Like a Senior Pentester",
            "description": "Deconstructing a real pentest report. What separates junior reports from senior reports. Common mistakes.",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Client Communication — Briefing, Debrief, and Remediation Walkthroughs",
            "description": "How to present findings to a client, handling pushback on severity ratings, remediation verification engagements.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 1 Capstone — Full AD Attack Chain + Professional Report",
            "description": "Students compromise an AD lab from initial access to Domain Admin and submit a client-ready pentest report.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 2,
    "title": "Specialised Attack Techniques",
    "weeks": [
      {
        "week": 5,
        "title": "Cloud Penetration Testing",
        "theme": "AWS · Azure · GCP attack paths",
        "modules": [
          {
            "id": "M1",
            "title": "Cloud Pentest Scoping — What's In and Out of Scope on AWS, Azure, GCP",
            "description": "Cloud provider pentest policies, what requires prior approval, responsible disclosure for cloud bugs.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "AWS Attack Paths — IAM Privilege Escalation, S3 Enumeration, EC2 Abuse",
            "description": "Exploiting misconfigured IAM roles, finding open buckets, abusing instance metadata service (IMDSv1 attacks).",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Azure Penetration Testing — Entra ID, ARM Templates, Storage Attacks",
            "description": "Azure-specific attack paths: managed identity abuse, storage account key extraction, RBAC escalation.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Cloud Pentest Tools — ScoutSuite, Prowler, Pacu, ROADtools",
            "description": "Automated cloud security assessment tools. When to use each, how to interpret output, manual validation.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Container and Kubernetes Penetration Testing",
            "description": "Container escapes, K8s RBAC misconfigs, exposed dashboards, secrets in environment variables.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Serverless and Function Attack Surfaces — Lambda, Azure Functions",
            "description": "Injection in serverless functions, event source abuse, IAM over-permissions in serverless architectures.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 5 Lab — Full Cloud Pentest on a Misconfigured AWS Environment",
            "description": "Students assess and exploit a deliberately misconfigured AWS environment from initial access to full account compromise.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 6,
        "title": "Mobile and API Security Testing",
        "theme": "Android · iOS · API attacks",
        "modules": [
          {
            "id": "M1",
            "title": "Mobile App Security Testing — Android Architecture and Attack Surface",
            "description": "APK structure, decompilation with JADX, ADB basics, Android security model, attack surface mapping.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Android Pentest — Static and Dynamic Analysis",
            "description": "MobSF for static analysis, Frida for dynamic instrumentation, traffic interception with Burp on Android.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "iOS Security Testing Basics — App Transport Security, Keychain, Jailbreak",
            "description": "iOS security model, what testers can access, Objection framework for runtime manipulation.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Advanced API Security Testing — OWASP API Top 10",
            "description": "Mass assignment, excessive data exposure, function-level auth bypass, injection in APIs — full OWASP API Top 10 coverage.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "GraphQL Security — Introspection, Injection, and Batching Attacks",
            "description": "GraphQL-specific vulnerabilities and how to test them. An increasingly common attack surface in modern apps.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Thick Client Penetration Testing — Desktop App Security",
            "description": "Intercepting thick client traffic, binary reversing basics, credential storage in desktop apps.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 6 Lab — Mobile + API Pentest on a Vulnerable App",
            "description": "Students test an intentionally vulnerable Android app and its API backend. Full report submitted.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 7,
        "title": "Social Engineering and Physical Security",
        "theme": "Phishing campaigns · Vishing · Physical recon",
        "modules": [
          {
            "id": "M1",
            "title": "Social Engineering in Pentesting — When and How It's Used",
            "description": "Scope and ethics of SE testing, legal considerations, common SE scenarios in professional engagements.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Phishing Campaign Design — GoPhish, Evilginx, and Credential Harvesting",
            "description": "Setting up phishing infrastructure, crafting convincing pretexts, running campaign simulations, measuring results.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Spear Phishing and Whaling — Targeting High-Value Individuals",
            "description": "Personalised phishing using OSINT, crafting emails that bypass MFA awareness, executive impersonation.",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "Vishing and Pretexting — Phone-Based Social Engineering",
            "description": "Building pretexts, conducting vishing simulations, what information employees reveal on calls.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Physical Penetration Testing Basics — Tailgating, Lock Picking, Recon",
            "description": "Physical security assessment concepts, what physical pentests involve, RFID cloning, badge access attacks.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Reporting Social Engineering Findings — Metrics and Recommendations",
            "description": "How to present SE results to clients, click rates, credential submission rates, training recommendations.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 7 Lab — Run a Simulated Phishing Campaign and Analyse Results",
            "description": "Students design, launch, and analyse a phishing simulation in a controlled lab environment. Full metrics report.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 8,
        "title": "Evasion Techniques and Month 2 Capstone",
        "theme": "AV bypass · Detection evasion · Full engagement",
        "modules": [
          {
            "id": "M1",
            "title": "AV and EDR Evasion — How Attackers Bypass Security Tools",
            "description": "Obfuscation, encoding, in-memory execution, custom loaders — understanding evasion so defenders can detect it.",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "Living off the Land Binaries — Attacking With What's Already There",
            "description": "PowerShell, certutil, mshta, regsvr32 — LOLBins that attackers abuse and testers must understand.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "C2 Frameworks — Cobalt Strike Concepts, Sliver, and Havoc",
            "description": "How C2 frameworks work, beaconing, staging, operator tradecraft — understanding attacker infrastructure.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Custom Payload Development Basics — Python and PowerShell Scripting for Pentesters",
            "description": "Writing simple reverse shells, encoding payloads, automating exploitation steps with Python.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Covering Tracks — Log Manipulation, Timestomping, Artefact Cleanup",
            "description": "How attackers hide evidence — and how forensics investigators find it anyway. Both perspectives matter.",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Month 2 Assessment — Technical Review",
            "description": "Comprehensive practice exam covering cloud, mobile, API, SE, and evasion techniques.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 2 Capstone — Full Adversary Simulation Engagement",
            "description": "Students run a complete red team-style engagement: recon, initial access, pivot, AD compromise, C2, and full report.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 3,
    "title": "HackTheBox, CTFs, Certification and Placement",
    "weeks": [
      {
        "week": 9,
        "title": "HackTheBox and Real-World Practice",
        "theme": "HTB machines · TryHackMe · PortSwigger",
        "modules": [
          {
            "id": "M1",
            "title": "HackTheBox Platform Orientation — How to Learn From HTB Machines",
            "description": "Starting point machines, methodology for approaching new boxes, writeup culture, learning from hints without spoiling.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "HTB Easy Machine Walkthroughs — 3 Machines With Full Methodology",
            "description": "Guided walkthroughs of 3 retired easy machines. Methodology focus over tool focus.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "HTB Medium Machine — Student Completes Independently With Mentor Review",
            "description": "Students tackle a medium machine. Mentor reviews approach, methodology, and report quality.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "PortSwigger Web Security Academy — Top 10 Labs Every Pentester Must Complete",
            "description": "Guided completion of the most important PortSwigger labs. Best free web hacking training on the internet.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "CTF Strategy — How to Approach and Win Capture the Flag Competitions",
            "description": "CTF mindset, category strategies (web, crypto, pwn, forensics), how CTF experience translates to job interviews.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Building Your Hacking Portfolio — GitHub, HTB Profile, and Writeups",
            "description": "How to present practical experience publicly. What hiring managers look for in a VAPT candidate's portfolio.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Week 9 Lab — Complete 2 HTB Machines and Submit Full Writeups",
            "description": "Students complete two machines independently and submit professional-quality writeups for review.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 10,
        "title": "Interview Preparation and VAPT Portfolio",
        "theme": "Resume · Mock interviews · Portfolio building",
        "modules": [
          {
            "id": "M1",
            "title": "VAPT Pentester Resume — What Hiring Managers at Indian Firms Look For",
            "description": "Skills section, tools list, how to frame lab and CTF experience professionally, what to never include. Real reviewed examples.",
            "type": "Career"
          },
          {
            "id": "M2",
            "title": "Top 40 VAPT Interview Questions With Model Answers",
            "description": "Technical and scenario-based questions from real Indian pentesting firm interviews. Junior to mid-level coverage with detailed answers.",
            "type": "Career"
          },
          {
            "id": "M3",
            "title": "Building a Public Hacking Portfolio — GitHub, HTB Profile, and CTF Writeups",
            "description": "How to document and publish lab work, write professional CTF writeups, and present a portfolio that hiring managers actually read.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Certifications That Accelerate Hiring — CEH, OSCP, eJPT, CompTIA PenTest+",
            "description": "Honest comparison of each cert — cost, difficulty, Indian market recognition, exam format. How ZPT sits alongside them.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "VAPT Career Paths — Junior Pentester to Lead to Bug Bounty to Red Team",
            "description": "The ethical hacking career ladder, salary bands at each stage, how to move from employed pentesting to freelance and bug bounty.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Networking in Offensive Security — Communities, Twitter/X, Conferences, Bug Bounty Platforms",
            "description": "Null community, OWASP India chapters, HackerOne/Bugcrowd profiles, conferences to attend (c0c0n, PyCon India security track).",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Week 10 Lab — Full Live Mock Technical Interview With Mentor Feedback",
            "description": "45-minute recorded mock interview: scenario round, tool knowledge, methodology walkthrough. Written feedback provided.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 11,
        "title": "ZPT Certification Preparation",
        "theme": "Full revision · Practice exam · 24-hour lab simulation",
        "modules": [
          {
            "id": "M1",
            "title": "ZPT Exam Format and Scoring — What to Expect",
            "description": "Exam structure, theory section (50 questions), 24-hour practical lab rules, report submission requirements, pass criteria (70%), retake policy.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Full Revision — Recon, Web App, Network Pentest, AD Attacks",
            "description": "Month 1 comprehensive review — all tools, all techniques, all methodology steps. Practice questions and flashcards included.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Full Revision — Cloud, Mobile, API, SE, and Evasion Techniques",
            "description": "Month 2 advanced topic revision. Focus on areas where students typically lose marks. Mapped to ZPT exam objectives.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "ZPT Theory Practice Exam — 50 Questions Timed",
            "description": "Full mock theory exam under timed conditions. All questions reviewed and explained with detailed answer rationale after submission.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "ZPT Practice Lab — 24-Hour Compromise Challenge",
            "description": "Full exam simulation: students receive a multi-machine lab and 24 hours to compromise, pivot, and produce a client-ready report.",
            "type": "Capstone"
          },
          {
            "id": "M6",
            "title": "Weak Area Remediation — Targeted Revision Based on Practice Results",
            "description": "Personalised gap-close session based on practice exam and lab performance. Focused re-drilling of weak techniques before the real exam.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Pre-Exam Strategy — Time Management, Lab Approach, and Report Template",
            "description": "Exam-day strategy: how to approach machines in order, time boxing, note-taking during the lab, report writing speed techniques.",
            "type": "Career"
          }
        ]
      },
      {
        "week": 12,
        "title": "ZPT Certification Exam and Graduation",
        "theme": "Exam · ZPT Certificate · Placement launch · Alumni",
        "modules": [
          {
            "id": "M1",
            "title": "ZPT Theory Exam — 50 Questions, 90 Minutes",
            "description": "Proctored theory examination covering all 3 months of VAPT curriculum. Pass mark: 70%.",
            "type": "Capstone"
          },
          {
            "id": "M2",
            "title": "ZPT Practical Exam — 24-Hour Live Lab Compromise",
            "description": "Proctored 24-hour lab: multi-machine network, students must enumerate, exploit, pivot, escalate, and submit a professional pentest report.",
            "type": "Capstone"
          },
          {
            "id": "M3",
            "title": "ZPT Certificate Issued — Zharnyx Penetration Testing Certification",
            "description": "Digital certificate with unique ID and QR verification code. Shared with hiring partners. LinkedIn post template provided.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Placement Kickoff — Profile Submission to Zharnyx Hiring Partners",
            "description": "Resume reviewed and submitted to active hiring partner network. Interview scheduling begins within 5 working days.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Graduation — Cohort Celebration and Zharnyx Dragons Alumni Badge",
            "description": "Cohort graduation session, alumni Discord access, mentorship continuity, Zharnyx Dragons badge for LinkedIn and GitHub.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "30-Day Post-Graduation Job Search Support",
            "description": "Weekly mentor check-ins, job application review, interview preparation support, continued lab access for 30 days post-graduation.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Continuous Learning Path — From ZPT to OSCP and Beyond",
            "description": "OSCP preparation roadmap, bug bounty getting-started guide, red team career pathway, recommended advanced courses and platforms.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function VAPTPage() {
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
          <SectionBadge ref={badgeRef} text="PHASE 2 · SPECIALIZATION" icon={Crosshair} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            VAPT — Ethical Hacking <span className="text-red-500">Core Track</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            3 Months · Weeks 1–12 · Think like an attacker. Master web, network, and Active Directory penetration testing with industry-standard tools and real-world bug bounty methodology. Target Role: Ethical Hacker.
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
              ZPT
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Zharnyx Penetration Tester Certification</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Master these skills to challenge the upcoming <span className="text-white font-bold">ZPT</span> (Zharnyx Penetration Tester) practical exam — a live red team operation against an isolated lab network. No MCQs. Ever.
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap">
              View Certifications <ArrowRight size={12} />
            </span>
          </Link>

          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Secure Your Spot</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Enroll in the VAPT Track</p>
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
