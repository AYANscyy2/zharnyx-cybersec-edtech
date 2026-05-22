"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "@/lib/auth/auth-client";
import { ChevronDown, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/shared/transition-link";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import gsap from "gsap";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const pathname = usePathname();

  const lastScrollY = useRef(0);
  const isHidden = useRef(false);
  const hasEntered = useRef(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    // Initial state: hidden above viewport
    gsap.set(el, { yPercent: -100, opacity: 0 });

    // Slide in gracefully just as the hero section finishes its intro sequence
    gsap.to(el, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 4.0,
      onComplete: () => {
        hasEntered.current = true;
      },
    });

    const handleScroll = () => {
      if (!hasEntered.current) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (delta > 6 && !isHidden.current) {
        // Scrolling down — hide
        isHidden.current = true;
        gsap.to(el, {
          yPercent: -100,
          duration: 0.55,
          ease: "power3.inOut",
        });
      } else if (delta < -4 && isHidden.current) {
        // Scrolling up — show
        isHidden.current = false;
        gsap.to(el, {
          yPercent: 0,
          duration: 0.65,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        });
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile")) {
    return null;
  }

  if (pathname?.startsWith("/auth") || pathname?.startsWith("/checkout") || pathname?.startsWith("/apply") || pathname?.startsWith("/join")) {
    return (
      <div
        ref={navRef}
        className={cn(
          "fixed  top-0 inset-x-0 w-full z-[10000] font-mono",
          className
        )}
      >
        <nav className="relative flex items-center justify-between px-6 md:px-12 py-5 bg-transparent ">
          <Link href="/" className="flex items-center gap-0">
            <div className="flex items-center justify-center shrink-0 -mr-2">
              <img
                src="https://ik.imagekit.io/bkt3emitco/zharnyxincress.png"
                alt="Zharnyx Logo"
                className="h-12 w-auto object-contain "
              />
            </div>
            <span className="relative z-10 text-2xl font-black text-white tracking-tighter uppercase">
              ZHARNY<span className="text-red-600">X</span>
            </span>
          </Link>
          {/* <Link href="/" className="px-6 py-2.5 text-white font-bold text-sm uppercase tracking-wider hover:text-red-500 transition-colors">
            Go to Home
          </Link> */}
        </nav>
      </div>
    );
  }

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed top-0 inset-x-0 w-full z-[10000] font-mono",
        className
      )}
    >
      <nav
        className={cn(
          "relative flex items-center justify-between px-6 md:px-12 py-5 border-b-2 transition-colors duration-300",
          "bg-black border-red-900/40"
        )}
      >
        {/* Left: Company Name */}
        <Link href="/" className="flex items-center gap-0">
          <div className="flex items-center justify-center shrink-0 -mr-2">
            <img
              src="https://ik.imagekit.io/bkt3emitco/zharnyxincress.png"
              alt="Zharnyx Logo"
              className="h-12 w-auto object-contain "
            />
          </div>
          <span className="relative z-10 text-2xl font-black text-white tracking-tighter uppercase">
            ZHARNY<span className="text-red-600">X</span>
          </span>
        </Link>

        {/* Middle: Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/" label="Home" isActive={pathname === "/"} />
          <NavLink href="/internships" label="Internships" isActive={pathname?.startsWith("/internships")} />

          <div className="relative group">
            <NavLink href="/programs" label="Programs" hasDropdown isActive={pathname?.startsWith("/programs")} />
            <div className="absolute top-full left-0 w-56 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-black border-2 border-white/20 shadow-[8px_8px_0px_0px_white] flex flex-col p-2 gap-1">
                <DropdownItem href="/programs#soc" label="SOC Analyst" />
                <DropdownItem href="/programs#vapt" label="VAPT" />
                <DropdownItem href="/programs#cloud" label="Cloud Security" />
                <DropdownItem href="/programs#dfir" label="DFIR" />
              </div>
            </div>
          </div>

          <div className="relative group">
            <NavLink href="/about" label="About" hasDropdown isActive={pathname?.startsWith("/about")} />
            <div className="absolute top-full left-0 w-64 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-black border-2 border-white/20 shadow-[8px_8px_0px_0px_white] flex flex-col p-2 gap-1">
                <DropdownItem href="/about#mission" label="Mission" />
                <DropdownItem href="/about#differentials" label="What Makes Us Different" />
                <DropdownItem href="/about#founders" label="Meet the Founders" />
                <DropdownItem href="/partners" label="Hiring Network" />
                <DropdownItem href="/colleges" label="Academic Alliances" />
              </div>
            </div>
          </div>

          <NavLink href="/pricing" label="Pricing" isActive={pathname?.startsWith("/pricing")} />
          <NavLink href="/blog" label="Blog" isActive={pathname?.startsWith("/blog")} />
          <NavLink href="/contact" label="Contact" isActive={pathname?.startsWith("/contact")} />
        </div>

        {/* Right: CTA - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="relative px-6 py-2.5 bg-blue-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-blue-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="relative px-6 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth?mode=signin"
                className="px-6 py-2.5 text-white font-bold text-sm uppercase tracking-wider hover:text-red-500 transition-colors"
              >
                Student Login
              </Link>
              <Link
                href="/auth?mode=signup"
                className="relative px-6 py-2.5 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600 shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Enroll Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-white border-2 border-white/20 hover:bg-white/10">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-l-2 border-white/20 p-0 w-[300px]">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/10">
                  <Link href="/" className="flex items-center gap-1.5">
                    <img
                      src="https://ik.imagekit.io/bkt3emitco/zharnyxincress.png"
                      alt="Zharnyx Logo"
                      className="h-8 w-auto object-contain"
                    />
                    <span className="relative z-10 text-xl font-black text-white tracking-tighter uppercase">
                      ZHARNY<span className="text-red-600">X</span>
                    </span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-4">
                  <MobileNavLink href="/" label="Home" />
                  <MobileNavLink href="/internships" label="Internships" />
                  <MobileNavDropdown label="Programs">
                    <MobileNavLink href="/programs" label="Overview" />
                    <MobileNavLink href="/programs#soc" label="SOC Analyst" isChild />
                    <MobileNavLink href="/programs#vapt" label="VAPT" isChild />
                    <MobileNavLink href="/programs#cloud" label="Cloud Security" isChild />
                    <MobileNavLink href="/programs#dfir" label="DFIR" isChild />
                  </MobileNavDropdown>
                  <MobileNavDropdown label="About">
                    <MobileNavLink href="/about" label="Overview" />
                    <MobileNavLink href="/about#mission" label="Mission" isChild />
                    <MobileNavLink href="/about#differentials" label="What Makes Us Different" isChild />
                    <MobileNavLink href="/about#founders" label="Meet the Founders" isChild />
                    <MobileNavLink href="/partners" label="Hiring Network" isChild />
                    <MobileNavLink href="/colleges" label="Academic Alliances" isChild />
                  </MobileNavDropdown>
                  <MobileNavLink href="/pricing" label="Pricing" />
                  <MobileNavLink href="/blog" label="Blog" />
                  <MobileNavLink href="/contact" label="Contact" />
                </div>
                <div className="p-6 border-t border-white/10 flex flex-col gap-4">
                  {session ? (
                    <>
                      <Link href="/dashboard" className="w-full text-center px-6 py-3 bg-blue-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-blue-600">
                        Command Center
                      </Link>
                      <button onClick={() => signOut()} className="w-full px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth?mode=signin" className="w-full text-center px-6 py-3 text-white font-bold text-sm uppercase tracking-wider border-2 border-white/20 hover:bg-white/10">
                        Student Login
                      </Link>
                      <Link href="/auth?mode=signup" className="w-full text-center px-6 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wider border-2 border-red-600">
                        Enroll Now
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, label, hasDropdown, isActive }: { href: string; label: string; hasDropdown?: boolean; isActive?: boolean }) {
  return (
    <TransitionLink
      href={href}
      className={cn(
        "px-5 py-2 text-sm font-medium uppercase tracking-wide border border-transparent hover:border-white/10 transition-all rounded-none flex items-center gap-1.5",
        isActive ? "text-red-500 hover:text-red-400 hover:bg-red-500/10 font-bold" : "text-gray-300 hover:text-white hover:bg-white/5"
      )}
    >
      {label}
      {hasDropdown && (
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:-rotate-180" />
      )}
    </TransitionLink>
  );
}

function DropdownItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wide"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, isChild }: { href: string; label: string; isChild?: boolean }) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "block py-3 font-bold uppercase hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-red-500 transition-all",
          isChild ? "px-8 text-base text-gray-400" : "px-4 text-lg text-gray-300"
        )}
      >
        {label}
      </Link>
    </SheetClose>
  );
}

function MobileNavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-lg font-bold text-gray-300 uppercase hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-red-500 transition-all"
      >
        {label}
        <ChevronDown size={20} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}