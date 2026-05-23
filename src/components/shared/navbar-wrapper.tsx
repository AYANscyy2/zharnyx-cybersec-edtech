"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

/** Renders navbar + footer on all routes EXCEPT /programs/* */
export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Suppress only on individual syllabus pages like /programs/foundation, /programs/soc etc.
  // Keep navbar on /programs (the listing page)
  const SYLLABUS_SLUGS = ["foundation", "soc", "vapt", "cloud-security", "dfir", "week-0"];
  const isProgram = SYLLABUS_SLUGS.some(slug => pathname === `/programs/${slug}` || pathname.startsWith(`/programs/${slug}/`));

  return (
    <>
      {!isProgram && <Navbar />}
      {children}
      {!isProgram && <Footer />}
    </>
  );
}
