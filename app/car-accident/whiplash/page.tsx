import { Metadata } from "next";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";

const baseUrl = 'https://primaryuc.com';

// Single source of truth for visible FAQ + JSON-LD FAQPage schema.
// Round 2 (Feb 2026) flagged schema/visible-content mismatch as the rich-results blocker;
// keeping this array referenced by both component and schema prevents drift.
const whiplashFaqs = [
  {
    question: "How long does whiplash last after a car accident?",
    answer:
      "Most whiplash injuries improve within 2 to 6 weeks with appropriate care, though symptoms typically build over the first 24 to 72 hours before they start to ease. More significant soft-tissue injury can take several months to fully resolve, and a small share of patients develop chronic neck pain after whiplash that lasts longer than three months, and a smaller subset have symptoms that persist past six months. Early evaluation and a documented treatment plan reduce the risk of long-term symptoms.",
  },
  {
    question: "What are the signs of whiplash after a car accident?",
    answer:
      "The most common signs of whiplash after a car accident are neck pain, neck stiffness, reduced range of motion, headache, dizziness, jaw discomfort, and shoulder pain. Some patients also experience tingling or numbness down the arms and hands. Symptoms frequently don't appear at the scene of the crash — they build over the next 12 to 72 hours as inflammation peaks. If you walked away from a crash feeling fine and now have any of these symptoms, you should be seen.",
  },
  {
    question: "How to treat whiplash from a car accident?",
    answer:
      "Whiplash treatment after a car accident typically combines short-term pain control (anti-inflammatory medications, ice or heat as appropriate), gentle range-of-motion exercises started early, and graduated activity rather than prolonged rest or immobilization. Severe cases may need physical therapy referral or imaging to rule out disc injury. At PrimaryUC, your car accident doctor will examine your neck, screen for nerve involvement, image if indicated, and walk you through a recovery plan plus self-care steps you can start at home.",
  },
  {
    question: "Do I need an X-ray or MRI for whiplash?",
    answer:
      "Imaging depends on your exam and symptoms. X-ray helps rule out cervical fracture, and MRI is recommended when there's concern for disc injury, ligament tear, or nerve compression — for example, when symptoms include arm numbness, tingling, weakness, or severe neck pain. We have onsite digital X-ray and can read it during your visit; MRI referrals are coordinated when indicated.",
  },
  {
    question: "Why should I see a whiplash injury doctor instead of just a chiropractor?",
    answer:
      "Both medical doctors and chiropractors can satisfy Florida's 14-day PIP rule for initial services, but only a medical doctor, osteopathic physician, dentist, physician assistant, or advanced practice registered nurse can certify the emergency medical condition needed to access the full $10,000 PIP medical benefit. Without that certification, PIP benefits are capped at $2,500. A medical evaluation also includes imaging and nerve checks that fall outside the chiropractic scope. Chiropractic care can be a valuable follow-up for soft-tissue rehabilitation after the initial medical workup is complete.",
  },
  {
    question: "When does whiplash become chronic neck pain?",
    answer:
      "When whiplash symptoms persist beyond about three months, the condition is typically described as chronic neck pain. Persistence past roughly six months is sometimes referred to in the medical literature as late whiplash syndrome. Risk factors for chronification include severe initial symptoms, pre-existing neck problems, delayed evaluation, and inadequate early treatment. Catching whiplash early, documenting it properly, and following through with treatment significantly reduces the risk of ongoing chronic neck pain.",
  },
  {
    question: "Can whiplash symptoms get worse over time?",
    answer:
      "Yes — particularly in the first few days. Adrenaline at the scene of a crash typically masks pain, and inflammation from soft-tissue injury peaks at 24 to 72 hours. It's common for patients who felt fine at the scene to wake up with significantly worse stiffness and pain the next morning, with symptoms continuing to intensify for several days. Documenting symptom progression with an early medical visit also matters for any PIP or personal injury claim.",
  },
];

import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";

