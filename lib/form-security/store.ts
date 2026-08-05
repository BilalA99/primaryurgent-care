import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import type { FormSecurityConfig } from "./config";

export interface RateLimitCheck {
  allowed: boolean;
  available: boolean;
  retryAfter: number;
}

function redisFor(config: FormSecurityConfig): Redis | null {
  if (!config.upstashUrl || !config.upstashToken) return null;
  return new Redis({ url: config.upstashUrl, token: config.upstashToken });
}

async function runLimit(
  redis: Redis,
  prefix: string,
  identifier: string,
  maximum: number,
  window: Parameters<typeof Ratelimit.slidingWindow>[1],
): Promise<RateLimitCheck> {
  try {
    const limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(maximum, window),
      prefix: `primaryuc:forms:${prefix}`,
      analytics: true,
      timeout: 500,
    });
    const result = await limiter.limit(identifier);
    return {
      allowed: result.success,
      available: result.reason !== "timeout",
      retryAfter: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch {
    return { allowed: true, available: false, retryAfter: 1 };
  }
}

async function withStoreTimeout<T>(
  operation: Promise<T>,
  timeoutMs = 500,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error("Form security store timeout")),
      timeoutMs,
    );
  });
  return Promise.race([operation, timeout]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

export async function checkIpRateLimits(
  config: FormSecurityConfig,
  identifier: string,
): Promise<RateLimitCheck> {
  if (!config.rateLimitEnabled)
    return { allowed: true, available: true, retryAfter: 1 };
  const redis = redisFor(config);
  if (!redis) return { allowed: true, available: false, retryAfter: 1 };
  const [shortWindow, dailyWindow] = await Promise.all([
    runLimit(redis, "ip-10m", identifier, 5, "10 m"),
    runLimit(redis, "ip-24h", identifier, 20, "24 h"),
  ]);
  return {
    allowed: shortWindow.allowed && dailyWindow.allowed,
    available: shortWindow.available && dailyWindow.available,
    retryAfter: Math.max(
      ...[shortWindow, dailyWindow]
        .filter((result) => !result.allowed)
        .map((result) => result.retryAfter),
      1,
    ),
  };
}

export async function checkIdentifierRateLimit(
  config: FormSecurityConfig,
  bucket: "email" | "phone",
  identifier: string,
  duplicateFingerprint?: string,
): Promise<RateLimitCheck> {
  if (!config.rateLimitEnabled)
    return { allowed: true, available: true, retryAfter: 1 };
  const redis = redisFor(config);
  if (!redis) return { allowed: true, available: false, retryAfter: 1 };
  if (duplicateFingerprint) {
    try {
      const existing = await withStoreTimeout(
        redis.get<string>(`primaryuc:forms:duplicate:${duplicateFingerprint}`),
      );
      if (existing) return { allowed: true, available: true, retryAfter: 1 };
    } catch {
      // The limiter below remains the source of truth when the duplicate lookup is unavailable.
    }
  }
  return runLimit(redis, `${bucket}-30m`, identifier, 3, "30 m");
}

export async function reserveDuplicate(
  config: FormSecurityConfig,
  fingerprint: string,
  reservationId: string,
): Promise<{ duplicate: boolean; available: boolean }> {
  if (!config.duplicateProtectionEnabled)
    return { duplicate: false, available: true };
  const redis = redisFor(config);
  if (!redis) return { duplicate: false, available: false };
  try {
    const result = await withStoreTimeout(
      redis.set(`primaryuc:forms:duplicate:${fingerprint}`, reservationId, {
        nx: true,
        ex: 600,
      }),
    );
    return { duplicate: result === null, available: true };
  } catch {
    return { duplicate: false, available: false };
  }
}

export async function completeDuplicate(
  config: FormSecurityConfig,
  fingerprint: string,
): Promise<void> {
  const redis = redisFor(config);
  if (!redis) return;
  try {
    await withStoreTimeout(
      redis.set(`primaryuc:forms:duplicate:${fingerprint}`, "accepted", {
        ex: 600,
      }),
    );
  } catch {
    // Delivery has already completed. A store outage must not turn success into a patient error.
  }
}

export async function releaseDuplicate(
  config: FormSecurityConfig,
  fingerprint: string,
  reservationId: string,
): Promise<void> {
  const redis = redisFor(config);
  if (!redis) return;
  const key = `primaryuc:forms:duplicate:${fingerprint}`;
  try {
    await withStoreTimeout(
      redis.eval(
        "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",
        [key],
        [reservationId],
      ),
    );
  } catch {
    // The short TTL bounds a failed reservation if Redis becomes unavailable mid-request.
  }
}
