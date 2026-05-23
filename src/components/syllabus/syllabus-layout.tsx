"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen, Terminal, PlayCircle, Briefcase, ShieldAlert, Target,
  Search, ChevronDown, ChevronRight, ArrowLeft, Award,
  User, Settings, Menu, X, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ApplyButton } from "./apply-button";

export interface Module {
  id: string;
  title: string;
  description: string;
  type: string;
}

export interface Week {
  week: number;
  title: string;
  theme: string;
  modules: Module[];
}

export interface Month {
  month: number;
  title: string;
  weeks: Week[];
}

export interface ProgramMeta {
  slug: string;
  title: string;
  subtitle: string;
  badge?: string;
  phase: string;
  duration: string;
  tagline: string;
  certCode?: string;
  certName?: string;
}

const ALL_PROGRAMS = [
  { slug: "week-0",        label: "Week 0 — Free Gateway",    short: "W0"   },
  { slug: "foundation",    label: "Foundation Phase",          short: "FND"  },
  { slug: "soc",           label: "SOC Analyst",               short: "SOC"  },
  { slug: "vapt",          label: "VAPT / Ethical Hacking",    short: "VAPT" },
  { slug: "cloud-security",label: "Cloud Security",            short: "CSE"  },
  { slug: "dfir",          label: "Digital Forensics & IR",    short: "DFIR" },
];

function getTypeIcon(type: string) {
  switch (type.toLowerCase()) {
    case "demo":     return <PlayCircle  size={13} className="text-red-400"    />;
    case "theory":   return <BookOpen    size={13} className="text-blue-400"   />;
    case "lab":      return <Terminal    size={13} className="text-green-400"  />;
    case "career":   return <Briefcase   size={13} className="text-purple-400" />;
    case "capstone": return <ShieldAlert size={13} className="text-red-500"    />;
    default:         return <Target      size={13} className="text-gray-400"   />;
  }
}

function getTypeColor(type: string) {
  switch (type.toLowerCase()) {
    case "demo":     return "text-red-400   bg-red-400/10   border-red-400/30";
    case "theory":   return "text-blue-400  bg-blue-400/10  border-blue-400/30";
    case "lab":      return "text-green-400 bg-green-400/10 border-green-400/30";
    case "career":   return "text-purple-400 bg-purple-400/10 border-purple-400/30";
    case "capstone": return "text-red-500   bg-red-600/15   border-red-500/40";
    default:         return "text-gray-400  bg-gray-400/10  border-gray-400/30";
  }
}

/* ─────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                             */
/* ─────────────────────────────────────────────────────────── */
type ViewMode = "full" | "modules" | "labs";

const VIEW_TABS: { id: ViewMode; label: string }[] = [
  { id: "full",    label: "Full Course" },
  { id: "modules", label: "Modules"     },
  { id: "labs",    label: "Labs"        },
];

/** Which module types belong to each view */
const LAB_TYPES    = new Set(["lab", "capstone"]);
const MODULE_TYPES = new Set(["theory", "demo", "career"]);

function filterModules(modules: Module[], viewMode: ViewMode): Module[] {
  if (viewMode === "labs")    return modules.filter(m => LAB_TYPES.has(m.type.toLowerCase()));
  if (viewMode === "modules") return modules.filter(m => MODULE_TYPES.has(m.type.toLowerCase()));
  return modules;
}

