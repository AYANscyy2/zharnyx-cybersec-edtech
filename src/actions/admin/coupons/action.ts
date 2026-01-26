"use server";

import { db } from "@/lib/db";
import { coupon } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { createId } from "@paralleldrive/cuid2";

const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters").toUpperCase(),
  discountPercent: z.coerce.number().min(1).max(100),
  maxDiscountAmount: z.coerce.number().optional(),
  maxUses: z.coerce.number().optional(), // If 0 or omitted, treat as 0 or handle logic for unlimited
  expiresAt: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  isActive: z.boolean().default(true),
  partnerId: z.string().optional(),
  partnerRevenue: z.coerce.number().optional(),
});

export async function createCoupon(formData: FormData) {
  try {
    const rawData = {
      code: formData.get("code"),
      discountPercent: formData.get("discountPercent"),
      maxDiscountAmount: formData.get("maxDiscountAmount") || undefined,
      maxUses: formData.get("maxUses") || undefined,
      expiresAt: formData.get("expiresAt") || undefined,
      isActive: formData.get("isActive") === "on",
      partnerId: formData.get("partnerId") || undefined,
      partnerRevenue: formData.get("partnerRevenue") || undefined,
    };

    const validatedData = couponSchema.parse(rawData);

    await db.insert(coupon).values({
      id: createId(),
      code: validatedData.code,
      discountPercent: validatedData.discountPercent, // already number via coerce
      maxDiscountAmount: validatedData.maxDiscountAmount,
      maxUses: validatedData.maxUses,
      isActive: validatedData.isActive,
      expiresAt: validatedData.expiresAt,
      partnerId: validatedData.partnerId || null,
      partnerRevenue: validatedData.partnerRevenue || null,
    });

    revalidatePath("/dashboard/admin/coupons");
    revalidatePath("/dashboard/admin");
    return { success: true, message: "Coupon created successfully" };
  } catch (error) {
    console.error("Error creating coupon:", error);
    return { success: false, message: "Failed to create coupon" };
  }
}

export async function updateCoupon(id: string, formData: FormData) {
  try {
    const rawData = {
      code: formData.get("code"),
      discountPercent: formData.get("discountPercent"),
      maxDiscountAmount: formData.get("maxDiscountAmount") || undefined,
      maxUses: formData.get("maxUses") || undefined,
      expiresAt: formData.get("expiresAt") || undefined,
      isActive: formData.get("isActive") === "on", // Handle checkbox/switch
      partnerId: formData.get("partnerId") || undefined,
      partnerRevenue: formData.get("partnerRevenue") || undefined,
    };

    const validatedData = couponSchema.parse(rawData);

    await db
      .update(coupon)
      .set({
        code: validatedData.code,
        discountPercent: validatedData.discountPercent,
        maxDiscountAmount: validatedData.maxDiscountAmount,
        maxUses: validatedData.maxUses,
        isActive: validatedData.isActive,
        expiresAt: validatedData.expiresAt,
        partnerId: validatedData.partnerId || null,
        partnerRevenue: validatedData.partnerRevenue || null,
      })
      .where(eq(coupon.id, id));

    revalidatePath("/dashboard/admin/coupons");
    revalidatePath("/dashboard/admin");
    return { success: true, message: "Coupon updated successfully" };
  } catch (error) {
    console.error("Error updating coupon:", error);
    return { success: false, message: "Failed to update coupon" };
  }
}

export async function toggleCouponStatus(id: string, isActive: boolean) {
  try {
    await db.update(coupon).set({ isActive }).where(eq(coupon.id, id));

    revalidatePath("/dashboard/admin/coupons");
    return { success: true, message: "Coupon status updated" };
  } catch (error) {
    console.error("Error toggling coupon status:", error);
    return { success: false, message: "Failed to update coupon status" };
  }
}

export async function deleteCoupon(id: string) {
  try {
    await db.delete(coupon).where(eq(coupon.id, id));
    revalidatePath("/dashboard/admin/coupons");
    return { success: true, message: "Coupon deleted successfully" };
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return { success: false, message: "Failed to delete coupon" };
  }
}

export async function getCoupons() {
  try {
    const coupons = await db.query.coupon.findMany({
      orderBy: [desc(coupon.createdAt)],
    });
    return { success: true, data: coupons };
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return { success: false, data: [] };
  }
}
