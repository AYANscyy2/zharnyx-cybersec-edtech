"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Target, CloudLightning, Search, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function CertificationsShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate header elements
      gsap.to(".cert-header-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      // Animate cards
      gsap.to(".cert-card", {
        scrollTrigger: {
          trigger: ".cards-container",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
      
      // Animate button
      gsap.to(".cert-btn-anim", {
        scrollTrigger: {
          trigger: ".cert-btn-anim",
          start: "top 90%",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: 0.2,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 bg-black border-t-2 border-white/10 relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
        <div className="text-center space-y-4 max-w-3xl flex flex-col items-center">
        <div className="cert-header-anim opacity-0 translate-y-10">
          <SectionBadge text="Industry Standard" icon={Shield} />
        </div>
        <h2 className="cert-header-anim opacity-0 translate-y-10 text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white">
          Zharnyx Certification <br />
          <span className="text-red-500">Authority</span>
        </h2>
        <p className="cert-header-anim opacity-0 translate-y-10 text-gray-400 font-mono text-base leading-relaxed max-w-2xl text-center mx-auto mt-4">
            We are engineering the infrastructure, high-fidelity labs, and iron-clad exam portals for India's most rigorous cybersecurity certifications. No MCQs. 100% Practical.
          </p>
        </div>

        <div className="cards-container grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          <DomainCard prefix="ZSA" title="SOC Analyst" icon={<Shield size={32} className="text-gray-500" />} desc="Live SIEM environment + Incident Response scenario. Detect, contain, and investigate within a simulated corporate network." />
          <DomainCard prefix="ZPT" title="Penetration Tester" icon={<Target size={32} className="text-gray-500" />} desc="Live pentest against an isolated target network. Exploit vulnerabilities and compile a professional VAPT report." />
          <DomainCard prefix="ZCS" title="Cloud Security" icon={<CloudLightning size={32} className="text-gray-500" />} desc="Live cloud environment audit. Identify misconfigurations in AWS/Azure/GCP and secure the perimeter against attacks." />
          <DomainCard prefix="ZDF" title="Digital Forensics" icon={<Search size={32} className="text-gray-500" />} desc="Full forensic investigation. Analyze memory dumps, disk images, and network pcaps to reconstruct attacker actions." />
        </div>

        <div className="cert-btn-anim opacity-0 translate-y-5 mt-8">
          <Link
            href="/certifications"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white font-black text-sm uppercase tracking-widest transition-all hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,0.5)]"
          >
            Explore Certifications & Join Waitlist
            <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DomainCard({ prefix, title, icon, desc }: { prefix: string, title: string, icon: React.ReactNode, desc: string }) {
  return (
    <div className="cert-card opacity-0 translate-y-16 group border-2 border-white/10 bg-zinc-950 hover:border-red-600 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row hover:shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]">
      <div className="sm:w-48 bg-white/5 p-6 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/10 group-hover:bg-red-600/10 transition-colors relative">
        <div className="text-gray-500 group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 mb-3">
            {icon}
        </div>
        <h3 className="font-black text-3xl tracking-tighter text-white group-hover:text-red-600 transition-colors">{prefix}</h3>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
        <h4 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-red-500 transition-colors">{title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}
