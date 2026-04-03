const TOOLS = [
  "Splunk", "Metasploit", "Burp Suite", "Wireshark", "Nmap", "Nessus",
  "Kali Linux", "MITRE ATT&CK", "Cobalt Strike", "Volatility", "Autopsy",
  "OpenVAS", "Snort", "Suricata", "YARA", "Sigma", "TheHive", "Velociraptor",
  "Elastic SIEM", "Microsoft Sentinel", "AWS Security Hub", "Shodan",
  "Hashcat", "John the Ripper", "Ghidra", "Radare2", "IDA Pro", "x64dbg",
  "Maltego", "Recon-ng", "Nikto", "SQLMap", "Hydra", "Aircrack-ng",
];

// Triple the items so the loop is truly seamless at any viewport
const ITEMS = [...TOOLS, ...TOOLS, ...TOOLS];

export function ToolsStrip() {
  return (
    <div className="w-full bg-black border-y border-white/6 relative flex items-stretch overflow-hidden">
      {/* Neo label */}
      <div className="shrink-0 z-20 flex items-center justify-center border-r border-white/10 bg-black px-5 py-3.5">
        <div className="border border-red-500 px-3 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.25em] whitespace-nowrap">
            Cyber Tools
          </span>
        </div>
      </div>

      {/* Fade after label */}
      <div className="absolute left-[110px] top-0 h-full w-12 z-10 bg-linear-to-r from-black to-transparent pointer-events-none" />
      {/* Fade right edge */}
      <div className="absolute right-0 top-0 h-full w-20 z-10 bg-linear-to-l from-black to-transparent pointer-events-none" />

      {/* Marquee track */}
      <div className="overflow-hidden flex-1 py-3">
        <div
          className="flex w-max"
          style={{ animation: "tools-scroll 45s linear infinite" }}
        >
          {ITEMS.map((tool, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-red-500 transition-colors cursor-default px-4 whitespace-nowrap font-mono">
                {tool}
              </span>
              <span className="text-red-600/30 text-xs select-none">›</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes tools-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
