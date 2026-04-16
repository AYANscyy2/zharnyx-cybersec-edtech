"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide footer on dashboard/profile routes
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile")) {
    return null;
  }

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-2 border-white/10 font-mono">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Flex Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24 mb-16">

          {/* Left: Brand & Info */}
          <div className="space-y-6 max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-0 w-fit group bg-black py-2 pr-6 pl-2 hover:border-2  hover:border-red-600 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] hover:-translate-y-1"
            >
              <img
                src="https://ik.imagekit.io/bkt3emitco/zharnyxincress.png"
                alt="Zharnyx Logo"
                className="h-16 w-auto -mr-3 object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105 relative z-10"
              />
              <span className="relative z-10 text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
                ZHARNY<span className="text-red-600 transition-colors duration-300 group-hover:text-red-500">X</span>
              </span>
            </Link>

            <div className="space-y-6 pt-4">
              <p className="text-gray-400 text-sm font-medium leading-relaxed pr-8 border-l-4 border-red-600 pl-4">
                Zharnyx empowers students to transform raw curiosity into clear, compelling capabilities — making cybersecurity easier to learn, master, and defend.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 pt-2">
                <a href="https://twitter.com/zharnyx" target="_blank" rel="noopener noreferrer" className="p-3 bg-black border-2 border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                  <span className="sr-only">X (Twitter)</span>
                  <Twitter size={20} />
                </a>
                <a href="https://instagram.com/zharnyx" target="_blank" rel="noopener noreferrer" className="p-3 bg-black border-2 border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                  <span className="sr-only">Instagram</span>
                  <Instagram size={20} />
                </a>
                <a href="https://linkedin.com/company/zharnyx" target="_blank" rel="noopener noreferrer" className="p-3 bg-black border-2 border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin size={20} />
                </a>
                <a href="https://github.com/zharnyx" target="_blank" rel="noopener noreferrer" className="p-3 bg-black border-2 border-white/10 text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)] hover:shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                  <span className="sr-only">GitHub</span>
                  <Github size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-20 pt-4">
            {/* Column 1: Programs */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest border-b-2 border-red-600/30 pb-2 mb-6">Programs</h4>
              <ul className="space-y-4">
                <li><Link href="/programs" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Overview</Link></li>
                <li><Link href="/foundation" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Foundation</Link></li>
                <li><Link href="/programs/soc" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">SOC Analyst</Link></li>
                <li><Link href="/programs/vapt" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">VAPT</Link></li>
                <li><Link href="/programs/cloud-security" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Cloud Security</Link></li>
                <li><Link href="/programs/dfir" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">DFIR</Link></li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest border-b-2 border-red-600/30 pb-2 mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Blog</Link></li>
                <li><Link href="/certifications" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Certifications</Link></li>
                <li><Link href="/capstone" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Capstone</Link></li>
                <li><Link href="/faq" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">FAQ</Link></li>
                <li><Link href="/apply" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">apply</Link></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest border-b-2 border-red-600/30 pb-2 mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">About Us</Link></li>
                <li><Link href="/placements" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Careers</Link></li>
                <li><Link href="/contact" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Contact</Link></li>
                <li><Link href="/pricing" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Pricing</Link></li>
                <li><Link href="/partners" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Partners</Link></li>
                <li><Link href="/colleges" className="block text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white  transition-transform">Colleges</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t-2 border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600">© {currentYear} Zharnyx. All rights reserved.</p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