export function SyllabusLayout({ meta, curriculum }: { meta: ProgramMeta; curriculum: Month[] }) {
  const [collapsed,       setCollapsed]       = useState(false);
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeWeek,      setActiveWeek]      = useState<number | null>(null);
  const [expandedMonths,  setExpandedMonths]  = useState<number[]>([curriculum[0]?.month ?? 0]);
  const [searchQuery,     setSearchQuery]     = useState("");
  const [viewMode,        setViewMode]        = useState<ViewMode>("full");

  const allWeeks       = curriculum.flatMap(m => m.weeks);
  const totalModules   = curriculum.reduce((a, m) => a + m.weeks.reduce((b, w) => b + w.modules.length, 0), 0);
  const activeWeekData = allWeeks.find(w => w.week === activeWeek) ?? null;

  const filteredCurriculum = curriculum.map(month => ({
    ...month,
    weeks: month.weeks.map(week => ({
      ...week,
      modules: filterModules(
        searchQuery.trim()
          ? week.modules.filter(
              m => m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   m.type.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : week.modules,
        viewMode
      ),
    })).filter(w => w.modules.length > 0),
  })).filter(m => m.weeks.length > 0);

  const toggleMonth = (m: number) =>
    setExpandedMonths(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);

  /* ── sidebar content (shared by desktop + mobile drawer) ── */
  const SidebarContent = () => (
    <div className="flex flex-col h-full">

      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-white/8 shrink-0 transition-all duration-300",
        collapsed ? "justify-center px-3 py-4" : "justify-between px-5 py-4"
      )}>
        <Link href="/" className="flex items-center gap-2 group" title="Back to Home">
          <img
            src="https://ik.imagekit.io/bkt3emitco/zharnyxincress.png"
            alt="Zharnyx"
            className="h-8 w-auto object-contain shrink-0"
          />
          {!collapsed && (
            <span className="text-base font-black tracking-tighter text-white uppercase leading-none">
              ZHARNY<span className="text-red-600">X</span>
            </span>
          )}
        </Link>

        {/* Collapse toggle — desktop only */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="hidden lg:flex p-1 rounded text-gray-600 hover:text-white transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>

        {/* Close — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1 text-gray-500 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Program switcher */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-2 border-b border-white/8 shrink-0">
          <p className="text-[9px] uppercase tracking-widest text-gray-700 mb-1.5 px-1">Programs</p>
          <div className="flex flex-col gap-0.5">
            {ALL_PROGRAMS.map(p => (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors rounded-sm",
                  meta.slug === p.slug
                    ? "bg-red-600/12 text-red-400 border border-red-600/25"
                    : "text-gray-600 hover:text-white hover:bg-white/5",
                )}
              >
                <span className={cn(
                  "text-[9px] font-black px-1.5 py-0.5 border shrink-0",
                  meta.slug === p.slug
                    ? "border-red-600/40 text-red-500 bg-red-600/10"
                    : "border-white/10 text-gray-700",
                )}>
                  {p.short}
                </span>
                <span className="truncate">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed: icon-only program list */}
      {collapsed && (
        <div className="flex flex-col items-center gap-1 py-3 border-b border-white/8 shrink-0">
          {ALL_PROGRAMS.map(p => (
            <Link
              key={p.slug}
              href={`/programs/${p.slug}`}
              title={p.label}
              className={cn(
                "text-[9px] font-black px-2 py-1.5 border w-10 flex items-center justify-center transition-colors",
                meta.slug === p.slug
                  ? "border-red-600/50 text-red-500 bg-red-600/10"
                  : "border-white/8 text-gray-700 hover:text-white hover:border-white/20",
              )}
            >
              {p.short}
            </Link>
          ))}
        </div>
      )}

      {/* Week index */}
      <div className="flex-1 overflow-y-auto min-h-0 py-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {!collapsed ? filteredCurriculum.map(month => (
          <div key={month.month}>
            <button
              onClick={() => toggleMonth(month.month)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-white/4 transition-colors group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-black text-red-500/60 w-7 shrink-0">
                  {month.month === 0 ? "W0" : `M${month.month}`}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors truncate">
                  {month.title}
                </span>
              </div>
              {expandedMonths.includes(month.month)
                ? <ChevronDown  size={11} className="text-gray-700 shrink-0" />
                : <ChevronRight size={11} className="text-gray-700 shrink-0" />
              }
            </button>

            {expandedMonths.includes(month.month) && month.weeks.map(week => (
              <button
                key={week.week}
                onClick={() => { setActiveWeek(week.week === activeWeek ? null : week.week); setMobileOpen(false); }}
                className={cn(
                  "w-full text-left flex items-center gap-2 pl-9 pr-3 py-1.5 transition-all text-[11px] border-l-2 ml-0",
                  activeWeek === week.week
                    ? "border-red-600 bg-red-600/8 text-red-400"
                    : "border-transparent text-gray-600 hover:text-gray-300 hover:bg-white/4",
                )}
              >
                <span className="text-[9px] font-black text-gray-700 shrink-0 w-5">W{week.week}</span>
                <span className="truncate leading-tight">{week.title}</span>
              </button>
            ))}
          </div>
        )) : (
          /* collapsed: just show week numbers */
          <div className="flex flex-col items-center gap-0.5 py-1">
            {allWeeks.map(week => (
              <button
                key={week.week}
                onClick={() => setActiveWeek(week.week === activeWeek ? null : week.week)}
                title={`Week ${week.week}: ${week.title}`}
                className={cn(
                  "w-10 h-7 text-[9px] font-black transition-colors border",
                  activeWeek === week.week
                    ? "border-red-600/50 text-red-500 bg-red-600/10"
                    : "border-transparent text-gray-700 hover:text-white hover:border-white/10",
                )}
              >
                {week.week}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className={cn("border-t border-white/8 shrink-0 p-3", collapsed && "px-2")}>
        <ApplyButton courseSlug={meta.slug} collapsed={collapsed} />
      </div>
    </div>
  );

  /* ── layout shell ── */
  return (
    <div className="flex min-h-screen bg-[#080808] font-mono text-white">

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── SIDEBAR (fixed) ── */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full bg-[#0a0a0a] border-r border-white/8",
        "flex flex-col transition-all duration-300 ease-in-out",
        /* desktop width */
        collapsed ? "w-16" : "w-64",
        /* mobile: translate in/out */
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}>
        <SidebarContent />
      </aside>

      {/* ── MAIN (offset by sidebar) ── */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        collapsed ? "lg:ml-16" : "lg:ml-64",
      )}>

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#080808]/95 backdrop-blur border-b border-white/8 shrink-0" style={{ height: "52px" }}>
          <div className="flex items-center gap-3 px-4 h-full">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-white -ml-1"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb */}
            <Link
              href="/programs"
              className="flex items-center gap-1.5 text-gray-600 hover:text-white transition-colors text-[11px] uppercase tracking-wider font-bold shrink-0"
            >
              <ArrowLeft size={12} />
              <span className="hidden sm:inline">Programs</span>
            </Link>
            <span className="text-gray-700 text-sm">/</span>
            <span className="text-[11px] uppercase tracking-wider font-bold text-white truncate max-w-[120px] hidden sm:block">
              {meta.title}
            </span>

            {/* ── View mode tabs ── */}
            <div className="flex items-center gap-px bg-white/5 border border-white/10 p-0.5 mx-auto">
              {VIEW_TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setViewMode(tab.id); setActiveWeek(null); }}
                  className={cn(
                    "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest transition-all",
                    viewMode === tab.id
                      ? "bg-red-600 text-black"
                      : "text-gray-500 hover:text-white",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search + icons */}
            <div className="flex items-center gap-2 ml-auto">
              <div className="relative hidden lg:block">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 text-white placeholder-gray-700 text-[11px] pl-7 pr-3 py-1.5 w-36 focus:outline-none focus:border-red-600/40 transition-colors"
                />
              </div>
              <button className="p-1.5 text-gray-600 hover:text-white transition-colors" title="Settings — Coming Soon">
                <Settings size={15} />
              </button>
              <button className="p-1.5 text-gray-600 hover:text-white transition-colors" title="Profile — Coming Soon">
                <User size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">

          {/* Hero */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-600/12 text-red-400 border border-red-600/25">
                {meta.phase}
              </span>
              {meta.certCode && (
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/4 text-gray-500 border border-white/10">
                  {meta.certCode} Cert Track
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-tight mb-2">
              {meta.title} <span className="text-red-500">{meta.subtitle}</span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed border-l-4 border-red-600 pl-4 max-w-2xl mb-5">
              {meta.tagline}
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { l: "Duration",      v: meta.duration },
                { l: "Weeks",         v: `${allWeeks.length}` },
                { l: "Modules",       v: `${totalModules}` },
                { l: "Access",        v: "Curriculum" },
              ].map(s => (
                <div key={s.l}>
                  <p className="text-[9px] uppercase tracking-widest text-gray-700 mb-0.5">{s.l}</p>
                  <p className="text-sm font-bold text-white">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Type legend */}
          <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/8">
            {["Theory","Lab","Demo","Career","Capstone"].map(t => (
              <span key={t} className={cn("flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider border", getTypeColor(t))}>
                {getTypeIcon(t)} {t}
              </span>
            ))}
          </div>

          {/* View mode label */}
          {viewMode !== "full" && (
            <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-widest font-bold">
              <span className="text-gray-600">Showing:</span>
              <span className={cn(
                "px-2 py-0.5 border text-[10px]",
                viewMode === "labs" ? "text-green-400 border-green-400/30 bg-green-400/8" : "text-blue-400 border-blue-400/30 bg-blue-400/8"
              )}>
                {viewMode === "labs" ? "Labs & Capstones Only" : "Theory, Demo & Career Only"}
              </span>
            </div>
          )}

          {/* Week drill-down or full curriculum */}
          {activeWeek !== null && activeWeekData ? (
            <div>
              <button
                onClick={() => setActiveWeek(null)}
                className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft size={12} /> All Weeks
              </button>
              <WeekBlock week={{ ...activeWeekData, modules: filterModules(activeWeekData.modules, viewMode) }} />
            </div>
          ) : (
            <div className="flex flex-col gap-14">
              {filteredCurriculum.map(month => (
                <div key={month.month} id={`month-${month.month}`}>
                  <div className="flex items-center gap-4 mb-7 pb-4 border-b border-white/8">
                    <span className="text-4xl font-black text-red-500/30 leading-none select-none shrink-0">
                      {month.month === 0 ? "W0" : `M${month.month}`}
                    </span>
                    <div>
                      <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">{month.title}</h2>
                      <p className="text-[10px] text-gray-700 uppercase tracking-widest mt-0.5">
                        {month.weeks.length}w · {month.weeks.reduce((a,w)=>a+w.modules.length,0)} modules
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8">
                    {month.weeks.map(week => (
                      <div
                        key={week.week}
                        className="cursor-pointer group"
                        onClick={() => setActiveWeek(week.week)}
                      >
                        <WeekBlock week={week} clickable />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ─────────────── WEEK BLOCK ─────────────── */
function WeekBlock({ week, clickable, viewMode }: { week: Week; clickable?: boolean; viewMode?: ViewMode }) {
  // In overview (clickable) mode the modules are already filtered by parent; just show a count badge
  const displayModules = week.modules;
  return (
    <div className={cn("flex flex-col gap-4", clickable && "hover:opacity-90 transition-opacity")}>
      <div className="flex items-start gap-3">
        <span className="bg-red-600/12 text-red-500 border border-red-600/25 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shrink-0 mt-0.5">
          W{week.week}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-white">{week.title}</h3>
          <p className="text-gray-600 text-[11px] mt-0.5 truncate">{week.theme}</p>
        </div>
        {clickable && <ChevronRight size={15} className="text-gray-700 shrink-0 mt-1" />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 pl-0 md:pl-12">
        {displayModules.map(mod => {
          const isCapstone = mod.id === "M7" || mod.type.toLowerCase() === "capstone";
          return (
            <div
              key={mod.id}
              className={cn(
                "flex flex-col gap-2 p-4 border transition-colors relative overflow-hidden",
                isCapstone
                  ? "border-red-600/40 bg-red-600/4 md:col-span-2 xl:col-span-3"
                  : "border-white/8 bg-white/[0.015] hover:border-white/16 hover:bg-white/4",
              )}
            >
              {isCapstone && (
                <span className="absolute top-0 right-0 bg-red-600 text-black text-[8px] font-black px-2 py-0.5 uppercase tracking-wider">
                  Milestone
                </span>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className={cn("flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border", getTypeColor(mod.type))}>
                  {getTypeIcon(mod.type)} {mod.type}
                </span>
                <span className="text-[10px] font-black text-white/12">{mod.id}</span>
              </div>
              <h4 className={cn("font-bold uppercase tracking-tight text-white leading-snug", isCapstone ? "text-sm md:text-base" : "text-xs md:text-sm")}>
                {mod.title}
              </h4>
              <p className="text-gray-600 text-[11px] leading-relaxed font-sans">
                {mod.description.replace(/ \[cite: \d+\]/g, "")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
