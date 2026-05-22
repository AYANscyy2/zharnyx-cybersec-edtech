"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";
import { SectionBadge } from "@/components/ui/section-badge";

const FAQS = [
  {
    q: "Do I need prior cybersecurity experience?",
    a: "No. The Foundation Phase (Weeks 1–12) covers everything from Linux basics to Python scripting specifically designed for beginners. You just need a working laptop and commitment.",
  },
  {
    q: "Is this online, offline, or hybrid?",
    a: "Zharnyx runs in TN (Tamil Nadu) and fully remote. All labs are cloud-hosted so you can access them from anywhere. Weekend-intensive batches are available for working professionals.",
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
    <div className="rounded-2xl border border-white/5 bg-zinc-900/40 overflow-hidden hover:border-[#E60000]/30 transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h4 className="text-base md:text-lg font-bold text-white pr-8">{q}</h4>
        <div className="shrink-0 text-[#E60000]">
          {open ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 text-sm border-t border-white/5 pt-4 leading-relaxed font-medium">
          {a}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const headerRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
  });
  const listRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.65,
    delay: 0.1,
    stagger: 0.1,
    childSelector: ".faq-item",
  });

  return (
    <section
      id="faq"
      className="w-full py-24 px-6 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <div ref={headerRef} className="text-center space-y-4 flex flex-col items-center">
          <SectionBadge text="FAQ" icon={HelpCircle} />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Frequently asked{" "}
            <span className="text-[#E60000]">
              questions
            </span>
          </h2>
        </div>

        <div ref={listRef} className="w-full max-w-3xl flex flex-col gap-4">
          {FAQS.map((faq) => (
            <div key={faq.q} className="faq-item">
              <FaqItem q={faq.q} a={faq.a} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
