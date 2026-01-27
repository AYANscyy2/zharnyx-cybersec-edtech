import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, Users } from "lucide-react";

interface PartnerOverviewProps {
    totalRevenue: number;
    totalUses: number;
    activeCouponsCount: number;
}

export function PartnerOverview({
    totalRevenue,
    totalUses,
    activeCouponsCount,
}: PartnerOverviewProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-mono text-green-500">
                        ₹{totalRevenue}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Earnings from coupon usage
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">
                        Total Uses
                    </CardTitle>
                    <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-mono text-white">
                        {totalUses}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Students enrolled via your codes
                    </p>
                </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">
                        Active Coupons
                    </CardTitle>
                    <Ticket className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold font-mono text-white">
                        {activeCouponsCount}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Coupons assigned to you
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
