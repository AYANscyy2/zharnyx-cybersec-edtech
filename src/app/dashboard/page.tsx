import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { getEnrolledCourses } from "@/actions/student/dashboard";
import { getMyWaitlistEntries } from "@/actions/student/waitlist";
import {
  Shield,
  GraduationCap,
  Users,
  Briefcase,
  Terminal,
  Activity,
  Trophy,
  Target,
  ArrowRight,
  Play,
  Award,
  MapPin,
  ChevronRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import { HubUserControls } from "@/components/dashboard/hub/user-controls";
import { ComingSoonWrapper } from "@/components/ui/coming-soon-wrapper";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const userRole = session.user.role;
  const userName = session.user.name;

  // Fetch dynamic courses
  const coursesResult = await getEnrolledCourses(session.user.id);
  const enrolledCourses = coursesResult.success && coursesResult.data ? coursesResult.data : [];

  const waitlistResult = await getMyWaitlistEntries(session.user.id);
  const waitlistEntries = waitlistResult.success ? waitlistResult.data : [];
  
  const activeCourse = enrolledCourses.length > 0 ? enrolledCourses[0] : null;
  const otherCourses = enrolledCourses.length > 1 ? enrolledCourses.slice(1, 4) : [];

  return (
    <div className="w-full h-full text-white space-y-8 max-w-[1400px] mx-auto pb-12">
      {/* Top Welcome Section (Like HTB Account) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 border-2 border-green-500 shrink-0 bg-black flex items-center justify-center relative shadow-[4px_4px_0px_0px_#22c55e]">
            {session.user.image ? (
              <img src={session.user.image} alt={userName} className="w-full h-full object-cover grayscale" />
            ) : (
              <div className="w-10 h-10 border-2 border-green-500 bg-transparent rotate-45 flex items-center justify-center">
                 <div className="w-4 h-4 border border-green-500"></div>
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-black font-mono uppercase tracking-tighter text-white">
                {userName}
              </h1>
              <span className="text-gray-500 font-mono text-xs lowercase">@{userName.replace(/\s+/g, '')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-mono text-sm uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-gray-500" /> {session.user.city || "Unknown Location"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 overflow-x-auto pb-2 md:pb-0">
          {userRole === "admin" && (
            <Link
              href="/dashboard/admin"
              className="flex items-center gap-2 px-6 py-2 bg-black text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/10 transition-all border-2 border-red-500 rounded-none flex-nowrap whitespace-nowrap shadow-[4px_4px_0px_0px_#dc2626] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Admin Console
            </Link>
          )}
          {userRole === "mentor" && (
            <Link
              href="/dashboard/mentor"
              className="flex items-center gap-2 px-6 py-2 bg-black text-purple-500 font-bold text-xs uppercase tracking-widest hover:bg-purple-500/10 transition-all border-2 border-purple-500 rounded-none flex-nowrap whitespace-nowrap shadow-[4px_4px_0px_0px_#9333ea] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Mentor Zone
            </Link>
          )}
          {userRole === "partner_agency" && (
            <Link
              href="/dashboard/partner"
              className="flex items-center gap-2 px-6 py-2 bg-black text-green-500 font-bold text-xs uppercase tracking-widest hover:bg-green-500/10 transition-all border-2 border-green-500 rounded-none flex-nowrap whitespace-nowrap shadow-[4px_4px_0px_0px_#22c55e] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              Agency Portal
            </Link>
          )}
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all border-2 border-white rounded-none flex-nowrap whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Main Course Layout - 2 Columns like HTB */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Academy / Active Course */}
        <div className="relative border-2 border-white/20 bg-black p-8 flex flex-col justify-between overflow-hidden group hover:border-green-500 transition-colors min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
            {/* Abstract Graphic */}
            <svg width="150" height="150" viewBox="0 0 100 100" className="fill-green-500 stroke-green-500">
              <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" opacity="0.2" />
              <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" strokeWidth="2" />
            </svg>
          </div>
          
          <div className="relative z-10 space-y-4">
            <h3 className="font-mono text-sm text-gray-500 font-bold uppercase tracking-widest">
              ZHARNYX <span className="text-white">Academy</span>
            </h3>
            <div>
              <h2 className="text-3xl font-black font-mono uppercase tracking-tighter text-white">
                Learn and get<br/>certified
              </h2>
              <p className="text-gray-400 font-mono text-sm mt-4 max-w-sm leading-relaxed">
                Begin or advance your journey in cybersecurity with our online learning paths and earn industry certifications to prove your expertise.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            {activeCourse ? (
              <ComingSoonWrapper
                message="You can access your course soon"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold text-sm uppercase tracking-widest hover:bg-green-400 transition-all shadow-[4px_4px_0px_0px_#166534] active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-green-500 cursor-pointer"
              >
                Start learning
              </ComingSoonWrapper>
            ) : (
              <ComingSoonWrapper
                message="You can access your course soon"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-bold text-sm uppercase tracking-widest hover:bg-green-400 transition-all shadow-[4px_4px_0px_0px_#166534] active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-green-500 cursor-pointer"
              >
                Start learning
              </ComingSoonWrapper>
            )}
          </div>
        </div>

        {/* Right Card: Labs / Other Activities */}
        <div className="relative border-2 border-white/20 bg-black p-8 flex flex-col justify-between overflow-hidden group hover:border-[#be185d] transition-colors min-h-[300px]">
          <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
             {/* Abstract Graphic */}
             <svg width="150" height="150" viewBox="0 0 100 100" className="fill-[#be185d] stroke-[#be185d]">
              <path d="M20 20 h60 v60 h-60 Z" opacity="0.2" />
              <path d="M30 30 h40 v40 h-40 Z" fill="none" strokeWidth="2" />
              <path d="M40 40 h20 v20 h-20 Z" />
            </svg>
          </div>
          
          <div className="relative z-10 space-y-4">
            <h3 className="font-mono text-sm text-gray-500 font-bold uppercase tracking-widest">
              ZHARNYX <span className="text-white">Labs</span>
            </h3>
            <div>
              <h2 className="text-3xl font-black font-mono uppercase tracking-tighter text-white">
                Practice with hands-<br/>on Labs
              </h2>
              <p className="text-gray-400 font-mono text-sm mt-4 max-w-sm leading-relaxed">
                Access cybersecurity labs simulating real-world vulnerabilities, misconfigurations, and incidents. With releases every week!
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <ComingSoonWrapper
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#be185d] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#db2777] transition-all shadow-[4px_4px_0px_0px_#831843] active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-[#be185d] cursor-pointer"
            >
              Start playing
            </ComingSoonWrapper>
          </div>
        </div>

      </div>

      {/* My Applications — Waitlist Widget */}
      {waitlistEntries.length > 0 && (
        <div className="border-2 border-white/20 bg-black">
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-white/20 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <h2 className="font-mono font-black text-sm uppercase tracking-widest text-white">My Applications</h2>
            </div>
            <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{waitlistEntries.length} course{waitlistEntries.length > 1 ? 's' : ''}</span>
          </div>

          <div className="divide-y divide-white/8">
            {waitlistEntries.map((entry: any) => {
              // Map slug → syllabus route
              const slugRouteMap: Record<string, string> = {
                'week-0':         '/programs/week-0',
                'foundation':     '/programs/foundation',
                'soc':            '/programs/soc',
                'vapt':           '/programs/vapt',
                'cloud-security': '/programs/cloud-security',
                'dfir':           '/programs/dfir',
                'intern-tier-1':  '/internships',
                'intern-tier-2':  '/internships',
                'intern-tier-3':  '/internships',
              };
              const statusStyle: Record<string, string> = {
                pending:   'text-yellow-400 bg-yellow-400/8 border-yellow-400/25',
                contacted: 'text-blue-400  bg-blue-400/8  border-blue-400/25',
                enrolled:  'text-green-400 bg-green-400/8 border-green-400/25',
                rejected:  'text-red-400   bg-red-400/8   border-red-400/25',
              };
              const href = slugRouteMap[entry.course] ?? '/programs';
              return (
                <Link
                  key={entry.id}
                  href={href}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.03] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                    <div>
                      <p className="font-mono font-bold text-xs uppercase tracking-widest text-white group-hover:text-yellow-400 transition-colors">
                        {entry.courseLabel}
                      </p>
                      <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mt-0.5">
                        Applied {new Date(entry.appliedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 border ${statusStyle[entry.status] ?? 'text-gray-500 bg-white/5 border-white/10'}`}>
                      {entry.status}
                    </span>
                    <ExternalLink size={12} className="text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Items List */}
      <div className="flex flex-col gap-2 pt-4">
        {[
          { title: "ZHARNYX LetsDefend", desc: "Level up your defensive skills" },
          { title: "ZHARNYX CTF", desc: "Play or host a hacking competition" }
        ].map((item, i) => (
          <ComingSoonWrapper key={i} className="flex items-center justify-between p-6 border-2 border-white/10 bg-black hover:border-white/40 transition-colors group cursor-pointer">
            <div className="space-y-1">
              <h3 className="text-gray-400 font-mono text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                {item.title.split(' ')[0]} <span className="text-white">{item.title.split(' ').slice(1).join(' ')}</span>
              </h3>
              <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">{item.desc}</p>
            </div>
            <div className="w-8 h-8 border-2 border-white/20 bg-transparent flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </ComingSoonWrapper>
        ))}
      </div>
    </div>
  );
}
