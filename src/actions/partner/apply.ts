"use server";

import { db } from "@/lib/db";
import { partnerApplication } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/role-guard";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function submitPartnerApplication(formData: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        return { error: "You must be logged in to apply." };
    }

    const agencyName = formData.get("agencyName") as string;
    const email = formData.get("email") as string;
    const contactNo = formData.get("contactNo") as string;
    const websiteUrl = formData.get("websiteUrl") as string;
    const description = formData.get("description") as string;

    if (!agencyName || !email || !contactNo) {
        return { error: "Please fill in all required fields." };
    }

    try {
        await db.insert(partnerApplication).values({
            id: nanoid(),
            userId: user.id,
            agencyName,
            email,
            contactNo,
            websiteUrl,
            description,
            status: "pending",
        });

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Partner application error:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
