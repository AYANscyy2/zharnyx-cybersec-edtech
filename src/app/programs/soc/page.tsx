"use client";

import { SyllabusLayout } from "@/components/syllabus/syllabus-layout";

const curriculumData = [
  {
    "month": 1,
    "title": "SOC Foundations and Tooling",
    "weeks": [
      {
        "week": 1,
        "title": "SIEM Platforms Deep Dive",
        "theme": "Splunk · Microsoft Sentinel · IBM QRadar",
        "modules": [
          {
            "id": "M1",
            "title": "SIEM Architecture — How Log Data Flows Into Detection",
            "description": "Ingestion pipelines, normalization, correlation engines, alert generation. Understanding the full SIEM lifecycle.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Splunk Fundamentals — Search, Index, and Dashboards",
            "description": "SPL queries, field extraction, building searches that find threats. Core tool for most SOC environments.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Microsoft Sentinel — Cloud-Native SIEM in Azure",
            "description": "Workspaces, KQL queries, analytics rules, SOAR playbooks. Growing fast in Indian enterprises.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Writing Correlation Rules — Turning Raw Logs Into Detections",
            "description": "Logic-based rules, threshold alerts, multi-event correlations. Building detections that actually fire on real threats.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Log Source Integration — Windows, Linux, Firewall, Proxy, EDR",
            "description": "Onboarding log sources, understanding each source's event types, what each source reveals about attacker activity.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "False Positive Tuning — Making Alerts Actionable",
            "description": "Why alert fatigue kills SOC teams, how to tune rules, whitelisting vs blacklisting, building high-fidelity detections.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 1 Lab — Investigate 10 Real Alerts in a Splunk Environment",
            "description": "Students triage a full alert queue, identify true positives, close false positives, and document findings.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 2,
        "title": "Threat Intelligence Operations",
        "theme": "IOCs · TTP mapping · MITRE ATT&CK",
        "modules": [
          {
            "id": "M1",
            "title": "MITRE ATT&CK Framework — The SOC Analyst's Playbook",
            "description": "Tactics, techniques, sub-techniques. Mapping alerts to ATT&CK. Using the Navigator for threat hunting.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "IOC Lifecycle — From Detection to Blocking to Expiry",
            "description": "IP, domain, hash, URL IOCs. Enrichment workflows, IOC confidence scoring, automated blocking.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Threat Intelligence Platforms — MISP, OpenCTI, VirusTotal, AlienVault OTX",
            "description": "How to consume, share, and operationalise threat intel feeds. Hands-on with free platforms.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Threat Actor Profiling — APT Groups, TTPs, and India-Specific Threats",
            "description": "Major APT groups targeting India, their TTPs, and how to build detections specific to their attack patterns.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "OSINT for SOC — Investigating Suspicious Indicators",
            "description": "Shodan, Censys, AbuseIPDB, Whois, PassiveDNS — the analyst's open-source investigation toolkit.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Threat Hunting Basics — Proactive Detection Beyond Alerts",
            "description": "Hypothesis-based hunting, hunting for living-off-the-land binaries, LOLBins, scheduled tasks, and persistence mechanisms.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 2 Lab — Hunt a Simulated APT in a Real Log Dataset",
            "description": "Students receive a 30-day log dataset with a hidden APT intrusion and must find it using threat hunting techniques.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 3,
        "title": "Network and Endpoint Detection",
        "theme": "EDR · NDR · Traffic Analysis",
        "modules": [
          {
            "id": "M1",
            "title": "EDR Platforms — CrowdStrike Falcon, Microsoft Defender, SentinelOne",
            "description": "What EDR captures, how to read EDR telemetry, investigating process trees and file events.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Process Injection and Living off the Land — What to Look For",
            "description": "PowerShell abuse, WMI abuse, LOLBins — how attackers blend into legitimate OS activity and how analysts spot it.",
            "type": "Demo"
          },
          {
            "id": "M3",
            "title": "Network Detection and Response — Zeek, Suricata, and IDS Rules",
            "description": "Writing Suricata signatures, reading Zeek logs, identifying C2 beaconing and data exfiltration in traffic.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Malware Traffic Analysis — Identifying C2, Beacons, and Exfil",
            "description": "Reading network captures for malware patterns. Domain generation algorithms, fast flux, encrypted C2 detection.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Active Directory Attack Detection — Kerberoasting, Pass the Hash, Golden Ticket",
            "description": "What these attacks look like in event logs and EDR. The specific event IDs that betray each technique.",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Email Threat Detection — Phishing, BEC, Malicious Attachments",
            "description": "Email header analysis, sandbox detonation, URL analysis, BEC detection patterns in mail logs.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 3 Lab — Full Network + Endpoint Investigation Scenario",
            "description": "Correlated investigation using both EDR and network logs to reconstruct a complete attack chain.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 4,
        "title": "Incident Response and Case Management",
        "theme": "IR process · Ticketing · Escalation",
        "modules": [
          {
            "id": "M1",
            "title": "SOC Tier Structure — L1, L2, L3 Roles and Responsibilities",
            "description": "What each tier does, escalation criteria, how to write a proper escalation note that doesn't waste L2's time.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Incident Response Playbooks — Building and Following Runbooks",
            "description": "Ransomware playbook, phishing playbook, insider threat playbook. How to follow and how to write them.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "SOAR Platforms — Automating SOC Workflows with TheHive and Cortex",
            "description": "Case management, automated enrichment, playbook automation. Reducing MTTR with orchestration.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Containment and Eradication — Isolating Hosts, Blocking Threats",
            "description": "When and how to isolate an endpoint, revoke credentials, block IPs, and communicate with stakeholders.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Metrics That Matter — MTTD, MTTR, Alert Volume, SOC KPIs",
            "description": "How SOC performance is measured, how to report upward, what good looks like vs what burnout looks like.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Shift Handover and Incident Documentation Standards",
            "description": "How to write incident tickets that tell the full story. Shift handover protocols. Evidence chain of custody in SOC.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Month 1 Capstone — Full SOC Shift Simulation (8-Hour Scenario)",
            "description": "Students run a simulated SOC shift: triage queue, investigate alerts, escalate, document, and hand over. Scored.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 2,
    "title": "Advanced Detection and Threat Hunting",
    "weeks": [
      {
        "week": 5,
        "title": "Advanced Log Analysis and Forensic Triage",
        "theme": "Windows events · Linux audit · Memory triage",
        "modules": [
          {
            "id": "M1",
            "title": "Windows Event Log Deep Dive — The 50 Event IDs Every SOC Must Know",
            "description": "Logon types, process creation, scheduled tasks, service installs, account management — mapped to attacker techniques.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Linux Audit Logs and Syslog — Detecting Attacker Activity on Linux",
            "description": "auditd rules, /var/log analysis, bash history tampering, cron job abuse — Linux attacker TTPs in logs.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Prefetch, Shimcache, Amcache — Execution Artefacts in Windows",
            "description": "Forensic artefacts that prove a program ran — critical for SOC analysts investigating malware execution.",
            "type": "Demo"
          },
          {
            "id": "M4",
            "title": "Memory Analysis for SOC — Extracting IOCs from RAM Without Full Forensics",
            "description": "Quick memory triage using Volatility, finding injected processes, extracting network connections from memory.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Detecting Ransomware — From First File Encryption to Full Detonation",
            "description": "Ransomware behavioural signatures in logs, EDR, and network. The 10-minute window before full encryption.",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Insider Threat Detection — Behavioural Analytics and DLP Signals",
            "description": "UEBA concepts, anomalous access patterns, bulk download detection, exfiltration via email and cloud storage.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 5 Lab — Detect and Respond to a Ransomware Attack in Progress",
            "description": "Simulated ransomware scenario — students detect, contain, and document before full encryption occurs.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 6,
        "title": "Cloud and Identity Threat Detection",
        "theme": "AWS/Azure threats · IAM attacks · Okta",
        "modules": [
          {
            "id": "M1",
            "title": "Cloud Attack Patterns — What Attackers Do After Getting Cloud Access",
            "description": "Privilege escalation, persistence, cryptomining, data exfil — the cloud attacker playbook and how to detect each step.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "AWS CloudTrail Analysis — Reading the Story of a Cloud Breach",
            "description": "Critical API calls, IAM enumeration, S3 exfil indicators, EC2 abuse — all readable from CloudTrail logs.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Azure AD and Entra ID Threat Detection",
            "description": "Sign-in logs, risky users, conditional access bypass, token theft — Microsoft identity threat signals.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Identity Provider Attacks — Okta, Azure AD, MFA Bypass Techniques",
            "description": "MFA fatigue attacks, SIM swapping indicators, OAuth token abuse — modern identity threat landscape.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "SaaS Security — Detecting Threats in M365, Google Workspace, Salesforce",
            "description": "Audit logs from SaaS platforms, data exfiltration via SaaS, OAuth app abuse detection.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Zero Trust Detection Architecture — Logging What Matters in a Perimeterless World",
            "description": "What to log when everything is cloud and remote, detection gaps in Zero Trust architectures, coverage mapping.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 6 Lab — Investigate an AWS Cloud Breach from CloudTrail Logs",
            "description": "Students receive CloudTrail and identity logs from a simulated breach and reconstruct the full attack timeline.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 7,
        "title": "Advanced Threat Hunting",
        "theme": "Hypothesis hunting · Purple team · KQL/SPL mastery",
        "modules": [
          {
            "id": "M1",
            "title": "Threat Hunting Methodology — Structured vs Unstructured Hunting",
            "description": "The hunt lifecycle, building hypotheses from threat intel, documenting hunts, converting hunts into detections.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "KQL Mastery for Threat Hunters — Microsoft Sentinel Advanced Queries",
            "description": "Advanced KQL — joins, summarize, time series analysis, anomaly detection functions for threat hunting.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "SPL Mastery — Advanced Splunk for Threat Hunting",
            "description": "Statistical SPL, rare and outlier commands, building hunting dashboards in Splunk.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Hunting for Persistence — Registry, Scheduled Tasks, WMI, Services",
            "description": "Every persistence mechanism in Windows and Linux, what they look like in logs, how to hunt them systematically.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Purple Team Concepts — Working With Red Teams to Improve Detection",
            "description": "How purple team exercises work, running Atomic Red Team tests, validating detection coverage, gap analysis.",
            "type": "Demo"
          },
          {
            "id": "M6",
            "title": "Detection Engineering — Building Production-Ready Detection Rules",
            "description": "Sigma rules, detection-as-code concepts, testing detections against real attack data.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 7 Lab — Conduct a Full Threat Hunt and Convert Findings to Detections",
            "description": "Students hunt a dataset, find attacker activity, document the hunt, and write a Sigma rule for the technique found.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 8,
        "title": "Automation, Reporting and Month 2 Capstone",
        "theme": "SOAR · Python automation · Executive reporting",
        "modules": [
          {
            "id": "M1",
            "title": "SOC Automation with Python — Enrichment, Alerting, and Ticketing Scripts",
            "description": "Auto-enriching alerts with VirusTotal and AbuseIPDB, auto-creating Jira tickets, Slack alerting bots.",
            "type": "Lab"
          },
          {
            "id": "M2",
            "title": "Building SOAR Playbooks — Automated Response Workflows",
            "description": "Designing playbooks in TheHive/Cortex, automated phishing response, automated IOC blocking.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Executive Incident Reports — Writing for CISOs and Management",
            "description": "Translating technical findings into business impact. What executives need to see. Incident report templates.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "SOC Metrics Dashboards — Building Visibility Into SOC Performance",
            "description": "Splunk and Sentinel dashboards for MTTD, MTTR, alert volume trends, team performance tracking.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Career Progression — From L1 Analyst to Threat Hunter to CISO",
            "description": "The SOC career ladder, certifications that matter (BTL1, CySA+, GCIH), skills to build at each stage.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Month 2 Review — Technical Assessment Prep",
            "description": "Comprehensive practice questions across all Month 2 topics. Gap analysis before Month 3.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 2 Capstone — Multi-Stage APT Investigation Across SIEM, EDR, and Cloud Logs",
            "description": "Full-day scenario: students investigate a simulated APT across all log sources, write a complete incident report.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 3,
    "title": "Job-Ready and Certification",
    "weeks": [
      {
        "week": 9,
        "title": "Real-World SOC Scenarios and Case Studies",
        "theme": "Live breach simulations · India-specific threats",
        "modules": [
          {
            "id": "M1",
            "title": "Case Study — Analysing the AIIMS Delhi Ransomware Attack",
            "description": "Reconstructing the attack timeline from public information. What a prepared SOC could have detected and when.",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "Case Study — Supply Chain Attack (SolarWinds TTPs in a SOC Context)",
            "description": "How SOC teams missed and could have detected the SolarWinds compromise. Detection opportunities at each stage.",
            "type": "Demo"
          },
          {
            "id": "M3",
            "title": "Responding to a Live Phishing Campaign — Full Workflow",
            "description": "Email received → header analysis → URL detonation → endpoint check → user notification → block and report.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Financial Sector Threats — What Banks and Fintech SOCs Deal With Daily",
            "description": "Card fraud patterns, UPI fraud detection, banking trojan TTPs — tailored for India's largest SOC hiring sector.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "Government and Critical Infrastructure Threats",
            "description": "Nation-state TTPs targeting India, CERT-In notifications, OT/SCADA security basics for critical infrastructure SOCs.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "CTF for SOC Analysts — BlueTeamLabs and CyberDefenders Walkthroughs",
            "description": "Working through real CTF challenges from BlueTeamLabs Online and CyberDefenders to sharpen investigation skills.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 9 Lab — Full Threat Hunt + Incident Response Simulation (Timed)",
            "description": "Timed scenario under exam-like conditions. Students hunt, respond, document, and present findings.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 10,
        "title": "Interview Preparation and Portfolio",
        "theme": "Resume · Mock interviews · LinkedIn",
        "modules": [
          {
            "id": "M1",
            "title": "SOC Analyst Resume — What Hiring Managers Actually Look For",
            "description": "Skills section, tools list, how to describe lab experience, what not to include. Real resume review examples.",
            "type": "Career"
          },
          {
            "id": "M2",
            "title": "Top 30 SOC Interview Questions — With Model Answers",
            "description": "Technical and behavioural questions from real Indian company interviews. What L1 and L2 hiring looks like.",
            "type": "Career"
          },
          {
            "id": "M3",
            "title": "Building Your SOC Portfolio — GitHub, WriteUps, and Lab Documentation",
            "description": "How to document your lab work publicly, CTF writeups, and how to present hands-on experience to hiring managers.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Certifications That Accelerate Hiring — BTL1, CompTIA CySA+, GCIH",
            "description": "What each cert tests, cost, difficulty, and which Indian companies recognise them in hiring.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Mock Interview — Technical SOC Scenario Round",
            "description": "Students are walked through a mock scenario-based interview. Answer evaluation and feedback provided.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Networking in Cybersecurity — LinkedIn Strategy, ISAC Communities, CERT-In",
            "description": "How to build a professional network in Indian cybersecurity, who to follow, communities to join.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Week 10 Lab — Live Mock Interview with Feedback",
            "description": "Full 45-minute mock interview conducted by Zharnyx mentor. Recorded, reviewed, and scored.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 11,
        "title": "ZSA Certification Preparation",
        "theme": "Exam prep · Practice tests · Final review",
        "modules": [
          {
            "id": "M1",
            "title": "ZSA Exam Format and Scoring — What to Expect",
            "description": "Exam structure, time limits, theory vs practical split, passing criteria, what happens if you don't pass first time.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Full Revision — SIEM, Threat Intel, Network and Endpoint Detection",
            "description": "Month 1 and 2 comprehensive review session with practice questions and flashcards.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Full Revision — Threat Hunting, Cloud Detection, Automation",
            "description": "Month 2 advanced topics revision. Focus on areas where students typically drop marks.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Practice Exam 1 — 40 Theory Questions (Timed)",
            "description": "Full mock exam under timed conditions. Answers reviewed and explained after submission.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Practice Exam 2 — Practical Lab (4-Hour Investigation)",
            "description": "Full practical mock exam. Students investigate a complete incident across SIEM, EDR, and cloud logs.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Weak Area Remediation — Targeted Revision Based on Practice Exam Results",
            "description": "Personalised revision plan based on mock exam performance. Targeted modules to close gaps before the real exam.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Pre-Exam Session — Mindset, Strategy, and Confidence",
            "description": "Exam-day strategy, time management tips, how to approach practical questions, confidence-building session.",
            "type": "Career"
          }
        ]
      },
      {
        "week": 12,
        "title": "ZSA Certification Exam and Graduation",
        "theme": "Exam · Certification · Placement launch",
        "modules": [
          {
            "id": "M1",
            "title": "ZSA Theory Exam — 40 Questions, 90 Minutes",
            "description": "Proctored theory examination covering all 3 months of SOC curriculum. Pass mark: 70%.",
            "type": "Capstone"
          },
          {
            "id": "M2",
            "title": "ZSA Practical Exam — 4-Hour Live Investigation",
            "description": "Proctored practical in a sandboxed SOC environment. Students investigate a full incident and submit a report.",
            "type": "Capstone"
          },
          {
            "id": "M3",
            "title": "ZSA Certificate Issued — Zharnyx SOC Analyst Certification",
            "description": "Digital certificate with verification QR code. Shared with hiring partners. Posted to LinkedIn.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Placement Kickoff — Resume Submission to Hiring Partners",
            "description": "Zharnyx submits your profile to the active hiring partner network. Interview scheduling begins.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Graduation Session — Cohort Celebration and Alumni Network",
            "description": "Cohort graduation, alumni community access, mentorship network, Zharnyx Dragons alumni badge.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "30-Day Post-Graduation Check-In Plan",
            "description": "Weekly mentor touchpoints, job search accountability, continued access to SOC lab environment for 30 days.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Continuous Learning Path — What to Study After ZSA",
            "description": "Recommended next certifications, skill progression to L2 and L3, pathways into threat hunting and detection engineering roles.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function SocPage() {
  return (
    <SyllabusLayout
      meta={{
        slug: "soc",
        title: "SOC Analysis",
        subtitle: "Core Track",
        phase: "Phase 2 · Specialization",
        duration: "3 Months · 12 Weeks",
        tagline: "Become the defender. Master SIEM platforms, threat hunting, and real-time incident response in live SOC environments.",
        certCode: "ZSA",
        certName: "Zharnyx SOC Analyst",
      }}
      curriculum={curriculumData}
    />
  );
}
