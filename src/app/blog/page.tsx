"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { FileText, ArrowRight, Terminal, Search } from "lucide-react";
import Link from "next/link";
import { SectionBadge } from "@/components/ui/section-badge";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

gsap.registerPlugin(SplitText);

const blogPosts = [
  {
    title: "SOC Analyst Roadmap 2026 — Tamil Nadu Edition",
    excerpt: "Everything you need to know about becoming a SOC Analyst in TN (Tamil Nadu). Career path, skills, salary, and hiring companies.",
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
    excerpt: "An analysis of cybersecurity hiring trends across TN (Tamil Nadu). Salary data, top employers, and in-demand skills.",
    category: "Industry Insights",
    date: "Jan 18, 2026",
    slug: "#"
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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
        delay: 0.5,
      })
        .from(split.words, {
          yPercent: 100,
          duration: 0.9,
          stagger: 0.1,
        }, "-=0.6")
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
        }, "-=0.8")


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="opacity-0 relative min-h-screen pt-32 pb-20 overflow-hidden font-mono bg-black text-white">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6">

        {/* Main Content Column */}
        <div className="flex flex-col gap-12">

          {/* Header Section */}
          <section className="space-y-6 flex flex-col items-start">
            <SectionBadge ref={badgeRef} text="Blog & Resources" icon={FileText} className="translate-y-5 opacity-0 items-start!" />

            <h1 ref={headingRef} className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-tight">
              Cybersecurity <br />
              <span className="text-red-500">
                Insights
              </span>
            </h1>
          </section>

          <div ref={contentRef} className="flex flex-col gap-12 opacity-0">
            <p className="text-gray-400 font-medium text-lg border-l-2 border-red-600 pl-4 max-w-xl">
              Career guides, tool tutorials, and industry insights for Tamil Nadu&apos;s cybersecurity community.
            </p>

            {/* Horizontal Categorical Filter + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                      activeCategory === cat 
                      ? "bg-red-600 border-red-600 text-black shadow-[4px_4px_0_0_white]" 
                      : "bg-transparent border-white/20 text-gray-500 hover:border-white hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="flex items-center bg-white/5 border-2 border-white/10 px-3 py-1 group focus-within:border-red-600 transition-colors max-w-sm w-full md:w-64">
                <input
                  type="text"
                  placeholder="SEARCH INTEL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none text-white focus:outline-hidden placeholder:text-gray-600 text-[10px] font-black uppercase tracking-widest flex-1 min-w-0"
                />
                <Search size={16} className="text-red-500 group-focus-within:scale-110 transition-transform" />
              </div>
            </div>

            {/* Articles Grid - Two Rows */}
            <section className="flex flex-col gap-12 mt-4">
              {(() => {
                const filteredPosts = blogPosts.filter(post => {
                  const matchesCategory = activeCategory === "All" || post.category === activeCategory;
                  const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
                  return matchesCategory && matchesSearch;
                });

                if (filteredPosts.length === 0) return (
                  <div className="py-20 text-center border-2 border-dashed border-white/10 text-gray-500 uppercase font-black tracking-widest">
                    No matching intel found
                  </div>
                );

                const featuredPost = filteredPosts[0];
                const carouselPosts = filteredPosts.slice(1);

                return (
                  <>
                    {/* Row 1: Featured Post */}
                    <div className="w-full">
                      <BlogCard post={featuredPost} featured={true} />
                    </div>

                    {/* Row 2: Slider for Remaining Posts */}
                    {carouselPosts.length > 0 && (
                      <div className="w-full relative px-4 md:px-0">
                        <Carousel
                          opts={{
                            align: "start",
                            loop: true,
                          }}
                          plugins={[
                            Autoplay({
                              delay: 4000,
                              stopOnInteraction: true,
                            }),
                          ]}
                          className="w-full"
                        >
                          <CarouselContent className="-ml-6">
                            {carouselPosts.map((post, idx) => (
                              <CarouselItem key={idx} className="pl-6 md:basis-1/2 lg:basis-1/2">
                                <BlogCard post={post} />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <div className="flex justify-start gap-4 mt-8">
                            <CarouselPrevious className="static translate-y-0 rounded-none border-2 border-white/20 bg-black text-white hover:bg-white hover:text-black transition-colors w-12 h-12" />
                            <CarouselNext className="static translate-y-0 rounded-none border-2 border-white/20 bg-black text-white hover:bg-white hover:text-black transition-colors w-12 h-12" />
                          </div>
                        </Carousel>
                      </div>
                    )}
                  </>
                );
              })()}
            </section>
          </div>
        </div>


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
