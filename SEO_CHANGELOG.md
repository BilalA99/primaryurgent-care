# SEO Implementation Changelog — Car Accident / PIP Urgent Care

**File**: `SEO_CHANGELOG.md` (repo root)

## Summary
Non-visual SEO improvements for car accident urgent care lead generation in Palm Beach County. All changes are metadata, schema, internal linking, and minimal content—no UI/layout changes.

---

## File Changes

### lib/seo.ts
- **Added**: `buildBreadcrumb(items)` — BreadcrumbList schema helper
- **Added**: `buildServiceSchema(input)` — Service schema for car accident services
- **Added**: `buildClinicSchema(input)` — MedicalClinic schema with optional @id
- **Added**: `buildGraphSchema(entities)` — @graph consolidation helper
- **Added**: TypeScript interfaces `BreadcrumbItem`, `ServiceSchemaInput`, `ClinicSchemaInput`

### app/layout.tsx
- **Schema**: Root `@graph` now includes (1) `Organization` with `@id: "https://primaryuc.com/#organization"` and (2) `MedicalClinic` with `parentOrganization: { "@id": "...#organization" }`. Entity graph corrected so Organization is the parent; location pages use MedicalClinic `@id` per location.

### components/accident/AccidentInternalLinks.tsx
- **Linking**: Added "Book a Car Accident Exam" link → `/appointment` (Calendar icon)
- **Linking**: Renamed first link to "Car Accident Urgent Care Exam" → `/car-accident-injury-clinic` with description "Same-day car accident urgent care exam and PIP documentation"

### app/car-accident-injury-clinic/page.tsx
- **Metadata**: Title → "Car Accident Urgent Care Palm Beach | Same-Day Exam + PIP | PrimaryUC"
- **Metadata**: Description updated with "car accident urgent care", "same-day evaluation", "PIP documentation"
- **Schema**: Consolidated into single @graph (BreadcrumbList, MedicalWebPage, Service, FAQPage). Replaced MedicalBusiness/MedicalProcedure with Service schema.
- **Content**: Added 1 sentence in 14-day section: "Our car accident urgent care offers same-day evaluation and PIP documentation for your claim."

### app/car-accident/[city]/page.tsx
- **Metadata**: Title → "Car Accident Urgent Care in [City] | Same-Day Injury Exam + PIP | PrimaryUC"
- **Metadata**: Description updated with "car accident urgent care", "walk-in welcome"
- **Schema**: Consolidated into @graph; added Service schema "Car accident injury exam in [City]"; added @id to MedicalClinic
- **Linking**: Fixed Digital X-Ray href `/emergencyroom/digital-x-ray` → `/emergency-room/digital-x-ray`

### app/locations/[slug]/page.tsx
- **Metadata**: citySeo titles → "Urgent Care in [City] | Walk-In + X-Ray | PrimaryUC" (avoids title cannibalization; accident intent kept in description)
- **Metadata**: Descriptions include "Car accident exams + PIP documentation available" plus walk-in, served areas, appointment CTA
- **Schema**: Consolidated into @graph; added Service schema "Car accident injury exam in [City]"; added @id to clinic
- **Linking**: Added internal link to `/car-accident-injury-clinic` with anchor "car accident urgent care" in hyperlocal section (all 4 locations)

### app/car-accident/whiplash/page.tsx
- **Metadata**: Title → "Whiplash After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC"
- **Metadata**: Description includes "car accident urgent care"
- **Schema**: Consolidated into @graph; added Service schema; replaced MedicalProcedure with Service; kept MedicalCondition

### app/car-accident/back-neck-pain/page.tsx
- **Metadata**: Title → "Back & Neck Pain After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC"
- **Metadata**: Description includes "at urgent care"
- **Schema**: Consolidated into @graph; added Service schema; replaced MedicalProcedure with Service; kept MedicalCondition

### app/car-accident/documentation-pip/page.tsx
- **Metadata**: Title → "Car Accident PIP Exam & Documentation | Urgent Care + Palm Beach | PrimaryUC"
- **Metadata**: Description includes "at urgent care"
- **Schema**: Consolidated into @graph; replaced MedicalProcedure with Service schema

### app/car-accident/urgent-care-vs-er/page.tsx
- **Schema**: Consolidated into @graph; added Service schema "Car accident urgent care evaluation"