export const metadata: Metadata = {
  title: "Whiplash Treatment After Car Accident | Palm Beach Doctor | PrimaryUC",
  description: "Whiplash treatment & same-day exam after a car accident in Palm Beach County. Onsite X-ray, PIP documentation, recovery plan. Walk-ins welcome at 4 locations.",
  openGraph: {
    title: "Whiplash Treatment After Car Accident | Palm Beach Doctor | PrimaryUC",
    description: "Whiplash treatment & same-day exam after a car accident in Palm Beach County. Onsite X-ray, PIP documentation, recovery plan. Walk-ins welcome at 4 locations.",
    url: `${baseUrl}/car-accident/whiplash`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/whiplash-hero-image.png`,
        width: 1200,
        height: 630,
        alt: "Whiplash injury doctor performing neck range-of-motion exam on car accident patient in Palm Beach County urgent care",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Whiplash Treatment After Car Accident | Palm Beach Doctor | PrimaryUC",
    description: "Whiplash treatment & same-day exam after a car accident in Palm Beach County. Onsite X-ray, PIP documentation, recovery plan. Walk-ins welcome at 4 locations.",
    images: [`${baseUrl}/whiplash-hero-image.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/car-accident/whiplash` }
};

export default function Page() {
  const pageUrl = `${baseUrl}/car-accident/whiplash`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: "Whiplash Treatment", url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: "Whiplash treatment after car accident",
    description: "Comprehensive evaluation and treatment of whiplash injuries sustained in car accidents. Same-day neck exam, X-ray, PIP documentation.",
    provider: "https://primaryuc.com/#clinic",
    areaServed: ["Palm Beach County", "Royal Palm Beach", "Lake Worth", "Palm Springs", "Lantana"],
    url: pageUrl
  });

  const whiplashConditionSchema = {
    "@type": "MedicalCondition",
    name: "Whiplash",
    alternateName: "Cervical sprain/strain",
    possibleTreatment: [
      "Pain management",
      "Anti-inflammatory medications",
      "Physical therapy",
      "Neck exercises",
      "Activity modification"
    ],
    signOrSymptom: [
      "Neck pain",
      "Neck stiffness",
      "Headaches",
      "Shoulder pain",
      "Dizziness",
      "Jaw discomfort",
      "Reduced range of motion"
    ]
  };

  const webPageSchema = {
    "@type": "MedicalWebPage",
    name: "Whiplash After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC",
    url: pageUrl,
    description: "Whiplash treatment at Palm Beach County urgent care. Same-day neck exam, X-ray & PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    about: {
      "@type": "MedicalCondition",
      name: "Whiplash Injury"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/whiplash-hero-image.png`,
      width: 1200,
      height: 630
    }
  };

  // FAQPage schema derived from the whiplashFaqs const above — schema cannot drift from visible content.
  const faqObj = {
    "@type": "FAQPage",
    mainEntity: whiplashFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    whiplashConditionSchema,
    serviceSchema,
    faqObj
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Whiplash Treatment After a Car Accident — Palm Beach County"
        subtitle={
          <p>
            Neck pain, stiffness, or headaches after a crash can be a sign of whiplash. Our whiplash injury doctors examine your neck, screen for nerve involvement, X-ray to rule out fracture, and document everything for your PIP claim — all in a single same-day visit.
          </p>
        }
        checklist={[
          "Comprehensive neck mobility and neurologic exam",
          "Onsite X-ray; MRI referrals when indicated",
          "Whiplash recovery plan and PIP-ready documentation",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Whiplash Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/whiplash-hero-image.png"
      />

      {/* Trust Badges */}
      <TrustBadges />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Signs of Whiplash After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Whiplash injury symptoms are typically caused by a rapid back-and-forth motion of the neck — the same motion produced by a rear-end, side-impact, or sudden-stop crash. Here are the signs of whiplash after a car accident our doctors evaluate most often:
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Whiplash Injury Symptoms to Watch For</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Whiplash neck pain</strong> — soreness, sharp pain, or stiffness when turning the head</li>
              <li>Reduced range of motion (turning, looking up, looking down)</li>
              <li>Headaches at the base of the skull or radiating to the temples</li>
              <li>Dizziness, jaw pain (TMJ irritation), or shoulder pain</li>
              <li><strong>Whiplash nerve damage symptoms</strong> — numbness, tingling, or weakness in the arms or hands</li>
              <li>Symptoms that begin hours or days after the crash, not immediately</li>
              <li>Trouble concentrating, feeling &quot;foggy,&quot; or sleep disturbances</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Whiplash Symptom Timeline — When Does Pain Start?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Most patients feel only shaken or sore immediately after a crash. Adrenaline at the scene typically suppresses pain for several hours, and inflammation from the soft-tissue injury then builds over the following 24 to 72 hours. Seeking care early creates a documented timeline that links your symptoms to the collision and allows a provider to rule out more serious problems.
          </p>
          <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Most patients don&apos;t feel whiplash pain until the next day</h3>
            <p className="text-gray-700 mb-4">
              Delayed-onset pain is common with whiplash injuries. Even if you feel fine immediately after the accident, neck stiffness, headaches, and pain often appear 12 to 48 hours later. Early evaluation matters for two reasons: it documents the connection between the crash and your symptoms for your PIP claim, and Florida&apos;s 14-day PIP rule starts counting from the date of the accident, not the date your symptoms appeared.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Expect During a Whiplash Exam</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Our comprehensive whiplash evaluation includes several key components:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">History & Crash Mechanism</h3>
              <p className="text-gray-700">We'll ask about the collision details, how your symptoms started, and when they began. Understanding the crash mechanism helps us identify potential injury patterns.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neck & Upper-Back Exam</h3>
              <p className="text-gray-700">Comprehensive examination of your neck, shoulders, and upper back including range-of-motion testing, palpation for tenderness, and assessment of muscle spasm.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neurologic Checks</h3>
              <p className="text-gray-700">We test strength, sensation, and reflexes in your arms and hands to check for nerve involvement. This helps rule out more serious spinal cord injuries.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Imaging Decisions</h3>
              <p className="text-gray-700">Based on your exam and symptoms, we may recommend X-ray to rule out fractures or MRI if soft-tissue or disc injury is suspected. We have onsite X-ray capabilities for immediate results.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">How to Treat Whiplash After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Whiplash treatment combines short-term pain management with graduated activity rather than prolonged rest or rigid immobilization. The current evidence base — including guidance from the Quebec Task Force on Whiplash-Associated Disorders and contemporary musculoskeletal literature — supports the following approach:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li><strong>Anti-inflammatory medications</strong> (NSAIDs) for the first 1–2 weeks, dosed as appropriate to your medical history</li>
            <li><strong>Ice in the first 48–72 hours</strong> to reduce acute swelling; heat thereafter for muscle relaxation</li>
            <li><strong>Gentle range-of-motion exercises</strong> started early — long periods of rest or hard cervical collars are no longer recommended for most whiplash injuries</li>
            <li><strong>Whiplash injury self-care</strong> — sleep posture adjustments, gradual return to normal activity, avoiding sudden head movements during the acute phase</li>
            <li><strong>Physical therapy referral</strong> when symptoms persist past 2 weeks or when range-of-motion remains significantly limited</li>
            <li><strong>Specialist referral</strong> (orthopedic spine, neurology) for any patient with persistent radicular symptoms — arm numbness, weakness, or pain shooting down a limb</li>
            <li><strong>Ongoing follow-up</strong> to monitor recovery and adjust the plan</li>
          </ul>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            For most whiplash injuries, the goal is to keep the neck mobile and gradually return to normal activity while controlling pain. Patients who keep moving generally recover faster than patients who immobilize.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When Whiplash Becomes Chronic Neck Pain</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Most whiplash injuries resolve within 2 to 6 weeks. A meaningful minority of patients develop <strong>chronic neck pain after whiplash</strong> — typically defined as symptoms that persist beyond about three months. When symptoms continue past roughly six months, the condition is sometimes described in the medical literature as late whiplash syndrome. Risk factors for chronification include severe initial pain, pre-existing neck problems, delayed evaluation, inadequate early treatment, and high psychological distress at the time of injury.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            The strongest protective factors are early medical evaluation, accurate diagnosis (ruling out fracture or disc injury), early initiation of graduated activity, and consistent follow-up. If your whiplash symptoms have not improved meaningfully by 6 weeks, a re-evaluation — including MRI consideration and possible specialist referral — is warranted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Why See a Whiplash Injury Doctor and Not Just a Chiropractor</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Both medical doctors and chiropractors can satisfy <strong>Florida&apos;s 14-day PIP rule</strong> for initial services after a car accident. But only a medical doctor, osteopathic physician, dentist, physician assistant, or advanced practice registered nurse can certify the emergency medical condition needed to access the full $10,000 PIP medical benefit — without that certification, PIP medical benefits are capped at $2,500.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            A whiplash injury doctor at urgent care can also order and read on-site X-ray to rule out cervical fracture, refer for MRI when soft-tissue or nerve injury is suspected, manage acute pain medically, and generate the kind of PIP-compliant evaluation note your insurance carrier and any attorney you retain will need. Chiropractic care can be a valuable follow-up for soft-tissue rehabilitation — but most patients are better served starting with a medical workup that satisfies the EMC requirement and the imaging needs that fall outside the chiropractic scope.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            See our <a className="text-[#2563eb] underline hover:text-[#1d4ed8]" href="/car-accident-injury-clinic">car accident injury clinic page</a> for the full picture of what an urgent care visit looks like, or our <a className="text-[#2563eb] underline hover:text-[#1d4ed8]" href="/car-accident/documentation-pip">PIP documentation guide</a> for what specifically must be in the record.
          </p>
        </section>

        <RelatedTopics 
          topics={[
            { title: "Back & Neck Pain", href: "/car-accident/back-neck-pain" },
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />

        <AccidentFAQ
          title="Whiplash After a Car Accident — Frequently Asked Questions"
          faqs={whiplashFaqs}
        />

        {/* Internal Links Section */}
        <AccidentInternalLinks />
        </div>
      </div>
    </main>
  );
}