export interface Founder {
  name: string;
  role: string;
  image: string;
  shortDesc: string;
  longDesc: string;
  responsibilities: string[];
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  platforms: string;
}

export const FOUNDERS_DATA: Record<string, Founder> = {
  "Sanjai R": {
    name: "Sanjai R",
    role: "Founder & CEO",
    image: "https://ik.imagekit.io/bkt3emitco/IMG_20260222_134931.png",
    shortDesc: "Visionary behind Zharnyx. Building Tamil Nadu's cybersecurity talent pipeline.",
    longDesc: "The visionary behind Zharnyx. Founded the academy to make real cybersecurity education accessible across Tamil Nadu and build India's first homegrown certification standard that competes with and ultimately replaces foreign bodies in the Indian market.",
    responsibilities: [
      "Vision and Strategy",
      "Lead Instruction",
      "All Live Teaching Sessions",
      "Partnerships",
      "Media and Press",
      "College Outreach",
      "Legal and Finance Oversight",
      "Certification Authority",
      "Government Body Relations"
    ],
    contact: {
      email: "sanjai@zharnyx.com",
      linkedin: "https://linkedin.com/in/sanjai",
      twitter: "https://twitter.com/sanjai"
    },
    platforms: "LinkedIn (4x/week), Twitter/X, Medium, OWASP & Null community"
  },
  "Harish": {
    name: "Harish",
    role: "Co-Founder, Technical Lead",
    image: "https://ik.imagekit.io/bkt3emitco/WhatsApp%20Image%202026-04-03%20at%2014.08.21.jpeg",
    shortDesc: "Designed the 28-week curriculum with real-world tool integration.",
    longDesc: "Responsible for shaping the curriculum architecture and all technical content delivery. Harish ensures every week of training reflects current industry demands and real-world relevance. He designs every lab, every scenario, and every hands-on exercise.",
    responsibilities: [
      "Curriculum Architecture",
      "Lab Design",
      "Technical Content Delivery",
      "LMS Management",
      "Session Recordings",
      "GitHub Organization",
      "Certification Exam Design"
    ],
    contact: {
      email: "harish@zharnyx.com",
      github: "https://github.com/harish"
    },
    platforms: "Instagram + GitHub (3x/week)"
  },
  "Antony": {
    name: "Antony",
    role: "Co-Founder, Operations",
    image: "https://ik.imagekit.io/bkt3emitco/Screenshot%20From%202026-04-03%2014-12-51.png",
    shortDesc: "Connects students to hiring partners across TN (Tamil Nadu).",
    longDesc: "Drives operations, placement partnerships, and student success. Antony builds and maintains the hiring network that connects Zharnyx graduates to real opportunities across TN (Tamil Nadu).",
    responsibilities: [
      "Operations",
      "Placement Partnerships",
      "Enrollment Conversion",
      "Student Tracking",
      "WhatsApp and Telegram Community Management",
      "Hiring Partner Relationships"
    ],
    contact: {
      email: "antony@zharnyx.com",
      linkedin: "https://linkedin.com/in/antony"
    },
    platforms: "WhatsApp community + LinkedIn (3x/week)"
  }
};
