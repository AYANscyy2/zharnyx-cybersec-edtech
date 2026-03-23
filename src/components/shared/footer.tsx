"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide footer on dashboard/profile routes
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Info */}
          <div className="space-y-6 flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-2 w-fit">
              {/* ZHARNYX Logo (matching navbar style) */}
              <div className="flex items-center">
                <span className="text-xl md:text-2xl font-black tracking-widest text-white">
                  ZHARNY<span className="text-red-600">X</span>
                </span>
                {/* Simplified cross-shapes logo mark next to text in the screenshot */}
                <div className="ml-[-110px] mr-2 text-red-600 pointer-events-none opacity-80 flex gap-0.5">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M18 6L6 18M6 6l12 12"></path>
                      <path d="M4 12h16" className="opacity-50"></path>
                   </svg>
                </div>
              </div>
            </Link>

            <div className="space-y-4 pt-2">
              <p className="text-red-500 font-bold text-sm tracking-wide">
                Tamil Nadu's Own Cybersecurity Academy
              </p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Every Week. Every Skill. Every Student — Unregrettable.
              </p>
              <p className="text-[#333333] text-xs pt-6">
                Serving Coimbatore & Chennai, Tamil Nadu
              </p>
            </div>
          </div>

          {/* Column 2: Programs */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Programs</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/programs#overview" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="/foundation" className="hover:text-white transition-colors">Foundation Phase</Link></li>
              <li><Link href="/programs#soc" className="hover:text-white transition-colors">SOC Analyst</Link></li>
              <li><Link href="/programs#vapt" className="hover:text-white transition-colors">VAPT</Link></li>
              <li><Link href="/programs#cloud" className="hover:text-white transition-colors">Cloud Security</Link></li>
              <li><Link href="/programs#dfir" className="hover:text-white transition-colors">DFIR</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/placements" className="hover:text-white transition-colors">Placements</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/curriculum" className="hover:text-white transition-colors">Full Curriculum</Link></li>
              <li><Link href="/capstone" className="hover:text-white transition-colors">Capstone</Link></li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 tracking-wide">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/auth?mode=signup" className="hover:text-white transition-colors">Contact / Enroll</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 text-xs text-gray-500">
          <p>© {currentYear} Zharnyx Cybersecurity Academy. All rights reserved.</p>
          <p>Founded by Sanjai R</p>
        </div>
        
      </div>
    </footer>
  );
}
