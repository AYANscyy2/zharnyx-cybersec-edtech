import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

// --- Rate Limit Configurations ---

// Strict limiter for sensitive actions like Emails (2 per 10s)
const emailLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit/email",
});

// Moderate limiter for Auth actions like Login/Signup (5 per 60s)
const authLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
    prefix: "@upstash/ratelimit/auth",
});

// General limiter for API routes (20 per 10s)
const apiLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit/api",
});

type RateLimitType = "email" | "auth" | "api";

export const checkRateLimit = async (identifier: string, type: RateLimitType = "api") => {
    // If Redis credentials are not set (e.g., local dev without setup), bypass rate limiting
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
        // Only warn once in development usually, but here is fine
        // console.warn("Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set.");
        return { success: true };
    }

    try {
        let limiter: Ratelimit;
        switch (type) {
            case "email":
                limiter = emailLimiter;
                break;
            case "auth":
                limiter = authLimiter;
                break;
            case "api":
            default:
                limiter = apiLimiter;
                break;
        }

        const { success } = await limiter.limit(identifier);
        return { success };
    } catch (error) {
        console.error(`Rate limit check failed for ${type}:`, error);
        // Fail open if Redis is down
        return { success: true };
    }
};