### app/sitemap.xml/route.ts
- **Technical**: Added `<lastmod>` to each URL (ISO date)

### app/appointment/page.tsx
- **Metadata**: OG/Twitter images → absolute URLs `https://primaryuc.com/appointment.png`

### app/urgent-injury-care/page.tsx
- **Metadata**: OG/Twitter images → absolute URLs `https://primaryuc.com/urgentcarelanding.jpg`

---

## P0 Fixes (Post-Audit)

- **Schema entity graph**: `Organization` has `@id: #organization`; `MedicalClinic` references it via `parentOrganization`. Car accident hub/provider uses Organization; location and city pages use MedicalClinic `@id` per clinic.
- **Location titles**: Switched from "Car Accident Urgent Care in [City]…" to "Urgent Care in [City] | Walk-In + X-Ray | PrimaryUC" to avoid cannibalization. Accident intent retained in meta description, Service schema, and internal links.
- **Changelog path**: Use repo-relative `SEO_CHANGELOG.md` for references.

---

## Routes Benefited

| Route | Changes |
|-------|---------|
| `/car-accident-injury-clinic` | Metadata, schema @graph, content |
| `/car-accident/royal-palm-beach` | Metadata, schema, X-ray link fix |
| `/car-accident/lake-worth` | Metadata, schema, X-ray link fix |
| `/car-accident/palm-springs` | Metadata, schema, X-ray link fix |
| `/car-accident/lantana` | Metadata, schema, X-ray link fix |
| `/car-accident/whiplash` | Metadata, schema |
| `/car-accident/back-neck-pain` | Metadata, schema |
| `/car-accident/documentation-pip` | Metadata, schema |
| `/car-accident/urgent-care-vs-er` | Schema |
| `/locations/royal-palm-beach-primary-urgent-care-center` | Metadata, schema, internal link |
| `/locations/lake-worth-primary-urgent-care-center` | Metadata, schema, internal link |
| `/locations/palm-springs-primary-urgent-care-center` | Metadata, schema, internal link |
| `/locations/lantana-primary-urgent-care-center` | Metadata, schema, internal link |
| `/appointment` | OG image URL |
| `/urgent-injury-care` | OG image URL |
| `/sitemap.xml` | lastmod |
| All pages | AccidentInternalLinks now includes appointment + improved hub anchor |

---

---

## Audit Round 2 — 2026-02-25 (Skeptical Audit)

### Issues Verified

| Issue | Finding | Action |
|-------|---------|--------|
| A) MedicalClinic claiming #organization @id | NOT CONFIRMED as stated. Organization correctly owns #organization. RELATED: root MedicalClinic had no @id of its own. | FIXED: added @id '#clinic' to root MedicalClinic in layout.tsx; updated car-accident-injury-clinic service provider from #organization → #clinic |
| B) Location title cannibalization | NOT CONFIRMED. Titles already "Urgent Care in [City] \| Walk-In + X-Ray \| PrimaryUC" | NO CHANGE |
| C) FAQPage schema vs visible content | CONFIRMED for car-accident-injury-clinic. 10-question schema did not match 5-question visible AccidentFAQ default. [city] pages were correct. | FIXED: replaced 10-question schema with 5 questions matching visible AccidentFAQ defaults |
| D) [city] route existence | NOT CONFIRMED. All 4 city routes exist, match sitemap + internal links + generateStaticParams. | NO CHANGE |
| E) Canonical/OG url consistency | NOT CONFIRMED. All canonicals absolute, OG urls match canonicals, images absolute. | NO CHANGE |
| F) SEO_CHANGELOG.md existence | NOT CONFIRMED (file exists at repo root). | NO CHANGE |

### Files Changed

**app/layout.tsx** — Added `'@id': 'https://primaryuc.com/#clinic'` to root MedicalClinic entity so it can be referenced from other pages.

**app/car-accident-injury-clinic/page.tsx** — (1) Service `provider` changed from `#organization` to `#clinic`. (2) FAQPage schema replaced: was 10 questions (not matching visible content); now 5 questions that match verbatim the default `AccidentFAQ` visible component.

### Build Result: PASS (✓ 32/32 static pages generated, 0 TypeScript errors)

---

## Audit Round 3 — 2026-05-22 (Keyword-Driven Content Optimization)

