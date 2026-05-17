"use client";

import { useEffect, useState } from "react";
import { NewUser, columns } from "./new-user-application-columns";
import { DataTable } from "./data-table";
import { getNewUserApplications } from "@/actions/admin/student-management/action";

import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlSync } from "@/hooks/use-url-sync";

export function NewUserApplicationTable() {
  const [data, setData] = useState<NewUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);

  // Search and Filter states
  const [query, setQuery] = useUrlSync("search_users", "", 500);
  const debouncedQuery = useDebounce(query, 500);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getNewUserApplications({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        query: debouncedQuery,
      });

      if (result.success && result.data) {
        const mappedUsers: NewUser[] = result.data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          city: u.city,
          studentStatus: u.studentStatus,
          preferredTrack: u.preferredTrack,
          collegeName: u.collegeName,
          message: u.message,
          imageUrl: u.imageUrl,
          createdAt: new Date(u.createdAt),
          paymentStatus: (u as any).paymentStatus || null,
        }));
        setData(mappedUsers);
        setPageCount(result.meta?.totalPages || 0);
      }
      setLoading(false);
    };

    fetchData();
  }, [pagination, debouncedQuery]);

  // Reset pagination when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [debouncedQuery]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <div className="flex flex-1 items-center gap-2">
          <input
            placeholder="SEARCH NEW USERS..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-10 flex-1 rounded-none border-2 border-white/20 bg-black px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500 font-mono uppercase tracking-wide transition-colors"
          />
          <button
            disabled={loading}
            className="h-10 px-6 rounded-none bg-white text-black hover:bg-gray-200 transition-colors text-xs font-black uppercase tracking-widest border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "SEARCHING..." : "SEARCH"}
          </button>
        </div>
      </div>

      {loading ? (
        <TableSkeleton columnCount={6} rowCount={5} />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      )}
    </div>
  );
}
