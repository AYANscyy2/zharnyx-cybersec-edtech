"use client";

import { AnimatedBackground } from "@/components/shared/animated-background";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  BookOpen,
  Clock,
  BarChart,
  DollarSign,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data structured to resemble the schema relationships
const programs = [
  {
    id: "nd-101",
    title: "Network Defense Essentials",
    description:
      "Master the fundamentals of network security, packet analysis, and defense strategies. Ideal for those starting their journey in cybersecurity.",
    duration: "12 Weeks",
    level: "Beginner",
    price: 4999,
    months: [
      {
        title: "Month 1: Networking Basics",
        weeks: [
          { title: "Introduction to Networking Models", isProject: false },
          { title: "IP Addressing and Subnetting", isProject: false },
          { title: "Network Protocols and Services", isProject: false },
          { title: "Network Analysis Project", isProject: true },
        ],
      },
      {
        title: "Month 2: Security Fundamentals",
        weeks: [
          { title: "Security Principles (CIA Triad)", isProject: false },
          { title: "Firewalls and VPNs", isProject: false },
          { title: "Intrusion Detection Systems", isProject: false },
          { title: "Secure Network Design Project", isProject: true },
        ],
      },
      {
        title: "Month 3: Advanced Defense",
        weeks: [
          { title: "Traffic Analysis with Wireshark", isProject: false },
          { title: "Incident Response Basics", isProject: false },
          { title: "Hardening Network Infrastructure", isProject: false },
          { title: "Final Defense Capstone", isProject: true },
        ],
      },
    ],
  },
  {
    id: "eh-201",
    title: "Ethical Hacking & Penetration Testing",
    description:
      "Learn offensive security techniques to find and fix vulnerabilities. Simulates real-world attack scenarios in a controlled environment.",
    duration: "16 Weeks",
    level: "Intermediate",
    price: 7999,
    months: [
      {
        title: "Month 1: Reconnaissance & Scanning",
        weeks: [
          { title: "Footprinting and Reconnaissance", isProject: false },
          { title: "Scanning Networks", isProject: false },
          { title: "Enumeration Techniques", isProject: false },
          { title: "Target Profiling Project", isProject: true },
        ],
      },
      {
        title: "Month 2: System Hacking",
        weeks: [
          { title: "Vulnerability Analysis", isProject: false },
          { title: "System Hacking Phases", isProject: false },
          { title: "Malware Threats", isProject: false },
          { title: "Exploit Development Project", isProject: true },
        ],
      },
      {
        title: "Month 3: Web App & Network Hacking",
        weeks: [
          { title: "Sniffing and Social Engineering", isProject: false },
          { title: "Denial-of-Service", isProject: false },
          { title: "Web Application Hacking", isProject: false },
          { title: "Web Exploit Project", isProject: true },
        ],
      },
      {
        title: "Month 4: Wireless & Mobile",
        weeks: [
          { title: "Wireless Network Hacking", isProject: false },
          { title: "Mobile Platform Hacking", isProject: false },
          { title: "IoT Hacking", isProject: false },
          { title: "Full Scope Pentest Capstone", isProject: true },
        ],
      },
    ],
  },
  {
    id: "soc-301",
    title: "SOC Analyst Mastery",
    description:
      "Become a Security Operations Center analyst. Learn to monitor, detect, analyze, and respond to cyber threats using industry tools.",
    duration: "14 Weeks",
    level: "Advanced",
    price: 8999,
    months: [
      {
        title: "Month 1: SOC Fundamentals",
        weeks: [
          { title: "SOC Roles and Responsibilities", isProject: false },
          { title: "Log Management and SIEM", isProject: false },
          { title: "Threat Intelligence", isProject: false },
          { title: "SIEM Implementation Project", isProject: true },
        ],
      },
      {
        title: "Month 2: Incident Detection",
        weeks: [
          { title: "Phishing Analysis", isProject: false },
          { title: "Endpoint Security Monitoring", isProject: false },
          { title: "Network Security Monitoring", isProject: false },
          { title: "Detection Engineering Project", isProject: true },
        ],
      },
      {
        title: "Month 3: Incident Response",
        weeks: [
          { title: "Digital Forensics Basics", isProject: false },
          { title: "Incident Handling Process", isProject: false },
          { title: "Threat Hunting", isProject: false },
          { title: "Live Fire Response Capstone", isProject: true },
        ],
      },
    ],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-32 pb-20 px-4 md:px-8 container mx-auto max-w-[95%]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-mono text-white">
              Our Training Programs
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              Industry-standard cybersecurity training designed to take you from
              a beginner to a professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="w-full h-full"
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="h-full cursor-pointer group">
                      <div className="flex flex-col h-full w-full rounded-[16px] border border-white/10 bg-black/40 backdrop-blur-sm p-6 hover:bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="flex flex-col flex-1 space-y-6">
                          <div className="flex justify-between items-start">
                            <Badge
                              variant="secondary"
                              className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20"
                            >
                              {program.level}
                            </Badge>
                            <div className="text-2xl font-bold text-green-400 font-mono tracking-tight flex items-center">
                              <span>₹{program.price.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-white font-mono group-hover:text-indigo-400 transition-colors">
                              {program.title}
                            </h3>
                            <p className="text-gray-400 line-clamp-3 leading-relaxed">
                              {program.description}
                            </p>
                          </div>

                          <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm font-mono">
                            <div className="flex items-center text-gray-400">
                              <Clock className="w-4 h-4 mr-2 text-indigo-400" />
                              {program.duration}
                            </div>
                            <div className="flex items-center text-indigo-400 group-hover:translate-x-1 transition-transform">
                              View Details &rarr;
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-[#0f1111] border-white/10 text-white w-screen max-h-[85vh] overflow-hidden flex flex-col p-0">
                    <ScrollArea className="flex-1 max-h-[85vh]">
                      <div className="p-6 space-y-6">
                        <DialogHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <DialogTitle className="text-2xl font-bold font-mono">
                                {program.title}
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                {program.description}
                              </DialogDescription>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-indigo-400 border-indigo-400/30 whitespace-nowrap"
                            >
                              {program.level}
                            </Badge>
                          </div>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                            <div className="p-2 rounded bg-indigo-500/20 text-indigo-400">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Duration</p>
                              <p className="font-mono font-bold">
                                {program.duration}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                            <div className="p-2 rounded bg-green-500/20 text-green-400">
                              <DollarSign className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Tuition</p>
                              <p className="font-mono font-bold">
                                ${program.price}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center gap-3">
                            <div className="p-2 rounded bg-orange-500/20 text-orange-400">
                              <BarChart className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400">Level</p>
                              <p className="font-mono font-bold">
                                {program.level}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xl font-bold font-mono border-b border-white/10 pb-4 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-indigo-400" />
                            Course Curriculum
                          </h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-8">
                            {program.months.map((month, idx) => (
                              <div
                                key={idx}
                                className="space-y-4 bg-white/5 p-5 rounded-xl border border-white/10 hover:bg-white/[0.07] transition-colors"
                              >
                                <h5 className="text-lg font-bold text-white border-l-4 border-indigo-500 pl-3">
                                  {month.title}
                                </h5>
                                <div className="space-y-3 pl-2">
                                  {month.weeks.map((week, wIdx) => (
                                    <div
                                      key={wIdx}
                                      className="flex items-start text-gray-300"
                                    >
                                      <CheckCircle2
                                        className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${
                                          week.isProject
                                            ? "text-orange-400"
                                            : "text-green-500/70"
                                        }`}
                                      />
                                      <div className="flex-1">
                                        <span
                                          className={
                                            week.isProject
                                              ? "text-orange-300 font-medium"
                                              : ""
                                          }
                                        >
                                          {week.title}
                                        </span>
                                        {week.isProject && (
                                          <div className="mt-1">
                                            <Badge
                                              variant="outline"
                                              className="text-[10px] border-orange-500/30 text-orange-400"
                                            >
                                              Capstone Project
                                            </Badge>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-white/10">
                          <Button className="font-mono bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
