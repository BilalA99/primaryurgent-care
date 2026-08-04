# PrimaryUC Form Bot Protection — Audit and Implementation Report

**Prepared:** August 3, 2026  
**Application:** PrimaryUC Next.js website  
**Production origin:** https://primaryuc.com  
**Selected provider:** Vercel BotID, Basic check level  
**Implementation status:** Complete in the working tree; production activation requires the deployment checklist below.

## 1. Executive summary

PrimaryUC's three real form implementations and every page that reuses them now submit through two protected, server-side endpoints:

- Appointment and accident leads: `POST /api/forms/submit`
- Attorney medical-record requests: `POST /api/forms/records`

The old client-callable Server Action path was removed. A rejected request cannot send an internal email, send a confirmation email, insert the Supabase form-tracker row, or fire client-side lead analytics.

Protection is layered:

1. Vercel BotID attestation, enforced on the server.
2. Exact-origin validation.
3. Invisible honeypot.
4. Strict JSON, schema, field, file, and payload-size validation.
5. Trusted Vercel client-IP extraction.
6. Upstash Redis sliding-window limits by HMAC-hashed IP, email, and phone.
7. Ten-minute duplicate/idempotency reservation.
8. Privacy-safe structured decisions and generic attacker-facing errors.

This should materially reduce direct scripted submissions, browser automation detected by BotID, rapid bursts, identifier abuse, and accidental double submissions. No defensible percentage reduction can be predicted without a production baseline. Sophisticated human-operated or high-quality residential automation remains a residual risk, so production decision metrics must be reviewed after rollout.

The implementation adds no visible CAPTCHA and does not send form fields, medical details, email addresses, phone numbers, or IP addresses to the bot-classification provider. Users retain their form values on a recoverable error and receive a keyboard-focusable inline retry message with the clinic phone number.

## 2. Form and submission-path audit

### 2.1 Actual form implementations

| Form implementation | Where it appears | Protected endpoint | Downstream effects after acceptance |
|---|---|---|---|
| `components/ui/BookAppointmentForm.tsx` | Global booking section, booking popup, appointment page, homepage desktop/mobile flow, location and service pages | `/api/forms/submit` | Internal lead email, optional patient confirmation, one Supabase tracker insert, then consent-gated analytics |
| `components/accident/CompactAccidentForm.tsx` | Accident hub, dynamic `/car-accident/[city]` pages, and accident topic pages | `/api/forms/submit` | Internal lead email and one Supabase tracker insert; analytics only after server acceptance |
| `components/ui/LawyerRecordsForm.tsx` | `/lawyers` | `/api/forms/records` | Internal records email with validated authorization attachments, requester confirmation, one Supabase tracker insert, then consent-gated analytics |

The small homepage appointment UI is a prefill/opening step, not a separate delivery path; final submission occurs through `BookAppointmentForm`.

### 2.2 Previous weaknesses

- Client components imported public Server Actions directly, creating an alternate unprotected delivery route.
- There was no server-side bot attestation on any lead path.
- There was no durable IP, email, or phone rate limit.
- There was no idempotency lock, so double-clicks and retries could repeat email and database effects.
- The compact accident form fired lead analytics before the server accepted the lead.
- Server validation did not form one consistent trust boundary across all forms.
- Payload and attachment limits were not enforced in a shared request pipeline.
- Rejection logging was not structured for operational monitoring.
- The committed example environment file contained credential-like Supabase values. It now contains placeholders, but any real value previously committed remains in Git history.
- The current production response includes `Access-Control-Allow-Origin: *` from infrastructure outside this repository. The form endpoints emit an exact origin, but the external/global wildcard must be removed or verified in Vercel.

### 2.3 Current request flow

```text
Browser form
  -> BotID-instrumented fetch
  -> protected POST route
  -> content type and byte limit
  -> schema normalization
  -> exact origin
  -> honeypot
  -> hashed IP rate limits
  -> server BotID verdict
  -> hashed email/phone rate limits
  -> duplicate reservation
  -> email + tracker delivery
  -> duplicate completion
  -> success response
  -> client analytics and redirect
```

Every rejection before delivery has zero lead-delivery side effects.

## 3. Provider selection

Vercel BotID was selected because the live application is deployed on Vercel, the project uses Next.js 15, and BotID has first-party client and server integration for protected fetch requests. It is configured in:

- `instrumentation-client.ts` with `initBotId`
- `next.config.ts` with `withBotId`
- `lib/form-security/provider.ts` with server-side `checkBotId`

Both sides use the **Basic** check level. The client and server level must remain matched. Native HTML form submission is not used; all protected forms use fetch, which is the supported integration.

