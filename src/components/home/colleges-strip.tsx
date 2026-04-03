import Link from "next/link";

const ROW1 = [
  "Anna University", "PSG College of Technology", "Amrita Vishwa Vidyapeetham",
  "VIT Vellore", "SRM Institute of Technology", "SSN College of Engineering",
  "Kongu Engineering College", "CIT Coimbatore", "Bannari Amman Institute",
  "Kumaraguru College of Technology", "Sri Venkateswara College of Engineering",
  "Sathyabama Institute", "Saveetha Engineering College", "Rajalakshmi Engineering",
  "Jeppiaar Engineering", "Easwari Engineering College", "Panimalar Engineering",
];

const ROW2 = [
  "Bharathiar University", "Madurai Kamaraj University", "Alagappa University",
  "Annamalai University", "Periyar University", "Thiruvalluvar University",
  "Mother Teresa Women's University", "Tamil Nadu Agricultural University",
  "Pondicherry University", "Government Arts College Coimbatore",
  "PSG Arts and Science", "Nirmala College for Women", "Sri Ramakrishna College of Arts",
  "Vellalar College for Women", "Avinashilingam Institute", "CMS College of Science",
  "Bishop Heber College", "National College Trichy",
];

// Triple for seamless loop
const R1 = [...ROW1, ...ROW1, ...ROW1];
const R2 = [...ROW2, ...ROW2, ...ROW2];

export function CollegesStrip() {
  return (
    <div className="w-full bg-black border-t border-white/6 relative overflow-hidden">

      {/* Fade left/right edges */}
      <div className="absolute left-0 top-0 h-full w-24 z-10 bg-linear-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 z-10 bg-linear-to-l from-black to-transparent pointer-events-none" />

      {/* Neo label centered */}
      <div className="relative z-20 flex justify-center pt-6 pb-5">
        <Link href="/colleges" className="group flex items-center gap-3">
          <div className="h-px w-12 bg-white/10" />
          <div className="border border-white/20 group-hover:border-red-500/60 transition-colors px-3 py-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors" />
            <span className="text-[9px] font-black text-gray-500 group-hover:text-red-500 uppercase tracking-[0.25em] whitespace-nowrap transition-colors">
              Partner Colleges · Tamil Nadu
            </span>
          </div>
          <div className="h-px w-12 bg-white/10" />
        </Link>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="overflow-hidden pb-3">
        <div
          className="flex w-max"
          style={{ animation: "col-left 50s linear infinite" }}
        >
          {R1.map((c, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-700 hover:text-gray-400 transition-colors cursor-default px-5 whitespace-nowrap">
                {c}
              </span>
              <span className="text-white/6 select-none">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden pb-6">
        <div
          className="flex w-max"
          style={{ animation: "col-right 55s linear infinite" }}
        >
          {R2.map((c, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-800 hover:text-gray-500 transition-colors cursor-default px-5 whitespace-nowrap">
                {c}
              </span>
              <span className="text-white/4 select-none">·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes col-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes col-right {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
