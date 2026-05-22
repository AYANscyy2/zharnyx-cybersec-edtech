"use client"

import { useRouter } from "next/navigation";

const TOOLS = [
  "Wireshark", "Burp Suite", "DVWA", "VirusTotal", "AbuseIPDB", "Shodan",
  "Autopsy", "Nmap", "CloudTrail", "Docker", "Kubernetes", "Splunk",
  "Microsoft Sentinel", "IBM QRadar", "MISP", "OpenCTI", "AlienVault OTX",
  "Censys", "TheHive", "Cortex", "Volatility", "Sigma", "Jira", "Slack",
  "BlueTeamLabs", "CyberDefenders", "Hashcat", "John the Ripper", "BloodHound",
  "PowerView", "ADRecon", "SQLMap", "Hydra", "Metasploit", "Meterpreter",
  "Mimikatz", "ScoutSuite", "Prowler", "Pacu", "ROADtools", "JADX", "ADB",
  "MobSF", "Frida", "Objection", "GoPhish", "Evilginx", "Zeek", "Suricata",
  "CrowdStrike Falcon", "SentinelOne",
];

// Triple the items so the loop is truly seamless at any viewport
const ITEMS = [...TOOLS, ...TOOLS, ...TOOLS];

export function ToolsStrip() {
  const router = useRouter()
  return (
    <div className="w-full bg-black relative flex items-stretch overflow-hidden">
      {/* Neo label */}
      <div className="shrink-0 z-20 flex items-center justify-center bg-black px-5 py-3.5">
        <div className="border border-red-500/50 bg-red-500/5 rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest whitespace-nowrap">
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
            <span onClick={() => {
              router.push("/blog")
            }} key={i} className="flex items-center shrink-0">
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
