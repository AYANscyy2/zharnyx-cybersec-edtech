"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { StudentSidebar } from "@/components/student/layout/student-sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AvailableCourse, EnrolledCourseSummary } from "@/types/dashboard";
import { EnrolledCourses } from "@/components/dashboard/student/enrolled-courses";
import { AvailableCourses } from "@/components/dashboard/student/available-courses"; // Reuse for now if needed

interface StudentDashboardClientProps {
    enrolledCourses: EnrolledCourseSummary[];
    availableCourses: AvailableCourse[];
    userId: string;
}

export default function StudentDashboardClient({ enrolledCourses, availableCourses, userId }: StudentDashboardClientProps) {
  const [activeSection, setActiveSection] = useState("enrolled-courses");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-black">
        <AnimatedBackground />
        
        <StudentSidebar activeSection={activeSection} onSectionChange={setActiveSection} userId={userId} />
        
        <SidebarInset className="relative flex flex-col flex-1 overflow-y-auto bg-transparent z-10 w-full p-6">
           <header className="flex items-center gap-2 mb-6">
              <SidebarTrigger className="text-white hover:bg-white/10" />
              <h1 className="text-2xl font-bold font-mono text-white">
                 {activeSection.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </h1>
           </header>
           
           <div className="flex-1 w-full max-w-7xl mx-auto">
              {activeSection === "enrolled-courses" && (
                 <div className="space-y-6">
                    <EnrolledCourses courses={enrolledCourses} />
                    
                    {/* Optionally show available courses below or in a separate tab? 
                        The user didn't ask for "Available courses" sidebar item, 
                        but it's good to keep it accessible. 
                        Let's put it at the bottom for now or just hide it? 
                        Current implementation had separate tabs. 
                        Maybe add "Available Courses" to sidebar as well? 
                        For strict adherence to prompt, I'll stick to requests, 
                        but EnrolledCourses component acts as the main view. */}
                 </div>
              )}

              {activeSection === "assignments" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Assignments</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Your pending and completed assignments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-md">
                      <p className="text-gray-500 font-mono">Assignments Coming Soon</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeSection === "projects" && (
                <Card className="bg-black/40 border-white/10 text-white backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl">Projects</CardTitle>
                    <CardDescription className="text-gray-400 font-mono">
                      Your showcase projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-40 border-2 border-dashed border-white/10 rounded-md">
                      <p className="text-gray-500 font-mono">Projects Coming Soon</p>
                    </div>
                  </CardContent>
                </Card>
              )}
           </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
