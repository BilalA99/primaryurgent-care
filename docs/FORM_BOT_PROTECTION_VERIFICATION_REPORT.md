# PrimaryUC Form Bot Protection Verification Report

Audit date: 2026-08-04 (America/New_York)

Production site inspected: `https://primaryuc.com`

## 1. Final verdict

**PARTIAL**

The working tree contains a layered protection path for every discovered public lead form, and focused unit, integration, browser, formatting, scoped-lint, and production-build checks pass. The implementation is not committed or pushed. Live `/api/forms/submit` and `/api/forms/records` return `404`, required platform configuration cannot be verified, production emits wildcard CORS, `www.primaryuc.com` has a TLS hostname error, and a Supabase service-role JWT-like value exists in committed history.

Repository implementation state: **IMPLEMENTED_BUT_UNCOMMITTED**.

## 2. Git status

| Item | Evidence | Status |
| --- | --- | --- |
| Branch | `main` | Present |
| HEAD | `1371c949c499d10682ae4d054654713e6c9e652c` | Present |
| Upstream | `origin/main` at the same SHA | Ahead 0 / behind 0 |
| Bot-protection commit | `git log --all -- instrumentation-client.ts lib/form-security/handler.ts app/api/forms/submit/route.ts` returned no commit | Not committed |
| Staged changes | `git diff --cached --stat` returned no output | None |
| Pushed implementation | Protection files/changes are working-tree-only | No |
| Merge/rebase conflict | No unmerged paths or rebase state found | None |

The base branch is pushed and synchronized, but the protection implementation is absent from its history. Unrelated/pre-existing dirty files such as `app/privacy-policy/page.tsx` must not be swept into the security commit. `tsconfig.json` hashes identically to `HEAD` even though Windows/Git may report a stat-only modification after Next regenerates types.

Recommended commit message: `Verify and complete layered form bot protection`.

Recommended scoped commit files are `.gitignore`, `.eslintrc.json`, `.prettierignore`, both `app/api/forms/*/route.ts` files, the four form components, `components/email/SendEmail.ts`, `env.example`, `instrumentation-client.ts`, every `lib/form-security/*.ts` file, `next.config.ts`, `package.json`, `package-lock.json`, `playwright.config.ts`, `vitest.config.ts`, every `tests/form-security/*.test.ts` file, `tests/browser/forms.spec.ts`, `tests/server-only.ts`, and this report. Exclude the pre-existing `docs/FORM_BOT_PROTECTION_IMPLEMENTATION_REPORT.md` unless it is intentionally archived/replaced, and review every other dirty file separately.

## 3. Coverage table

| Form | Pages using it | Submission method | Protected endpoint | BotID | Honeypot | Rate limit | Duplicate protection | Consent-safe analytics |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Homepage mini → expanded appointment | `/`; prefills first/last/phone/accident type | Client JSON `fetch` | `POST /api/forms/submit` | Yes | Yes | IP + email + phone | Yes | Yes |
| Standard appointment | Global `BookAppointmentSection`, appointment/popup, emergency, location, pricing, primary-care and urgent-injury routes | Client JSON `fetch` | `POST /api/forms/submit` | Yes | Yes | IP + email + phone | Yes | Yes |
| Compact accident | Accident hub, city, whiplash, back/neck, PIP documentation, urgent-care-vs-ER and responsive dialogs | Client JSON `fetch` | `POST /api/forms/submit` | Yes | Yes | IP + phone; email when supplied | Yes | Yes |
| Attorney records | `/lawyers` | Client JSON `fetch` with base64 file objects | `POST /api/forms/records` | Yes | Yes | IP + email + phone | Yes | Yes |

Repository-wide searches for forms, submit handlers, server actions, POST routes, Resend, Supabase, tracking and thank-you redirects found no alternate public lead-delivery path. `components/email/SendEmail.ts` is reached only after `processFormSubmission` accepts a request. `app/api/posts/route.ts` is an unrelated blog-writing endpoint, not a patient form; its visible lack of authentication is a remaining risk.

