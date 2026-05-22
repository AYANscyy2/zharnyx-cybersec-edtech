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
        // opacity: 1,
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

      // Animate active focus state on cards
      const cards = gsap.utils.toArray(".cert-card");
      cards.forEach((card: any) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          toggleClass: "is-active",
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 bg-black relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10 items-start">
        {/* Left Side: Sticky Header Info */}
        <div className="lg:w-1/3 lg:sticky lg:top-32 space-y-6 cert-header-anim opacity-0 translate-y-10">
          <SectionBadge text="Industry Standard" icon={Shield} />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
            Zharnyx Certification <br />
            <span className="text-[#E60000]">Authority</span>
          </h2>
          
          <p className="text-gray-400 text-base leading-relaxed font-medium">
            We are engineering the infrastructure, high-fidelity labs, and iron-clad exam portals for India's most rigorous cybersecurity certifications. No MCQs. 100% Practical.
          </p>
          
          <div className="pt-4 cert-btn-anim opacity-0 translate-y-5">
            <Link
              href="/certifications"
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#E60000] text-white font-bold text-sm uppercase tracking-widest transition-all rounded-full hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(230,0,0,0.4)]"
            >
              Explore Waitlist
              <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Side: Cards List Stacked Vertically */}
        <div className="lg:w-2/3 cards-container flex flex-col gap-16 w-full relative sm:pl-10 lg:pl-16">
          <DomainCard num="01" title="SOC Analyst" desc="Live SIEM environment + Incident Response scenario. Detect, contain, and investigate within a simulated corporate network." />
          <DomainCard num="02" title="Penetration Tester" desc="Live pentest against an isolated target network. Exploit vulnerabilities and compile a professional VAPT report." />
          <DomainCard num="03" title="Cloud Security" desc="Live cloud environment audit. Identify misconfigurations in AWS/Azure/GCP and secure the perimeter against attacks." />
          <DomainCard num="04" title="Digital Forensics" desc="Full forensic investigation. Analyze memory dumps, disk images, and network pcaps to reconstruct attacker actions." />
        </div>
      </div>
    </section>
  );
}

function DomainCard({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="cert-card  translate-y-16 group bg-zinc-900/40 rounded-3xl border border-white/5 hover:border-[#E60000] transition-all duration-300 overflow-hidden flex flex-col sm:flex-row hover:shadow-[8px_8px_0px_0px_#E60000] hover:-translate-x-2 hover:-translate-y-2 relative min-h-[350px] md:min-h-[400px]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E60000]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="sm:w-56 bg-black/40 p-8 flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-white/5 group-hover:bg-[#E60000]/5 group-[.is-active]:bg-[#E60000]/5 transition-colors relative z-10 overflow-hidden">
        <h3 className="font-black text-7xl md:text-8xl tracking-tighter text-white/10 group-hover:text-[#E60000]/40 group-[.is-active]:text-[#E60000] transition-colors duration-500 select-none">
          {num}
        </h3>
      </div>
      <div className="p-8 md:p-12 flex-1 flex flex-col justify-center space-y-4 relative z-10">
        <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-[#E60000] transition-colors duration-500">{title}</h4>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  )
}