**Scope**: `/car-accident-injury-clinic` only — content-level keyword optimization layered on top of the schema/metadata foundation from rounds 1 & 2. First deliverable of the agency's "Special Project — PUC Landing Page & Car-Accident Pages" workstream (5/27 deadline). Sibling pages will follow on a weekly cadence.

**Driver**: pre-edit Ahrefs analysis (2026-05-22) showed the URL ranked for 1 organic kw (vol 30, pos 10, 0 traffic) and the domain ranked for 12 kw total — zero car-accident-related. Schema/metadata work was complete but content-level kw targeting was never done. Full audit doc: `accounts/primary-urgent-care/seo/2026-05-22-car-accident-landing-page-audit.md`.

### File Changes — `app/car-accident-injury-clinic/page.tsx`

- **Metadata title**: "Car Accident Urgent Care Palm Beach | PIP Exam | PrimaryUC" → "Car Accident Doctor in Palm Beach County | PIP Exam | PrimaryUC" (leads with "car accident doctor" — 1,400 vol Tier 1 kw; rephrased OG + Twitter to match).
- **Metadata description**: "Car accident urgent care in Palm Beach County. Same-day evaluation, PIP documentation, walk-in welcome…" → "Car accident doctor & urgent care clinic in Palm Beach County. Same-day PIP exam, onsite X-ray, walk-in welcome…" (adds "car accident doctor" + "car accident clinic").
- **OG image alt**: rewritten to "Car accident doctor at PrimaryUC Palm Beach County car accident injury clinic with onsite X-ray".
- **H1** (via `HeroWithForm` title prop): "Car Accident Injury Clinic in Palm Beach County" → "Car Accident Doctor & Urgent Care Clinic in Palm Beach County" (3 Tier 1 kw + geo, 60 chars).
- **Hero subtitle**: rewritten to include "car accident doctors", "car accident injury clinic", "PIP documentation" naturally.
- **NEW H2 section "When to See a Car Accident Doctor in Florida"**: inserted after `FourteenDayUrgencyBlock`. Captures Tier 2 question-form kw ("doctor to see after car accident" 150 vol KD 1; "should I see a doctor after a car accident" 150 vol KD 1; "what doctor to see after car accident" 90 vol KD 1; "after car accident doctor" 150 vol KD 0). Includes 4 in-prose internal links: `/blog/headache-after-car-accident`, `/blog/hip-pain-after-car-accident`, `/car-accident/urgent-care-vs-er`.
- **Section title rename**: "Types of Car Accident Injuries We Treat" → "Car Accident Injuries Our Doctors Treat".
- **Section title rename**: "Car Accident Urgent Care Locations" → "Find a Car Accident Clinic Near You — 4 Palm Beach Locations" (captures "car accident clinic near me" 400 vol KD 6; "car accident urgent care near me" 150 vol KD 4); added 60-word intro paragraph above the LinkCardGrid.
- **AccidentSEOContent** prop body: rewritten from 130-word generic block to 220-word kw-tuned block. Includes Tier 1 kw (car accident doctor, car accident injury clinic, car accident clinic near me, car accident urgent care, car accident doctor near me) + all 4 city names + PIP/EMC framing.
- **NEW H2 section "Doctor or Chiropractor After a Car Accident?"**: inserted before FAQ. Captures "doctor or chiropractor after car accident" (200 vol KD 0). Links to `/car-accident/documentation-pip`.
- **FAQ overhaul**: replaced 5 default questions in `AccidentFAQ` (component defaults) with 7 explicit kw-aligned questions passed via new `faqs` prop. Single `accidentFaqs` const declared at top of page so the visible FAQ component and the JSON-LD `FAQPage` schema consume the same source — eliminates the schema/visible-content drift Round 2 had to fix. New section title: "Frequently Asked Questions About Car Accident Injury Care".
- **`faqSchemaObj`**: rewritten to `accidentFaqs.map(...)` — derived from the const, can't drift from visible content.

### Fact-Check Round (NEW process this round)

Spawned `blog-fact-checker` subagent to adversarially review every factual claim in the new content before commit. Round 1 returned NEEDS_PATCHES with 6 specific patches:

