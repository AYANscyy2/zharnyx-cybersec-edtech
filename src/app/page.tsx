import { HeroSection } from "@/components/home/hero-section";
import { ProblemStatementSection } from "@/components/home/problem-statement-section";
import { TrackSpecialisationsSection } from "@/components/home/track-specialisations-section";
import { WhyZharnyxSection } from "@/components/home/why-zharnyx-section";
import { MasterPlanSection } from "@/components/home/master-plan-section";
import { WhoIsThisForSection } from "@/components/home/who-is-this-for-section";
import { FoundersSection } from "@/components/home/founders-section";
import { FaqSection } from "@/components/home/faq-section";
import { AboutCTASection } from "@/components/home/about-cta-section";

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

      {/* 2. Problem Statement */}
      <ProblemStatementSection />

      {/* 3. Track Specialisations */}
      <TrackSpecialisationsSection />

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

      {/* 9. Final CTA */}
      <AboutCTASection />
    </>
  );
}
