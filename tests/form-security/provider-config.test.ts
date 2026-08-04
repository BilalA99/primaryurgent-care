import { afterEach, describe, expect, it, vi } from "vitest";

import type { FormSecurityConfig } from "@/lib/form-security/config";
import { getFormSecurityConfig } from "@/lib/form-security/config";
import { verifyBotAttestation } from "@/lib/form-security/provider";

const baseConfig: FormSecurityConfig = {
  isProduction: false,
  enabled: true,
  mode: "enforce",
  provider: "vercel-botid",
  rateLimitEnabled: true,
  duplicateProtectionEnabled: true,
  hashSecret: "x".repeat(32),
  allowedOrigins: new Set(["https://primaryuc.com"]),
  providerTimeoutMs: 100,
};

describe("BotID provider boundary", () => {
  it("accepts a human result", async () => {
    const check = vi.fn(async () => ({
      isHuman: true,
      isBot: false,
      isVerifiedBot: false,
      bypassed: false,
    }));
    await expect(
      verifyBotAttestation(new Request("http://localhost"), baseConfig, check),
    ).resolves.toMatchObject({ status: "human" });
  });

  it("returns a confirmed bot result", async () => {
    const check = vi.fn(async () => ({
      isHuman: false,
      isBot: true,
      isVerifiedBot: false,
      bypassed: false,
    }));
    await expect(
      verifyBotAttestation(new Request("http://localhost"), baseConfig, check),
    ).resolves.toMatchObject({ status: "bot" });
  });

  it("treats an unclassified provider result as a failure", async () => {
    const check = vi.fn(async () => ({
      isHuman: false,
      isBot: false,
      isVerifiedBot: false,
      bypassed: false,
    }));
    await expect(
      verifyBotAttestation(new Request("http://localhost"), baseConfig, check),
    ).resolves.toMatchObject({ status: "failure" });
  });

  it("rejects missing production attestation before calling BotID", async () => {
    const check = vi.fn(async () => ({
      isHuman: true,
      isBot: false,
      isVerifiedBot: false,
      bypassed: false,
    }));
    await expect(
      verifyBotAttestation(
        new Request("https://primaryuc.com"),
        { ...baseConfig, isProduction: true },
        check,
      ),
    ).resolves.toMatchObject({ status: "missing_attestation" });
    expect(check).not.toHaveBeenCalled();
  });

  it("degrades on a provider rejection or 5xx", async () => {
    const check = vi.fn(async () => {
      throw new Error("upstream 500");
    });
    await expect(
      verifyBotAttestation(new Request("http://localhost"), baseConfig, check),
    ).resolves.toMatchObject({ status: "failure" });
  });

  it("times out provider verification", async () => {
    const check = vi.fn(() => new Promise<never>(() => undefined));
    await expect(
      verifyBotAttestation(
        new Request("http://localhost"),
        { ...baseConfig, providerTimeoutMs: 10 },
        check,
      ),
    ).resolves.toMatchObject({ status: "failure" });
  });
});

describe("production configuration", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env = { ...originalEnv };
  });

  it("fails loudly when the production HMAC secret is missing", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.VERCEL = "1";
    process.env.FORM_SECURITY_HASH_SECRET = "";
    process.env.UPSTASH_REDIS_REST_URL = "https://example.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "token";
    expect(() => getFormSecurityConfig()).toThrow(/FORM_SECURITY_HASH_SECRET/);
  });

  it("fails loudly when production Redis configuration is missing", () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.VERCEL = "1";
    process.env.FORM_SECURITY_HASH_SECRET = "x".repeat(32);
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    expect(() => getFormSecurityConfig()).toThrow(/Upstash Redis/);
  });
});
