"use client";

import { Check, Shield, Zap, Terminal, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center gap-20">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-6">
          <div className="flex items-center gap-2 px-4 py-1 bg-red-600 text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white]">
            <Shield size={14} strokeWidth={3} />
            <span>Investment in Your Future</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-tight">
            Affordable By <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Design
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mt-4">
             All prices include 18% GST. No hidden fees.<br/>
             <span className="text-red-500 font-bold block mt-2">50% discount on Foundation Phase currently active.</span>
          </p>
        </section>

        {/* Detailed Package Breakdowns */}
        <section className="w-full flex justify-center mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Student Package */}
            <div className="bg-[#0a0a0a] border border-red-900/50 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="bg-red-900/20 text-red-500 border border-red-900/30 rounded-full px-4 py-1.5 text-xs font-medium w-fit mb-6">
                Student Package
              </div>
              <div className="mb-2">
                <span className="text-5xl font-bold text-white tracking-tight">₹47,137</span>
              </div>
              <div className="text-gray-500 text-xs font-medium mb-8">
                Total incl. 18% GST
              </div>

              <div className="space-y-4 mb-8 text-sm flex-1">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Foundation (50% off)</span>
                  <span className="text-white">₹4,949</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Specialization Track</span>
                  <span className="text-white">₹25,999</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Career Launch</span>
                  <span className="text-white">₹8,999</span>
                </div>
                
                <div className="h-px bg-white/10 my-4" /> {/* Divider */}

                <div className="flex justify-between items-center text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹39,947</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>GST (18%)</span>
                  <span className="text-white">₹7,190.46</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="text-red-500 text-xs font-medium mb-4">
                  50% discount on Foundation Phase
                </div>
                <Link
                  href="/auth?mode=signup"
                  className="w-full block text-center py-4 bg-[#f83146] hover:bg-[#ff4055] text-white font-bold rounded-xl transition-colors"
                >
                  Enroll as Student
                </Link>
              </div>
            </div>

            {/* Regular Package */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col relative overflow-hidden">
              <div className="bg-white/5 text-gray-400 border border-white/10 rounded-full px-4 py-1.5 text-xs font-medium w-fit mb-6">
                Regular Package
              </div>
              <div className="mb-2">
                <span className="text-5xl font-bold text-white tracking-tight">₹52,978</span>
              </div>
              <div className="text-gray-500 text-xs font-medium mb-8">
                Total incl. 18% GST
              </div>

              <div className="space-y-4 mb-8 text-sm flex-1">
                <div className="flex justify-between items-center text-gray-400">
                  <span>Foundation</span>
                  <span className="text-white">₹9,899</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Specialization Track</span>
                  <span className="text-white">₹25,999</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>Career Launch</span>
                  <span className="text-white">₹8,999</span>
                </div>
                
                <div className="h-px bg-white/10 my-4" /> {/* Divider */}

                <div className="flex justify-between items-center text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">₹44,897</span>
                </div>
                <div className="flex justify-between items-center text-gray-400">
                  <span>GST (18%)</span>
                  <span className="text-white">₹8,081.46</span>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/auth?mode=signup"
                  className="w-full block text-center py-4 bg-transparent border border-white/20 hover:bg-white/5 hover:border-white/40 text-white font-bold rounded-xl transition-all"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Modules Breakdown */}
        <section className="w-full flex flex-col gap-10">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Standalone Modules</h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">Build your own journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Foundation */}
            <PricingCard 
              title="Foundation Phase"
              tagline="Master the basics"
              price="₹4,999"
              originalPrice="₹9,999"
              color="white"
              features={["Linux & Windows Internals", "Networking Deep Dive", "Security Fundamentals", "Python for InfoSec"]}
            />
            
            {/* Specialization */}
            <PricingCard 
              title="Specialization Track"
              tagline="Choose your path"
              price="₹34,999"
              color="red"
              highlight
              features={["SOC / VAPT / Cloud / DFIR", "Enterprise Tooling", "Real-world Lab Scenarios", "Advanced Threat Simulation"]}
            />

            {/* Career Launch */}
            <PricingCard 
              title="Career Launch"
              tagline="Get hired"
              price="₹9,999"
              color="gray"
              features={["72-Hour Live Capstone", "Resume Optimization", "Mock Technical Interviews", "Placement Assistance"]}
            />
          </div>
        </section>

        {/* AI Add-On */}
        <section className="w-full">
           <div className="w-full border-2 border-white/20 bg-black/40 p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between hover:border-white/50 transition-colors">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <Zap className="text-yellow-500" />
                AI for Cybersecurity Add-On
              </h3>
              <p className="text-gray-400 text-sm">
                Standalone module covering AI/ML in cybersecurity — threat detection, anomaly analysis, and response. Available to all students regardless of track.
              </p>
            </div>
            <div className="shrink-0 flex flex-col gap-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest md:text-right">Institution / Batch</span>
              <button className="px-6 py-3 border-2 border-white/20 text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors text-center whitespace-nowrap">
                Pricing on Request
              </button>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-widest mt-4">
            EMI options available on request · Institutional / college batch pricing on request
          </p>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-3xl flex flex-col gap-8">
           <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center justify-center gap-3">
              <Terminal className="text-red-500" /> Pricing FAQ
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <FaqItem 
              q="Is the pricing final?" 
              a="Yes, the prices shown include 18% GST. There are no surprise infrastructure fees, hidden lab costs, or extra charges at the end of the program."
            />
            <FaqItem 
              q="Are there EMI options?" 
              a="Yes! We partner with NBFCs to provide No-Cost EMI options for 3, 6, and 9 months to make sure finances don't block your tech career."
            />
            <FaqItem 
              q="Can I get a refund?" 
              a="We offer a 7-day money-back guarantee for the Foundation Phase if you feel the training style isn't right for you. Subsequent specialized phases are non-refundable once content access is granted."
            />
             <FaqItem 
              q="Is there institutional pricing?" 
              a="Yes. If you are a college department or a corporate entity looking to train a batch of 10+ students, please reach out via our Contact page for bulk licensing."
            />
             <FaqItem 
              q="What does the student discount cover?" 
              a="Currently, we are running a 50% discount specifically on the Foundation Phase to lower the barrier for entry. This ensures everyone can access high-quality infosec basics."
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="flex flex-col items-center text-center mt-8 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase">
            Ready to Invest in Your Future?
          </h2>
          <p className="text-gray-400 max-w-xl">
             Limited seats per cohort. Secure your spot today.
          </p>
          <Link
            href="/auth?mode=signup"
            className="group relative px-10 py-5 bg-red-600 text-white font-bold text-lg uppercase tracking-wider border-2 border-red-600 hover:-translate-y-1 transition-transform shadow-[6px_6px_0px_0px_white] hover:shadow-[2px_2px_0px_0px_white]"
          >
            Enroll Now
          </Link>
        </section>

      </main>
    </div>
  );
}

