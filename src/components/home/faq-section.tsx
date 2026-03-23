"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Do I need prior cybersecurity experience?",
    a: "No. The Foundation Phase (Weeks 1–12) covers everything from Linux basics to Python scripting specifically designed for beginners. You just need a working laptop and commitment.",
  },
  {
    q: "Is this online, offline, or hybrid?",
    a: "Zharnyx runs in Coimbatore, Chennai, and fully remote. All labs are cloud-hosted so you can access them from anywhere. Weekend-intensive batches are available for working professionals.",
  },
  {
    q: "What happens after I finish the program?",
    a: "You go through our structured Career Launch phase — resume building, mock interviews, Demo Day with hiring partners, and direct referrals. Placement support is included in every full program.",
  },
  {
    q: "How long is the full program?",
    a: "7 months, 28 weeks. Structured as Foundation (12 weeks) → Specialisation (10 weeks) → Career Launch (6 weeks).",
  },
  {
    q: "Are EMI options available?",
    a: "Yes. We partner with NBFCs for 3, 6, and 9-month No-Cost EMI to ensure finances don't block your career.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-white/10 bg-black overflow-hidden hover:border-white/20 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h4 className="text-base md:text-lg font-bold text-white pr-8">{q}</h4>
        <div className="shrink-0 text-red-500">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 text-sm border-t-2 border-white/10 pt-4 leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="w-full py-24 px-6 font-mono bg-black border-t-2 border-white/10"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 bg-white text-black font-bold uppercase tracking-widest text-xs border-2 border-white shadow-[4px_4px_0px_0px_red]">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Questions
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {FAQS.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