## 4. Control verification

| Control | Status | Evidence |
| --- | --- | --- |
| BotID | Present; repaired | `instrumentation-client.ts` protects both POST paths at `basic`; `next.config.ts` uses `withBotId`; `provider.ts:verifyBotAttestation` rejects missing production attestation, bounds timeout, and now treats an unclassified verdict as failure; the handler runs it before reservation/delivery. |
| Honeypot | Present | All public forms submit an off-screen text `companyWebsite` with `tabIndex=-1`, assistive-tech hiding and autofill discouragement; the handler blocks it before BotID/side effects. |
| Schema validation | Repaired | `schemas.ts` uses strict Zod objects, bounded/normalized names, email/phone, optional ZIP validation, accident allowlist, message/form-source/attribution bounds, file count/decoded-size/MIME checks, and PDF/DOC/DOCX/JPEG/PNG signatures. |
| Origin validation | Present | `request.ts:validateOrigin` permits exact apex/www, rejects foreign origins/broad previews and permits localhost only outside production. Missing Origin deliberately proceeds to the remaining controls. No repository endpoint uses wildcard CORS. |
| Rate limiting | Present | Upstash Redis: IP 5/10 minutes and 20/24 hours; email/phone 3/30 minutes. Rejection is `429` with `Retry-After` before delivery. |
| HMAC privacy | Present | `crypto.ts:hashIdentifier` uses HMAC-SHA-256 with server-only, domain-separated input for IP/email/phone/duplicate keys; tests prove raw PII is absent. |
| Duplicate protection | Present; repaired | Upstash `NX` reservation and ~10-minute completion; release on failure. Duplicate response is `{ ok: true, duplicate: true, redirect: null }`, and clients stop before analytics/redirect. |
| Logging privacy | Present | `logger.ts` emits allowlisted decision metadata only; tests verify names/email/phone are absent. |
| Side-effect ordering | Present | `handler.ts:processFormSubmission` completes content-type/size, parse/schema, origin, honeypot, IP limit, BotID, identifier limits and duplicate reservation before `deliver`. |
| Consent-safe analytics | Present; repaired/tested | Clients track only after accepted success, exit for duplicates, and call `pushEnhancedConversion` only under `hasConsent("marketing")`. Browser tests cover denied/granted consent and duplicate suppression. |

Processing order is content type/streaming size → strict schema → exact origin → honeypot → HMAC IP limits → server BotID → HMAC email/phone limits → HMAC duplicate reservation → delivery → duplicate completion → response → client analytics/redirect.

Appointment/compact delivery sends the internal Resend notification, optional patient confirmation, then a Supabase row in `deliverAppointmentLead`. Attorney delivery sends the internal attachment email, requester confirmation, then a Supabase row in `deliverRecordsRequest`. Rejected requests never reach either function.

Missing Origin is intentional for native/non-browser clients; production direct requests still face BotID and distributed limiting. Provider failure is availability-tolerant only while distributed IP limiting is available; simultaneous provider/store failure returns `503`.

### Environment configuration

