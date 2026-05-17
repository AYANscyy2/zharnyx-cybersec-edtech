"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Lock, ArrowRight, PlayCircle, BookOpen, Terminal, Briefcase, Target } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

const curriculumData = [
  {
    "month": 1,
    "title": "The Trial That Converts",
    "source_citation": "[cite: 1]",
    "weeks": [
      {
        "week": 1,
        "title": "How the Internet Actually Works",
        "theme": "Networking foundations",
        "source_citation": "[cite: 2]",
        "modules": [
          {
            "id": "M1",
            "title": "From Click to Server — The Journey of a Web Request",
            "description": "DNS, HTTP, TCP/IP explained through the story of opening a website. Visual + storytelling approach. [cite: 3]",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "IP Addresses, Subnets and Ports — What They Mean in Plain English",
            "description": "IPv4/IPv6, public vs private IPs, port numbers. Use cases from real attacks and real services. [cite: 3]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Protocols Deep Dive — TCP, UDP, ICMP, ARP",
            "description": "How data travels, why it matters for security, where attackers exploit each protocol. [cite: 3]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Firewalls, Routers and Switches — The Network's Security Gates",
            "description": "What each device does, how they protect networks, how attackers bypass them. [cite: 3]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Wireshark Lab — See Real Network Traffic with Your Own Eyes",
            "description": "Hands-on: capture packets, read a HTTP request, spot something suspicious. First real tool experience. [cite: 3]",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "VPNs, Proxies and Encryption — How Data Gets Protected in Transit",
            "description": "SSL/TLS, HTTPS, VPN tunneling — why these exist and what breaks when they fail. [cite: 3]",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 1 Challenge — Trace an Attack Through a Network",
            "description": "Scenario-based challenge: students trace a simulated attack path using what they learned. Badge on completion. [cite: 3]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 2,
        "title": "Operating Systems for Security Professionals",
        "theme": "Linux + Windows security",
        "source_citation": "[cite: 4]",
        "modules": [
          {
            "id": "M1",
            "title": "Why Linux Is the Language of Security",
            "description": "Why every hacker and defender lives in Linux. Terminal basics, file system structure, why it matters. [cite: 5]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Linux Command Line — 20 Commands Every Security Pro Must Know",
            "description": "Hands-on: ls, cd, grep, cat, chmod, ps, netstat and more. Real security use cases for each. [cite: 5]",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "File Permissions, Users and Privilege — How Linux Protects (and Fails)",
            "description": "chmod, sudo, root access, privilege escalation basics — the concepts every core track needs. [cite: 5]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Windows Security Architecture — How the OS Defends Itself",
            "description": "Registry, Active Directory basics, Windows Event Logs, UAC — what attackers target most in enterprise. [cite: 5]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Processes, Services and Memory — What's Running on Your Machine",
            "description": "Task Manager vs Process Explorer, identifying malicious processes, memory injection basics. [cite: 5]",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Log Analysis Basics — Reading the Story an OS Tells",
            "description": "Windows Event Viewer, Linux /var/log — what normal looks like, what malicious activity looks like. [cite: 5]",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 2 Challenge — Hunt a Suspicious Process in a Simulated System",
            "description": "Guided scenario: students find a hidden process and trace its activity. Core SOC + DFIR skill preview. [cite: 5]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 3,
        "title": "Security Fundamentals Every Pro Must Know",
        "theme": "Core security concepts",
        "source_citation": "[cite: 6]",
        "modules": [
          {
            "id": "M1",
            "title": "CIA Triad — Confidentiality, Integrity, Availability Explained Through Real Breaches",
            "description": "Every security decision maps to these three pillars. Case studies from real incidents. [cite: 7]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Authentication vs Authorization — The Most Exploited Confusion in Security",
            "description": "Passwords, MFA, OAuth, session tokens — how they work, how they fail, how attackers exploit gaps. [cite: 7]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Cryptography Foundations — Encryption Without the Math Headache",
            "description": "Symmetric vs asymmetric encryption, hashing, digital signatures — explained through stories and real examples. [cite: 7]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "The Attack Lifecycle — How Every Hack Actually Happens (MITRE ATT&CK Preview)",
            "description": "Recon → weaponize → deliver → exploit → persist → exfil. The kill chain every security pro must internalize. [cite: 7]",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Malware Types — Viruses, Trojans, Ransomware, RATs, Rootkits",
            "description": "What each type does, real examples, how defenders detect and respond. No code — pure concepts. [cite: 7]",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Social Engineering — The Human Vulnerability That No Firewall Can Patch",
            "description": "Phishing, vishing, pretexting, baiting — real attack scripts, how to recognize and defend. [cite: 7]",
            "type": "Demo"
          },
          {
            "id": "M7",
            "title": "Week 3 Challenge — Analyze a Simulated Phishing Attack End-to-End",
            "description": "Students get a fake phishing email + landing page and must identify every technique used. Scored exercise. [cite: 7]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 4,
        "title": "Intro to All 4 Tracks (The Decision Week)",
        "theme": "SOC · VAPT · DFIR · Cloud preview",
        "source_citation": "[cite: 8]",
        "modules": [
          {
            "id": "M1",
            "title": "What SOC Analysts Actually Do — A Real Shift Walkthrough",
            "description": "Alerts, triage, escalation — students experience a simulated SOC shift in 20 minutes. [cite: 9]",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "What Ethical Hackers Actually Do — A Pentest in 20 Minutes",
            "description": "Recon → scan → exploit → report. High-level walkthrough of a real VAPT engagement. [cite: 9]",
            "type": "Demo"
          },
          {
            "id": "M3",
            "title": "What Digital Forensics Investigators Do — Solving a Cybercrime",
            "description": "Evidence collection, chain of custody, artifact analysis — told like a detective story. [cite: 9]",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "What Cloud Security Engineers Do — Protecting AWS, Azure, GCP",
            "description": "Misconfigurations, IAM failures, real cloud breaches — what the job looks like day-to-day. [cite: 9]",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Tools of the Trade — A Visual Map of the Cybersecurity Toolkit",
            "description": "Every major tool across all 4 tracks shown visually. Students start seeing where they want to go. [cite: 9]",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Which Track Is Right for You — Personality, Skills, Career Goals",
            "description": "Interactive questionnaire + track recommendation. Sets up their core track decision confidently. [cite: 9]",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Month 1 Capstone — Foundations Assessment + ZF-1 Certificate Preview",
            "description": "Full month review, scored assessment, preview of Month 2 content. The moment they decide to continue. [cite: 9]",
            "type": "Lab"
          }
        ]
      }
    ]
  },
  {
    "month": 2,
    "title": "TECHNICAL DEPTH",
    "source_citation": "[cite: 10, 11]",
    "weeks": [
      {
        "week": 5,
        "title": "Scripting and Automation for Security",
        "theme": "Python + Bash basics",
        "source_citation": "[cite: 12]",
        "modules": [
          {
            "id": "M1",
            "title": "Why Security Pros Must Know Scripting (Even a Little)",
            "description": "Automation in SOC, VAPT scripts, forensics parsing — real use cases that make the case for learning. [cite: 13]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Python in 20 Minutes — Variables, Loops, Functions for Security Use",
            "description": "Absolute basics. Students write their first Python script for a security task by end of module. [cite: 13]",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "File Handling and Log Parsing with Python",
            "description": "Read a log file, extract IPs, count events — real SOC automation skill in beginner-friendly steps. [cite: 13]",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Bash Scripting for Linux Security Tasks",
            "description": "Automate user checks, file permission audits, log monitoring — all with simple bash scripts. [cite: 13]",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Regular Expressions — The Security Analyst's Secret Weapon",
            "description": "Pattern matching in logs, emails, payloads. Learn regex through real threat hunting examples. [cite: 13]",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "API Basics — How Security Tools Talk to Each Other",
            "description": "REST APIs, JSON, how SIEMs and threat intel platforms exchange data. Foundation for all 4 core tracks. [cite: 13]",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 5 Lab — Build a Simple Log Analyzer in Python",
            "description": "Students build a working Python script that reads a log file and flags suspicious IPs. Real output. [cite: 13]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 6,
        "title": "Web Application Security Fundamentals",
        "theme": "How the web gets attacked",
        "source_citation": "[cite: 14]",
        "modules": [
          {
            "id": "M1",
            "title": "How Web Apps Work — Frontend, Backend, Database in Plain English",
            "description": "HTTP requests, sessions, cookies, APIs — the anatomy of a web app from a security perspective. [cite: 15]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "OWASP Top 10 — The 10 Ways Web Apps Get Hacked Most",
            "description": "Injection, broken auth, XSS, IDOR — explained with story-based examples. No code required yet. [cite: 15]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "SQL Injection — The Attack That Has Stolen Millions of Records",
            "description": "What it is, how it works, real examples, how defenders detect it. Conceptual + visual demo. [cite: 15]",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "Cross-Site Scripting — How Attackers Hijack Your Browser",
            "description": "Stored vs reflected XSS, how session stealing works, how WAFs defend against it. [cite: 15]",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Burp Suite Introduction — The Web Hacker's Swiss Army Knife",
            "description": "Setup, intercepting requests, modifying parameters — first look at the most important VAPT tool. [cite: 15]",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Authentication Attacks — Brute Force, Credential Stuffing, Password Spraying",
            "description": "How attackers crack logins, what defenders implement to stop them. Detection + prevention. [cite: 15]",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 6 Lab — Find Vulnerabilities in a Deliberately Broken Web App (DVWA)",
            "description": "Hands-on: Students identify SQL injection and XSS in a safe practice environment. First real ethical hacking taste. [cite: 15]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 7,
        "title": "Threat Intelligence and Security Operations",
        "theme": "SOC + Blue Team foundations",
        "source_citation": "[cite: 16]",
        "modules": [
          {
            "id": "M1",
            "title": "What Is Threat Intelligence — IOCs, TTPs, and Threat Actors",
            "description": "Understanding IOCs (IPs, hashes, domains), how SOC teams use them, major threat actor groups. [cite: 17]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "SIEM Fundamentals — What It Is, Why SOCs Can't Live Without It",
            "description": "Log aggregation, correlation rules, alert generation — how SIEMs work conceptually before touching one. [cite: 17]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Alert Triage — How to Tell Real Threats from False Positives",
            "description": "The decision framework every SOC analyst uses. Priority scoring, context gathering, escalation criteria. [cite: 17]",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "Incident Response Phases — Prepare, Detect, Contain, Eradicate, Recover",
            "description": "The NIST IR framework in plain English. Walk through a ransomware scenario using each phase. [cite: 17]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Open Source Threat Intel — VirusTotal, AbuseIPDB, Shodan, OSINT Tools",
            "description": "Free tools every analyst uses daily. Students look up real IOCs and understand what the data means. [cite: 17]",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Network Traffic Analysis for Defenders — Reading What Attackers Leave Behind",
            "description": "Pcap analysis, C2 traffic patterns, data exfiltration signatures — Wireshark from defender perspective. [cite: 17]",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 7 Lab — Investigate a Simulated Security Incident from First Alert to Report",
            "description": "End-to-end: students receive an alert, triage it, investigate, and write a basic incident report. [cite: 17]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 8,
        "title": "Cloud, Compliance and the Security Mindset",
        "theme": "Cloud intro + governance",
        "source_citation": "[cite: 18]",
        "modules": [
          {
            "id": "M1",
            "title": "Cloud Basics for Security — AWS, Azure, GCP in Plain English",
            "description": "VPC, IAM, S3, compute — the fundamentals every security person needs before touching cloud security. [cite: 19]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Cloud Misconfigurations — The #1 Cause of Cloud Breaches",
            "description": "Real breaches from misconfigured S3 buckets, open security groups, weak IAM. What went wrong, how. [cite: 19]",
            "type": "Demo"
          },
          {
            "id": "M3",
            "title": "Identity Is the New Perimeter — IAM, Zero Trust, Least Privilege",
            "description": "Why traditional firewalls aren't enough. Zero Trust model, MFA everywhere, identity attack scenarios. [cite: 19]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Compliance Frameworks — GDPR, ISO 27001, SOC 2, IT Act India",
            "description": "What compliance means for security teams, why companies need it, how security work maps to each framework. [cite: 19]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Risk Management Basics — How Organizations Decide What to Protect",
            "description": "Risk assessment, threat modeling, asset prioritization — the business side of cybersecurity. [cite: 19]",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Security Documentation — Writing Reports, Runbooks, and Incident Summaries",
            "description": "How to communicate findings clearly. Every core track needs this skill. Templates + examples. [cite: 19]",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Month 2 Assessment — Technical Knowledge Check",
            "description": "Scored test covering weeks 5–8. Identifies gaps before Month 3. Badge on pass. [cite: 19]",
            "type": "Lab"
          }
        ]
      }
    ]
  },
  {
    "month": 3,
    "title": "CORE TRACK PREPARATION",
    "source_citation": "[cite: 20]",
    "weeks": [
      {
        "week": 9,
        "title": "Advanced Networking and Active Directory",
        "theme": "Enterprise environment foundation",
        "source_citation": "[cite: 21]",
        "modules": [
          {
            "id": "M1",
            "title": "Enterprise Networks — VLANs, DMZ, Network Segmentation",
            "description": "How large organizations structure their networks for security. Why segmentation stops lateral movement. [cite: 22]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Active Directory — The Backbone of Every Windows Enterprise",
            "description": "Domains, OUs, Group Policy, Kerberos authentication — what AD is and why it's the #1 target. [cite: 22]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Active Directory Attacks — Pass the Hash, Kerberoasting, Golden Ticket (Concepts)",
            "description": "Conceptual walkthrough of how AD gets abused. VAPT and SOC students both need this deeply. [cite: 22]",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "IDS, IPS and EDR — Detection Technologies Every Security Pro Must Know",
            "description": "How detection tools work, what they miss, how attackers evade them. SOC + VAPT perspective. [cite: 22]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Vulnerability Management — Scanning, Scoring, Prioritizing (CVSS Explained)",
            "description": "How vulnerabilities are discovered, rated, and fixed in organizations. VAPT foundation skill. [cite: 22]",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Nmap Lab — Network Discovery and Service Enumeration",
            "description": "First Nmap scan, understanding output, identifying open ports and services. Core recon skill. [cite: 22]",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 9 Challenge — Map an Enterprise Network and Identify Attack Surface",
            "description": "Students scan a lab environment, document findings, and present an attack surface summary. [cite: 22]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 10,
        "title": "Digital Forensics and Evidence Handling Basics",
        "theme": "DFIR foundation",
        "source_citation": "[cite: 23]",
        "modules": [
          {
            "id": "M1",
            "title": "What Is Digital Forensics — The Science of Cyber Investigation",
            "description": "Types of forensics (disk, memory, network, mobile), chain of custody, legal admissibility basics. [cite: 24]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "File Systems and Data Storage — Where Evidence Hides",
            "description": "NTFS, ext4, FAT — how files are stored and deleted. Why deleted files aren't always gone. [cite: 24]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Memory Forensics Basics — What RAM Reveals About an Attack",
            "description": "Volatile evidence, memory dumps, what investigators find in RAM that doesn't exist on disk. [cite: 24]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Browser and Email Artifacts — What Users Leave Behind",
            "description": "History, cookies, downloads, email headers — the forensics of human digital behavior. [cite: 24]",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Autopsy Lab — First Look at a Real Forensics Tool",
            "description": "Setup and basic investigation in Autopsy. Students find a planted file in a disk image. [cite: 24]",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Windows Registry Forensics — The System's Secret Diary",
            "description": "What the registry stores, what attackers modify, how investigators read attacker activity from it. [cite: 24]",
            "type": "Demo"
          },
          {
            "id": "M7",
            "title": "Week 10 Challenge — Investigate a Simulated Malware Infection",
            "description": "Students receive a compromised disk image and must identify what happened, when, and how. [cite: 24]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 11,
        "title": "Cloud Security Deep Dive + Container Security",
        "theme": "Cloud track preparation",
        "source_citation": "[cite: 25]",
        "modules": [
          {
            "id": "M1",
            "title": "Shared Responsibility Model — What Cloud Providers Protect vs What You Must",
            "description": "AWS, Azure, GCP responsibility breakdown. The #1 concept every cloud security role requires. [cite: 26]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "IAM Deep Dive — Roles, Policies, Service Accounts, Attack Paths",
            "description": "How identity misconfigurations lead to full cloud account compromise. Real attack scenarios. [cite: 26]",
            "type": "Demo"
          },
          {
            "id": "M3",
            "title": "Container Security — Docker, Kubernetes and What Can Go Wrong",
            "description": "Container escapes, image vulnerabilities, K8s misconfigs — the modern cloud attack surface. [cite: 26]",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Cloud Logging and Monitoring — CloudTrail, Azure Monitor, GCP Audit Logs",
            "description": "What cloud logs capture, how defenders use them, what attackers try to hide in them. [cite: 26]",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Cloud VAPT Basics — Assessing Cloud Environments for Security Gaps",
            "description": "Common assessment techniques, tools like ScoutSuite and Prowler, what a cloud pentest looks like. [cite: 26]",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "DevSecOps Basics — Shifting Security Left in Development Pipelines",
            "description": "SAST, DAST, secrets scanning, CI/CD pipeline security — where cloud and development meet security. [cite: 26]",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 11 Lab — Audit a Misconfigured Cloud Environment",
            "description": "Students assess a deliberately misconfigured AWS sandbox and document all findings. [cite: 26]",
            "type": "Lab"
          }
        ]
      },
      {
        "week": 12,
        "title": "Foundations Capstone and Core Track Readiness",
        "theme": "Final assessment + track launch",
        "source_citation": "[cite: 27]",
        "modules": [
          {
            "id": "M1",
            "title": "Comprehensive Revision — Networking, OS, Security Fundamentals",
            "description": "Structured review of all Month 1–3 concepts. Gaps identified before capstone exam. [cite: 28]",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Comprehensive Revision — Scripting, Web, Threat Intel, Cloud",
            "description": "Second review session covering Month 2–3 technical content. Practice questions included. [cite: 28]",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Full Capstone Lab — A Multi-Phase Simulated Attack Investigation",
            "description": "Students work through a complete scenario: detect, investigate, analyze, and report. All skills combined. [cite: 28]",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Foundations Final Exam — Theory + Practical (ZF Certification)",
            "description": "Proctored exam. Pass earns the Zharnyx Foundations (ZF) Certificate — the prerequisite for any core track. [cite: 28]",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Career Readiness — Resume, LinkedIn, GitHub Profile for Cybersecurity",
            "description": "How to present the ZF certification, what to list, how to write a cybersecurity resume with no work experience. [cite: 28]",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Core Track Deep Dive Preview — What Month 1 of Your Track Looks Like",
            "description": "A detailed walkthrough of what students will learn in each core track. The excitement builder before they start. [cite: 28]",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Welcome to Your Core Track — Orientation and Community",
            "description": "Track assignment, cohort introduction, mentor assignment, Discord/community access. The transition moment. [cite: 28]",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function FoundationPage() {
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

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-20">

        {/* Header Section */}
        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <SectionBadge ref={badgeRef} text="PHASE 1 · ALL STUDENTS REQUIRED" icon={Lock} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Foundation <span className="text-red-500">Phase</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            3 Months · Weeks 1–12 · Build your cybersecurity fundamentals from the ground up with hands-on labs every single week.
          </p>

          {/* Curriculum Grid */}
          <section className="w-full flex flex-col gap-24">
            {curriculumData.map((month) => (
              <div key={month.month} className="flex flex-col gap-10">
                {/* Month Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 border-b-2 border-white/20 pb-6">
                  <span className="text-6xl md:text-7xl font-black text-red-500 opacity-80 leading-none">M{month.month}</span>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">{month.title}</h2>
                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mt-2">4 Weeks · 28 Modules</p>
                  </div>
                </div>

                {/* Weeks Grid */}
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

          {/* Deliverables CTA */}
          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Foundation Deliverables</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Foundation is required for all tracks</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link
                href="/auth?callbackUrl=/checkout/internship"
                className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
              >
                Start Your Journey
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
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/20";
  }
}

function ModuleCard({ module }: { module: any }) {
  const isChallenge = module.id === "M7";
  
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
