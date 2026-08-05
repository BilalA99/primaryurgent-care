import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
  insert: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));
vi.mock("@/utils/supabase/server", () => ({
  supabase: { from: () => ({ insert: mocks.insert }) },
}));
vi.mock("@/components/email/ContactEmailTemplate", () => ({
  ContactEmailTemplate: vi.fn(async () => null),
}));
vi.mock("@/components/email/UserEmailTemplate", () => ({
  UserEmailTemplate: vi.fn(async () => null),
}));
vi.mock("@/components/email/LawyerRecordsEmailTemplate", () => ({
  LawyerRecordsEmailTemplate: vi.fn(async () => null),
}));
vi.mock("@/components/email/LawyerRecordsThankYouEmailTemplate", () => ({
  LawyerRecordsThankYouEmailTemplate: vi.fn(async () => null),
}));

import {
  deliverAppointmentLead,
  deliverRecordsRequest,
} from "@/components/email/SendEmail";
import {
  appointmentLeadSchema,
  recordsRequestSchema,
} from "@/lib/form-security/schemas";

describe("accepted lead delivery", () => {
  beforeEach(() => {
    mocks.send
      .mockReset()
      .mockResolvedValue({ data: { id: "email-id" }, error: null });
    mocks.insert.mockReset().mockResolvedValue({ error: null });
  });

  it("sends both appointment emails to the intended recipients and writes one tracker row", async () => {
    const lead = appointmentLeadSchema.parse({
      fullName: "Test Patient",
      email: "patient@example.test",
      phone: "(561) 355-2651",
      postalCode: "33411",
      accidentType: "Car Accident",
      message: "Please call me",
      formSource: "book-appointment",
      companyWebsite: "",
      attribution: { gclid: "gclid-test", utm_source: "google" },
    });
    await deliverAppointmentLead(lead);
    expect(mocks.send).toHaveBeenCalledTimes(2);
    expect(mocks.send.mock.calls[0]?.[0].to).toEqual([
      "support@primaryuc.com",
      "urgentroyal@gmail.com",
    ]);
    expect(mocks.send.mock.calls[1]?.[0].to).toEqual(["patient@example.test"]);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.insert.mock.calls[0]?.[0]).toMatchObject({
      form_source: "book-appointment",
      gclid: "gclid-test",
      utm_source: "google",
    });
  });

  it("logs a compact lead once without inventing a patient confirmation email", async () => {
    const lead = appointmentLeadSchema.parse({
      fullName: "Test Patient",
      email: "",
      phone: "(561) 355-2651",
      postalCode: "",
      accidentType: "car-accident",
      preferredTime: "asap",
      formSource: "compact-accident",
      companyWebsite: "",
      attribution: {},
    });
    await deliverAppointmentLead(lead);
    expect(mocks.send).toHaveBeenCalledTimes(1);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.insert.mock.calls[0]?.[0].form_source).toBe(
      "compact-accident",
    );
  });

  it("sends attorney and confirmation emails once and writes one tracker row", async () => {
    const pdf = Buffer.from("%PDF-test");
    const content = pdf.toString("base64");
    const recordsRequest = recordsRequestSchema.parse({
      lawFirm: "Test Law",
      email: "attorney@example.test",
      phone: "(561) 355-2651",
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
          content,
        },
      ],
      confirm: true,
      formSource: "attorney-records",
      companyWebsite: "",
      attribution: { utm_campaign: "legal" },
    });
    await deliverRecordsRequest(recordsRequest);
    expect(mocks.send).toHaveBeenCalledTimes(2);
    expect(mocks.send.mock.calls[0]?.[0].to).toEqual([
      "support@primaryuc.com",
      "urgentroyal@gmail.com",
    ]);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.insert.mock.calls[0]?.[0]).toMatchObject({
      form_source: "attorney-records",
      utm_campaign: "legal",
    });
  });
});
