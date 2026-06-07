import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import RedFlagChecklist from "@/components/accident/RedFlagChecklist";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import AccidentInfoSection from "@/components/accident/AccidentInfoSection";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

// Single source of truth for visible FAQ + JSON-LD FAQPage schema.
const backNeckFaqs = [
  {
    question: "When should I see a doctor for back pain after a car accident?",
    answer:
      "If you have any back pain after a car accident in Florida, you should be evaluated within 14 days of the crash to preserve your PIP benefits. The most urgent presentations — severe pain, loss of bladder or bowel control, leg weakness, or pain that radiates down a leg — require ER care immediately. Moderate back or neck pain with normal neurological function is appropriate for same-day urgent care evaluation. Even mild soreness is worth a visit because delayed-onset back pain after a car accident is extremely common, and Florida's PIP clock runs from the crash date, not from the day your symptoms started.",
  },
  {
    question: "Why does back pain show up days after a car accident?",
    answer:
      "Delayed back pain after a car accident is the rule, not the exception. Adrenaline at the scene of a crash typically suppresses pain for several hours, and inflammation from injured muscles, ligaments, and discs builds gradually over the following 24 to 72 hours. Many patients with significant lumbar or cervical injuries first notice meaningful pain the morning after the accident — or even two or three days later. Delayed onset does not mean the injury is minor; it reflects normal post-trauma physiology.",
  },
  {
    question: "What kinds of back and neck injuries happen in car accidents?",
    answer:
      "Most common: muscle strains and ligament sprains from sudden impact forces. Also common: facet joint irritation (the small joints between vertebrae), herniated or bulging discs in the neck (cervical) or lower back (lumbar), and nerve-root irritation that causes shooting pain, tingling, or weakness in an arm or leg. Less common but more serious: compression fractures (more frequent in older patients and higher-energy crashes), spinal cord injury, and instability. Imaging is the only reliable way to distinguish soft-tissue injuries from structural injuries.",
  },
  {
    question: "Do I need an MRI or just an X-ray for back pain after a car accident?",
    answer:
      "X-ray is the first-line imaging study because it rules out fracture and gross instability and can be done on-site in minutes. MRI is the better study for soft-tissue and disc injury, nerve compression, or ligament damage, and is typically ordered when symptoms include numbness, weakness, radicular pain (pain radiating down an arm or leg), or when symptoms aren't improving with conservative care. We do digital X-ray on-site at PrimaryUC; MRI is coordinated via referral when indicated.",
  },
  {
    question: "Why see a medical doctor for back pain instead of going straight to a chiropractor?",
    answer:
      "Both medical doctors and chiropractors can satisfy Florida's 14-day PIP rule for initial services. The legal difference is that only a medical doctor, osteopathic physician, dentist, physician assistant, or advanced practice registered nurse can certify the emergency medical condition needed to access the full $10,000 PIP medical benefit — without that certification, PIP benefits cap at $2,500. The clinical difference is that a medical doctor can order and read X-ray on-site, refer for MRI, and perform a full neurological exam to rule out the dangerous causes of back pain (disc herniation with nerve compression, cauda equina, fracture). Chiropractic care can be a valuable follow-up for soft-tissue rehabilitation once those serious causes have been ruled out.",
  },
  {
    question: "How long does back pain last after a car accident?",
    answer:
      "Mild muscle strains and soft-tissue injuries typically improve within 2 to 6 weeks with appropriate care. Moderate disc-related or facet-joint injuries can take several weeks to months. A subset of patients develop chronic back pain — defined as symptoms persisting past about three months — particularly if the initial injury was severe, evaluation was delayed, or there's a pre-existing spinal condition. Early evaluation, accurate diagnosis, and a documented treatment plan all reduce the risk of chronification.",
  },
  {
    question: "Can back pain after a car accident come back years later?",
    answer:
      "Yes. Patients sometimes return with back pain 1 to 2 years after a car accident, particularly when the initial injury was undertreated or when imaging missed a disc or facet injury. Post-traumatic degenerative changes can also develop on top of the original injury. A new evaluation is appropriate any time post-accident back pain recurs — and your original PIP visit records make it easier to demonstrate the link to the original collision if needed for a separate claim.",
  },
];

