"use client";

import { useState, useMemo } from "react";
import {
  Activity, Flame, ChevronDown, GraduationCap,
  TrendingUp, TrendingDown, BarChart2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface CourseProgress {
  courseId: string;
  title: string;
  progressPercentage: number;
  completedWeeks: number;
  totalWeeks: number;
}

export interface ActivityEntry {
  type: "assessment" | "project" | "info";
  text: string;
  date: string; // ISO string
  time: string;
}

interface Props {
  courseProgressData: CourseProgress[];
  allActivities: ActivityEntry[];
  streak: number;
  totalPoints: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns an array of daily submission counts, oldest→newest, for N days */
function buildDailyActivity(activities: ActivityEntry[], days: number): number[] {
  const counts: number[] = new Array(days).fill(0);
  const now = new Date();
  activities.forEach((a) => {
    if (a.type === "info") return;
    const diff = Math.floor((now.getTime() - new Date(a.date).getTime()) / 86400000);
    if (diff >= 0 && diff < days) counts[days - 1 - diff]++;
  });
  return counts;
}

/** % of days with at least 1 submission in last N days */
function calcConsistencyPct(activities: ActivityEntry[], days: number): number {
  const cutoff = Date.now() - days * 86400000;
  const active = new Set<string>();
  activities.forEach((a) => {
    if (a.type === "info") return;
    const d = new Date(a.date);
    if (d.getTime() >= cutoff) active.add(d.toISOString().split("T")[0]);
  });
  return Math.round((active.size / days) * 100);
}

/** Average submissions per active day over last N days */
function calcAvgIntensity(counts: number[]): number {
  const activeDays = counts.filter((v) => v > 0);
  if (!activeDays.length) return 0;
  return Math.round((activeDays.reduce((s, v) => s + v, 0) / activeDays.length) * 10) / 10;
}

/** Build SVG polyline points string mapping counts to a 0–H viewBox */
function buildPolyline(data: number[], W: number, H: number): string {
  const max = Math.max(...data, 1);
  return data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * W;
      const y = H - (v / max) * (H - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

// ─── Sub-component: Day-Wise Activity Graph ───────────────────────────────────
function ActivityGraph({ allActivities }: { allActivities: ActivityEntry[] }) {
  const DAYS = 30;
  const counts = useMemo(() => buildDailyActivity(allActivities, DAYS), [allActivities]);
  const consistencyPct = useMemo(() => calcConsistencyPct(allActivities, DAYS), [allActivities]);
  const avgIntensity = useMemo(() => calcAvgIntensity(counts), [counts]);
  const maxCount = Math.max(...counts, 1);
  const totalSubmissions = counts.reduce((s, v) => s + v, 0);

  // Polyline on a 300×60 viewBox
  const polyline = useMemo(() => buildPolyline(counts, 300, 60), [counts]);

  // Day labels: every 5 days
  const today = new Date();
  const dayLabels = Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (DAYS - 1 - i));
    return d.getDate();
  });

  return (
    <div className="border-2 border-white/20 bg-black hover:border-white/30 transition-colors">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center">
            <BarChart2 className="w-3 h-3 text-blue-500" />
          </div>
          <h3 className="font-mono font-bold text-xs text-gray-400 uppercase tracking-widest">
            30-Day Activity — Intensity &amp; Consistency
          </h3>
        </div>
        {/* Summary stats */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-center">
            <div className="font-mono font-black text-lg text-white leading-none">{consistencyPct}%</div>
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Consistency</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="font-mono font-black text-lg text-blue-400 leading-none">{avgIntensity}</div>
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Avg / Active Day</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <div className="font-mono font-black text-lg text-purple-400 leading-none">{totalSubmissions}</div>
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-0.5">Total Submissions</div>
          </div>
        </div>
      </div>

      {/* Chart body */}
      <div className="p-6">
        {/* Legend */}
        <div className="flex items-center gap-5 mb-5">
          <span className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span className="w-8 h-2 bg-blue-500/40 inline-block border-t-2 border-blue-500" />
            Daily Intensity
          </span>
          <span className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span className="w-8 h-[2px] bg-green-400 inline-block" />
            Consistency Line
          </span>
        </div>

        {/* Chart: bars + SVG line overlay */}
        <div className="relative w-full" style={{ height: "140px" }}>
          {/* Bar layer */}
          <div className="absolute inset-0 flex items-end gap-[3px]">
            {counts.map((v, i) => {
              const heightPct = maxCount > 0 ? Math.max((v / maxCount) * 100, v > 0 ? 6 : 2) : 2;
              const isActive = v > 0;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end relative group/bar h-full">
                  <div
                    className={`w-full transition-all duration-300 border-t-2 ${
                      isActive
                        ? v >= maxCount * 0.7
                          ? "bg-blue-500/70 border-blue-400"
                          : v >= maxCount * 0.35
                          ? "bg-blue-500/40 border-blue-500/60"
                          : "bg-blue-500/20 border-blue-500/30"
                        : "bg-white/5 border-transparent"
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  {/* Tooltip on hover */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover/bar:flex flex-col items-center z-10 pointer-events-none">
                      <div className="px-2 py-1 bg-black border border-white/30 font-mono text-[9px] text-white whitespace-nowrap shadow-lg">
                        {v} submission{v !== 1 ? "s" : ""}
                      </div>
                      <div className="w-px h-1 bg-white/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SVG Consistency Line Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="w-full h-full overflow-visible">
              {/* Subtle filled area under the line */}
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
              </defs>
              {counts.length > 1 && (
                <>
                  {/* Filled area */}
                  <polygon
                    points={`0,60 ${polyline} 300,60`}
                    fill="url(#lineGrad)"
                  />
                  {/* Line */}
                  <polyline
                    points={polyline}
                    fill="none"
                    stroke="#4ade80"
                    strokeWidth="1.5"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                    opacity="0.8"
                  />
                  {/* Dot on today */}
                  {(() => {
                    const last = polyline.split(" ").pop()!;
                    const [lx, ly] = last.split(",").map(Number);
                    return (
                      <rect
                        x={lx - 2}
                        y={ly - 2}
                        width={4}
                        height={4}
                        fill="#4ade80"
                      />
                    );
                  })()}
                </>
              )}
            </svg>
          </div>
        </div>

        {/* X-axis day labels */}
        <div className="flex mt-2">
          {dayLabels.map((day, i) => (
            <div key={i} className="flex-1 text-center">
              {(i === 0 || i === 6 || i === 13 || i === 20 || i === 29) && (
                <span className="text-[8px] font-mono text-white/25 uppercase">
                  {i === 29 ? "Today" : `${DAYS - i}d`}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Type breakdown bar */}
        <div className="mt-5 border-t-2 border-white/10 pt-4 grid grid-cols-2 gap-4">
          {[
            {
              label: "Assessments",
              count: allActivities.filter((a) => a.type === "assessment").length,
              color: "bg-green-500",
              textColor: "text-green-400",
            },
            {
              label: "Projects",
              count: allActivities.filter((a) => a.type === "project").length,
              color: "bg-purple-500",
              textColor: "text-purple-400",
            },
          ].map((t) => (
            <div key={t.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.label}</span>
                <span className={`font-mono font-bold text-xs ${t.textColor}`}>{t.count}</span>
              </div>
              <div className="h-1.5 bg-white/5 border border-white/10 overflow-hidden">
                <div
                  className={`h-full ${t.color} transition-all duration-700`}
                  style={{ width: totalSubmissions > 0 ? `${(t.count / totalSubmissions) * 100}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProfileTrackers({ courseProgressData, allActivities, streak, totalPoints }: Props) {
  const [selectedId, setSelectedId] = useState<string>(courseProgressData[0]?.courseId ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selected = useMemo(
    () => courseProgressData.find((c) => c.courseId === selectedId) ?? courseProgressData[0],
    [selectedId, courseProgressData]
  );

  const pct = selected?.progressPercentage ?? 0;
  const status = pct >= 70 ? "On Track" : pct >= 40 ? "In Progress" : "Getting Started";
  const statusColor = pct >= 70
    ? "border-green-500 text-green-500"
    : pct >= 40
    ? "border-blue-500 text-blue-500"
    : "border-yellow-500 text-yellow-500";

  if (!courseProgressData.length) {
    return (
      <div className="border-2 border-white/20 bg-black p-8 text-center">
        <p className="font-mono text-gray-500 text-sm uppercase tracking-widest">No courses enrolled yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Row 1: Streak + Course Progress Insight ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Streak Box */}
        <div className="border-2 border-white/20 bg-black p-6 flex flex-col justify-between group hover:border-orange-500 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center">
              <Flame className="w-3 h-3 text-orange-500" />
            </div>
            <h3 className="font-mono font-bold text-xs text-gray-500 uppercase tracking-widest">Active Streak</h3>
          </div>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-7xl font-black font-mono leading-none text-orange-500 group-hover:text-orange-400 transition-colors">
              {streak}
            </span>
            <span className="text-xl font-mono text-gray-500 pb-2">DAYS</span>
          </div>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest border-t-2 border-white/10 pt-4 mt-6">
            {streak === 0 ? "Start today to build your streak" : streak >= 7 ? "Exceptional consistency" : "Keep it going!"}
          </p>
        </div>

        {/* Course Progress Insight */}
        <div className="border-2 border-white/20 bg-black p-6 flex flex-col justify-between col-span-1 md:col-span-2 group hover:border-white/40 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center">
                <GraduationCap className="w-3 h-3 text-purple-500" />
              </div>
              <h3 className="font-mono font-bold text-xs text-gray-500 uppercase tracking-widest">Course Progress</h3>
            </div>
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-2 border-2 border-white/20 bg-black text-white font-mono text-xs uppercase tracking-widest hover:border-white/40 transition-colors"
              >
                <span className="max-w-[160px] truncate">{selected?.title ?? "Select Course"}</span>
                <ChevronDown className={`w-3 h-3 shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 z-50 min-w-[240px] border-2 border-white/30 bg-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                  {courseProgressData.map((c) => (
                    <button
                      key={c.courseId}
                      onClick={() => { setSelectedId(c.courseId); setDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors border-b border-white/10 last:border-0 ${
                        c.courseId === selectedId ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="truncate">{c.title}</span>
                        <span className={`shrink-0 font-bold ${c.progressPercentage >= 70 ? "text-green-500" : c.progressPercentage >= 40 ? "text-blue-500" : "text-yellow-500"}`}>
                          {c.progressPercentage}%
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-end gap-2 my-4">
            <span className="text-7xl font-black font-mono leading-none text-white">{pct}</span>
            <span className="text-2xl font-mono text-gray-500 pb-1">%</span>
          </div>

          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 border-2 text-[10px] font-mono uppercase tracking-widest ${statusColor}`}>{status}</span>
            <span className="px-3 py-1 border-2 border-white/20 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              {selected?.completedWeeks ?? 0} / {selected?.totalWeeks ?? 0} Weeks
            </span>
          </div>

          <div className="w-full h-3 bg-white/5 border border-white/10 overflow-hidden">
            <div className="h-full bg-purple-500 relative transition-all duration-700" style={{ width: `${pct}%` }}>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: 30-Day Activity Graph ── */}
      <ActivityGraph allActivities={allActivities} />

      {/* ── All Courses Progress Overview ── */}
      <div className="border-2 border-white/20 bg-black">
        <div className="p-5 border-b-2 border-white/20 flex items-center justify-between">
          <h3 className="font-mono font-bold text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> All Enrolled Courses
          </h3>
          <span className="text-[10px] font-mono bg-white/10 px-2 py-1 text-gray-400">{courseProgressData.length} courses</span>
        </div>
        <div className="divide-y divide-white/10">
          {courseProgressData.map((c) => (
            <div
              key={c.courseId}
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4 group hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => { setSelectedId(c.courseId); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-white uppercase tracking-wide truncate group-hover:text-purple-400 transition-colors">{c.title}</p>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">{c.completedWeeks} / {c.totalWeeks} weeks completed</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-36 h-2 bg-white/5 border border-white/10 overflow-hidden">
                  <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${c.progressPercentage}%` }} />
                </div>
                <span className={`font-mono font-bold text-sm w-10 text-right ${c.progressPercentage >= 70 ? "text-green-500" : c.progressPercentage >= 40 ? "text-blue-500" : "text-yellow-500"}`}>
                  {c.progressPercentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