| Variable | Referenced | Required production | In example | Server-only | Deployed value verified |
| --- | --- | --- | --- | --- | --- |
| `FORM_BOT_PROTECTION_ENABLED` | Yes | Yes | Yes | Yes | No |
| `FORM_BOT_PROVIDER` | Yes | `vercel-botid` | Yes | Yes | No |
| `FORM_BOT_PROTECTION_MODE` | Yes | `enforce` | Yes | Yes | No |
| `FORM_RATE_LIMIT_ENABLED` | Yes | `true` | Yes | Yes | No |
| `FORM_DUPLICATE_PROTECTION_ENABLED` | Yes | `true` | Yes | Yes | No |
| `FORM_SECURITY_HASH_SECRET` | Yes | 32+ random chars | Placeholder | Yes | No |
| `FORM_ALLOWED_ORIGINS` | Yes | Apex + www only | Yes | Yes | No |
| `FORM_ALLOW_VERCEL_PREVIEWS` | Yes | `false` | Yes | Yes | No |
| `FORM_BOT_PROVIDER_TIMEOUT_MS` | Yes | `1500` recommended | Yes | Yes | No |
| `UPSTASH_REDIS_REST_URL` | Yes | Yes | Placeholder | Yes | No |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | Yes | Placeholder | Yes | No |
| `NEXT_PUBLIC_SITE_URL` | Yes | Yes | Yes | No | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Yes | Placeholder | No | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Yes | Placeholder | No | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Yes | Placeholder | Yes | No |
| `RESEND_KEY` | Yes | Yes | Placeholder | Yes | No |

Production fails closed when the HMAC secret or required Redis configuration is missing. `FORM_BOTID_DEV_BYPASS` is rejected in production. The E2E public bypass is gated by `NODE_ENV !== "production"`; the isolated production browser build runs with BotID initialized.

## 5. Tests

| Command/check | Actual result |
| --- | --- |
| `npm ci` | PASS — 692 packages installed. An earlier attempt while two dev servers held native files failed with Windows `EPERM`; the final clean run passed after stopping only verified project processes. |
| `npm run format:check` | PASS — all selected security, form and test files match Prettier. |
| Scoped `next lint --file ...` | PASS — no warnings or errors in protection/routes/forms/tests. |
| `npm test` | PASS — 7 files, 57 tests. |
| `npm run test:e2e` | PASS — 10 passed, 2 intentional project skips; desktop/mobile form flows, popup prefills, error retry, double-click, duplicate suppression, attribution and consent gating. |
| `npm run build` | PASS — Next.js 15.5.22 completed and emitted both form routes. Build skips lint/type validation by current config; existing blog `unstable_noStore`/404 diagnostics are non-fatal. |
| `npm run lint` | FAIL — broad pre-existing debt in pages/components (appointment, accidents, locations/maps and templates). No scoped protection/form error remains. |
| `npm run typecheck` | FAIL — pre-existing service-page export, accident-card variant, location and map errors. No form-security, protected-route, changed-form or security-test error remains. `.next-e2e/types` duplicates three existing service-export errors. |
| `npm audit --json` | FAIL — 5 total: 2 low (`cookie`/`nookies`) and 3 high (`next` via `postcss` and `sharp`). The advertised automatic fix is a Next 16 major upgrade; no force upgrade was applied. |
| `git diff --check` | PASS. |

The 57 focused tests cover human/bot/missing/unclassified BotID verdicts, provider timeout/failure, Redis loss and simultaneous loss, valid appointment/attorney delivery, compact source, IP/email/phone limiting, honeypots, origins including missing Origin, body sizes, strict/invalid fields, records file count/size/MIME/signatures, HMAC/log privacy, duplicate replay, delivery failure/retry, recipients/tracker isolation and attribution. Resend, Supabase, Redis and BotID are mocked; tests create no real lead, email or tracker row.

## 6. Changes made