function PricingCard({ title, tagline, price, originalPrice, highlight, features, color }: { title: string, tagline: string, price: string, originalPrice?: string, highlight?: boolean, features: string[], color: "white" | "red" | "gray" }) {
  const borderColor = highlight ? "border-red-600" : "border-white/20";
  const shadowColor = highlight ? "shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]" : "";
  
  return (
    <div className={`flex flex-col p-8 border-2 ${borderColor} bg-black relative transition-transform hover:-translate-y-2 ${shadowColor}`}>
      {highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-black px-4 py-1 text-xs font-bold uppercase tracking-widest border-2 border-red-600 shadow-[2px_2px_0px_0px_white]">
          Most Popular
        </div>
      )}
      
      <div className="mb-8 border-b-2 border-white/10 pb-6">
        <h3 className="text-2xl font-black uppercase text-white mb-1">{title}</h3>
        <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{tagline}</p>
        
        <div className="mt-6 flex flex-col">
          {originalPrice && (
            <span className="text-gray-500 line-through text-lg font-bold">{originalPrice}</span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">{price}</span>
            <span className="text-gray-500 text-sm font-bold">/ incl. GST</span>
          </div>
        </div>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feat, i) => (
          <li key={i} className="flex items-start gap-3">
            <Check size={18} className="text-red-500 shrink-0 mt-0.5" strokeWidth={3} />
            <span className="text-gray-300 text-sm font-medium">{feat}</span>
          </li>
        ))}
      </ul>

      <Link 
        href="/auth?mode=signup" 
        className={`w-full py-4 text-center font-bold text-sm uppercase tracking-widest border-2 transition-all ${
          highlight 
            ? "bg-red-600 text-white border-red-600 hover:bg-transparent" 
            : "bg-transparent text-white border-white/20 hover:border-white hover:bg-white/5"
        }`}
      >
        Select Phase
      </Link>
    </div>
  )
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="border-2 border-white/20 bg-black overflow-hidden transition-colors hover:border-white/40">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full p-6 text-left flex justify-between items-center focus:outline-hidden"
      >
        <h4 className="text-lg font-bold text-white pr-8">{q}</h4>
        <div className="shrink-0 text-red-500">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 text-sm border-t-2 border-white/10 pt-4 leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  )
}
