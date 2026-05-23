"use client";

import { SyllabusLayout } from "@/components/syllabus/syllabus-layout";

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
  return (
    <SyllabusLayout
      meta={{
        slug: "foundation",
        title: "Foundation",
        subtitle: "Phase",
        phase: "Phase 1 · Required",
        duration: "3 Months · 12 Weeks",
        tagline: "Build your cybersecurity fundamentals from the ground up with hands-on labs every single week.",
        certCode: "ZF",
        certName: "Zharnyx Foundations",
      }}
      curriculum={curriculumData}
    />
  );
}
