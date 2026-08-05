import "server-only";

import type { SecurityEvent } from "./types";

export function logFormSecurityEvent(event: SecurityEvent): void {
  const safeEvent = {
    event: "form_security_decision",
    timestamp: new Date().toISOString(),
    request_id: event.requestId,
    form_source: event.formSource,
    endpoint: event.endpoint,
    decision: event.decision,
    verification_provider: event.provider,
    provider_result: event.providerResult,
    rate_limit_bucket: event.rateLimitBucket,
    duplicate: event.duplicate,
    deployment_environment:
      process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown",
    response_status: event.responseStatus,
    verification_latency_ms: event.verificationLatencyMs,
    accepted: event.accepted,
  };
  console.info(JSON.stringify(safeEvent));
}
