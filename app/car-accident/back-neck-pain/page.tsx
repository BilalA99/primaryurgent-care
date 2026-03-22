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
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Back & Neck Pain After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC",
  description:
    "Back & neck pain after car accident at urgent care in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
  alternates: { canonical: `${baseUrl}/car-accident/back-neck-pain` },
  openGraph: {
    title: "Back & Neck Pain After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC",
    description:
      "Back & neck pain after car accident at urgent care in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    url: `${baseUrl}/car-accident/back-neck-pain`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/back-pain-hero.png`,
        width: 1200,
        height: 630,
        alt: "Back and neck pain spinal exam after car accident in Palm Beach County urgent care",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Back & Neck Pain After Car Accident | Car Accident Urgent Care + PIP | PrimaryUC",
    description: "Back & neck pain after car accident at urgent care in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
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
    description: "Back & neck pain after car accident at urgent care in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
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

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    spinalConditionSchema,
    serviceSchema,
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Back & Neck Pain After a Car Crash"
        subtitle={
          <p>
            Back or neck pain after a crash should be taken seriously. Our car-accident doctors evaluate your spine, nerves, and muscles and document everything for PIP and insurance.
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
          <h2 className="text-2xl font-bold text-black mb-3">How We Evaluate Back & Neck Pain After a Crash</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Our comprehensive spinal evaluation includes multiple components to assess your injury:
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spine Exam</h3>
              <p className="text-gray-700">We check for tenderness, muscle spasm, and joint restriction throughout your spine. This helps identify the specific areas affected by the collision.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neurologic Exam</h3>
              <p className="text-gray-700">Strength, sensation, and reflex testing helps identify nerve involvement. This is critical for determining if you need immediate emergency care or if urgent care is appropriate.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Imaging Decisions</h3>
              <p className="text-gray-700">Based on your exam findings, we determine when X-ray, MRI, or CT imaging is needed. We have onsite X-ray capabilities and can arrange advanced imaging referrals when indicated.</p>
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

        <RelatedTopics 
          topics={[
            { title: "Whiplash", href: "/car-accident/whiplash" },
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />

        {/* Internal Links Section */}
        <AccidentInternalLinks />
        </div>
      </div>
    </main>
  );
}