- **Patch 1 (Section 3 AccidentSEOContent)**: added one-sentence EMC clarification. Fla. Stat. § 627.736(1)(a)3-4 caps PIP medical benefits at $2,500 without an Emergency Medical Condition determination — only MD/DO/PA/APRN/dentist can certify EMC. Page didn't mention this; now does.
- **Patch 2 (Section 5 Doctor-vs-Chiropractor)**: corrected the legal hook. Original framing implied chiropractors don't satisfy the 14-day rule — under § 627.736(1)(a)1, they explicitly DO. Rewrote to use the EMC certification authority as the accurate distinction (both MD and chiropractor satisfy 14-day initial services; only certain providers can certify EMC for the full $10,000 cap).
- **Patch 3 (FAQ Q1)**: same EMC-correct framing applied.
- **Patch 4 (FAQ Q4)**: same correction — "a chiropractor cannot [certify EMC], under Florida law" replaces the prior implication that chiropractors don't satisfy the 14-day rule.
- **Patch 5 (FAQ Q5)**: separated 14-day-rule satisfaction from EMC certification authority.
- **Patch 6 (FAQ Q7)**: softened the invented "45-60 minute median visit time" to "in a single visit on the day they walk in" — operational sign-off from Bilal/PUC required if the specific time is to be re-added.

Round 2 fact-check on the patched draft: **PASS**, no new errors introduced. Reports at:
- `accounts/primary-urgent-care/seo/car-accident-injury-clinic-seo-2026-05-22.factcheck.md` (round 1)
- `accounts/primary-urgent-care/seo/car-accident-injury-clinic-seo-2026-05-22-round-2.factcheck.md` (round 2)

### Build Result

`npx tsc --noEmit` reports 6 errors in `app/car-accident-injury-clinic/page.tsx`, all pre-existing on `main`: `AccidentInfoSection` `type` prop uses `"primary"` / `"secondary"` but the component expects `"success" | "warning" | "info" | undefined`. Errors exist on main pre-edit (verified by stash + recheck). This branch introduces **0 new TypeScript errors**.

### Operational Items — Need Bilal/PUC Sign-Off Before Merge

These are claims about PUC's actual operations that the fact-checker flagged for confirmation:

1. Four locations open and accepting walk-in accident patients today: Royal Palm Beach, Lake Worth, Palm Springs, Lantana
2. All four locations actively prioritize accident-related visits in queue
3. Onsite digital X-ray available at all four locations
4. CT/MRI referrals with "STAT reads ≤ 3 hrs" (existing claim on page from earlier rounds — not introduced this round)
5. PIP-compliant documentation routinely generated at the visit

If any of these are not accurate today, the relevant sentences need to be softened or removed before merge.

### Routes Benefited (this round)

| Route | Changes |
|-------|---------|
| `/car-accident-injury-clinic` | Metadata title + description, H1, hero subtitle, 2 new H2 sections, 2 section title renames, AccidentSEOContent rewrite, 7-question FAQ replacing 5 defaults, FAQ schema derived from same const, EMC framing throughout |
| `/car-accident/whiplash` | Metadata title + description, H1 + hero subtitle, 3 new H2 sections ("Signs of Whiplash After a Car Accident", "When Whiplash Becomes Chronic Neck Pain", "Why See a Whiplash Injury Doctor and Not Just a Chiropractor"), rewritten "How to Treat Whiplash" section with Quebec Task Force reference, 7-question FAQ via `whiplashFaqs` const replacing 5 prior, FAQ schema derived from same const, EMC framing |
| `/car-accident/back-neck-pain` | Metadata title + description, H1 + hero subtitle, NEW FAQ section (page previously had none) with 7 kw-aligned questions via `backNeckFaqs` const, FAQ schema added to graph, 2 new H2 sections ("Delayed Back Pain & Delayed Neck Pain After a Car Accident", "Upper Back, Middle Back & Lower Back Pain — What's the Difference?"), new "Why See a Medical Doctor for Back Pain After a Car Accident" section with EMC framing, consolidated duplicate spine-exam content |
| `/car-accident/documentation-pip` | Metadata title + description (now leads with "Florida PIP 14-Day Rule + EMC"), H1 + hero subtitle, 2 new H2 sections ("What Is Florida PIP Insurance, and How Does the 14-Day Rule Work?", "Emergency Medical Condition (EMC) — The $10,000 vs $2,500 Question"), 7-question FAQ via `pipFaqs` const replacing 2 prior, FAQ schema derived from same const, EMC definition tracking Fla. Stat. § 395.002(8) statutory text |
| `/car-accident/urgent-care-vs-er` | Metadata title + description, H1 + hero subtitle, 7-question FAQ via `ucerFaqs` const replacing 4 prior, FAQ schema derived from same const, cost/wait-time comparison section softened (removed unverifiable specific dollar/minute figures, replaced with comparative framing), EMC framing throughout |
| `/car-accident/[city]` (4 cities: royal-palm-beach, lake-worth, palm-springs, lantana) | FAQ consolidated to single `cityAccidentFaqs` const consumed by both visible component AND JSON-LD schema (eliminating drift risk), 8-question FAQ replacing 7 prior with new Q7 (EMC + 14-day rule) and new Q8 ("Why see a medical doctor instead of a chiropractor"), Q6 weekend hours softened to defer to per-city location page (removed hardcoded hours that were wrong for any city with different schedules) |

