"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// This type usually comes from Prisma/Drizzle generated types
// But we can define a local interface for the table
export type PartnerCoupon = {
    id: string;
    code: string;
    discountPercent: number;
    partnerRevenue: number;
    usedCount: number;
    isActive: boolean;
};

export const columns: ColumnDef<PartnerCoupon>[] = [
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white p-0 hover:bg-transparent font-black uppercase tracking-widest text-xs"
                >
                    CODE
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="text-green-500 font-bold font-mono text-base border-2 border-green-500/20 bg-green-500/10 px-2 py-1 inline-block">
                {row.getValue("code")}
            </div>
        ),
    },
    {
        accessorKey: "discountPercent",
        header: "DISCOUNT (%)",
        cell: ({ row }) => (
            <div className="font-mono text-white">{row.getValue("discountPercent")}%</div>
        ),
    },
    {
        accessorKey: "partnerRevenue",
        header: "REVENUE SHARE (₹)",
        cell: ({ row }) => (
            <div className="font-mono text-green-400">
                ₹{row.getValue("partnerRevenue")}
            </div>
        ),
    },
    {
        accessorKey: "usedCount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-white hover:text-white p-0 hover:bg-transparent font-black uppercase tracking-widest text-xs"
                >
                    USES
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-mono text-white font-bold text-lg">
                {row.getValue("usedCount")}
            </div>
        ),
    },
    {
        accessorKey: "isActive", // Assuming this field exists or we infer it
        header: "STATUS",
        cell: ({ row }) => {
            const active = row.original.isActive !== false; // Default to true if undefined for now
            return (
                <span
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${active ? "bg-green-600 text-black" : "bg-red-600 text-white"
                        }`}
                >
                    {active ? "ACTIVE" : "INACTIVE"}
                </span>
            );
        },
    },
];
