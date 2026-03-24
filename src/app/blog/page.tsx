"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { FileText, ArrowRight, Rss, Terminal, Search } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(SplitText);

const blogPosts = [
  {
    title: "SOC Analyst Roadmap 2026 — Tamil Nadu Edition",
    excerpt: "Everything you need to know about becoming a SOC Analyst in Chennai & Coimbatore. Career path, skills, salary, and hiring companies.",
    category: "Career Guide",
    date: "Mar 12, 2026",
    slug: "#"
  },
  {
    title: "OWASP Top 10 Explained for Beginners",
    excerpt: "A beginner-friendly breakdown of the most critical web application security risks — with examples and mitigation strategies.",
    category: "Tutorial",
    date: "Mar 05, 2026",
    slug: "#"
  },
  {
    title: "AWS IAM Best Practices for Security Engineers",
    excerpt: "How to implement least-privilege IAM policies in production AWS environments. Common misconfigurations and how to fix them.",
    category: "Cloud Security",
    date: "Feb 28, 2026",
    slug: "#"
  },
  {
    title: "Introduction to Digital Forensics — Where to Start",
    excerpt: "A complete beginner's guide to digital forensics: tools, methodology, and career opportunities in India.",
    category: "DFIR",
    date: "Feb 15, 2026",
    slug: "#"
  },
  {
    title: "MITRE ATT&CK Framework — A Practical Guide",
    excerpt: "How to use MITRE ATT&CK for detection engineering, threat hunting, and security operations.",
    category: "Blue Team",
    date: "Feb 02, 2026",
    slug: "#"
  },
  {
    title: "Tamil Nadu Cybersecurity Job Market 2026",
    excerpt: "An analysis of cybersecurity hiring trends in Coimbatore, Chennai, and across Tamil Nadu. Salary data, top employers, and in-demand skills.",
    category: "Industry Insights",
    date: "Jan 18, 2026",
    slug: "#"
  }
];

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.set(containerRef.current, { autoAlpha: 1 });
    const ctx = gsap.context(() => {
      const split = new SplitText(headingRef.current, {
        type: "words,lines",
        linesClass: "line-mask",
      });

      gsap.set(split.lines, { overflow: "hidden", display: "block" });

      // Initial state: blank
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
          duration: 0.9,
          stagger: 0.4,
        }, "-=0.6")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8")
        .to(sidebarRef.current, {
          opacity: 1,
          x: 0,
          duration: 1.2
        }, "-=0.8")


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Main Content Column */}
        <div className="lg:col-span-8 flex flex-col gap-12">

          {/* Header Section */}
          <section className="space-y-6">
            <div ref={badgeRef} className="translate-y-5 flex items-center gap-2 px-4 py-1 bg-red-600 w-fit text-black font-bold uppercase tracking-widest text-xs border-2 border-red-600 shadow-[4px_4px_0px_0px_white] opacity-0">
              <FileText size={14} strokeWidth={3} />
              <span>Blog & Resources</span>
            </div>

            <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
              Cybersecurity <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
                Insights
              </span>
            </h1>
          </section>

          <div ref={contentRef} className="flex flex-col gap-12 opacity-0">
            <p className="text-gray-400 font-medium text-lg border-l-2 border-red-600 pl-4 max-w-xl">
              Career guides, tool tutorials, and industry insights for Tamil Nadu's cybersecurity community.
            </p>

            {/* Articles Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
              {blogPosts.map((post, idx) => (
                <BlogCard key={idx} post={post} featured={idx === 0} />
              ))}
            </section>
          </div>
        </div>

        {/* Sidebar */}
        <aside ref={sidebarRef} className="lg:col-span-4 translate-x-10 opacity-0 flex flex-col gap-8">

          {/* Search Box */}
          <div className="border-2 border-white/20 bg-black p-6">
            <h3 className="text-lg font-black uppercase text-white mb-4 flex items-center gap-2">
              <Search size={18} className="text-red-500" /> Search intel
            </h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Keywords..."
                className="w-full bg-white/5 border-2 border-white/20 px-4 py-2 text-white focus:outline-hidden focus:border-red-500 transition-colors placeholder:text-gray-600 flex-1 min-w-0"
              />
              <button className="bg-red-600 border-2 border-red-600 px-4 text-black hover:bg-red-500 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="border-2 border-red-600 bg-red-600/5 p-8 relative shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]">
            <div className="absolute top-0 right-0 p-2 bg-red-600 text-black">
              <Rss size={20} />
            </div>
            <h3 className="text-2xl font-black uppercase text-white mb-2 pr-8 leading-tight">
              Weekly Tamil Nadu <span className="text-red-500">Cyber Insights</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 mt-4">
              Get career guides, tool tutorials, and job market updates directly in your inbox. No spam, just signal.
            </p>

            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-black border-2 border-white/20 px-4 py-3 text-white focus:outline-hidden focus:border-red-500 transition-colors uppercase tracking-widest text-xs font-bold"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black font-black uppercase tracking-widest text-sm py-3 border-2 border-white hover:bg-black hover:text-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="border-2 border-white/20 bg-black p-6">
            <h3 className="text-lg font-black uppercase text-white mb-4 flex items-center gap-2">
              <Terminal size={18} className="text-red-500" /> Categories
            </h3>
            <ul className="flex flex-col gap-2">
              {["Career Guides", "Tool Tutorials", "Industry Analytics", "DFIR", "Cloud Security", "Red Teaming"].map(cat => (
                <li key={cat}>
                  <Link href="#" className="flex items-center justify-between text-sm text-gray-400 hover:text-white hover:pl-2 transition-all p-2 hover:bg-white/5">
                    <span className="uppercase tracking-wide">{cat}</span>
                    <span className="text-red-500 text-xs font-bold">[+]</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </main>
    </div>
  );
}

function BlogCard({ post, featured }: { post: any, featured?: boolean }) {
  return (
    <div className={`flex flex-col border-2 border-white/20 bg-black transition-all hover:-translate-y-1 hover:border-white/50 group ${featured ? "md:col-span-2 md:flex-row shadow-[4px_4px_0px_0px_white] border-white/40" : ""}`}>

      {/* Visual Placeholder */}
      <div className={`bg-white/5 border-b-2 md:border-b-0 md:border-r-2 border-white/20 relative overflow-hidden flex items-center justify-center shrink-0 ${featured ? "md:w-1/2 h-64 md:h-auto" : "h-48"}`}>
        <Terminal size={48} className="text-white/10 group-hover:scale-110 transition-transform duration-500" />
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none"></div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-red-600/10 text-red-500 px-2 py-1 text-xs font-bold uppercase tracking-widest border border-red-600/20">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs font-mono">{post.date}</span>
        </div>

        <h3 className={`font-black uppercase text-white mb-3 leading-tight ${featured ? "text-2xl lg:text-3xl" : "text-xl"}`}>
          <Link href={post.slug} className="hover:text-red-500 transition-colors">
            {post.title}
          </Link>
        </h3>

        <p className="text-gray-400 text-sm mb-6 flex-1">
          {post.excerpt}
        </p>

        <Link href={post.slug} className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-xs group-hover:text-red-500 transition-colors w-fit border-b border-transparent group-hover:border-red-500 pb-1 mt-auto">
          Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