### Process Changes (NEW this round)

- **Adversarial fact-check via dedicated subagent**: every page edit was reviewed by a separate `blog-fact-checker` subagent before commit, biased toward finding errors rather than confirming them. The agent reads the draft cold (no attachment to specific phrasings) and verifies every factual claim against primary sources (statute text, peer-reviewed literature, clinical practice guidelines, agency press releases).
- **Catches from this round**:
  - **Whiplash**: Original draft conflated "chronic neck pain" (≥3 months) with "late whiplash syndrome" (more commonly ≥6 months in published literature). 3 patches applied to separate the two definitions.
  - **Documentation-PIP**: Original EMC definition I drafted ("serious impairment, dysfunction, or permanent damage") drifted from the actual statutory text. 2 patches applied to match Fla. Stat. § 395.002(8) ("serious jeopardy to patient health, serious impairment of bodily functions, or serious dysfunction of any bodily organ or part").
  - **Hub** (Round 3 initial): Original framing implied chiropractors don't satisfy the 14-day PIP rule. They explicitly DO under § 627.736(1)(a)(1) — the legal distinction is who can certify EMC, not who satisfies initial services. 6 patches applied across body and FAQ to use the correct legal hook.
- **Back-neck-pain, urgent-care-vs-er, [city]**: PASS on first review, no patches needed.
- **Fact-check reports preserved** in the agency workspace at `accounts/primary-urgent-care/seo/*.factcheck.md`.

### Operational Items — Need Bilal/PUC Sign-Off Before Merge

Operational claims about PUC's clinic operations are flagged for confirmation. If any are not accurate today, the relevant sentences need to be softened or removed:

1. Four locations open and accepting walk-in accident patients today: Royal Palm Beach, Lake Worth, Palm Springs, Lantana
2. All four locations actively prioritize accident-related visits in queue
3. Onsite digital X-ray available at all four locations
4. CT/MRI referrals coordinated when indicated
5. PIP-compliant documentation routinely generated at the visit
6. EMC certification offered when clinically appropriate at all four locations
7. Single same-day visit workup is the standard for car accident presentations
8. Specialist referral workflow (orthopedic spine, neurology) for persistent radicular symptoms (whiplash + back-neck-pain pages)
9. 6-week re-evaluation + MRI consideration workflow for whiplash (whiplash page)

---

## SEO Verification Checklist (Post-Deploy)

1. **Google Search Console**
   - Inspect URL for `/car-accident-injury-clinic`, `/car-accident/royal-palm-beach`, `/locations/royal-palm-beach-primary-urgent-care-center`
   - Confirm indexing allowed, no coverage issues

2. **Rich Results Test** (search.google.com/test/rich-results)
   - Validate JSON-LD for car accident hub, location pages
   - Confirm no errors, FAQ/Service/MedicalClinic recognized

3. **Canonical**
   - View page source; confirm `<link rel="canonical">` matches final URL
   - Verify absolute URLs (https://primaryuc.com/...)

4. **Open Graph / Twitter**
   - Use Facebook Sharing Debugger or similar
   - Confirm OG images load (absolute URLs)
   - Confirm title/description match metadata

5. **Sitemap**
   - Visit https://primaryuc.com/sitemap.xml
   - Confirm car accident + location routes present
   - Confirm `<lastmod>` present

6. **Internal Links**
   - Location pages: confirm link to `/car-accident-injury-clinic` with "car accident urgent care"
   - Car accident pages: confirm "Book a Car Accident Exam" links to `/appointment`