export const metadata: Metadata = {
  title: "Back Pain After a Car Accident | Same-Day Exam, PIP | PrimaryUC",
  description:
    "Back pain or neck pain after a car accident in Palm Beach County. Same-day spinal exam, onsite X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
  alternates: { canonical: `${baseUrl}/car-accident/back-neck-pain` },
  openGraph: {
    title: "Back Pain After a Car Accident | Same-Day Exam, PIP | PrimaryUC",
    description:
      "Back pain or neck pain after a car accident in Palm Beach County. Same-day spinal exam, onsite X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    url: `${baseUrl}/car-accident/back-neck-pain`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/back-pain-hero.png`,
        width: 1200,
        height: 630,
        alt: "Doctor performing spinal exam for back pain and neck pain after car accident in Palm Beach County urgent care",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Back Pain After a Car Accident | Same-Day Exam, PIP | PrimaryUC",
    description: "Back pain after a car accident? Same-day spinal exam, X-ray & PIP documentation at Palm Beach County urgent care. Walk-ins welcome.",
    images: [`${baseUrl}/back-pain-hero.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const pageUrl = `${baseUrl}/car-accident/back-neck-pain`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: "Back & Neck Pain", url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: "Back and neck pain treatment after car accident",
    description: "Comprehensive evaluation and treatment of back and neck pain sustained in car accidents. Same-day spinal exam, X-ray, PIP documentation.",
    provider: "https://primaryuc.com/#clinic",
    areaServed: ["Palm Beach County", "Royal Palm Beach", "Lake Worth", "Palm Springs", "Lantana"],
    url: pageUrl
  });

  const spinalConditionSchema = {
    "@type": "MedicalCondition",
    name: "Spinal injuries after motor vehicle collision",
    alternateName: "Back and neck pain after car accident",
    possibleTreatment: [
      "Pain management",
      "Anti-inflammatory medications",
      "Physical therapy",
      "Spinal exercises",
      "Activity modification",
      "Specialist referral"
    ],
    signOrSymptom: [
      "Back pain",
      "Neck pain",
      "Muscle spasm",
      "Reduced range of motion",
      "Numbness or tingling",
      "Weakness",
      "Shooting pain"
    ]
  };

  const webPageSchema = {
    "@type": "MedicalWebPage",
    name: "Back & Neck Pain After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC",
    url: pageUrl,
    description: "Back & neck pain after a car accident? Same-day spinal exam, X-ray & PIP documentation at Palm Beach County urgent care. Walk-ins welcome.",
    about: {
      "@type": "MedicalCondition",
      name: "Spinal Injury After Motor Vehicle Collision"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/back-pain-hero.png`,
      width: 1200,
      height: 630
    }
  };

  // FAQPage schema derived from the backNeckFaqs const — schema cannot drift from visible content.
  const faqObj = {
    "@type": "FAQPage",
    mainEntity: backNeckFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    spinalConditionSchema,
    serviceSchema,
    faqObj,
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Back Pain & Neck Pain After a Car Accident — Palm Beach County"
        subtitle={
          <p>
            Back pain or neck pain after a car accident — even delayed-onset pain that starts days later — needs evaluation. Our car accident doctors examine your spine, screen for nerve involvement, X-ray on-site, and generate PIP-compliant documentation in a single same-day visit.
          </p>
        }
        checklist={[
          "Spinal, neurologic, and range-of-motion examination",
          "Red-flag screening for injuries that require the ER",
          "Onsite X-ray; MRI referrals when indicated",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Back & Neck Pain Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/back-pain-hero.png"
      />

      {/* Trust Badges */}
      <TrustBadges />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Delayed Back Pain & Delayed Neck Pain After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Delayed-onset back pain after a car accident is the rule, not the exception. Two physiological factors explain it: adrenaline at the scene typically suppresses pain for several hours, and inflammation from injured muscles, ligaments, and discs builds gradually over the following 24 to 72 hours. Many patients with significant lumbar or cervical injuries first notice meaningful pain the morning after the accident — sometimes two or three days later.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            This matters in two ways. Clinically, late-onset pain is not a sign of a minor injury — it&apos;s the normal post-trauma timeline. Legally, Florida&apos;s 14-day PIP rule counts from the date of the accident, not the date your symptoms started. If your back pain shows up on day five, you still have only nine days left to be seen and preserve your PIP benefits.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Upper Back, Middle Back & Lower Back Pain — What&apos;s the Difference?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Where the pain is located helps narrow what&apos;s going on, what imaging makes sense, and what the recovery looks like:
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lower Back Pain After a Car Accident</h3>
              <p className="text-gray-700">The most common location for post-accident back pain. Typically involves lumbar muscle strain, facet joint irritation, or — in higher-energy crashes — disc herniation or compression fracture. Pain that radiates down a leg (sciatica), is accompanied by leg weakness or numbness, or involves loss of bladder or bowel control is a red-flag presentation requiring immediate evaluation.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upper Back Pain After a Car Accident</h3>
              <p className="text-gray-700">Less common than lower back but frequently seen after side-impact crashes, seatbelt loading, or airbag deployment. Often involves thoracic muscle strain, rib or sternocostal injury, and thoracic-spine facet irritation. Upper back pain combined with chest pain or shortness of breath should be evaluated promptly to rule out rib fracture or intrathoracic injury.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Middle Back Pain After a Car Accident</h3>
              <p className="text-gray-700">Pain between the shoulder blades or in the mid-thoracic region, typically from seatbelt loading or postural strain at the moment of impact. Usually responds well to anti-inflammatory medications, postural correction, and graduated activity.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neck Pain After a Car Accident</h3>
              <p className="text-gray-700">Most often involves cervical strain or whiplash from rear-end and side-impact crashes. Symptoms can include reduced range of motion, headaches at the base of the skull, dizziness, and pain or numbness radiating down an arm. See our <Link className="text-[#2563eb] underline hover:text-[#1d4ed8]" href="/car-accident/whiplash">whiplash treatment guide</Link> for a deeper breakdown.</p>
            </div>
          </div>
        </section>

        {/* Red Flag Checklist */}
        <RedFlagChecklist />

        <AccidentInfoSection
          title="When to Choose Urgent Care vs ER for Back & Neck Pain"
          items={[
            {
              icon: <></>,
              title: "Urgent Care is Usually Appropriate When",
              description:
                "Pain is moderate but you can walk, move, and control your bladder and bowels. There is no major head injury or chest pain.",
              type: "primary"
            },
            {
              icon: <></>,
              title: "Go Straight to the ER If You Have",
              description:
                "Severe weakness, loss of bladder/bowel control, major trauma, trouble breathing, or a serious head injury. Call 911 if in doubt.",
              type: "warning"
            }
          ]}
          className="bg-white mb-10"
        />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Common Back & Neck Injuries After Car Accidents</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Motor vehicle collisions can cause various types of spinal injuries:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li><strong>Muscle strains and ligament sprains</strong> from sudden impact forces during the collision</li>
            <li><strong>Herniated or bulging discs</strong> in the neck or lower back from compression and twisting forces</li>
            <li><strong>Compression fractures</strong> in higher-energy collisions, especially in older patients or severe crashes</li>
            <li><strong>Facet joint irritation and inflammation</strong> commonly seen after whiplash-type injuries</li>
            <li><strong>Nerve root irritation</strong> causing shooting pain, tingling, or weakness in arms or legs</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">How Back & Neck Evaluations Are Done</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Our comprehensive evaluation process includes multiple components:
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spine Exam</h3>
              <p className="text-gray-700">We assess your entire spine for tenderness, muscle spasm, joint restriction, and alignment issues. This helps identify the specific areas affected by the collision.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neurologic Exam</h3>
              <p className="text-gray-700">Comprehensive testing of strength, sensation, and reflexes helps identify nerve involvement. This is critical for determining the severity of your injury and whether emergency care is needed.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Imaging Decisions</h3>
              <p className="text-gray-700">Based on your exam findings, we determine when X-ray, MRI, or CT imaging is needed. We have onsite X-ray capabilities and can arrange advanced imaging referrals when indicated. Imaging helps rule out fractures, disc injuries, and other serious conditions.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Recovery Timelines & Follow-Up</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Recovery from back and neck injuries varies based on the severity and type of injury:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li><strong>Mild strains:</strong> Often improve within a few weeks with proper treatment and activity modification</li>
            <li><strong>Moderate injuries:</strong> May take several weeks to months with ongoing treatment and physical therapy</li>
            <li><strong>More significant injuries:</strong> Can take several months with specialist care and rehabilitation</li>
            <li><strong>Follow-up care:</strong> We provide ongoing monitoring and can adjust your treatment plan as your recovery progresses</li>
            <li><strong>Specialist referrals:</strong> When needed, we coordinate referrals to orthopedic surgeons, neurologists, or physical therapists</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Why See a Medical Doctor for Back Pain After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Both medical doctors and chiropractors can satisfy <strong>Florida&apos;s 14-day PIP rule</strong> for initial services after a car accident. But only a medical doctor, osteopathic physician, dentist, physician assistant, or advanced practice registered nurse can certify the emergency medical condition needed to access the full $10,000 PIP medical benefit — without that certification, PIP medical benefits are capped at $2,500.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            For back and neck pain specifically, the clinical reason to start with a medical doctor is also strong: a medical workup can order and read X-ray on-site, refer for MRI when nerve involvement or disc injury is suspected, and perform a full neurological exam to screen for the dangerous causes of post-accident back pain (significant disc herniation with nerve compression, cauda equina syndrome, occult fracture). Chiropractic care can be a valuable follow-up for soft-tissue rehabilitation once those serious causes have been ruled out.
          </p>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            See our <Link className="text-[#2563eb] underline hover:text-[#1d4ed8]" href="/car-accident/documentation-pip">PIP documentation guide</Link> for what specifically must be in the record.
          </p>
        </section>

        <RelatedTopics
          topics={[
            { title: "Whiplash", href: "/car-accident/whiplash" },
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />

        <AccidentFAQ
          title="Back & Neck Pain After a Car Accident — Frequently Asked Questions"
          faqs={backNeckFaqs}
        />

        {/* Internal Links Section */}
        <AccidentInternalLinks />
        </div>
      </div>
    </main>
  );
}
