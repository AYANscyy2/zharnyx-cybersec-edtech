import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth/role-guard";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/layout/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const userRole = session.user.role;

  return (
    <SidebarProvider>
      <DashboardSidebar userRole={userRole} />
      <SidebarInset className="bg-black">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-black min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
