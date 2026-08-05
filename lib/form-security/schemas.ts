import { z } from "zod";

import {
  isValidUSPhoneNumber,
  normalizePhoneNumber,
} from "@/lib/validation/phone";

const cleanText = (maximum: number) =>
  z
    .string()
    .max(maximum)
    .transform((value) => value.trim().replace(/\s+/g, " "));
const optionalText = (maximum: number) =>
  cleanText(maximum).optional().default("");
const optionalPostalCode = optionalText(20).refine(
  (value) => !value || /^\d{5}(?:-\d{4})?$/.test(value),
  "Invalid ZIP code",
);
const email = z
  .string()
  .trim()
  .max(254)
  .email()
  .transform((value) => value.toLowerCase());
const phone = z
  .string()
  .trim()
  .max(40)
  .refine(isValidUSPhoneNumber, "Invalid phone number")
  .transform(normalizePhoneNumber);

const attributionSchema = z
  .object({
    gclid: optionalText(256),
    gbraid: optionalText(256),
    wbraid: optionalText(256),
    utm_source: optionalText(128),
    utm_medium: optionalText(128),
    utm_campaign: optionalText(256),
    utm_adgroup: optionalText(256),
    utm_keyword: optionalText(256),
    utm_term: optionalText(256),
    utm_content: optionalText(256),
    landing_page_url: optionalText(2048),
    referrer: optionalText(2048),
    device: optionalText(32),
  })
  .strict()
  .default({});

export const accidentTypes = [
  "",
  "Workplace Accident",
  "Car Accident",
  "Personal Injury",
  "Truck Accident",
  "Motorcycle Accident",
  "Slip and Fall",
  "Pedestrian Accident",
  "No Accident",
  "Other",
  "car-accident",
] as const;

export const appointmentLeadSchema = z
  .object({
    fullName: cleanText(120).pipe(z.string().min(1)),
    email: z.union([email, z.literal("")]).default(""),
    phone,
    postalCode: optionalPostalCode,
    accidentType: z.enum(accidentTypes).default(""),
    message: optionalText(2000),
    preferredTime: z
      .enum([
        "",
        "asap",
        "this-week",
        "weekend",
        "morning",
        "afternoon",
        "evening",
      ])
      .default(""),
    formSource: z.enum(["book-appointment", "compact-accident"]),
    companyWebsite: z.string().max(256).optional().default(""),
    attribution: attributionSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.formSource === "book-appointment" && !value.email) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["email"],
        message: "Email is required",
      });
    }
  });

export const recordTypes = [
  "all",
  "Visit Summary",
  "Lab Results",
  "Imaging Reports",
  "Billing Records",
] as const;

const recordFileSchema = z
  .object({
    name: cleanText(180).pipe(z.string().min(1)),
    type: z.enum([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ]),
    size: z
      .number()
      .int()
      .positive()
      .max(5 * 1024 * 1024),
    content: z
      .string()
      .min(1)
      .max(7_000_000)
      .regex(/^[A-Za-z0-9+/]*={0,2}$/, "Invalid file encoding"),
  })
  .strict();

function hasExpectedFileSignature(
  file: z.infer<typeof recordFileSchema>,
): boolean {
  const bytes = Buffer.from(file.content, "base64");
  if (file.type === "application/pdf") {
    return bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  }
  if (file.type === "application/msword") {
    return bytes
      .subarray(0, 8)
      .equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  }
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return bytes.subarray(0, 4).equals(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  }
  if (file.type === "image/jpeg") {
    return (
      bytes.length >= 3 &&
      bytes[0] === 0xff &&
      bytes[1] === 0xd8 &&
      bytes[2] === 0xff
    );
  }
  if (file.type === "image/png") {
    return bytes
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  return false;
}

export const recordsRequestSchema = z
  .object({
    lawFirm: cleanText(160).pipe(z.string().min(1)),
    email,
    phone,
    patientFullName: cleanText(120).pipe(z.string().min(1)),
    postalCode: optionalPostalCode,
    dob: z
      .string()
      .max(10)
      .regex(/^\d{4}-\d{2}-\d{2}$/),
    dos: z
      .string()
      .max(10)
      .regex(/^\d{4}-\d{2}-\d{2}$/),
    records: z.array(z.enum(recordTypes)).min(1).max(recordTypes.length),
    files: z.array(recordFileSchema).min(1).max(10),
    confirm: z.literal(true),
    formSource: z.literal("attorney-records"),
    companyWebsite: z.string().max(256).optional().default(""),
    attribution: attributionSchema,
  })
  .strict()
  .superRefine((value, context) => {
    const totalBytes = value.files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > 5 * 1024 * 1024) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["files"],
        message: "Uploaded files exceed the total size limit",
      });
    }

    for (const [index, file] of value.files.entries()) {
      const decodedBytes = Buffer.byteLength(file.content, "base64");
      if (decodedBytes !== file.size) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["files", index, "content"],
          message: "Uploaded file size does not match its content",
        });
      }
      if (!hasExpectedFileSignature(file)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["files", index, "content"],
          message: "Uploaded file content does not match its declared type",
        });
      }
    }
  });

export type AppointmentLead = z.infer<typeof appointmentLeadSchema>;
export type RecordsRequest = z.infer<typeof recordsRequestSchema>;
