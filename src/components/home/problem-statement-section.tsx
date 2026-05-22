"use client";

import { useGsapScrollAnimation } from "@/hooks/use-gsap-animation";

export function ProblemStatementSection() {
  const headingRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "left",
    duration: 0.7,
  });
  const bodyRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "right",
    duration: 0.7,
    delay: 0.1,
  });
  const statsRef = useGsapScrollAnimation<HTMLDivElement>({
    direction: "up",
    duration: 0.6,
    delay: 0.2,
    stagger: 0.1,
    childSelector: ".stat-anim-wrapper",
  });

  return (
    <section className="w-full bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Heading */}
        <div ref={headingRef} className="md:w-1/2 shrink-0">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Colleges teach the <br />
            <span className="text-gray-500">syllabus.</span>
            <br />
            We teach the <br />
            <span className="text-[#E60000]">
              skill.
            </span>
          </h2>
        </div>

        {/* Right: Body + Stat */}
        <div className="md:w-1/2 flex flex-col gap-8">
          <div ref={bodyRef}>
            <p className="text-gray-400 text-lg leading-relaxed border-l-4 border-red-600 pl-6">
              95% of cybersecurity graduates can&apos;t handle a real SOC alert,
              write a pentest report, or analyze a memory dump. The industry needs{" "}
              <strong className="text-white">Day-1 deployable talent</strong> —
              not certificate holders.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-4">
            {[
              { label: "Real Labs", value: "28" },
              { label: "Weeks", value: "28" },
              { label: "Tracks", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="stat-anim-wrapper">
                <div
                  className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
