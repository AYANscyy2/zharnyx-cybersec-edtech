"use client";

import { useEffect, useState } from "react";
import { getWaitlistEntries, updateWaitlistStatus, WaitlistRow } from "@/actions/admin/waitlist/action";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { toast } from "@/components/shared/toast";

const COURSES = [
  { value: "", label: "All Entries" },
  // Syllabus
  { value: "week-0",        label: "Week 0" },
  { value: "foundation",    label: "Foundation" },
  { value: "soc",           label: "SOC Analyst" },
  { value: "vapt",          label: "VAPT" },
  { value: "cloud-security",label: "Cloud Security" },
  { value: "dfir",          label: "DFIR" },
  // Internships
  { value: "intern-tier-1", label: "Internship — Tier 1" },
  { value: "intern-tier-2", label: "Internship — Tier 2" },
  { value: "intern-tier-3", label: "Internship — Tier 3" },
];

const STATUSES = [
  { value: "", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "contacted", label: "Contacted" },
  { value: "enrolled", label: "Enrolled" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_STYLES: Record<string, string> = {
  pending:   "text-yellow-400 bg-yellow-400/10 border border-yellow-400/30",
  contacted: "text-blue-400  bg-blue-400/10  border border-blue-400/30",
  enrolled:  "text-green-400 bg-green-400/10 border border-green-400/30",
  rejected:  "text-red-400   bg-red-400/10   border border-red-400/30",
};

export function WaitlistTable() {
  const [data, setData]               = useState<WaitlistRow[]>([]);
  const [loading, setLoading]         = useState(true);
  const [query, setQuery]             = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [total, setTotal]             = useState(0);
  const [updatingId, setUpdatingId]   = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await getWaitlistEntries({ page, limit: 10, query, courseFilter, statusFilter });
    if (res.success) {
      setData(res.data);
      setTotalPages(res.meta.totalPages);
      setTotal(res.meta.total);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [page, courseFilter, statusFilter]);
  // Reset page on filter change
  useEffect(() => { setPage(1); }, [query, courseFilter, statusFilter]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchData(); };

  const handleStatusChange = async (id: string, status: any) => {
    setUpdatingId(id);
    const res = await updateWaitlistStatus(id, status);
    if (res.success) {
      setData(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      toast.success("Status updated");
    } else {
      toast.error("Failed to update status");
    }
    setUpdatingId(null);
  };

  return (
    <div className="w-full font-mono">
      {/* Filters */}
      <form onSubmit={handleSearch} className="flex flex-wrap items-center gap-3 mb-4">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="SEARCH NAME / EMAIL / PHONE..."
          className="h-10 flex-1 min-w-[200px] border-2 border-white/20 bg-black px-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-red-500 uppercase tracking-wide transition-colors"
        />
        <select
          value={courseFilter}
          onChange={e => setCourseFilter(e.target.value)}
          className="h-10 border-2 border-white/20 bg-black text-white text-xs px-3 focus:outline-none focus:border-red-500 uppercase tracking-wide appearance-none"
        >
          {COURSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="h-10 border-2 border-white/20 bg-black text-white text-xs px-3 focus:outline-none focus:border-red-500 uppercase tracking-wide appearance-none"
        >
          {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="h-10 px-6 bg-white text-black text-xs font-black uppercase tracking-widest border-2 border-white hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "SEARCH"}
        </button>
      </form>

      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-4 text-[10px] uppercase tracking-widest text-gray-500">
        <span>Total: <span className="text-white font-bold">{total}</span></span>
        {courseFilter && <span>Course: <span className="text-red-400 font-bold">{courseFilter}</span></span>}
        {statusFilter && <span>Status: <span className="text-yellow-400 font-bold">{statusFilter}</span></span>}
      </div>

      {/* Table */}
      {loading ? (
        <TableSkeleton columnCount={6} rowCount={6} />
      ) : data.length === 0 ? (
        <div className="border-2 border-white/10 bg-white/[0.02] py-16 text-center text-gray-600 text-xs uppercase tracking-widest">
          No waitlist entries found.
        </div>
      ) : (
        <div className="overflow-x-auto border-2 border-white/20">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b-2 border-white/20 bg-white/5">
                {["Name", "Email", "Phone", "Course", "Applied On", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-black uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {data.map(row => (
                <tr key={row.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 font-bold text-white whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-3 text-gray-400">{row.email}</td>
                  <td className="px-4 py-3 text-gray-500">{row.phone ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-white/15 text-gray-300">
                      {row.course}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(row.appliedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${STATUS_STYLES[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      disabled={updatingId === row.id}
                      onChange={e => handleStatusChange(row.id, e.target.value)}
                      className="bg-black border border-white/15 text-white text-[10px] px-2 py-1 focus:outline-none focus:border-red-500 uppercase tracking-wide appearance-none disabled:opacity-50 cursor-pointer"
                    >
                      {STATUSES.filter(s => s.value).map(s => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-gray-500 uppercase tracking-widest">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-3 py-1.5 border border-white/15 text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || loading}
              className="px-3 py-1.5 border border-white/15 text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
