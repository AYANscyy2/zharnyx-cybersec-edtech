"use server";

import { db } from "@/lib/db";
import { partnerApplication, coupon, user } from "@/lib/db/schema";
import { eq, isNotNull } from "drizzle-orm";

export async function getPendingPartnerApplications() {
    try {
        const applications = await db.query.partnerApplication.findMany({
            where: eq(partnerApplication.status, "pending"),
            orderBy: (apps, { desc }) => [desc(apps.createdAt)],
        });

        return { data: applications };
    } catch (error) {
        console.error("Error fetching partner applications:", error);
        return { error: "Failed to fetch applications" };
    }
}

export async function getPartnerStats() {
    try {
        // Fetch coupons that have a partner assigned
        const partnerCoupons = await db.query.coupon.findMany({
            where: isNotNull(coupon.partnerId),
            with: {
                partner: true,
            },
        });

        const stats = partnerCoupons.map((c) => {
            const uses = c.usedCount || 0;
            const revenueShare = c.partnerRevenue || 0;
            return {
                partnerId: c.partnerId!,
                agencyName: c.partner?.name || "Unknown Agency",
                // Note: 'agencyName' in partnerApplication is separate from user.name. 
                // When we approve, we should probably set user.name to agencyName or have a way to link them.
                // For now, assuming user.name is the agency name or we look up partnerApplication?
                // Implementation Plan said: "Create user on accept". Usually user.name would be the agency name.
                couponName: c.code,
                uses,
                revenueShare,
                totalRevenue: uses * revenueShare,
            };
        });

        return { data: stats };
    } catch (error) {
        console.error("Error fetching partner stats:", error);
        return { error: "Failed to fetch stats" };
    }
}
