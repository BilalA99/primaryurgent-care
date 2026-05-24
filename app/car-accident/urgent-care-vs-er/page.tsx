import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import ComparisonTable from "@/components/accident/ComparisonTable";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

// Single source of truth for visible FAQ + JSON-LD FAQPage schema.
const ucerFaqs = [
  {
    question: "Should I go to urgent care or the ER after a car accident?",
    answer:
      "For most non-life-threatening symptoms after a car accident — whiplash, neck or back pain, headache, soft-tissue injury, joint pain, minor lacerations — urgent care is the appropriate setting. Urgent care handles the exam, on-site digital X-ray, and PIP-compliant documentation in a single visit. Go directly to the ER for severe chest pain, loss of consciousness, signs of internal bleeding, neurological deficits, uncontrolled bleeding, or any symptom that suggests a life-threatening injury. When in doubt about severity, the ER is the safer choice.",
  },
  {
    question: "Should I go to the ER after a car accident if I feel fine?",
    answer:
      "If you have no symptoms at the scene of a crash and are clinically stable, the ER is not typically the right setting. Urgent care is the appropriate place for evaluation, documentation, and Florida 14-day PIP rule compliance — and it'll be faster, lower cost, and produce the same quality medical record. If you develop symptoms later (headache, neck pain, dizziness, abdominal pain), seek care as soon as they appear — even mild delayed-onset symptoms after a crash deserve evaluation.",
  },
  {
    question: "Can I go to urgent care after a car accident in Florida?",
    answer:
      "Yes. Urgent care is an appropriate setting for the majority of post-accident injuries, and a PrimaryUC urgent care visit satisfies Florida's 14-day PIP rule for initial services. Our medical doctors can also certify the emergency medical condition needed to access the full $10,000 PIP medical cap — something neither a chiropractor nor a physical therapist can do under Florida law.",
  },
  {
    question: "When should I go straight to the ER after a car accident?",
    answer:
      "Go straight to the ER or call 911 for any of these red-flag presentations: severe chest pain or trouble breathing, uncontrolled bleeding, obvious major fractures or visible deformity, loss of consciousness, seizure, confusion that persists or worsens, signs of internal bleeding (severe abdominal pain, distended belly, signs of shock), spinal-cord-injury concern (leg weakness, loss of bladder or bowel control), or any symptom that worsens rapidly. When in doubt about severity, the ER is the right call.",
  },
  {
    question: "How much does urgent care vs ER cost after a car accident?",
    answer:
      "Urgent care visits are typically a fraction of the cost of an ER visit for the same complaint. ER visits carry higher facility fees, separate physician fees, and often involve hospital-grade billing even for non-life-threatening complaints. Both settings are typically covered by Florida PIP when the visit is documented as reasonable and medically necessary — but cost-effectiveness still matters because PIP medical benefits are capped at $10,000 (with EMC certification) or $2,500 (without), and ER charges can consume that budget rapidly. For exact pricing in your situation, contact our front desk or your insurance carrier.",
  },
  {
    question: "Does Florida PIP cover both urgent care and ER visits?",
    answer:
      "Yes. Florida PIP (Personal Injury Protection) coverage applies to both urgent care and emergency room visits when the care is reasonable, medically necessary, and related to the crash — provided you receive initial services within 14 days of the accident. Both settings can satisfy the 14-day rule. The $10,000 vs $2,500 PIP medical cap is determined by whether a qualifying provider (MD, DO, PA, APRN, or dentist) certifies an emergency medical condition — not by which setting you visited.",
  },
  {
    question: "How long do you wait at urgent care vs the ER after a car accident?",
    answer:
      "Urgent care wait times for car accident patients are typically much shorter than ER wait times for the same complaint. Most urgent cares treat by arrival order within urgency level; ERs treat strictly by triage severity, which means a stable post-accident patient with neck pain often waits behind life-threatening cases. At PrimaryUC, we accept walk-ins and prioritize accident-related visits. For exact current wait times, call ahead to your nearest location.",
  },
];

