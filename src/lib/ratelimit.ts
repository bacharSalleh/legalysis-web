import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/nodejs";

declare global {
    // eslint-disable-next-line no-var
    var cachedRateLimit: Ratelimit;
}

let ratelimit: Ratelimit;
if (process.env.NODE_ENV === "production") {
    ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        analytics: true,
        limiter: Ratelimit.slidingWindow(3, "1m"),
    });
} else {
    if (!global.cachedRateLimit) {
        global.cachedRateLimit = new Ratelimit({
            redis: Redis.fromEnv(),
            analytics: true,
            limiter: Ratelimit.slidingWindow(3, "1m"),
        });
    }
    ratelimit = global.cachedRateLimit;
}

export const ratelimiter = ratelimit;
