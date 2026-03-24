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
    childSelector: "div",
  });

  return (
    <section className="w-full bg-black border-y-2 border-white/10 py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left: Heading */}
        <div ref={headingRef} className="md:w-1/2 shrink-0">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            Colleges Teach the{" "}
            <span className="text-red-500">Syllabus.</span>
            <br />
            We Teach the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Skill.
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
              <div
                key={stat.label}
                className="border-2 border-white/10 p-4 text-center hover:border-red-600 transition-colors"
              >
                <div className="text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
