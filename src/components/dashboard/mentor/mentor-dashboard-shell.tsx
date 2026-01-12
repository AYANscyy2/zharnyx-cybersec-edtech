import { ManagedCourses } from "./managed-courses";
import { StudentApplications } from "./student-applications";
import { EngagementStats } from "./engagement-stats";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Terminal,
  GraduationCap,
  FileText,
  FolderKanban,
  HelpCircle,
} from "lucide-react";

interface MentorDashboardShellProps {
  section?: string;
}

export function MentorDashboardShell({ section }: MentorDashboardShellProps) {
  const currentSection = section || "student-progress";

  const renderContent = () => {
    switch (currentSection) {
      case "student-progress":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <EngagementStats />
            </div>
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
              <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-purple-500" />
                  <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                    Student Progress
                  </CardTitle>
                </div>
                <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                  Track performance across your assigned courses.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <StudentApplications />
              </CardContent>
            </Card>
          </div>
        );
      case "score-assignments":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Score Assignments
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                Review and grade pending student assignments.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 font-mono text-gray-400 text-sm text-center uppercase tracking-widest border-t border-white/10">
              No pending assignments to score.
            </CardContent>
          </Card>
        );
      case "score-projects":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <FolderKanban className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Score Projects
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                Evaluate capstone and module projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 font-mono text-gray-400 text-sm text-center uppercase tracking-widest border-t border-white/10">
              No pending projects to review.
            </CardContent>
          </Card>
        );
      case "doubt-sessions":
        return (
          <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                  Doubt Sessions
                </CardTitle>
              </div>
              <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                Upcoming scheduled 1:1 and group sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 font-mono text-gray-400 text-sm text-center uppercase tracking-widest border-t border-white/10">
              No active doubt sessions found.
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="space-y-6">
            <EngagementStats />
            <ManagedCourses />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header handled by Layout or Sidebar context usually, but good to have a title here if generic header missing */}
      {renderContent()}
    </div>
  );
}