| File/group | Why |
| --- | --- |
| `components/ui/HomepageMobileHeroForm.tsx` | Replaced desktop full hero form with responsive mini card; first/last/phone/accident fields open and prefill the accessible expanded form. |
| `components/ui/BookAppointmentForm.tsx` | Accident-type prefill, hydration marker, duplicate status, and no-analytics/no-redirect duplicate handling. |
| `components/accident/CompactAccidentForm.tsx`, `components/ui/LawyerRecordsForm.tsx` | Hydration markers and authoritative duplicate handling before analytics/redirect. |
| `lib/form-security/handler.ts` | Duplicates are idempotent but non-converting (`redirect: null`, `accepted: false`). |
| `lib/form-security/schemas.ts` | Unknown-field rejection, optional ZIP format, and records file magic signatures. |
| `lib/form-security/provider.ts` | Indeterminate BotID verdicts are provider failures, not humans. |
| `instrumentation-client.ts` | Both real paths remain protected; non-production-only E2E initialization skip added. |
| `next.config.ts`, `.gitignore`, `playwright.config.ts` | Fixed Turbopack root, isolated `.next-e2e`, and moved browser checks to an isolated production server. This fixes the reported missing `[turbopack]_runtime.js` caused by mixed concurrent caches. |
| `tests/browser/forms.spec.ts` | Desktop/mobile mini popup, hydration, duplicate/no-conversion, consent-gated PII and attribution assertions. |
| `tests/form-security/*.test.ts` | Expanded records handler, strict schema/signature, identifier rate, missing-Origin, degraded-provider and unclassified-verdict coverage. |
| `package.json` | Included the homepage mini-form file in format checking. |
| This report | Evidence-based audit and release checklist. |

The underlying Upstash, HMAC, logger, request validation, route and delivery architecture already existed uncommitted in the working tree and was retained rather than rewritten.

## 7. Manual actions after push

Sixteen manual actions remain.

### Required before production

1. **GitHub — scoped commit and PR.** Commit only the reviewed files on a feature branch with `Verify and complete layered form bot protection`; exclude unrelated dirty files. Why: protection exists only locally. Verify the GitHub diff and ensure the preview deployment uses that SHA.
2. **Supabase — rotate exposed credentials.** In Project Settings → API, revoke/rotate the historically committed service-role credential immediately and update Vercel/CI/authorized local stores. Rotate the anon/publishable key if the project rotation workflow requires it. Why: `HEAD:env.example` contains JWT-like anon and service-role assignments introduced by commit `a5a3a02`. Verify the old service credential is rejected and never commit its replacement.
3. **Vercel — BotID integration.** Enable BotID for PrimaryUC and support Basic checks on both protected POST paths. Why: package/config does not provision the provider. Verify Bot Management sees evaluated requests and missing/confirmed-bot attestation gets `403` with no lead side effects.
4. **Vercel — protection flags.** Set `FORM_BOT_PROTECTION_ENABLED=true`, `FORM_BOT_PROVIDER=vercel-botid`, `FORM_BOT_PROTECTION_MODE=enforce`, both rate/duplicate flags `true`, previews `false`, timeout `1500`, and exact apex/www origins. Do not set dev/E2E bypasses. Verify via configuration review and safe rejection smoke tests.
5. **Upstash/Vercel — distributed store.** Provision production Redis and set its URL/token plus a separate random 32+ character HMAC secret. Why: distributed rate/duplicate controls require them. Verify only HMAC-looking keys and expected TTLs; raw email/phone/IP must not appear.
6. **Vercel/Resend/Supabase — delivery configuration.** Set valid Resend, Supabase and site URL values; confirm tracker columns, intended recipients and the Resend sending domain. Verify in preview with synthetic non-patient data, then delete its row/email.
7. **Vercel headers/proxy — remove wildcard CORS.** Remove global `Access-Control-Allow-Origin: *`. Why: live `/` and both live 404 route responses contain it, while repository code has no wildcard. Verify final headers and a foreign-Origin POST rejection.
8. **DNS/Vercel Domains — repair www TLS.** Attach/renew a certificate covering `www.primaryuc.com` and redirect once to apex. Verify `curl -I https://www.primaryuc.com/` works without `-k` and returns the intended permanent redirect.

### Required immediately after production deployment

