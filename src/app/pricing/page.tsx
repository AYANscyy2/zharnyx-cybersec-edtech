import { PricingHero } from "@/components/pricing/hero-section";
import { PricingCard } from "@/components/pricing/pricing-card";
import { db } from "@/lib/db";
import { course } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Force dynamic rendering to ensure DB data is fresh
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const courses = await db.query.course.findMany({
    where: eq(course.status, "published"),
    with: {
      months: true,
    },
  });

  return (
    <main className="min-h-screen bg-black">
      <PricingHero />
      <div className="flex flex-col gap-10 pb-20">
        {courses.map((c) => (
          <PricingCard key={c.id} course={c} />
        ))}
        {courses.length === 0 && (
          <div className="text-center text-gray-500 py-20 uppercase font-mono tracking-widest">
            No active courses available
          </div>
        )}
      </div>
    </main>
  );
}
