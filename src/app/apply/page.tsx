"use client";

import Link from "next/link";
import { ArrowRight, User, Building2, GraduationCap, Server, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-7xl w-full text-center space-y-12">
        <div>
          <SectionBadge text="Gateway_Protocol_Initiated" icon={Server} />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            Select{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 via-purple-500 to-blue-500">
              Application
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto font-mono">
            Identify your operational role to proceed with the clearance
            process. Access requires authentication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Card */}
          <Link href="/programs" className="group block text-left">
            <div className="h-full border-2 bg-zinc-950 p-8 border-red-500 shadow-[8px_8px_0px_0px_#ef4444] transition-all duration-300 relative overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#ef4444]">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <GraduationCap className="w-12 h-12 text-red-500/20 transition-colors" />
              </div>

              <div className="mb-6 inline-flex p-3 border-2 border-red-600 bg-red-600 text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-red-400 transition-colors">
                Student
              </h3>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                Join the residency. Train in live war games. Get deployed.
              </p>

              <Button
                variant="ghost"
                className="p-0 text-white uppercase font-bold tracking-widest bg-transparent hover:bg-transparent hover:text-red-400"
              >
                Start Residency{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>
          
          {/* Internship Card */}
          <Link href="/internships" className="group block text-left">
            <div className="h-full border-2 bg-zinc-950 p-8 border-orange-500 shadow-[8px_8px_0px_0px_#f97316] transition-all duration-300 relative overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#f97316]">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <FolderKanban className="w-12 h-12 text-orange-500/20 transition-colors" />
              </div>

              <div className="mb-6 inline-flex p-3 border-2 border-orange-600 bg-orange-600 text-white transition-colors">
                <FolderKanban className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-orange-400 transition-colors">
                Internship
              </h3>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                Pan-India remote cybersecurity internship tiers.
              </p>

              <Button
                variant="ghost"
                className="p-0 text-white uppercase font-bold tracking-widest bg-transparent hover:bg-transparent hover:text-orange-400"
              >
                View Tiers{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>

          {/* Mentor Card */}
          <Link href="/apply/mentor" className="group block text-left">
            <div className="h-full border-2 bg-zinc-950 p-8 border-purple-500 shadow-[8px_8px_0px_0px_#9333ea] transition-all duration-300 relative overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#9333ea]">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <User className="w-12 h-12 text-purple-500/20 transition-colors" />
              </div>

              <div className="mb-6 inline-flex p-3 border-2 border-purple-600 bg-purple-600 text-white transition-colors">
                <User className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-purple-400 transition-colors">
                Mentor
              </h3>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                Experienced security architects regarding to lead cohorts and
                operations.
              </p>

              <Button
                variant="ghost"
                className="p-0 text-white uppercase font-bold tracking-widest bg-transparent hover:bg-transparent hover:text-purple-400"
              >
                Begin Application{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>

          {/* Recruiter Card */}
          <Link href="/apply/recruiter" className="group block text-left">
            <div className="h-full border-2 bg-zinc-950 p-8 border-blue-500 shadow-[8px_8px_0px_0px_#2563eb] transition-all duration-300 relative overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#2563eb]">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Building2 className="w-12 h-12 text-blue-500/20 transition-colors" />
              </div>

              <div className="mb-6 inline-flex p-3 border-2 border-blue-600 bg-blue-600 text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-blue-400 transition-colors">
                Hiring Partner
              </h3>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                Organizations seeking pre-vetted, operationally ready security
                talent.
              </p>

              <Button
                variant="ghost"
                className="p-0 text-white uppercase font-bold tracking-widest bg-transparent hover:bg-transparent hover:text-blue-400"
              >
                Initialize Request{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>

          {/* Partner Agency Card */}
          <Link href="/apply/partner-agency" className="group block text-left">
            <div className="h-full border-2 bg-zinc-950 p-8 border-green-500 shadow-[8px_8px_0px_0px_#22c55e] transition-all duration-300 relative overflow-hidden hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_#22c55e]">
              <div className="absolute top-0 right-0 p-4 opacity-50">
                <Building2 className="w-12 h-12 text-green-500/20 transition-colors" />
              </div>

              <div className="mb-6 inline-flex p-3 border-2 border-green-600 bg-green-600 text-white transition-colors">
                <Building2 className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black uppercase tracking-wide mb-2 text-green-400 transition-colors">
                Partner Agency
              </h3>
              <p className="text-zinc-400 text-sm font-mono mb-8">
                Drive growth and revenue by partnering with us.
              </p>

              <Button
                variant="ghost"
                className="p-0 text-white uppercase font-bold tracking-widest bg-transparent hover:bg-transparent hover:text-green-400"
              >
                Join Network{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
