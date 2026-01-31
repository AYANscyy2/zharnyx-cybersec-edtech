import { auth } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/ratelimit";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { POST: originalPOST, GET } = toNextJsHandler(auth);

const POST = async (req: NextRequest) => {
    // 1. Identify if this is a sensitive auth action (sign-in, sign-up, etc.)
    const path = req.nextUrl.pathname;
    const isSensitive =
        path.includes("/sign-in") ||
        path.includes("/sign-up") ||
        path.includes("/forget-password") ||
        path.includes("/verification");

    if (isSensitive) {
        // 2. Get IP address for rate limiting
        // standard headers for IP. If multiple, take the first one.
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";
        const identifier = `auth:${ip}`;

        // 3. Check rate limit
        const limit = await checkRateLimit(identifier, "auth");

        if (!limit.success) {
            return NextResponse.json(
                { message: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }
    }

    // 4. Delegate to original Better Auth handler if allowed
    return originalPOST(req);
};

export { GET, POST };
