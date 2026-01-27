"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/admin/user-management/data-table";
import { columns, PartnerCoupon } from "./columns";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlSync } from "@/hooks/use-url-sync";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PartnerCouponsProps {
    initialCoupons: PartnerCoupon[];
}

export function PartnerCoupons({ initialCoupons }: PartnerCouponsProps) {
    // Client-side filtering/sorting for now since it's a small list usually
    // Or we could implement server-side if needed, but partner coupons are usually few.
    // For consistency with other tables, let's pretend it's server-side or just client-side filter.
    // Given the 'initialCoupons' prop, it seems we are passing all coupons. 
    // Let's do client-side filtering.

    const [data, setData] = useState<PartnerCoupon[]>(initialCoupons);
    const [loading, setLoading] = useState(false);

    // URL Sync for search
    const [query, setQuery] = useUrlSync("search", "", 500);
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        // Client-side filter
        if (debouncedQuery) {
            const lowerQ = debouncedQuery.toLowerCase();
            const filtered = initialCoupons.filter(c =>
                c.code.toLowerCase().includes(lowerQ)
            );
            setData(filtered);
        } else {
            setData(initialCoupons);
        }
    }, [debouncedQuery, initialCoupons]);

    // Pagination state (client-side for DataTable)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    return (
        <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
            <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
                    My Coupons
                </CardTitle>
                <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                    List of assigned coupons and their performance.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
                <div className="flex items-center py-4 gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <input
                            placeholder="SEARCH COUPONS..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="h-10 flex-1 rounded-none border-2 border-white/20 bg-black px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 font-mono uppercase tracking-wide transition-colors"
                        />
                        <button
                            disabled={loading} // Or true if just client side
                            className="h-10 px-6 rounded-none bg-white text-black hover:bg-gray-200 transition-colors text-xs font-black uppercase tracking-widest border-2 border-white disabled:opacity-50"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>

                {loading ? (
                    <TableSkeleton columnCount={5} rowCount={5} />
                ) : (
                    <DataTable
                        columns={columns}
                        data={data.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)}
                        pageCount={Math.ceil(data.length / pagination.pageSize)}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                    />
                )}
            </CardContent>
        </Card>
    );
}