Official references:

- [Vercel BotID setup](https://vercel.com/docs/botid/get-started)
- [BotID form submissions](https://vercel.com/docs/botid/form-submissions)
- [BotID local-development behavior](https://vercel.com/docs/botid/local-development-behavior)
- [BotID advanced configuration](https://vercel.com/docs/botid/advanced-configuration)
- [BotID monitoring and product overview](https://vercel.com/docs/botid)

## 4. Implemented controls

### 4.1 Bot verification

- Protects only the two form POST paths.
- A confirmed bot is blocked with HTTP 403 in `enforce` mode.
- A production request missing BotID attestation is blocked as a direct/uninstrumented request.
- Provider calls time out after 1,500 ms by default; the allowed range is 250–5,000 ms.
- If BotID fails but the IP limiter is available, the request can proceed under the remaining strict controls and is logged as `verification_degraded`.
- If BotID and the rate-limit store are both unavailable, the handler fails closed with HTTP 503.
- `observe` mode records bot verdicts while allowing them through the other controls and is the approved emergency rollback mode.

### 4.2 Rate limiting and duplicate control

Upstash Redis stores only keyed, HMAC-derived identifiers:

| Scope | Limit |
|---|---:|
| IP short window | 5 submissions / 10 minutes |
| IP daily window | 20 submissions / 24 hours |
| Email | 3 submissions / 30 minutes |
| Phone | 3 submissions / 30 minutes |
| Duplicate fingerprint | One delivery / 10 minutes |

Duplicate requests return the same generic success shape without repeating delivery. A failed delivery releases its reservation so a legitimate user can retry. The reservation release uses compare-and-delete semantics to avoid deleting another request's lock.

Redis calls use a 500 ms timeout. A normal store outage is fail-open for an otherwise verified request to avoid losing urgent patient leads, but a simultaneous provider outage fails closed.

### 4.3 Validation and abuse containment

- Appointment body limit: 32 KiB.
- Records-request body limit: 7 MiB because authorization files are transported as base64 JSON.
- Authorization documents: approved MIME types only, at most 10 files, and at most 5 MiB total decoded size.
- Names, email, U.S. phone number, dates, postal code, accident type, preferred time, message, record types, attribution, and source are normalized and bounded with Zod.
- Unknown properties are stripped.
- Only `application/json` is accepted; unsupported methods receive the framework's 405 response.
- Production trusts the Vercel `x-forwarded-for` boundary; it does not accept arbitrary client-supplied IP headers as identity.
- Origins are exact matches. Apex and `www` are built in; configured and current-preview origins are optional.
- The honeypot is offscreen, removed from keyboard order and accessibility semantics, and marked to discourage password-manager autofill.
- Error responses are generic and cache-disabled.

### 4.4 Side-effect ordering

Email, tracker insertion, analytics, and redirect occur only after server acceptance:

- Internal lead email and confirmation behavior are preserved.
- The Supabase `forms` tracker remains one insert per accepted lead.
- Compact forms without an email still deliver internally and track exactly once.
- Client analytics and enhanced conversions run only after the protected endpoint returns success.
- Analytics continue to respect the existing consent layer.
- Delivery errors do not log patient data.

There is still no cross-provider transaction spanning Resend and Supabase. If one downstream provider succeeds and a later provider fails, perfect atomic exactly-once delivery cannot be guaranteed. A transactional outbox is the recommended future correction.

### 4.5 Privacy and accessibility

- Logs contain request ID, form source, endpoint, decision, provider result, response status, rate-limit bucket, duplicate flag, and verification latency.
- Logs exclude name, email, phone, IP, message, dates, records requested, and uploaded-document content.
- Redis keys use HMAC-SHA-256 namespaces; raw identifiers are not stored.
- BotID receives request/device signals through the Vercel integration, not the submitted medical or contact fields.
- The privacy policy now discloses invisible form-security checks and states that submitted health/contact fields are not sent to the spam classifier.
- Existing labels, autocomplete behavior, consent language, and required fields are preserved.
- Submission errors use `role="alert"`, receive focus, preserve inputs, and offer a retry/call path.
- Buttons prevent repeated submission while a request is pending.

## 5. Files changed

### Runtime and configuration

- `.gitignore` — ignores browser-test output.
- `env.example` — replaces credential-like values with placeholders and documents all security settings.
- `instrumentation-client.ts` — instruments both protected POST paths with BotID.
- `next.config.ts` — wraps the Next configuration with BotID.
- `package.json` — adds runtime protection dependencies and verification scripts.
- `package-lock.json` — locks BotID, Upstash, test tools, and the safe Next.js 15.5.22 dependency update.
- `.eslintrc.json` — focused changed-code lint configuration.
- `.prettierignore` — formatter exclusions.
- `playwright.config.ts` — desktop/mobile form-browser test configuration.
- `vitest.config.ts` — server unit/integration test configuration.

### Protected endpoints and server security

- `app/api/forms/submit/route.ts` — appointment/accident endpoint.
- `app/api/forms/records/route.ts` — attorney records endpoint.
- `lib/form-security/config.ts` — validated fail-safe configuration.
- `lib/form-security/crypto.ts` — HMAC identifiers and duplicate fingerprints.
- `lib/form-security/handler.ts` — shared enforcement and delivery pipeline.
- `lib/form-security/index.ts` — server-security exports.
- `lib/form-security/logger.ts` — privacy-safe structured events.
- `lib/form-security/provider.ts` — BotID server verification and timeout boundary.
- `lib/form-security/request.ts` — content type, body size, origin, and trusted-IP handling.
- `lib/form-security/schemas.ts` — normalized appointment and records schemas.
- `lib/form-security/store.ts` — Upstash limits and idempotency reservation.
- `lib/form-security/types.ts` — security decision/event types.

### Forms and delivery

- `components/ui/BookAppointmentForm.tsx` — protected fetch, honeypot, accessible retry, success-only analytics.
- `components/accident/CompactAccidentForm.tsx` — protected fetch and corrected analytics ordering.
- `components/ui/LawyerRecordsForm.tsx` — protected file-bearing request, safe base64 conversion, honeypot, retry behavior.
- `components/email/SendEmail.ts` — internal server-only delivery functions; removes public Server Action bypass.
- `app/privacy-policy/page.tsx` — form-security privacy disclosure.

### Tests

- `tests/server-only.ts` — server-only import test shim.
- `tests/browser/forms.spec.ts` — desktop/mobile interaction and accessibility scenarios.
- `tests/form-security/crypto-logger.test.ts` — hashing and no-PII logging.
- `tests/form-security/delivery.test.ts` — exact downstream-effect counts.
- `tests/form-security/handler.integration.test.ts` — full decision-pipeline cases.
- `tests/form-security/provider-config.test.ts` — provider boundary, timeout, and production config failures.
- `tests/form-security/request.test.ts` — origins, content, and IP boundary.
- `tests/form-security/schemas.test.ts` — valid, invalid, normalization, and file-boundary cases.

## 6. Verification results

| Check | Result | Notes |
|---|---|---|
| Production build | **Pass** | Next.js 15.5.22 build completed; both form endpoints present. Existing blog prerender warnings remain. |
| Server unit/integration tests | **Pass** | 6 files, 42 tests passed. |
| Browser tests | **Pass** | 6 passed, 0 failed, 2 intentional viewport-specific skips. Desktop and mobile Chromium. |
| Changed-file lint | **Pass** | 0 errors and 0 warnings in the bot-protection files. |
| Formatting | **Pass** | All scoped files pass Prettier. |
| Changed-file TypeScript scan | **Pass** | No TypeScript errors in the changed bot-protection files. |
| Full repository lint | **Existing failure** | 239 existing problems: 229 errors, 10 warnings across unrelated legacy files. |
| Full repository typecheck | **Existing failure** | Existing generated route-export, location, map, clinic, and component typing errors. |
| Dependency audit | **Partial** | Safe update removed the critical finding and reduced the audit to 5 advisories: 2 low and 3 high. Clearing the remaining Next/PostCSS/Sharp chain requires a breaking Next.js 16.3 update; `nookies` also retains a low no-fix `cookie` advisory. |

Browser testing covered keyboard submit, pending-state double-click prevention, failure/retry with value retention and focusable alert, dynamic-city compact accident submission with optional fields blank, and mobile homepage prefill into the protected full form.

The browser tests intercept the delivery routes to avoid sending real patient emails or inserting real tracker rows. The complete handler and delivery-count behavior are independently exercised in integration tests with provider, Redis, Resend, and Supabase boundaries mocked.

## 7. Production deployment

### 7.1 Vercel project preparation

1. Confirm the deployment is the Vercel project serving `primaryuc.com`.
2. Confirm Vercel BotID is available for the project and that Vercel OIDC/integration support has not been disabled.
3. Keep BotID at **Basic** for the initial rollout because client and server code are both configured for Basic.
4. Do not add a BotID browser secret; the implementation uses the official Vercel integration.
5. Create a dedicated Upstash Redis database in the nearest practical region and obtain its REST URL and token.
6. Remove the project/domain-level `Access-Control-Allow-Origin: *` header. The application endpoints already emit an exact origin. Verify the final production response headers after deployment.

### 7.2 Production environment variables

Set these in **Vercel Production**:

```dotenv
FORM_BOT_PROTECTION_ENABLED=true
FORM_BOT_PROVIDER=vercel-botid
FORM_BOT_PROTECTION_MODE=enforce
FORM_RATE_LIMIT_ENABLED=true
FORM_DUPLICATE_PROTECTION_ENABLED=true
FORM_SECURITY_HASH_SECRET=<new cryptographically random value of at least 32 characters>
FORM_ALLOWED_ORIGINS=https://primaryuc.com,https://www.primaryuc.com
FORM_ALLOW_VERCEL_PREVIEWS=false
FORM_BOT_PROVIDER_TIMEOUT_MS=1500
UPSTASH_REDIS_REST_URL=<server-only Upstash REST URL>
UPSTASH_REDIS_REST_TOKEN=<server-only Upstash REST token>
```

Keep the existing delivery variables configured:

```dotenv
NEXT_PUBLIC_SITE_URL=https://primaryuc.com
NEXT_PUBLIC_SUPABASE_URL=<public project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<public anon key>
SUPABASE_SERVICE_ROLE_KEY=<server-only secret>
RESEND_KEY=<server-only secret>
```

Only values prefixed with `NEXT_PUBLIC_` are browser-visible. Never prefix the hash secret, Upstash token, service-role key, Resend key, or protection controls with `NEXT_PUBLIC_`.

### 7.3 Preview and local settings

For a protected Vercel preview:

- Use a non-production Upstash database or a separately namespaced project.
- Set `FORM_ALLOW_VERCEL_PREVIEWS=true`; only the exact current `VERCEL_URL` and `VERCEL_BRANCH_URL` are added.
- Keep `FORM_BOT_PROTECTION_MODE=enforce`.

Local development is treated as human by BotID by default. For an intentional local verdict test only:

```dotenv
FORM_BOTID_DEV_BYPASS=BAD-BOT
```

Use `HUMAN`, `BAD-BOT`, or `GOOD-BOT`. Never configure this variable in Vercel Production; production startup rejects it.

### 7.4 Edge rate-limit recommendation

Add a Vercel Firewall rate-limit rule scoped only to:

- Method: `POST`
- Path: `/api/forms/submit` or `/api/forms/records`
- Key: client IP
- Initial threshold: 10 requests per 10 minutes

Run it in log/count mode for 24–48 hours if the plan supports observation, inspect legitimate shared-network traffic, then block. Do not apply this rule site-wide. The application limits remain the authoritative per-IP and per-identifier controls.

### 7.5 Secret response

The old `env.example` contained credential-like Supabase values. Before production rollout:

1. Rotate the Supabase service-role key immediately.
2. Rotate the Supabase anon key if the project treats the old value as sensitive or it was not intended for publication.
3. Search Git history and CI logs; removing the value from the current file does not remove historical copies.
4. Rotate the Resend key if it has ever been committed or exposed.
5. Generate a new `FORM_SECURITY_HASH_SECRET`; do not reuse an application or Supabase secret.

Rotating the form hash secret invalidates current rate-limit and duplicate keys but does not affect stored leads. Rotate the Upstash token normally and redeploy.

## 8. How to confirm protection is active

Use a preview first, then production:

1. Submit each of the three form implementations as a normal user.
2. Confirm one internal email, at most one confirmation email, and one tracker row.
3. In browser developer tools, confirm the protected request is a POST to the correct `/api/forms/*` route and carries BotID's `x-is-human` attestation.
4. In Vercel Firewall/BotID observability, filter the two endpoints and confirm human decisions.
5. Submit twice rapidly with identical values. The UI prevents the second pending click; a repeated network request should return success without a second delivery.
6. From a direct HTTP client with no BotID-instrumented browser, post a syntactically valid body. Production should return 403 and create no email or tracker row.
7. In preview or local only, set `FORM_BOTID_DEV_BYPASS=BAD-BOT`, submit, and verify 403 with no side effects. Remove it immediately afterward.
8. Test a populated honeypot through an automated preview request and confirm 403.
9. Exceed a preview rate-limit bucket and confirm 429 plus `Retry-After`.
10. Inspect response headers and confirm no infrastructure layer has replaced the exact CORS header with `*`.

Do not run rejection tests using real patient information.

## 9. Monitoring and alerting

Search runtime logs for the structured `form_security_decision` event and group by:

- `endpoint`
- `formSource`
- `decision`
- `providerResult`
- `responseStatus`
- `rateLimitBucket`
- verification-latency percentile

Recommended alerts:

- `configuration_error > 0`: page immediately.
- `provider_failure` or `verification_degraded > 2% of attempts for 5 minutes`: investigate BotID and Upstash.
- `delivery_failure > 0`: page the lead-delivery owner.
- sudden `blocked_bot` or `blocked_honeypot` increase: investigate campaign/attack source.
- sustained `blocked_rate_limit` increase: review edge rules and shared-network false positives.
- accepted lead count drops materially versus the same weekday/hour while page traffic is stable: investigate false positives or delivery.

Track acceptance rate before and after enforcement by form source. Never add raw identifiers or form fields to logs to improve attribution.

## 10. Rollback and incident behavior

The preferred emergency rollback is:

```dotenv
FORM_BOT_PROTECTION_MODE=observe
```

Redeploy. This stops BotID verdicts from blocking while preserving origin, honeypot, schema, payload, rate-limit, duplicate, and logging protections. Production intentionally rejects `FORM_BOT_PROTECTION_MODE=off` and `FORM_BOT_PROTECTION_ENABLED=false`.

If Redis itself is causing false positives, temporarily set `FORM_RATE_LIMIT_ENABLED=false` and redeploy only after changing BotID to `enforce`; provider failure will then fail closed. Restore the limiter promptly.

Incident sequence:

1. Change to `observe`.
2. Confirm legitimate delivery resumes.
3. Compare `observed_bot`, provider latency, and rate-limit decisions.
4. Correct the provider/check-level/origin configuration.
5. Return to `enforce`.
6. Verify all three form types and watch the first hour of logs.

## 11. Residual risks and follow-up work

1. **Historical credentials:** rotate and review Git history immediately.
2. **External wildcard CORS header:** remove it in Vercel and verify the deployed endpoints.
3. **Framework dependency advisories:** plan and test a dedicated Next.js 16.3 migration; do not use `npm audit fix --force` in this release.
4. **No transactional outbox:** add an outbox/queue if strict cross-provider exactly-once delivery is required.
5. **Existing lint/type debt:** the build currently skips both checks and the repository has 239 lint problems plus unrelated TypeScript failures. Fix these in a separate hardening change and re-enable build gates.
6. **Advanced attackers:** BotID Basic plus throttles will not stop every human-solved or high-fidelity automation flow. Use observed data before considering Deep Analysis; update both client and server levels together.
7. **Operations:** logs exist, but production dashboards and alerts must be created manually.

## 12. Self-audit

| Area | Score | Assessment / corrective action |
|---|---:|---|
| Automated-bot resistance | 9/10 | Layered provider, origin, honeypot, throttles, and duplicate control cover the main observed attack paths. |
| Legitimate-user friction | 9/10 | No visible CAPTCHA; values and retry path are preserved. Monitor shared-IP false positives. |
| Accessibility | 9/10 | Keyboard, focus, alert, labels, disabled state, and mobile flows are covered. |
| Form-data privacy | 9/10 | Provider receives no submitted fields; storage/log identifiers are HMAC-derived. |
| Delivery reliability | 8/10 | Corrective action: implement a transactional outbox/queue with per-effect delivery state and replay tooling. |
| Maintainability | 9/10 | One shared typed pipeline protects both endpoints and all three form components. |
| Test coverage | 9/10 | Unit, integration, exact-side-effect, desktop, mobile, retry, keyboard, and duplicate cases are covered. |
| Observability | 8/10 | Corrective action: create Vercel log dashboards and the alerts listed above, then establish a two-week baseline. |
| Dependency health | 7/10 | Corrective action: migrate to Next.js 16.3 in a dedicated change and replace or isolate `nookies` to clear remaining advisories. |
| Repository-wide build gates | 6/10 | Corrective action: resolve the 239 legacy lint findings and current unrelated type errors, then stop skipping lint/type validation in builds. |
| Credential hygiene | 6/10 | Corrective action: rotate the historical Supabase/Resend credentials and review Git/CI history before deployment. |

## 13. Release decision

The bot-protection implementation itself is ready for a Vercel preview rollout. Production enforcement should proceed only after:

- all required Production environment variables are set;
- Upstash is provisioned;
- historical credentials are rotated;
- the external wildcard CORS header is removed or conclusively shown not to affect these endpoints;
- one successful and one rejected preview submission are verified with zero duplicate side effects;
- log dashboards and at least the configuration/delivery alerts are active.

No real patient submission was generated during verification.
