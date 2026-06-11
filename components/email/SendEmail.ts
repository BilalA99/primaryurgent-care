'use server';
import { UserEmailTemplate } from "./UserEmailTemplate";
import { ContactEmailTemplate } from "./ContactEmailTemplate";
import { Resend } from 'resend';
import { LawyerRecordsEmailTemplate } from "./LawyerRecordsEmailTemplate";
import { LawyerRecordsThankYouEmailTemplate } from "./LawyerRecordsThankYouEmailTemplate";
import { supabase } from '@/utils/supabase/server';
import { getValidatedPhoneNumber } from '@/lib/validation/phone';

const resend = new Resend(process.env.RESEND_KEY);

async function logLeadToSupabase(data: {
  patient_name?:   string;
  patient_email?:  string;
  patient_phone?:  string;
  reason?:         string;
  accident_type?:  string;
  postal_code?:    string;
  form_source?:    string;
  attorney_firm?:  string;
  gclid?:          string;
  utm_source?:     string;
  utm_medium?:     string;
  utm_campaign?:   string;
  utm_term?:       string;
  utm_content?:    string;
}): Promise<void> {
  try {
    const { error } = await supabase.from('forms').insert({
      patient_name:  data.patient_name  || null,
      patient_email: data.patient_email || null,
      patient_phone: data.patient_phone || null,
      reason:        data.reason        || null,
      accident_type: data.accident_type || null,
      postal_code:   data.postal_code   || null,
      form_source:   data.form_source   || null,
      attorney_firm: data.attorney_firm || null,
      gclid:         data.gclid         || null,
      utm_source:    data.utm_source    || null,
      utm_medium:    data.utm_medium    || null,
      utm_campaign:  data.utm_campaign  || null,
      utm_term:      data.utm_term      || null,
      utm_content:   data.utm_content   || null,
      state:         'FL',
      email_sent:    true,
    });
    if (error) {
      console.error('[logLeadToSupabase] Supabase insert error:', error.message, error.details);
    }
  } catch (err) {
    console.error('[logLeadToSupabase] Unexpected error:', err);
  }
}

export async function sendUserEmail(formData: {
  name:          string;
  email:         string;
  phone:         string;
  reason?:       string;
  accidentType?: string;
  postalCode?:   string;
  gclid?:        string;
  utm_source?:   string;
  utm_medium?:   string;
  utm_campaign?: string;
  utm_term?:     string;
  utm_content?:  string;
}) {
  try {
    const normalizedPhone = getValidatedPhoneNumber(formData.phone);
    const data = await resend.emails.send({
      from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
      to: [formData.email],
      subject: 'Thank you for contacting Primary & Urgent Care Centers',
      react: await UserEmailTemplate({ name: formData.name, email: formData.email, phone: normalizedPhone }),
    });
    await logLeadToSupabase({
      patient_name:  formData.name,
      patient_email: formData.email,
      patient_phone: normalizedPhone,
      reason:        formData.reason,
      accident_type: formData.accidentType,
      postal_code:   formData.postalCode,
      form_source:   'book-appointment',
      gclid:         formData.gclid,
      utm_source:    formData.utm_source,
      utm_medium:    formData.utm_medium,
      utm_campaign:  formData.utm_campaign,
      utm_term:      formData.utm_term,
      utm_content:   formData.utm_content,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}

export async function sendContactEmail(formData: { name: string, email: string, phone: string, reason: string, accidentType: string }) {
  try {
    const normalizedPhone = getValidatedPhoneNumber(formData.phone);
    const data = await resend.emails.send({
      from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
      to: ['support@primaryuc.com'],
      subject: 'New Contact Form Submission',
      react: await ContactEmailTemplate({ name: formData.name, email: formData.email, phone: normalizedPhone, reason: formData.reason, accidentType: formData.accidentType }),
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}

export async function sendLawyerRecordsEmail(formData: {
  lawFirm: string;
  email: string;
  phone: string;
  patientName: string;
  dob: string;
  dos: string;
  records: string;
  files: { file: File; content: string }[];
}) {
  try {
    const normalizedPhone = getValidatedPhoneNumber(formData.phone);
    const data = await resend.emails.send({
      from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
      to: ['support@primaryuc.com'],
      subject: 'New Medical Records Request from Attorney',
      react: await LawyerRecordsEmailTemplate({ lawFirm: formData.lawFirm, email: formData.email, phone: normalizedPhone, patientName: formData.patientName, dob: formData.dob, dos: formData.dos, records: formData.records, files: formData.files }),
      attachments: formData.files.map(file => ({
        filename: file.file.name,
        content: file.content,
        type: file.file.type
      }))
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}

export async function sendLawyerRecordsThankYouEmail(formData: {
  lawFirm:       string;
  email:         string;
  patientName:   string;
  phone:         string;
  gclid?:        string;
  utm_source?:   string;
  utm_medium?:   string;
  utm_campaign?: string;
  utm_term?:     string;
  utm_content?:  string;
}) {
  try {
    const normalizedPhone = getValidatedPhoneNumber(formData.phone);
    const data = await resend.emails.send({
      from: 'Primary & Urgent Care Centers <support@primaryuc.com>',
      to: [formData.email],
      subject: 'Thank You for Your Medical Records Request',
      react: await LawyerRecordsThankYouEmailTemplate({ lawFirm: formData.lawFirm, email: formData.email, patientName: formData.patientName }),
    });
    await logLeadToSupabase({
      patient_name:  formData.patientName,
      patient_email: formData.email,
      patient_phone: normalizedPhone,
      attorney_firm: formData.lawFirm,
      form_source:   'attorney-records',
      gclid:         formData.gclid,
      utm_source:    formData.utm_source,
      utm_medium:    formData.utm_medium,
      utm_campaign:  formData.utm_campaign,
      utm_term:      formData.utm_term,
      utm_content:   formData.utm_content,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send email');
  }
}
