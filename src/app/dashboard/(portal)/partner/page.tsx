import { getCurrentSession } from "@/lib/auth/role-guard";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { coupon } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Ticket, Users } from "lucide-react";

export default async function PartnerDashboardPage() {
    const session = await getCurrentSession();

    if (!session || (session.user.role !== "partner_agency" && session.user.role !== "admin")) {
        redirect("/dashboard");
    }

    // Fetch partner's coupons
    const partnerCoupons = await db.query.coupon.findMany({
        where: eq(coupon.partnerId, session.user.id),
    });

    const totalUses = partnerCoupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);
    const totalRevenue = partnerCoupons.reduce((sum, c) => sum + ((c.usedCount || 0) * (c.partnerRevenue || 0)), 0);

    return (
        <div className="flex min-h-screen w-full bg-black font-sans">
            <div className="relative flex flex-col flex-1 z-10 w-full pl-6 pr-6 pb-6 pt-4">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-white/20">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-black font-mono text-white uppercase tracking-tighter leading-none">
                            Partner Portal
                        </h1>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-green-600 text-black text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                                Active
                            </span>
                            <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">
                                {"// Agency: "}
                                {session.user.name}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono text-green-500">₹{totalRevenue}</div>
                            <p className="text-xs text-gray-500 mt-1">Earnings from coupon usage</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">Total Uses</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono text-white">{totalUses}</div>
                            <p className="text-xs text-gray-500 mt-1">Students enrolled via your codes</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium font-mono uppercase text-gray-400">Active Coupons</CardTitle>
                            <Ticket className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold font-mono text-white">{partnerCoupons.length}</div>
                            <p className="text-xs text-gray-500 mt-1">Coupons assigned to you</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Coupons List */}
                <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                    <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
                        <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">My Coupons</CardTitle>
                        <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                            List of assigned coupons and their performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        {partnerCoupons.length === 0 ? (
                            <div className="text-gray-500 font-mono text-sm">No coupons assigned yet. Contact admin.</div>
                        ) : (
                            <div className="space-y-4">
                                {partnerCoupons.map(coupon => (
                                    <div key={coupon.id} className="flex items-center justify-between p-4 border border-white/10 bg-white/5">
                                        <div>
                                            <div className="text-lg font-bold font-mono text-green-400">{coupon.code}</div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Discount: {coupon.discountPercent}% | Revenue Share: ₹{coupon.partnerRevenue}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold font-mono text-white">{coupon.usedCount}</div>
                                            <div className="text-xs text-gray-500 uppercase">Uses</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
