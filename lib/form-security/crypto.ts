import "server-only";

import { createHmac } from "node:crypto";

export function hashIdentifier(
  secret: string,
  namespace: string,
  value: string,
): string {
  return createHmac("sha256", secret)
    .update(`${namespace}\0${value.trim().toLowerCase()}`)
    .digest("hex");
}

export function createDuplicateFingerprint(
  secret: string,
  data: {
    email?: string;
    phone: string;
    formSource: string;
    accidentType?: string;
    message?: string;
    additionalParts?: string[];
  },
): string {
  const canonical = [
    data.email?.trim().toLowerCase() || "",
    data.phone.replace(/\D/g, ""),
    data.formSource.trim().toLowerCase(),
    data.accidentType?.trim().toLowerCase() || "",
    data.message?.trim().replace(/\s+/g, " ").toLowerCase() || "",
    ...(data.additionalParts || []).map((part) =>
      part.trim().replace(/\s+/g, " ").toLowerCase(),
    ),
  ].join("\0");
  return hashIdentifier(secret, "duplicate", canonical);
}
