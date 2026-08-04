import { describe, expect, it } from "vitest";

import {
  appointmentLeadSchema,
  recordsRequestSchema,
} from "@/lib/form-security/schemas";

const validLead = {
  fullName: "Ada Lovelace",
  email: "ADA@example.com",
  phone: "(561) 355-2651",
  postalCode: "",
  accidentType: "Car Accident",
  message: "",
  preferredTime: "",
  formSource: "book-appointment",
  companyWebsite: "",
  attribution: { gclid: "test-gclid", utm_source: "google" },
};

describe("appointmentLeadSchema", () => {
  it("normalizes a valid patient payload", () => {
    const parsed = appointmentLeadSchema.parse(validLead);
    expect(parsed).toMatchObject({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      phone: "5613552651",
    });
    expect(parsed.attribution.gclid).toBe("test-gclid");
  });

  it.each(["Élodie-Marie O’Neil", "D'Arcy", "Madonna", "李 雷"])(
    "accepts a legitimate name: %s",
    (fullName) => {
      expect(
        appointmentLeadSchema.safeParse({ ...validLead, fullName }).success,
      ).toBe(true);
    },
  );

  it("rejects an invalid email", () => {
    expect(
      appointmentLeadSchema.safeParse({ ...validLead, email: "not-an-email" })
        .success,
    ).toBe(false);
  });

  it("rejects an extremely long phone input", () => {
    expect(
      appointmentLeadSchema.safeParse({ ...validLead, phone: "5".repeat(1000) })
        .success,
    ).toBe(false);
  });

  it("rejects an extremely long message", () => {
    expect(
      appointmentLeadSchema.safeParse({
        ...validLead,
        message: "x".repeat(2001),
      }).success,
    ).toBe(false);
  });

  it("rejects an unknown accident type", () => {
    expect(
      appointmentLeadSchema.safeParse({
        ...validLead,
        accidentType: "spaceship",
      }).success,
    ).toBe(false);
  });

  it("rejects unknown fields", () => {
    expect(
      appointmentLeadSchema.safeParse({ ...validLead, admin: true }).success,
    ).toBe(false);
  });

  it("allows optional ZIP, message, and attribution to be blank", () => {
    expect(
      appointmentLeadSchema.safeParse({
        ...validLead,
        postalCode: "",
        message: "",
        attribution: {},
      }).success,
    ).toBe(true);
  });

  it("validates a supplied ZIP code without making it required", () => {
    expect(
      appointmentLeadSchema.safeParse({ ...validLead, postalCode: "33411" })
        .success,
    ).toBe(true);
    expect(
      appointmentLeadSchema.safeParse({ ...validLead, postalCode: "not-a-zip" })
        .success,
    ).toBe(false);
  });
});

const validPdf = Buffer.from("%PDF-test authorization");
const validRecordsRequest = {
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
      size: validPdf.length,
      content: validPdf.toString("base64"),
    },
  ],
  confirm: true,
  formSource: "attorney-records",
  companyWebsite: "",
  attribution: {},
};

describe("recordsRequestSchema", () => {
  it("accepts a valid attorney records request", () => {
    expect(recordsRequestSchema.safeParse(validRecordsRequest).success).toBe(
      true,
    );
  });

  it("rejects too many files", () => {
    const files = Array.from({ length: 11 }, (_, index) => ({
      ...validRecordsRequest.files[0],
      name: `authorization-${index}.pdf`,
    }));
    expect(
      recordsRequestSchema.safeParse({ ...validRecordsRequest, files }).success,
    ).toBe(false);
  });

  it("rejects an invalid declared MIME type", () => {
    expect(
      recordsRequestSchema.safeParse({
        ...validRecordsRequest,
        files: [
          {
            ...validRecordsRequest.files[0],
            type: "application/x-msdownload",
          },
        ],
      }).success,
    ).toBe(false);
  });

  it("rejects content whose signature does not match the declared MIME type", () => {
    const disguisedExecutable = Buffer.from("MZ-not-a-pdf");
    expect(
      recordsRequestSchema.safeParse({
        ...validRecordsRequest,
        files: [
          {
            ...validRecordsRequest.files[0],
            size: disguisedExecutable.length,
            content: disguisedExecutable.toString("base64"),
          },
        ],
      }).success,
    ).toBe(false);
  });

  it("rejects mismatched decoded file size", () => {
    expect(
      recordsRequestSchema.safeParse({
        ...validRecordsRequest,
        files: [{ ...validRecordsRequest.files[0], size: 1 }],
      }).success,
    ).toBe(false);
  });
});