export const metadata: Metadata = {
  title: "Urgent Care or ER After a Car Accident? | Palm Beach Guide",
  description:
    "Should you go to urgent care or the ER after a car accident? Florida PIP-aware guide to when UC is safe, when ER is required, costs, wait times, and 14-day rule.",
  alternates: { canonical: `${baseUrl}/car-accident/urgent-care-vs-er` },
  openGraph: {
    title: "Urgent Care or ER After a Car Accident? | Palm Beach Guide",
    description:
      "Should you go to urgent care or the ER after a car accident? Florida PIP-aware guide to when UC is safe, when ER is required, costs, wait times, and 14-day rule.",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/car-crash-woman-on-call.jpg`,
        width: 1200,
        height: 630,
        alt: "Urgent care vs ER after a car accident decision guide for Palm Beach County drivers",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Urgent Care or ER After a Car Accident? | Palm Beach Guide",
    description: "Urgent care or ER after a car accident? Florida PIP-aware decision guide with red-flag list, costs, wait times, and 14-day rule compliance.",
    images: [`${baseUrl}/car-crash-woman-on-call.jpg`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const pageUrl = `${baseUrl}/car-accident/urgent-care-vs-er`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: "Urgent Care vs ER", url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: "Car accident urgent care evaluation",
    description: "Guidance on when urgent care vs ER is appropriate after a car accident. Cost comparison, wait times, PIP coverage.",
    provider: "https://primaryuc.com/#clinic",
    areaServed: ["Palm Beach County", "Royal Palm Beach", "Lake Worth", "Palm Springs", "Lantana"],
    url: pageUrl
  });

  // FAQPage schema derived from the ucerFaqs const — schema cannot drift from visible content.
  const faqSchemaObj = {
    "@type": "FAQPage",
    mainEntity: ucerFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Car Accident: Urgent Care vs ER | Palm Beach Guide",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    description: "Urgent care vs ER after a car accident in Palm Beach County. Cost, wait times & PIP coverage compared. Know when UC is safe vs when ER is critical.",
    about: {
      "@type": "Service",
      name: "Car Accident Medical Decision Guidance"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/car-crash-woman-on-call.jpg`,
      width: 1200,
      height: 630
    }
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    serviceSchema,
    faqSchemaObj
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Urgent Care or ER After a Car Accident? — Palm Beach Guide"
        subtitle={
          <p>
            Not every crash requires the ER, and not every crash should default to urgent care either. This guide walks through when urgent care is the appropriate setting, when the ER is required, the cost and wait-time differences, and how Florida PIP applies to both — including the emergency medical condition determination that controls your $10,000 vs $2,500 PIP medical cap.
          </p>
        }
        checklist={[
          "Red-flag list for ER-level symptoms",
          "Florida 14-day PIP rule applies to both settings",
          "EMC certification by a qualifying medical provider",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Check If Urgent Care Is Right for You" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/car-crash-woman-on-call.jpg"
      />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Comparison Table */}
      <ComparisonTable />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Deciding Between Urgent Care and ER</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            The decision depends on the severity of your symptoms and the type of injuries you've sustained. Here's guidance to help you choose:
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">When Urgent Care Is Usually Appropriate</h3>
            <p className="text-gray-700 mb-3">Urgent care is typically safe for stable patients with moderate symptoms:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Neck or back pain without severe weakness or numbness</li>
              <li>Mild head injury with no loss of consciousness and no red-flag symptoms</li>
              <li>Sprains, strains, and suspected simple fractures</li>
              <li>Lacerations that may need stitches but are controlled</li>
              <li>Seatbelt bruises and soft-tissue pain</li>
            </ul>
            <p className="text-gray-700">If you can walk, breathe normally, and don't have severe chest pain or uncontrolled bleeding, urgent care may be the right choice.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">When You Should Go Straight to the ER</h3>
            <p className="text-gray-700 mb-3 text-[#D52128] font-semibold">Always err on the side of caution. Go to the ER or call 911 for:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Severe chest pain or trouble breathing</li>
              <li>Uncontrolled bleeding or obvious major fractures</li>
              <li>Loss of consciousness, seizure, or confusion after the crash</li>
              <li>Weakness, numbness, or inability to move an arm or a leg</li>
              <li>Severe abdominal pain or signs of internal bleeding</li>
            </ul>
            <p className="text-gray-700 font-semibold">When in doubt about the severity of your condition, it's always safer to seek emergency care immediately.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Cost &amp; Wait Time — Urgent Care vs ER After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Specific cost and wait times vary by facility, insurance, and your specific complaint. The general patterns are consistent:
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-xl p-6 border-2 border-[#16A34A]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Urgent Care After a Car Accident</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Wait times:</strong> Typically much shorter than the ER for non-life-threatening complaints — walk-in queueing rather than acuity-based triage</li>
                <li><strong>Cost:</strong> Lower facility fees and copays than the ER for a comparable visit</li>
                <li><strong>Scope:</strong> Exam, on-site digital X-ray, and PIP-compliant documentation in a single visit</li>
                <li><strong>EMC certification:</strong> Available when your medical doctor determines you have an emergency medical condition — this is the determination that unlocks your full $10,000 Florida PIP medical cap</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Room After a Car Accident</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Wait times:</strong> Variable and acuity-based — stable patients with non-life-threatening complaints typically wait substantially longer than at urgent care, because the ER must prioritize critical cases first</li>
                <li><strong>Cost:</strong> Higher facility fees, separate physician fees, and hospital-grade billing — even for non-emergent presentations</li>
                <li><strong>Scope:</strong> The right setting when a life-threatening injury is possible — CT/MRI on demand, surgical consults, intensive monitoring</li>
                <li><strong>PIP impact:</strong> ER charges can consume a significant share of your $10,000 PIP medical cap quickly, leaving less budget for follow-up imaging, specialist visits, and rehabilitation</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Florida PIP Covers Both Settings</h3>
              <p className="text-gray-700">
                Florida PIP applies to both urgent care and ER visits when the care is reasonable, medically necessary, and related to the crash — provided the initial visit happens within 14 days of the accident. The $10,000 vs $2,500 PIP medical cap is determined by whether a qualifying provider (MD, DO, PA, APRN, or dentist) certifies an emergency medical condition, not by which setting you visited. See our <Link className="text-[#2563eb] underline hover:text-[#1d4ed8]" href="/car-accident/documentation-pip">PIP documentation and 14-day rule guide</Link> for the full breakdown.
              </p>
            </div>
          </div>
        </section>

        <RelatedTopics 
          topics={[
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Whiplash", href: "/car-accident/whiplash" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />
        </div>
      </div>

      {/* FAQ Section */}
      <AccidentFAQ
        title="Urgent Care or ER After a Car Accident — Frequently Asked Questions"
        faqs={ucerFaqs}
      />

      {/* Internal Links Section */}
      <AccidentInternalLinks />
    </main>
  );
}
