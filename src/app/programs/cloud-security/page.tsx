"use client";

import { SyllabusLayout } from "@/components/syllabus/syllabus-layout";

const curriculumData = [
  {
    "month": 1,
    "title": "Cloud Platforms and Security Architecture",
    "weeks": [
      {
        "week": 1,
        "title": "AWS Security Deep Dive",
        "theme": "IAM · VPC · CloudTrail · S3 security",
        "modules": [
          {
            "id": "M1",
            "title": "AWS Security Architecture — The Complete Security Model",
            "description": "Shared responsibility in depth, AWS security services overview, how the major services interconnect from a security view.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "IAM Mastery — Users, Roles, Policies, Permission Boundaries, SCPs",
            "description": "Writing least-privilege IAM policies, understanding trust relationships, SCPs for multi-account governance.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "VPC Security — Security Groups, NACLs, Flow Logs, PrivateLink",
            "description": "Network segmentation in AWS, designing secure VPC architectures, analysing VPC flow logs for threats.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "S3 Security — Bucket Policies, Encryption, Access Logs, and Replication Security",
            "description": "Preventing public buckets, enforcing encryption, detecting unauthorised access, S3 access log analysis.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "CloudTrail, Config, and GuardDuty — AWS Native Detection Services",
            "description": "Enabling and tuning AWS detection services, understanding GuardDuty findings, Config rules for compliance.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "AWS Security Hub — Centralising and Prioritising Security Findings",
            "description": "Aggregating findings from GuardDuty, Inspector, Macie, Config — building a unified security view.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 1 Lab — Secure a Misconfigured AWS Environment Using AWS Security Best Practices",
            "description": "Students audit and remediate a deliberately misconfigured AWS account. Full before/after security posture report.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 2,
        "title": "Azure and Microsoft Security Stack",
        "theme": "Entra ID · Defender for Cloud · Sentinel",
        "modules": [
          {
            "id": "M1",
            "title": "Azure Security Architecture — Resource Groups, Management Groups, and Policy",
            "description": "Azure governance model, Azure Policy for compliance, Blueprints, landing zone security architecture.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Entra ID (Azure AD) Security — Conditional Access, PIM, and Identity Protection",
            "description": "Designing Conditional Access policies, Privileged Identity Management, risky user and sign-in detection.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Microsoft Defender for Cloud — CSPM and Workload Protection",
            "description": "Secure Score, regulatory compliance, defender plans for VMs, containers, databases, and storage.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Microsoft Sentinel — SIEM and SOAR in Azure",
            "description": "Workspace setup, data connectors, analytics rules, playbooks — building a full SIEM on Azure from scratch.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Azure Network Security — NSGs, Azure Firewall, DDoS Protection, WAF",
            "description": "Layered network security in Azure, designing hub-and-spoke architectures, WAF rules for application protection.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Microsoft 365 Security — Defender for M365, DLP, Information Protection",
            "description": "Securing the M365 estate: email protection, DLP policies, sensitivity labels, insider risk management.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 2 Lab — Build and Secure an Azure Environment From Scratch",
            "description": "Students build a small Azure environment and apply all security controls — Entra ID, Defender, Sentinel, network security.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 3,
        "title": "GCP Security and Multi-Cloud Posture Management",
        "theme": "GCP IAM · Chronicle · CSPM tools",
        "modules": [
          {
            "id": "M1",
            "title": "Google Cloud Security Architecture — Projects, Organisations, and Folders",
            "description": "GCP resource hierarchy, IAM in GCP vs AWS vs Azure, organisation policies, VPC Service Controls.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "GCP Security Services — SCC, Cloud Armor, Binary Authorization",
            "description": "Security Command Center, Cloud Armor WAF and DDoS, Binary Authorization for container supply chain security.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Cloud Security Posture Management — Wiz, Orca, Prisma Cloud, and Open Source Tools",
            "description": "How CSPM tools work, what they find, open-source alternatives (ScoutSuite, Prowler), interpreting CSPM findings.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "Multi-Cloud Security Strategy — Consistent Controls Across AWS, Azure, and GCP",
            "description": "Designing controls that work across clouds, CNAPP concepts, cloud-agnostic security architecture principles.",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Cloud Infrastructure Entitlement Management — CIEM and IAM Governance at Scale",
            "description": "Identifying over-permissioned identities across thousands of cloud resources, right-sizing access at scale.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Cloud Compliance Frameworks — SOC 2, ISO 27001, PCI DSS, and India DPDP Act",
            "description": "How major compliance frameworks apply to cloud environments. India's DPDP Act implications for cloud-hosted data.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 1 Capstone — Multi-Cloud Security Assessment and Remediation Plan",
            "description": "Students assess security posture across AWS and Azure environments and produce a prioritised remediation report.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 4,
        "title": "Container and Kubernetes Security",
        "theme": "Docker security · K8s hardening · Supply chain",
        "modules": [
          {
            "id": "M1",
            "title": "Container Security Fundamentals — Docker Security Model and Common Mistakes",
            "description": "Image vulnerabilities, privileged containers, exposed Docker sockets, secrets in environment variables.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Container Image Scanning — Trivy, Snyk, and AWS ECR Image Scanning",
            "description": "Scanning images for CVEs, base image hygiene, Dockerfile best practices, distroless and minimal base images.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Kubernetes Security — RBAC, Network Policies, Pod Security Standards",
            "description": "K8s RBAC design, network segmentation between pods, enforcing pod security, secrets management in K8s.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Kubernetes Threat Detection — Falco, Audit Logs, and Runtime Security",
            "description": "Runtime threat detection with Falco, K8s audit log analysis, detecting container escapes and lateral movement.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Supply Chain Security — SBOM, Sigstore, and Software Provenance",
            "description": "Software Bill of Materials, signing container images with Cosign, SLSA framework, dependency vulnerability management.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Service Mesh Security — Istio and mTLS for Zero Trust Within K8s",
            "description": "Mutual TLS between services, Istio security policies, east-west traffic control inside Kubernetes clusters.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 4 Lab — Audit and Harden a Kubernetes Cluster",
            "description": "Students audit a misconfigured K8s cluster, identify risks, apply RBAC and network policies, and document findings.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 2,
    "title": "DevSecOps, Detection and Advanced Security Engineering",
    "weeks": [
      {
        "week": 5,
        "title": "DevSecOps and Secure CI/CD Pipelines",
        "theme": "GitHub Actions · SAST · DAST · Secrets scanning",
        "modules": [
          {
            "id": "M1",
            "title": "DevSecOps Philosophy — Shifting Security Left Without Slowing Teams Down",
            "description": "The cultural and technical shift, security champions model, how to embed security into developer workflows.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "SAST — Static Application Security Testing in Pipelines",
            "description": "Semgrep, SonarQube, Bandit for Python — integrating SAST into GitHub Actions, triaging SAST findings.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "DAST — Dynamic Testing in CI/CD Pipelines",
            "description": "OWASP ZAP in automation mode, integrating DAST into deployment pipelines, baseline vs full scans.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Secrets Detection — Trufflesecurity, GitLeaks, and GitHub Advanced Security",
            "description": "Finding secrets committed to code, pre-commit hooks, secret rotation after exposure, preventing future leaks.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Infrastructure as Code Security — Checkov, tfsec for Terraform and CloudFormation",
            "description": "Scanning IaC templates before deployment, writing secure Terraform modules, policy-as-code with OPA.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Dependency Management and SCA — Snyk, Dependabot, and OSS Risk",
            "description": "Software Composition Analysis, managing open source risk, licence compliance, exploitable dependency alerts.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 5 Lab — Build a Fully Secured CI/CD Pipeline With All Security Gates",
            "description": "Students build a GitHub Actions pipeline with SAST, DAST, secrets scanning, image scanning, and IaC scanning integrated.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 6,
        "title": "Cloud Detection and Incident Response",
        "theme": "Cloud IR · Log analysis · Threat hunting in cloud",
        "modules": [
          {
            "id": "M1",
            "title": "Cloud Incident Response Lifecycle — How Cloud IR Differs From Traditional IR",
            "description": "Volatility in cloud (snapshots vs live), evidence preservation, cloud provider collaboration, IR tooling.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "AWS Threat Hunting — Using CloudTrail, Athena, and Security Lake",
            "description": "Querying CloudTrail with Athena, AWS Security Lake for centralised security data, hunting attacker behaviour in AWS logs.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Automated Remediation — Lambda Functions for Security Response",
            "description": "Building Lambda-based automated responses: auto-quarantine compromised instances, auto-revoke leaked keys.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Cloud Security Automation With Python and Terraform",
            "description": "Python boto3 for AWS security automation, Terraform for deploying security controls at scale.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "DDoS Protection and WAF Management in Cloud Environments",
            "description": "AWS Shield, Azure DDoS, Cloudflare — DDoS response, WAF rule management, bot protection strategies.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Secrets Management — AWS Secrets Manager, HashiCorp Vault, Azure Key Vault",
            "description": "Centralising secrets, automatic rotation, application integration patterns, auditing secret access.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 6 Lab — Detect, Contain, and Remediate a Simulated Cloud Breach",
            "description": "Full cloud IR scenario — students detect an intrusion in AWS, contain the compromised resources, and eradicate access.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 7,
        "title": "Zero Trust Architecture and Month 2 Capstone",
        "theme": "Zero Trust · Threat modelling · Architecture design",
        "modules": [
          {
            "id": "M1",
            "title": "Zero Trust Architecture — NIST 800-207 and BeyondCorp Model",
            "description": "Core ZTA principles, identity-centric security, micro-segmentation, continuous verification — implementing ZTA with cloud-native tools.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Zero Trust Network Access — ZTNA vs VPN, Implementing ZTA for Remote Workforces",
            "description": "ZTNA vendors, Cloudflare Access, Zscaler Private Access — replacing legacy VPN with identity-aware access in cloud environments.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Cloud Security Architecture Review — Threat Modelling with STRIDE and PASTA",
            "description": "Formal threat modelling frameworks applied to cloud architectures. DFD creation, threat enumeration, risk prioritisation.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Well-Architected Framework Security Pillar — AWS, Azure, and GCP Versions",
            "description": "Applying cloud provider Well-Architected principles to security design. Running Well-Architected reviews and producing improvement plans.",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Data Security in Cloud — Encryption at Rest, in Transit, Key Management",
            "description": "AWS KMS, Azure Key Vault, GCP Cloud KMS — envelope encryption, customer managed keys, data loss prevention.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Month 2 Assessment — Advanced Cloud Security Practice Exam",
            "description": "Comprehensive knowledge test covering DevSecOps, Cloud IR, and Zero Trust concepts to prepare for the capstone challenge.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Month 2 Capstone — Enterprise Secure Cloud Design and Deployment Challenge",
            "description": "Students receive a complex infrastructure brief, write a secure Terraform blueprint, deploy it to a staging sandbox, and defend it.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 8,
        "title": "Advanced Cloud Defense and Infrastructure Hardening",
        "theme": "Immutable infra · Cloud compliance · Service mesh",
        "modules": [
          {
            "id": "M1",
            "title": "Immutable Infrastructure and Golden Image Pipelines",
            "description": "Building hardened base images with Packer, automating compliance testing with InSpec, managing image lifecycles at scale.",
            "type": "Lab"
          },
          {
            "id": "M2",
            "title": "Advanced Network Security — Transit Gateways and Private Cloud Interconnects",
            "description": "Designing secure multi-region networks, deep inspection via centralized firewall firewalls, AWS Transit Gateway architectures.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Cloud-Scale Logging Architecture — Centralized Security Accounts",
            "description": "Designing cross-account log aggregation paths, enforcing write-once storage rules (S3 Object Lock), log lifecycle management.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Serverless Security Deep Dive — Lambda and Container Security",
            "description": "Hardening serverless applications, evaluating function runtime permissions, locking API gateways down using authentication filters.",
            "type": "Theory"
          },
          {
            "id": "M5",
            "title": "Policy as Code Enforcement with Open Policy Agent (OPA)",
            "description": "Writing admission control policies for Kubernetes, preventing non-compliant IaC commits, Rego language fundamentals.",
            "type": "Lab"
          },
          {
            "id": "M6",
            "title": "Continuous Compliance Monitoring and Automated Remediation Pipelines",
            "description": "Configuring AWS Config rules, Azure Policies, and GCP Security Health Analytics to auto-remediate configuration drift.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Week 8 Lab — Deploy an Advanced Multi-Account Secure Infrastructure Blueprint",
            "description": "Students build and launch an audited, compliant landing zone across a simulated multi-account corporate framework.",
            "type": "Capstone"
          }
        ]
      }
    ]
  },
  {
    "month": 3,
    "title": "Real-World Multi-Cloud Deployments, Certifications and Industry Readiness",
    "weeks": [
      {
        "week": 9,
        "title": "Enterprise Cloud Migration and Hybrid Architectures",
        "theme": "Cloud migration paths · Hybrid setups · Legacy integration",
        "modules": [
          {
            "id": "M1",
            "title": "Secure Cloud Migration Strategies — Rehost, Replatform, Refactor",
            "description": "Analyzing security implications of moving enterprise systems from bare-metal to public cloud infrastructure models.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Hybrid Cloud Connectivity Security — IPSec VPN vs Direct Connect",
            "description": "Designing encrypted, high-availability data tunnels between physical enterprise data centers and public VPC fabrics.",
            "type": "Lab"
          },
          {
            "id": "M3",
            "title": "Legacy Identity Integration — Active Directory to Entra ID / AWS IAM",
            "description": "Configuring secure hybrid directory syncing, identity federation, SAML, and single sign-on flows safely.",
            "type": "Lab"
          },
          {
            "id": "M4",
            "title": "Database Security and Data Masking in the Cloud",
            "description": "Hardening RDS and NoSQL systems, configuring dynamic data masking, and setting up automated database access token rotation.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "Cloud Cost Optimization and Security Intersection",
            "description": "Using cost anomaly detection dashboards to discover rogue cryptomining activities and unallocated orphan resources.",
            "type": "Theory"
          },
          {
            "id": "M6",
            "title": "Architecting for Disaster Recovery and High Availability Security",
            "description": "Designing secure multi-region backup failovers, validating cryptographic checksums on snapshots, and managing cross-region keys.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Week 9 Lab — Execute a Secure Database and Application Migration to AWS",
            "description": "Students safely lift-and-shift a vulnerable on-premises application system to an audited, firewalled cloud landing architecture.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 10,
        "title": "Cloud Security Portfolio and Professional Interview Readiness",
        "theme": "Portfolio building · Mock interviews · Indian cloud market context",
        "modules": [
          {
            "id": "M1",
            "title": "Crafting the High-Impact Cloud Security Resume",
            "description": "Highlighting architectural milestones, structural tools, and multi-cloud configurations for Indian and global enterprises.",
            "type": "Career"
          },
          {
            "id": "M2",
            "title": "Top 40 Cloud Security Technical Interview Scenarios and Case Breakdowns",
            "description": "Deep-dive preparation for common system architecture design tests, policy validation rounds, and scenario-based technical evaluations.",
            "type": "Career"
          },
          {
            "id": "M3",
            "title": "Building a Public Engineering Portfolio — GitHub Blueprints and Architecture Blogs",
            "description": "Publishing secure, documented reusable Terraform models and documenting advanced lab achievements on open channels.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "Cloud Security Professional Certification Landscape",
            "description": "Analyzing and evaluating paths toward AWS Security Specialty, Microsoft AZ-500, CCSP, and native ecosystem badges.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "The Cloud Security Engineering Career Matrix",
            "description": "Exploring professional evolution scales from Associate Cloud Engineer up to Cloud Security Architect or Principal DevSecOps Advisor.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Industry Engagement and Cloud Security Communal Ecosystems",
            "description": "Connecting with working groups, local security meetups, global user groups, and enterprise bug bounty platforms.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Week 10 Lab — Live Multi-Cloud Architectural Defense Mock Interview",
            "description": "45-minute live technical review where students must defend their deployed cloud design choices against complex threat variables.",
            "type": "Capstone"
          }
        ]
      },
      {
        "week": 11,
        "title": "ZCS Certification Prep and Sandbox Simulations",
        "theme": "Comprehensive review · Architecture design labs · Mock exams",
        "modules": [
          {
            "id": "M1",
            "title": "ZCS Examination Matrix and Performance Standards",
            "description": "Detailed operational overview of the dual-threat exam: 90-minute core knowledge evaluation and a multi-cloud practical security challenge.",
            "type": "Theory"
          },
          {
            "id": "M2",
            "title": "Comprehensive Review Block 1 — Multi-Cloud Control Frameworks",
            "description": "Accelerated synthesis of AWS, Azure, and GCP identity governance structures, network borders, and monitoring frameworks.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "Comprehensive Review Block 2 — DevSecOps, Containers, and Incident Systems",
            "description": "Review of CI/CD integration, Kubernetes security baselines, and cross-account threat detection pipelines.",
            "type": "Theory"
          },
          {
            "id": "M4",
            "title": "ZCS Knowledge Base Assessment Simulation",
            "description": "Full-length proctored mock exam under strict timed parameters with immediate score review and structural answer analysis.",
            "type": "Lab"
          },
          {
            "id": "M5",
            "title": "ZCS Practical Lab Prep — Comprehensive Multi-Cloud Sandbox Challenge",
            "description": "Rigorous full-scale technical simulation forcing students to evaluate, harden, and defend an unstable infrastructure landscape.",
            "type": "Capstone"
          },
          {
            "id": "M6",
            "title": "Targeted Knowledge Recovery and Guided Fix Sessions",
            "description": "Personalized mentor check-ins designed to break down weak technical areas uncovered during the runtime simulation evaluations.",
            "type": "Lab"
          },
          {
            "id": "M7",
            "title": "Exam-Day Execution Architecture and Blueprint Strategy",
            "description": "Effective strategies for handling complex architectural challenges, managing validation cycles, and optimizing deployment speeds.",
            "type": "Career"
          }
        ]
      },
      {
        "week": 12,
        "title": "ZCS Certification Exam and Graduation",
        "theme": "Exam · Certification · Placement launch",
        "modules": [
          {
            "id": "M1",
            "title": "ZCS Theory Exam — 50 Questions, 90 Minutes",
            "description": "Proctored theory examination covering all 3 months. Questions span AWS, Azure, GCP, DevSecOps, containers, Zero Trust, and compliance. Pass mark: 70%.",
            "type": "Capstone"
          },
          {
            "id": "M2",
            "title": "ZCS Architecture Design Challenge — 2-Hour Secure Cloud Design",
            "description": "Proctored design challenge: students receive a business brief and must produce a complete, secure cloud architecture with written justification.",
            "type": "Capstone"
          },
          {
            "id": "M3",
            "title": "ZCS Practical Lab — 4-Hour Cloud Security Assessment and Remediation",
            "description": "Proctored practical: students assess a misconfigured multi-cloud environment, remediate critical findings, and submit a full posture report.",
            "type": "Capstone"
          },
          {
            "id": "M4",
            "title": "ZCS Certificate Issued — Zharnyx Cloud Security Certification",
            "description": "Digital certificate with unique ID and QR verification. Distributed to hiring partners. LinkedIn post template and AWS/Azure community share guide.",
            "type": "Career"
          },
          {
            "id": "M5",
            "title": "Placement Kickoff — Profile Submission to Zharnyx Hiring Partners",
            "description": "Resume reviewed and submitted to cloud security hiring partner network. Interview scheduling begins within 5 working days of certification.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Graduation — Cohort Celebration and Zharnyx Dragons Alumni Badge",
            "description": "Cohort graduation session, alumni Discord access, mentorship continuity for 90 days, Zharnyx Dragons badge for LinkedIn and GitHub profiles.",
            "type": "Career"
          },
          {
            "id": "M7",
            "title": "Continuous Learning Path — From ZCS to AWS Security Specialty, CCSP, and Beyond",
            "description": "AWS Security Specialty exam roadmap, CCSP study guide, GCP Professional Cloud Security Engineer path, advanced cloud red team learning resources.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function CloudSecurityPage() {
  return (
    <SyllabusLayout
      meta={{
        slug: "cloud-security",
        title: "Cloud Security",
        subtitle: "Core Track",
        phase: "Phase 2 · Specialization",
        duration: "3 Months · 12 Weeks",
        tagline: "Secure modern infrastructure. Master AWS, Azure, GCP, Kubernetes security, and Infrastructure as Code.",
        certCode: "ZCS",
        certName: "Zharnyx Cloud Security",
      }}
      curriculum={curriculumData}
    />
  );
}
