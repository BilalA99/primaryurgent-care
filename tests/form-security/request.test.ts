import { describe, expect, it } from "vitest";

import type { FormSecurityConfig } from "@/lib/form-security/config";
import {
  extractTrustedClientIp,
  validateOrigin,
} from "@/lib/form-security/request";

const config: FormSecurityConfig = {
  isProduction: true,
  enabled: true,
  mode: "enforce",
  provider: "vercel-botid",
  rateLimitEnabled: true,
  duplicateProtectionEnabled: true,
  hashSecret: "x".repeat(32),
  allowedOrigins: new Set([
    "https://primaryuc.com",
    "https://www.primaryuc.com",
  ]),
  providerTimeoutMs: 1500,
};

describe("request integrity", () => {
  it("allows the production apex origin", () => {
    expect(
      validateOrigin(
        new Request("https://primaryuc.com/api", {
          headers: { origin: "https://primaryuc.com" },
        }),
        config,
      ),
    ).toBe(true);
  });

  it("allows the production www origin", () => {
    expect(
      validateOrigin(
        new Request("https://primaryuc.com/api", {
          headers: { origin: "https://www.primaryuc.com" },
        }),
        config,
      ),
    ).toBe(true);
  });

  it("rejects an explicit cross-origin request", () => {
    expect(
      validateOrigin(
        new Request("https://primaryuc.com/api", {
          headers: { origin: "https://attacker.example" },
        }),
        config,
      ),
    ).toBe(false);
  });

  it("allows a missing Origin for attestation and other checks to decide", () => {
    expect(
      validateOrigin(new Request("https://primaryuc.com/api"), config),
    ).toBe(true);
  });

  it("allows localhost only outside production", () => {
    const local = { ...config, isProduction: false };
    expect(
      validateOrigin(
        new Request("http://localhost/api", {
          headers: { origin: "http://localhost:3000" },
        }),
        local,
      ),
    ).toBe(true);
  });

  it("does not trust client forwarding headers outside Vercel production", () => {
    const originalVercel = process.env.VERCEL;
    delete process.env.VERCEL;
    try {
      const request = new Request("https://primaryuc.com/api", {
        headers: { "x-forwarded-for": "203.0.113.4" },
      });
      expect(extractTrustedClientIp(request, config)).toBeNull();
    } finally {
      if (originalVercel) process.env.VERCEL = originalVercel;
    }
  });
});
