"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { 
  XOctagon, 
  TerminalSquare, 
  ShieldCheck, 
  Banknote, 
  Target, 
  CloudLightning, 
  Search, 
  ArrowRight,
  Shield,
  Construction
} from "lucide-react";
import { SectionBadge } from "@/components/ui/section-badge";

gsap.registerPlugin(SplitText);

export default function CertificationsPage() {
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

      // Initial state
      gsap.set([badgeRef.current, contentRef.current], { opacity: 0 });
      gsap.set(contentRef.current, { y: 40 });

      const tl = gsap.timeline();

      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
      })
        .from(split.words, {
          yPercent: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        }, "-=0.6")
        .to(".para", {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative opacity-0 min-h-screen pt-32 pb-20 overflow-hidden font-mono text-white bg-black selection:bg-red-600/30">
      {/* Background Matrix/Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center gap-24">
        
        {/* SECTION 1: HERO */}
        <section className="flex flex-col items-center text-center max-w-4xl space-y-6">
          <SectionBadge ref={badgeRef} text="Under Active Development" icon={Construction} className="translate-y-5 opacity-0" />

          <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            The Zharnyx <br />
            Certification <br />
            Authority. <span className="text-red-500">Harder</span> <br />
            <span className="text-red-500">than the rest.</span>
          </h1>

          <p className="para opacity-0 translate-y-5 text-sm font-bold uppercase tracking-widest text-gray-400 mt-2">
            Built for India.
          </p>

          <p className="para opacity-0 translate-y-5 text-base md:text-lg text-gray-400 font-medium max-w-2xl border-l-4 border-red-600 pl-4 text-left mt-4">
            We are currently building the infrastructure, live lab environments, and deeply technical exam portals for India's toughest cybersecurity certifications.
          </p>

          <div className="para opacity-0 pt-6">
            <a href="#waitlist" className="group relative inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-black text-sm uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,0.8)]">
              <span className="flex items-center gap-3">
                JOIN THE WAITLIST
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        </section>

        <div ref={contentRef} className="w-full flex flex-col items-center gap-24 opacity-0 mt-8">
            
          {/* SECTION 2: PHILOSOPHY */}
          <section className="w-full space-y-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Our Exam Philosophy</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PhilosophyCard 
                icon={<XOctagon size={32} className="text-red-500" />}
                title="No MCQs. Ever."
                desc="You either pass the hands-on scenario in a live lab environment or you don't. No shortcuts. No tick boxes. Multiple choice questions don't stop hackers, and they won't pass you here."
              />
              <PhilosophyCard 
                icon={<TerminalSquare size={32} className="text-red-500" />}
                title="100% Practical"
                desc="Capture flags, identify threat vectors, and write professional reports. Your certificate proves exactly what you can DO under pressure, not what lectures you attended."
              />
              <PhilosophyCard 
                icon={<ShieldCheck size={32} className="text-red-500" />}
                title="Independent Validation"
                desc="The exam is completely independent of our training programs. Anyone can attempt it. If you have the skills, you can claim the certification. We measure capability, not origin."
              />
              <PhilosophyCard 
                icon={<Banknote size={32} className="text-red-500" />}
                title="Priced for India"
                desc="A student in Tamil Nadu shouldn't pay a dollar-priced fee designed for Manhattan salaries. We are building world-class exams priced specifically for the Indian ecosystem."
              />
            </div>
          </section>

          {/* SECTION 3: DOMAINS */}
          <section className="w-full space-y-12 mb-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">The 4 Certification Domains</h2>
              <p className="text-red-500 font-bold uppercase tracking-widest text-sm mt-4">Preview Roster</p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
              <DomainCard prefix="ZSA" title="Zharnyx SOC Analyst" icon={<Shield size={40} className="text-gray-500" />} desc="Live SIEM environment + Incident Response scenario. Detect the threat, contain the breach, and investigate the attack timeline within a simulated corporate network." />
              <DomainCard prefix="ZPT" title="Zharnyx Penetration Tester" icon={<Target size={40} className="text-gray-500" />} desc="Live pentest against an isolated target network. Exploit vulnerabilities, escalate privileges, and compile a professional VAPT report that actual clients would accept." />
              <DomainCard prefix="ZCS" title="Zharnyx Cloud Security Engineer" icon={<CloudLightning size={40} className="text-gray-500" />} desc="Live cloud environment audit + architecture defense. Identify misconfigurations in AWS/Azure/GCP simulated environments and secure the perimeter against ongoing attacks." />
              <DomainCard prefix="ZDF" title="Zharnyx Digital Forensics" icon={<Search size={40} className="text-gray-500" />} desc="Full forensic investigation of a compromised evidence package. Analyze memory dumps, disk images, and network pcaps to reconstruct exactly what the attacker did." />
            </div>
          </section>

          {/* SECTION 4: WAITLIST */}
          <section id="waitlist" className="w-full border-t-2 border-red-600/20 pt-24 pb-12 flex flex-col items-center text-center">
            <div className="max-w-3xl w-full p-8 md:p-12 bg-black border-2 border-white/10 relative overflow-hidden group hover:border-red-600/50 transition-colors">
              <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-6">Don't miss the launch.</h2>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto text-base leading-relaxed">
                We are rolling out the Tier 1 (Foundation) exams soon. Leave your email to get early access, beta testing opportunities, and exclusive launch pricing.
              </p>

              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="YOUR.EMAIL@SYS.COM" 
                  required
                  className="flex-1 bg-white/5 border-2 border-white/20 p-4 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors uppercase tracking-wider placeholder:text-gray-600"
                />
                <button 
                  type="submit" 
                  className="bg-red-600 text-white font-black px-8 py-4 uppercase tracking-widest hover:bg-red-700 transition-colors shrink-0 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.5)]"
                >
                  Register
                </button>
              </form>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

function PhilosophyCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-black border-2 border-white/20 hover:border-red-500 transition-colors group flex flex-col gap-4">
      <div className="p-3 bg-white/5 w-fit border border-white/10 group-hover:bg-red-500/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase tracking-wide text-white group-hover:text-red-500 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

function DomainCard({ prefix, title, icon, desc }: { prefix: string, title: string, icon: React.ReactNode, desc: string }) {
  return (
    <div className="group border-2 border-white/20 bg-black hover:border-red-500 transition-colors overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-64 bg-white/5 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 group-hover:bg-red-600/10 transition-colors">
        <div className="group-hover:scale-110 transition-transform mb-4 text-gray-400 group-hover:text-red-500">
            {icon}
        </div>
        <h3 className="font-black text-3xl tracking-widest text-white">{prefix}</h3>
      </div>
      <div className="p-8 flex-1 flex flex-col justify-center">
        <h4 className="text-xl font-bold uppercase tracking-wider text-white mb-4 group-hover:text-red-500 transition-colors">{title}</h4>
        <p className="text-gray-400 text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
