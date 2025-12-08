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
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Back & Neck Pain After Car Accident | Spine Exam",
  description:
    "Back & neck pain after car accident in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
  alternates: { canonical: `${baseUrl}/car-accident/back-neck-pain` },
  openGraph: {
    title: "Back & Neck Pain After Car Accident | Spine Exam",
    description:
      "Back & neck pain after car accident in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
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
    title: "Back & Neck Pain After Car Accident | Spine Exam",
    description: "Back & neck pain after car accident in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    images: [`${baseUrl}/back-pain-hero.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Car Accident Injury Clinic", item: `${baseUrl}/car-accident-injury-clinic` },
      { "@type": "ListItem", position: 3, name: "Back & Neck Pain", item: `${baseUrl}/car-accident/back-neck-pain` }
    ]
  };

  const backNeckPainSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Back and Neck Pain Treatment After Car Accident",
    description: "Comprehensive evaluation and treatment of back and neck pain sustained in car accidents. Includes spinal assessment, neurologic testing, and imaging when indicated.",
    bodyLocation: "Spine, Back, and Neck",
    preparation: "No special preparation required - walk-ins welcome for immediate evaluation",
    procedureType: "Diagnostic Evaluation and Treatment",
    followup: "Follow-up care and monitoring as needed, specialist referrals when appropriate. Most patients recover within weeks to months with proper treatment.",
    provider: {
      "@type": "MedicalOrganization",
      name: "Primary & Urgent Care Centers",
      url: `${baseUrl}/car-accident/back-neck-pain`
    },
    medicalSpecialty: "Emergency Medicine",
    indication: "Back pain, neck pain, or spinal symptoms following motor vehicle collision. Common after rear-end, side-impact, or head-on collisions.",
    contraindication: "Severe neurological symptoms requiring emergency room evaluation including severe weakness, loss of bladder/bowel control, inability to walk, or signs of spinal cord injury"
  };

  const spinalConditionSchema = {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Back & Neck Pain After Car Accident | Spine Exam",
    url: `${baseUrl}/car-accident/back-neck-pain`,
    description: "Back & neck pain after car accident in Palm Beach County. Same-day spinal exam, X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are warning signs of serious back or neck injury after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Red-flag symptoms include severe pain, numbness or tingling in the arms or legs, weakness, difficulty walking, loss of bladder or bowel control, or worsening neurological symptoms. These may require emergency room evaluation. Our urgent care team can assess your condition and determine the appropriate level of care." }
      },
      {
        "@type": "Question",
        name: "How is back and neck pain diagnosed after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Diagnosis involves a detailed history, spine and neurologic exam, range-of-motion testing, and sometimes imaging such as X-ray or MRI to rule out fractures or disc injury. We have onsite X-ray capabilities and can provide same-day results along with comprehensive documentation for your insurance claim." }
      },
      {
        "@type": "Question",
        name: "What treatment options are available?",
        acceptedAnswer: { "@type": "Answer", text: "Treatment may include pain medications, muscle relaxants, anti-inflammatory therapy, guided exercises, activity modification, and specialist referral when needed. We also provide documentation for PIP and other insurance claims. Our goal is to help you recover while ensuring all necessary medical records are properly documented." }
      },
      {
        "@type": "Question",
        name: "Do I always need imaging?",
        acceptedAnswer: { "@type": "Answer", text: "Not every patient needs imaging. Your provider will decide based on your exam and symptoms. X-ray can rule out fractures, while MRI may be used if soft-tissue or disc injury is suspected. We provide clear explanations of any imaging recommendations and can coordinate referrals when needed." }
      },
      {
        "@type": "Question",
        name: "How long does recovery usually take?",
        acceptedAnswer: { "@type": "Answer", text: "Mild strains often improve within a few weeks. More significant injuries can take several months. Early evaluation, treatment, and follow-up help reduce the risk of chronic pain. We provide ongoing monitoring and can adjust your treatment plan as your recovery progresses." }
      },
      {
        "@type": "Question",
        name: "What should I do immediately after experiencing back or neck pain from a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Seek medical evaluation as soon as possible. Even if pain seems mild initially, some injuries may worsen over time. Early documentation protects your health and insurance claims." }
      },
      {
        "@type": "Question",
        name: "What documentation do you provide for back and neck pain insurance claims?",
        acceptedAnswer: { "@type": "Answer", text: "We provide comprehensive medical documentation including exam findings, imaging results, treatment plans, and visit summaries essential for PIP claims and legal cases. All documentation is provided immediately after your visit." }
      },
      {
        "@type": "Question",
        name: "How much does back and neck pain treatment cost?",
        acceptedAnswer: { "@type": "Answer", text: "Costs vary based on your insurance coverage and services needed. Most insurance plans cover urgent care visits with lower copays than emergency rooms. We work with patients to provide transparent pricing and can help with insurance verification." }
      },
      {
        "@type": "Question",
        name: "Do you accept PIP insurance for back and neck pain treatment?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, we accept PIP (Personal Injury Protection) insurance for back and neck pain treatment. Florida's PIP law requires medical care within 14 days to unlock benefits. We work directly with insurance companies and provide all necessary documentation for your claim." }
      },
      {
        "@type": "Question",
        name: "Can you refer me to specialists if needed for back or neck pain?",
        acceptedAnswer: { "@type": "Answer", text: "Absolutely. We can refer you to appropriate specialists such as orthopedic surgeons, neurologists, or physical therapists based on your injury. We coordinate with specialists throughout Palm Beach County and provide all necessary documentation for your continued care." }
      }
    ]
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(spinalConditionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(backNeckPainSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(webPageSchema)} />
      
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
