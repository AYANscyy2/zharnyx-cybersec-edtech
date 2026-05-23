"use client";

import { SyllabusLayout } from "@/components/syllabus/syllabus-layout";

const curriculumData = [
  {
    "month": 0,
    "title": "The Hook & Orientation",
    "weeks": [
      {
        "week": 0,
        "title": "The Hook",
        "theme": "Free · Certificate on completion · Gateway to enrollment",
        "modules": [
          {
            "id": "M1",
            "title": "The Invisible War — What Hackers Are Doing Right Now",
            "description": "Real-time breach stories, live threat maps, why every company on earth is a target. Students feel the urgency immediately.",
            "type": "Demo"
          },
          {
            "id": "M2",
            "title": "What Is Cybersecurity — The 4 Domains That Protect the World",
            "description": "SOC, VAPT, DFIR, Cloud Security — explained with stories, not jargon. Students understand the full landscape in 20 minutes.",
            "type": "Theory"
          },
          {
            "id": "M3",
            "title": "A Day in the Life — SOC Analyst, Ethical Hacker, Forensics Investigator, Cloud Security Engineer",
            "description": "4 career paths, 4 mini-stories. Real job scenarios. Students start imagining themselves in these roles.",
            "type": "Career"
          },
          {
            "id": "M4",
            "title": "How Hackers Think — The Attacker Mindset (No Jargon)",
            "description": "Social engineering, phishing, basic recon explained through real-world stories. No tools needed — pure mindset shift.",
            "type": "Demo"
          },
          {
            "id": "M5",
            "title": "The Salary Reality — Cybersecurity Jobs in India and Global",
            "description": "Honest numbers: fresher salaries, 2-year growth, remote opportunities, global demand. Connects learning to income.",
            "type": "Career"
          },
          {
            "id": "M6",
            "title": "Your First Look Inside — What You Will Learn at Zharnyx",
            "description": "Walkthrough of the full learning journey, what foundations build, what core tracks deliver, what certifications mean.",
            "type": "Theory"
          },
          {
            "id": "M7",
            "title": "Your Cybersecurity Readiness — Mini Assessment + Certificate",
            "description": "Short interactive quiz, personalized track recommendation, shareable Zharnyx Week 0 certificate. The conversion trigger.",
            "type": "Career"
          }
        ]
      }
    ]
  }
];

export default function Week0Page() {
  return (
    <SyllabusLayout
      meta={{
        slug: "week-0",
        title: "Week 0",
        subtitle: "Free Gateway",
        phase: "Free · No Prerequisites",
        duration: "1 Week · 7 Modules",
        tagline: "Begin your journey into cybersecurity without spending a dime. Understand the attacker mindset and explore all 4 career paths.",
      }}
      curriculum={curriculumData}
    />
  );
}
