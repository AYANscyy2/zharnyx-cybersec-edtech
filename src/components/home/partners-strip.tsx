import Link from "next/link";

const PARTNERS = [
  { name: "Petadot", type: "Core Partner" },
  { name: "Briskinfosec", type: "Core Partner" },
  { name: "StrongBox IT", type: "Core Partner" },
  { name: "TCS", type: "Hiring Partner" },
  { name: "Infosys", type: "Hiring Partner" },
  { name: "HCL Tech", type: "Hiring Partner" },
  { name: "Zoho Corp", type: "Hiring Partner" },
  { name: "Freshworks", type: "Hiring Partner" },
  { name: "CERT-In", type: "Govt. Body" },
  { name: "CTS InfoSec", type: "Hiring Partner" },
  { name: "Deloitte", type: "Hiring Partner" },
  { name: "PwC India", type: "Hiring Partner" },
  { name: "Palo Alto", type: "Tools Partner" },
  { name: "CyberArk", type: "Tools Partner" },
];

const ITEMS = [...PARTNERS, ...PARTNERS, ...PARTNERS];

export function PartnersStrip() {
  return (
    <div className="w-full bg-[#040404] border-b border-white/6 relative flex items-stretch overflow-hidden">
      {/* Neo label */}
      <Link
        href="/partners"
        className="shrink-0 z-20 flex items-center justify-center border-r border-white/10 bg-[#040404] px-5 py-4 group"
      >
        <div className="border border-red-500 group-hover:bg-red-500/10 transition-colors px-3 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.25em] whitespace-nowrap">
            Hiring Partners
          </span>
        </div>
      </Link>

      {/* Fade after label */}
      <div className="absolute left-[130px] top-0 h-full w-12 z-10 bg-linear-to-r from-[#040404] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 z-10 bg-linear-to-l from-[#040404] to-transparent pointer-events-none" />

      {/* Marquee track */}
      <div className="overflow-hidden flex-1 py-3.5">
        <div
          className="flex w-max"
          style={{ animation: "partners-scroll 60s linear infinite" }}
        >
          {ITEMS.map((p, i) => (
            <span key={i} className="flex items-center shrink-0 px-5 gap-3">
              <span className="text-[12px] font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors cursor-default whitespace-nowrap font-mono">
                {p.name}
              </span>
              <span className={`text-[8px] font-bold uppercase tracking-widest border px-1.5 py-0.5 whitespace-nowrap ${
                p.type === "Core Partner"
                  ? "border-red-500/50 text-red-500"
                  : p.type === "Govt. Body"
                  ? "border-sky-500/50 text-sky-400"
                  : "border-white/10 text-gray-600"
              }`}>
                {p.type}
              </span>
              <span className="text-white/10 text-xs select-none ml-2">|</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
