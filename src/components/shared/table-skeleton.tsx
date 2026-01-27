
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
    columnCount?: number;
    rowCount?: number;
}

export function TableSkeleton({
    columnCount = 5,
    rowCount = 5,
}: TableSkeletonProps) {
    return (
        <div className="rounded-none border-2 border-white/10 bg-black">
            <Table>
                <TableHeader className="bg-white/5 border-b-2 border-white/10">
                    <TableRow className="border-white/10 hover:bg-transparent">
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <TableHead key={i} className="h-12">
                                <Skeleton className="h-4 w-24 bg-white/10 rounded-none animate-pulse" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rowCount }).map((_, i) => (
                        <TableRow key={i} className="border-b border-white/10 hover:bg-transparent">
                            {Array.from({ length: columnCount }).map((_, j) => (
                                <TableCell key={j} className="py-4 border-r border-white/5 last:border-r-0">
                                    <Skeleton className="h-4 w-full bg-white/5 rounded-none animate-pulse" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
