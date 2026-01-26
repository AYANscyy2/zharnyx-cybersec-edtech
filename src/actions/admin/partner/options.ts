"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getPartners() {
    try {
        const partners = await db.query.user.findMany({
            where: eq(user.role, "partner_agency"),
            columns: {
                id: true,
                name: true,
                email: true,
            },
        });
        return { data: partners };
    } catch (error) {
        console.error("Error fetching partners:", error);
        return { error: "Failed to fetch partners" };
    }
}
