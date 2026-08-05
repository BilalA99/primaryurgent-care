import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createDuplicateFingerprint,
  hashIdentifier,
} from "@/lib/form-security/crypto";
import { logFormSecurityEvent } from "@/lib/form-security/logger";

describe("privacy-safe identifiers and logging", () => {
  afterEach(() => vi.restoreAllMocks());

  it("does not expose raw personal data in HMAC keys", () => {
    const secret = "s".repeat(32);
    const email = "patient@example.com";
    const phone = "5613552651";
    const emailHash = hashIdentifier(secret, "email", email);
    const phoneHash = hashIdentifier(secret, "phone", phone);
    expect(emailHash).toMatch(/^[a-f0-9]{64}$/);
    expect(emailHash).not.toContain(email);
    expect(phoneHash).not.toContain(phone);
  });

  it("produces the same exact-duplicate fingerprint and changes for a legitimate repeat", () => {
    const secret = "s".repeat(32);
    const base = {
      email: "patient@example.com",
      phone: "5613552651",
      formSource: "book-appointment",
      accidentType: "Car Accident",
      message: "Morning visit",
    };
    expect(createDuplicateFingerprint(secret, base)).toBe(
      createDuplicateFingerprint(secret, base),
    );
    expect(createDuplicateFingerprint(secret, base)).not.toBe(
      createDuplicateFingerprint(secret, {
        ...base,
        message: "Afternoon visit",
      }),
    );
  });

  it("logs only approved security metadata", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
    logFormSecurityEvent({
      requestId: "request-1",
      formSource: "book-appointment",
      endpoint: "/api/forms/submit",
      decision: "allowed",
      provider: "vercel-botid",
      providerResult: "human",
      responseStatus: 200,
      accepted: true,
    });
    const serialized = String(info.mock.calls[0]?.[0]);
    expect(serialized).toContain("request-1");
    expect(serialized).not.toContain("patient@example.com");
    expect(serialized).not.toContain("5613552651");
    expect(serialized).not.toContain("symptom");
  });
});
