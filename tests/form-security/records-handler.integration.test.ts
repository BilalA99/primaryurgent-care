import { describe, expect, it, vi } from "vitest";

import type { FormSecurityConfig } from "@/lib/form-security/config";
import {
  processFormSubmission,
  type FormHandlerDependencies,
} from "@/lib/form-security/handler";
import {
  recordsRequestSchema,
  type RecordsRequest,
} from "@/lib/form-security/schemas";
import type { ProviderResult } from "@/lib/form-security/provider";

const config: FormSecurityConfig = {
  isProduction: false,
  enabled: true,
  mode: "enforce",
  provider: "vercel-botid",
  rateLimitEnabled: true,
  duplicateProtectionEnabled: true,
  hashSecret: "r".repeat(32),
  allowedOrigins: new Set(["https://primaryuc.com"]),
  providerTimeoutMs: 1500,
};

const pdf = Buffer.from("%PDF-test authorization");
const validBody = {
  lawFirm: "Test Law",
  email: "attorney@example.test",
  phone: "5613552651",
  patientFullName: "Test Patient",
  postalCode: "33411",
  dob: "1990-01-01",
  dos: "2026-08-01",
  records: ["Visit Summary"],
  files: [
    {
      name: "authorization.pdf",
      type: "application/pdf",
      size: pdf.length,
      content: pdf.toString("base64"),
    },
  ],
  confirm: true,
  formSource: "attorney-records",
  companyWebsite: "",
  attribution: { gclid: "records-gclid" },
};

function request(
  body: unknown = validBody,
  headers: Record<string, string> = {},
) {
  return new Request("https://primaryuc.com/api/forms/records", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://primaryuc.com",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function dependencies(
  deliver = vi.fn(async (recordsRequest: RecordsRequest) => {
    void recordsRequest;
  }),
) {
  const result: FormHandlerDependencies<RecordsRequest> = {
    getConfig: () => config,
    verify: vi.fn(async (): Promise<ProviderResult> => ({
      status: "human",
      latencyMs: 1,
    })),
    checkIp: vi.fn(async () => ({
      allowed: true,
      available: true,
      retryAfter: 1,
    })),
    checkIdentifier: vi.fn(async () => ({
      allowed: true,
      available: true,
      retryAfter: 1,
    })),
    reserve: vi.fn(async () => ({ duplicate: false, available: true })),
    complete: vi.fn(async () => undefined),
    release: vi.fn(async () => undefined),
    deliver,
    log: vi.fn(),
  };
  return result;
}

function submit(
  formRequest: Request,
  deps: FormHandlerDependencies<RecordsRequest>,
) {
  return processFormSubmission(formRequest, {
    endpoint: "/api/forms/records",
    maximumBytes: 7 * 1024 * 1024,
    schema: recordsRequestSchema,
    duplicateParts: (recordsRequest) => ({
      additionalParts: [
        recordsRequest.patientFullName,
        recordsRequest.dob,
        recordsRequest.dos,
        recordsRequest.records.join("|"),
      ],
    }),
    dependencies: deps,
  });
}

describe("protected attorney records handler", () => {
  it("delivers a valid request once with attribution intact", async () => {
    const deliver = vi.fn(async (recordsRequest: RecordsRequest) => {
      void recordsRequest;
    });
    const deps = dependencies(deliver);
    expect((await submit(request(), deps)).status).toBe(200);
    expect(deliver).toHaveBeenCalledOnce();
    expect(deliver.mock.calls[0]?.[0]?.attribution.gclid).toBe("records-gclid");
  });

  it("blocks the honeypot before BotID and delivery", async () => {
    const deps = dependencies();
    expect(
      (
        await submit(
          request({ ...validBody, companyWebsite: "spam.example" }),
          deps,
        )
      ).status,
    ).toBe(403);
    expect(deps.verify).not.toHaveBeenCalled();
    expect(deps.deliver).not.toHaveBeenCalled();
  });

  it("rejects an oversized payload before delivery", async () => {
    const deps = dependencies();
    expect(
      (
        await submit(
          request(validBody, { "content-length": String(7 * 1024 * 1024 + 1) }),
          deps,
        )
      ).status,
    ).toBe(413);
    expect(deps.deliver).not.toHaveBeenCalled();
  });

  it("rejects an invalid file type before BotID and delivery", async () => {
    const deps = dependencies();
    const body = {
      ...validBody,
      files: [{ ...validBody.files[0], type: "application/x-msdownload" }],
    };
    expect((await submit(request(body), deps)).status).toBe(400);
    expect(deps.verify).not.toHaveBeenCalled();
    expect(deps.deliver).not.toHaveBeenCalled();
  });
});
