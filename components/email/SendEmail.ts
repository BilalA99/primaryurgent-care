import "server-only";

import { Resend } from "resend";

import type {
  AppointmentLead,
  RecordsRequest,
} from "@/lib/form-security/schemas";
import { getValidatedPhoneNumber } from "@/lib/validation/phone";
import { supabase } from "@/utils/supabase/server";

import { ContactEmailTemplate } from "./ContactEmailTemplate";
import { LawyerRecordsEmailTemplate } from "./LawyerRecordsEmailTemplate";
import { LawyerRecordsThankYouEmailTemplate } from "./LawyerRecordsThankYouEmailTemplate";
import { UserEmailTemplate } from "./UserEmailTemplate";

const resend = new Resend(process.env.RESEND_KEY);
const PRIMARY_UC_LEAD_RECIPIENTS = [
  "support@primaryuc.com",
  "urgentroyal@gmail.com",
];

async function logLeadToSupabase(data: {
  patient_name?: string;
  patient_email?: string;
  patient_phone?: string;
  reason?: string;
  accident_type?: string;
  postal_code?: string;
  form_source?: string;
  attorney_firm?: string;
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}): Promise<void> {
  try {
    const { error } = await supabase.from("forms").insert({
      patient_name: data.patient_name || null,
      patient_email: data.patient_email || null,
      patient_phone: data.patient_phone || null,
      reason: data.reason || null,
      accident_type: data.accident_type || null,
      postal_code: data.postal_code || null,
      form_source: data.form_source || null,
      attorney_firm: data.attorney_firm || null,
      gclid: data.gclid || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      utm_term: data.utm_term || null,
      utm_content: data.utm_content || null,
      state: "FL",
      email_sent: true,
    });
    if (error) console.error("[form_delivery] Tracker write failed");
  } catch {
    console.error("[form_delivery] Tracker write failed");
  }
}

function preferredTimeReason(lead: AppointmentLead): string {
  if (lead.message) return lead.message;
  return lead.preferredTime ? `Preferred time: ${lead.preferredTime}` : "";
}

async function assertEmailSent(result: { error: unknown }): Promise<void> {
  if (result.error) throw new Error("Email provider rejected the request");
}

export async function deliverAppointmentLead(
  lead: AppointmentLead,
): Promise<void> {
  const phone = getValidatedPhoneNumber(lead.phone);
  const reason = preferredTimeReason(lead);

  const internalResult = await resend.emails.send({
    from: "Primary & Urgent Care Centers <support@primaryuc.com>",
    to: PRIMARY_UC_LEAD_RECIPIENTS,
    subject: "New Contact Form Submission",
    react: await ContactEmailTemplate({
      name: lead.fullName,
      email: lead.email || "noreply@unknown.com",
      phone,
      reason,
      accidentType: lead.accidentType,
    }),
  });
  await assertEmailSent(internalResult);

  if (lead.email) {
    const confirmationResult = await resend.emails.send({
      from: "Primary & Urgent Care Centers <support@primaryuc.com>",
      to: [lead.email],
      subject: "Thank you for contacting Primary & Urgent Care Centers",
      react: await UserEmailTemplate({
        name: lead.fullName,
        email: lead.email,
        phone,
      }),
    });
    await assertEmailSent(confirmationResult);
  }

  await logLeadToSupabase({
    patient_name: lead.fullName,
    patient_email: lead.email,
    patient_phone: phone,
    reason,
    accident_type: lead.accidentType,
    postal_code: lead.postalCode,
    form_source: lead.formSource,
    gclid: lead.attribution.gclid,
    utm_source: lead.attribution.utm_source,
    utm_medium: lead.attribution.utm_medium,
    utm_campaign: lead.attribution.utm_campaign,
    utm_term: lead.attribution.utm_term,
    utm_content: lead.attribution.utm_content,
  });
}

export async function deliverRecordsRequest(
  request: RecordsRequest,
): Promise<void> {
  const phone = getValidatedPhoneNumber(request.phone);
  const internalResult = await resend.emails.send({
    from: "Primary & Urgent Care Centers <support@primaryuc.com>",
    to: PRIMARY_UC_LEAD_RECIPIENTS,
    subject: "New Medical Records Request from Attorney",
    react: await LawyerRecordsEmailTemplate({
      lawFirm: request.lawFirm,
      email: request.email,
      phone,
      patientName: request.patientFullName,
      dob: request.dob,
      dos: request.dos,
      records: request.records.join(", "),
      files: request.files.map((file) => ({
        file: new File([Buffer.from(file.content, "base64")], file.name, {
          type: file.type,
        }),
        content: file.content,
      })),
    }),
    attachments: request.files.map((file) => ({
      filename: file.name,
      content: file.content,
      type: file.type,
    })),
  });
  await assertEmailSent(internalResult);

  const confirmationResult = await resend.emails.send({
    from: "Primary & Urgent Care Centers <support@primaryuc.com>",
    to: [request.email],
    subject: "Thank You for Your Medical Records Request",
    react: await LawyerRecordsThankYouEmailTemplate({
      lawFirm: request.lawFirm,
      email: request.email,
      patientName: request.patientFullName,
    }),
  });
  await assertEmailSent(confirmationResult);

  await logLeadToSupabase({
    patient_name: request.patientFullName,
    patient_email: request.email,
    patient_phone: phone,
    attorney_firm: request.lawFirm,
    postal_code: request.postalCode,
    form_source: request.formSource,
    gclid: request.attribution.gclid,
    utm_source: request.attribution.utm_source,
    utm_medium: request.attribution.utm_medium,
    utm_campaign: request.attribution.utm_campaign,
    utm_term: request.attribution.utm_term,
    utm_content: request.attribution.utm_content,
  });
}
