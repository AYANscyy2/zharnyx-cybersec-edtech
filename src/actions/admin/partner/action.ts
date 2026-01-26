"use server";

import { db } from "@/lib/db";
import { partnerApplication, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function approvePartnerApplication(applicationId: string) {
    try {
        const application = await db.query.partnerApplication.findFirst({
            where: eq(partnerApplication.id, applicationId),
        });

        if (!application) {
            return { error: "Application not found" };
        }

        // Update user role to partner_agency
        await db
            .update(user)
            .set({ role: "partner_agency" })
            .where(eq(user.id, application.userId));

        // Update application status
        await db
            .update(partnerApplication)
            .set({ status: "approved" })
            .where(eq(partnerApplication.id, applicationId));

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Error approving partner:", error);
        return { error: "Failed to approve partner" };
    }
}

export async function rejectPartnerApplication(applicationId: string) {
    try {
        await db
            .update(partnerApplication)
            .set({ status: "rejected" })
            .where(eq(partnerApplication.id, applicationId));

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Error rejecting partner:", error);
        return { error: "Failed to reject partner" };
    }
}
