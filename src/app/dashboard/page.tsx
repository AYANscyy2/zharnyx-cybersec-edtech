import { getCurrentSession } from "@/lib/auth/role-guard";
import { redirect } from "next/navigation";
import { AnimatedBackground } from "@/components/shared/animated-background";
import { getMentorApplicationStatus } from "@/actions/public/mentor-applications/action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

export default async function DashboardPage() {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/sign-in");
  }

  const userRole = session.user.role;
  const applicationStatus = await getMentorApplicationStatus();

  return (
    <>
      <AnimatedBackground />
      <div className="relative min-h-screen p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Mentor Application Status Banner - Shows for all users with pending application */}
          {applicationStatus.status === "pending" && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-yellow-500 font-mono font-semibold text-lg">
                    Mentor Application Under Review
                  </h3>
                  <p className="text-yellow-200/80 font-mono text-sm mt-1">
                    Your application to become a mentor is currently being
                    reviewed by our team. We&apos;ll notify you once a decision
                    has been made.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mentor Application Approved Banner */}
          {applicationStatus.status === "approved" &&
            userRole === "student" && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-green-500 font-mono font-semibold text-lg">
                      Mentor Application Approved!
                    </h3>
                    <p className="text-green-200/80 font-mono text-sm mt-1">
                      Congratulations! Your mentor application has been
                      approved. Your role will be updated shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Mentor Application Rejected Banner */}
          {applicationStatus.status === "rejected" && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-red-500 font-mono font-semibold text-lg">
                    Mentor Application Not Approved
                  </h3>
                  <p className="text-red-200/80 font-mono text-sm mt-1">
                    Unfortunately, your mentor application was not approved at
                    this time. You can apply again after gaining more
                    experience.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
              Welcome, {session.user.name}
            </h1>
            <p className="text-gray-400 font-mono mt-2 text-lg">
              Role: <span className="capitalize text-white">{userRole}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mentor Application Status Card - Visible to Students Only */}
            {userRole === "student" && (
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-mono">
                    Mentor Application
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Status of your application to become a mentor.
                  </CardDescription>
                </CardHeader>
                <CardContent className="font-mono">
                  {applicationStatus.status === "pending" && (
                    <div className="flex items-center text-yellow-500">
                      <Clock className="mr-2 h-5 w-5" />
                      <span>Pending Approval</span>
                    </div>
                  )}
                  {applicationStatus.status === "approved" && (
                    <div className="flex items-center text-green-500">
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      <span>Approved</span>
                    </div>
                  )}
                  {applicationStatus.status === "rejected" && (
                    <div className="flex items-center text-red-500">
                      <XCircle className="mr-2 h-5 w-5" />
                      <span>Rejected</span>
                    </div>
                  )}
                  {!applicationStatus.status && (
                    <div className="space-y-4">
                      <p className="text-gray-300">
                        Share your knowledge and inspire others.
                      </p>
                      <Button
                        asChild
                        className="w-full bg-white text-black hover:bg-gray-200"
                      >
                        <Link href="/apply/mentor">Apply Now</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Existing Admin Card */}
            {userRole === "admin" && (
              <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white font-mono">
                    Admin Panel
                  </CardTitle>
                  <CardDescription className="text-gray-400 font-mono">
                    Manage the entire platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="font-mono">
                  <Button
                    asChild
                    className="w-full bg-white text-black hover:bg-gray-200"
                  >
                    <Link href="/dashboard/admin">Go to Admin Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Quick Stats / Info Section */}
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="font-mono text-gray-300">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd>{session.user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Member Since</dt>
                  <dd>{new Date().toLocaleDateString()}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
