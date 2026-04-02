"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Cloud, Server, Shield, Key, Lock, Network, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

export default function CloudSecurityPage() {
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
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center gap-20">
        <section className="flex flex-col items-center text-center max-w-3xl space-y-6">
          <SectionBadge ref={badgeRef} text="PHASE 2 · SPECIALIZATION" icon={Cloud} />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Cloud Security <span className="text-red-500">Track</span>
          </h1>
        </section>

        <div ref={contentRef} className="opacity-0 flex flex-col items-center gap-20 w-full">
          <p className="text-lg md:text-xl text-gray-400 font-medium border-l-4 border-red-600 pl-4 text-left max-w-3xl">
            Months 4–6 · Secure modern infrastructure. Master AWS/Azure environments, Kubernetes security, and Infrastructure as Code.
          </p>

          <section className="w-full flex flex-col gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M4</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">AWS & Azure Fundamentals</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 13 - 16</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard icon={<Cloud className="text-red-500" size={24} />} title="Cloud Architecture" desc="VPCs, Subnets, Security Groups, Peering" />
                <ModuleCard icon={<Key className="text-red-500" size={24} />} title="Identity & Access Management (IAM)" desc="Roles, Policies, RBAC, Privileged Access" />
                <ModuleCard icon={<Server className="text-red-500" size={24} />} title="Compute & Storage Security" desc="S3 Bucket policies, EC2 hardeing, EBS encryption" />
                <ModuleCard icon={<Shield className="text-red-500" size={24} />} title="Cloud Network Security" desc="WAF, Shield, Network Firewalls, GuardDuty" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M5</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Container & Infrastructure AppSec</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 17 - 20</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard icon={<Server className="text-red-500" size={24} />} title="Docker Security" desc="Image scanning, cgroups, minimizing footprint" />
                <ModuleCard icon={<Network className="text-red-500" size={24} />} title="Kubernetes (K8s) Security" desc="RBAC, Network Policies, Pod Security Admission" />
                <ModuleCard icon={<Lock className="text-red-500" size={24} />} title="Infrastructure as Code (IaC)" desc="Terraform/CloudFormation, Checkov scanning" />
                <ModuleCard icon={<ShieldCheck className="text-red-500" size={24} />} title="CI/CD Pipeline Security" desc="GitHub Actions, Jenkins, DevSecOps integration" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b-2 border-white/20 pb-4">
                <span className="text-5xl font-black text-red-500 opacity-80">M6</span>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">Compliance & Capstone</h2>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Weeks 21 - 24</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ModuleCard icon={<Shield className="text-red-500" size={24} />} title="Cloud Security Posture (CSPM)" desc="AWS Security Hub, Azure Defender for Cloud" />
                <ModuleCard icon={<Key className="text-red-500" size={24} />} title="Secrets Management" desc="HashiCorp Vault, AWS Secrets Manager" />
                <ModuleCard icon={<Lock className="text-red-500" size={24} />} title="Compliance & Log Auditing" desc="CloudTrail, Config, compliance frameworks" />
                <ModuleCard icon={<ShieldCheck className="text-red-500" size={24} />} title="Live-Fire Cloud Capstone" desc="72-Hour Cloud Architecture Security Audit" highlight />
              </div>
            </div>
          </section>

          {/* Certification Callout */}
          <Link
            href="/certifications"
            className="group w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 border-2 border-white/10 hover:border-red-500 bg-white/2 hover:bg-red-500/5 p-6 transition-all"
          >
            <div className="shrink-0 px-3 py-1 border border-red-500/60 text-red-500 text-xs font-black uppercase tracking-widest">
              ZCS
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Zharnyx Cloud Security Engineer Certification</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                This track is engineered to prepare you for the upcoming <span className="text-white font-bold">ZCS</span> (Zharnyx Cloud Security Engineer) certification — a live cloud environment audit across AWS/Azure/GCP simulated infrastructure. Currently in active development.
              </p>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-red-500 transition-colors flex items-center gap-1 whitespace-nowrap">
              View Certifications <ArrowRight size={12} />
            </span>
          </Link>

          <section className="w-full bg-red-600/10 border-2 border-red-600 p-8 md:p-12 text-center shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col items-center gap-8 mt-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Secure Your Spot</h2>
              <p className="text-red-400 font-bold uppercase tracking-widest text-sm">Enroll in the Cloud Security Track</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <Link href="/auth?mode=signup" className="group relative px-8 py-4 bg-red-600 text-black font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]">
                Apply for Cohort
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ModuleCard({ icon, title, desc, highlight }: { icon: React.ReactNode, title: string, desc: string, highlight?: boolean }) {
  return (
    <div className={`p-6 bg-black border-2 transition-colors flex flex-col gap-3 group ${highlight ? "border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] bg-red-600/5 hover:translate-x-1 hover:-translate-y-1" : "border-white/20 hover:border-white/40"}`}>
      <div className="flex items-start justify-between">
        <div className="p-2 bg-white/5 border border-white/10 inline-block">{icon}</div>
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tight text-white mt-2 leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-sans">{desc}</p>
    </div>
  )
}
