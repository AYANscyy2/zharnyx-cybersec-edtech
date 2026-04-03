import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { ProblemStatementSection } from "@/components/home/problem-statement-section";
import { TrackSpecialisationsSection } from "@/components/home/track-specialisations-section";
import { ProgramDetailsSection } from "@/components/internships/program-details-section";
import { WhyZharnyxSection } from "@/components/home/why-zharnyx-section";
import { MasterPlanSection } from "@/components/home/master-plan-section";
import { WhoIsThisForSection } from "@/components/home/who-is-this-for-section";
import { FoundersSection } from "@/components/home/founders-section";
import { FaqSection } from "@/components/home/faq-section";
import { AboutCTASection } from "@/components/home/about-cta-section";
import { ToolsStrip } from "@/components/home/tools-strip";
import { PartnersStrip } from "@/components/home/partners-strip";
import { CollegesStrip } from "@/components/home/colleges-strip";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredCourse = {
    months: [],
    level: "",
    price: 0,
    portfolioStats: {
      scripts: 0,
      audits: 0,
      caseStudies: 0,
      certificates: 0,
    },
  };

  return (
    <>
      {/* 1. Hero */}
      <HeroSection course={featuredCourse} />

      {/* Tools Strip — cybersecurity tools ticker */}
      <ToolsStrip />

      {/* 2. Problem Statement */}
      <ProblemStatementSection />

      {/* Partners Strip — hiring partners ticker */}
      <div className="flex flex-col items-center bg-[#040404]">
        <PartnersStrip />
        <Link 
          href="/partners" 
          className="py-4 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-red-500 transition-all flex items-center gap-1.5 group"
        >
          [ View Full Placement Network <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span> ]
        </Link>
      </div>

      {/* 3. Track Specialisations */}
      <TrackSpecialisationsSection />

      {/* Internship Integration */}
      <ProgramDetailsSection />

      {/* 4. Why Zharnyx */}
      <WhyZharnyxSection />

      {/* 5. 7-Month Plan */}
      <MasterPlanSection />

      {/* 6. Who Is This For */}
      <WhoIsThisForSection />

      {/* 7. Founders */}
      <FoundersSection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* Colleges Strip — Tamil Nadu colleges ticker */}
      <div className="flex flex-col items-center bg-black">
        <CollegesStrip />
        <Link 
          href="/colleges" 
          className="pb-12 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-700 hover:text-red-500 transition-all flex items-center gap-1.5 group"
        >
          [ See All Supported Campuses <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span> ]
        </Link>
      </div>

      {/* 9. Final CTA */}
      <AboutCTASection />
    </>
  );
}