9. **Vercel/live routes — smoke check.** Confirm both endpoints are no longer `404`; GET/HEAD cannot accept leads, invalid content type gets `415`, and foreign Origin gets `403`. Verify responses/logs contain no PII.
10. **Vercel BotID/logs — no-side-effect rejection.** Confirm missing attestation, confirmed bot, honeypot and rate-limit rejection with provider tooling/designated synthetic data. Verify zero Resend messages, Supabase rows and conversion events.
11. **Upstash — limits/idempotency.** Verify IP/email/phone limits, `Retry-After`, ~10-minute duplicate TTL and no second email/tracker/conversion on exact duplicate. Inspect key shapes only.
12. **GTM/GA4/Google Ads — consent.** Verify accepted synthetic success analytics, enhanced PII only after marketing consent, and no duplicate conversion. Rejecting consent must keep name/email/phone out of `dataLayer`.
13. **Resend/Supabase — accepted path.** With authorized synthetic data, confirm intended internal/confirmation recipients and one row for appointment and records flows. Do not use real patient data; remove synthetic records afterward.

### Recommended hardening

14. **Dependencies — upgrade plan.** Test a Next/PostCSS/Sharp upgrade clearing 3 high advisories and replace/isolate `nookies`/old `cookie` for 2 low advisories. Run all focused/browser/build checks on preview; do not use `npm audit fix --force` blindly.
15. **CI — remove build bypass debt.** Fix unrelated lint/type errors and remove `eslint.ignoreDuringBuilds` / `typescript.ignoreBuildErrors`. Verify lint, typecheck and build all pass in CI.
16. **Architecture — transactional delivery/admin API.** Add an outbox/idempotent provider-message design so a later confirmation/tracker failure cannot resend an already-sent internal email; separately authenticate `app/api/posts/route.ts`. Verify partial-failure and unauthorized-write tests.

## 8. Secret and credential status

- Working-tree `env.example` contains placeholders only.
- Server secrets are not referenced by client form components and do not use `NEXT_PUBLIC_` names.
- Committed `HEAD:env.example` contains JWT-like values for `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`; no value is reproduced here. Service-role rotation is required. Consider history rewriting only after rotation and according to the organization’s incident process.
- No committed Resend-key-like or Upstash-token-like value was found by the targeted history search.
- Deployed secret presence/value cannot be verified from the repository.

## 9. Remaining risks

- Production does not have this implementation today: both routes return `404` and the code is uncommitted/unpushed.
- Vercel BotID and Upstash provisioning are unverified; code completeness is not infrastructure completeness.
- Wildcard production CORS and broken www TLS require infrastructure changes.
- The historically committed Supabase service-role credential is compromised until rotated.
- Delivery is sequential, not transactional. If the internal email succeeds and a later confirmation/tracker operation fails, reservation release allows a legitimate retry but can resend that internal email.
- All attribution fields pass strict validation and enter the protected request. The existing Supabase writer persists GCLID and standard UTM source/medium/campaign/term/content, but not `gbraid`, `wbraid`, `utm_adgroup` or `utm_keyword`; adding them requires a coordinated schema change.
- Missing Origin is deliberately allowed and depends on BotID plus distributed limiting in production.
- `observe`/`off` are operational rollback settings; production governance must prevent accidental changes from `enforce`.
- Build success does not imply lint/type success because current build config suppresses both checks.
- Dependency audit has 3 high and 2 low advisories.

## 10. Release recommendation

**SAFE_TO_PUSH_FOR_PREVIEW**

The reviewed code can be committed to a scoped branch and exercised in a Vercel preview. Do not merge/deploy to production until the exposed Supabase credential is rotated, Vercel/Upstash/Resend/Supabase configuration is verified, wildcard CORS and www TLS are corrected, and post-deploy controls are validated. A PR and preview are strongly recommended.

```text
BOT PROTECTION CODE: PASS
COMMITTED: NO
PUSHED: NO
ALL FORMS COVERED: YES
BUILD: PASS
FOCUSED TESTS: PASS
PRODUCTION CONFIGURED: NO
MANUAL ACTIONS REMAINING: 16
RELEASE RECOMMENDATION: SAFE_TO_PUSH_FOR_PREVIEW
REPORT: docs/FORM_BOT_PROTECTION_VERIFICATION_REPORT.md
```
