import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident Back & Neck Pain Palm Beach | Primary & Urgent Care",
  description:
    "Car accident back & neck pain treatment in Palm Beach County. Same-day evaluation, X-ray, PIP documentation. Walk-ins welcome. Florida 14-day rule compliant.",
  keywords: [
    'back pain after car accident palm beach county',
    'neck pain car accident florida',
    'spinal injury urgent care same day',
    'car accident back injury evaluation',
    'neck injury treatment palm beach',
    'back pain evaluation urgent care',
    'car crash back pain florida',
    'spinal pain urgent care palm beach county',
    'neck injury urgent care florida',
    'car accident spinal injury documentation',
    'Florida PIP back pain treatment',
    'Palm Beach County neck injury care'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/back-neck-pain` },
  openGraph: {
    title: "Car Accident Back & Neck Pain Palm Beach | Primary & Urgent Care",
    description:
      "Car accident back & neck pain treatment in Palm Beach County. Same-day evaluation, X-ray, PIP documentation. Walk-ins welcome. Florida 14-day rule compliant.",
    url: `${baseUrl}/car-accident/back-neck-pain`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/back-pain-hero.png`,
        width: 1200,
        height: 630,
        alt: "Back & Neck Pain After Car Accident Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident Back & Neck Pain Palm Beach | Primary & Urgent Care",
    description: "Car accident back & neck pain treatment in Palm Beach County. Same-day evaluation, X-ray, PIP documentation. Walk-ins welcome. Florida 14-day rule compliant.",
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
    description: "Comprehensive evaluation and treatment of back and neck pain sustained in car accidents",
    bodyLocation: "Spine, Back, and Neck",
    preparation: "No special preparation required - walk-ins welcome for immediate evaluation",
    procedureType: "Diagnostic Evaluation and Treatment",
    followup: "Follow-up care and monitoring as needed, specialist referrals when appropriate",
    provider: {
      "@type": "MedicalOrganization",
      name: "Primary & Urgent Care Centers",
      url: `${baseUrl}/car-accident/back-neck-pain`
    },
    medicalSpecialty: "Emergency Medicine",
    indication: "Back pain, neck pain, or spinal symptoms following car accident",
    contraindication: "Severe neurological symptoms requiring emergency room evaluation"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the warning signs of serious back or neck injury after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Warning signs include severe pain, numbness or tingling in arms or legs, difficulty walking, loss of bladder or bowel control, or worsening neurological symptoms. Seek immediate medical attention if you experience any of these symptoms." }
      },
      {
        "@type": "Question",
        name: "How is back and neck pain diagnosed after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Diagnosis involves a comprehensive physical examination, assessment of range of motion, strength testing, neurological evaluation, and potentially imaging studies like X-rays or MRI to rule out fractures or disc injuries." }
      },
      {
        "@type": "Question",
        name: "What treatment options are available for back and neck pain after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Treatment may include pain management, anti-inflammatory medications, muscle relaxants, physical therapy exercises, heat/ice therapy, and in some cases, specialist referrals for advanced care. We provide comprehensive documentation for insurance claims." }
      },
      {
        "@type": "Question",
        name: "How long does back and neck pain recovery typically take after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Recovery time varies depending on the severity of injury. Most people recover within weeks to months, but some may experience chronic pain. Early treatment and proper documentation are important for both recovery and insurance claims." }
      },
      {
        "@type": "Question",
        name: "Do I need imaging for back or neck pain after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "X-ray can rule out fractures; MRI may be referred if symptoms suggest soft-tissue or disc injury. We have onsite X-ray capabilities and can provide same-day results for your insurance documentation." }
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
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(backNeckPainSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faqSchema)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Back & Neck Pain After a Car Accident"
        subtitle={<p>Back or neck pain after a crash should be evaluated promptly. We assess for spinal tenderness, nerve symptoms, and indications for imaging.</p>}
        checklist={[
          "Comprehensive range of motion, strength, and neurologic examination for car accident back and neck injuries",
          "Red flags assessment for car crash trauma requiring ER vs urgent care treatment",
          "When X-ray or MRI referrals are indicated for serious car accident spinal injuries",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Back & Neck Pain Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/back-pain-hero.png"
      />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What We Check</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Comprehensive range of motion, strength, and neurologic examination for car accident back and neck injuries</li>
            <li>Red flags assessment for car crash trauma requiring ER vs urgent care treatment</li>
            <li>When X-ray or MRI referrals are indicated for serious car accident spinal injuries</li>
            <li>Detailed pain patterns and symptom onset analysis from car crash back and neck trauma</li>
            <li>Functional limitations assessment and daily activities impact from car accident injuries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Common Back and Neck Injuries</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Muscle strains and ligament sprains from car accident back and neck trauma</li>
            <li>Herniated or bulging discs caused by car crash spinal injuries</li>
            <li>Spinal compression fractures from severe car accident impact</li>
            <li>Facet joint injuries and inflammation from car crash whiplash trauma</li>
            <li>Nerve root compression and radiculopathy from car accident spinal injuries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Diagnostic Imaging</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            We may recommend imaging based on your symptoms and physical examination findings.
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Onsite X-rays to assess bone alignment and fractures from car accident back and neck injuries</li>
            <li>MRI referrals for soft tissue and disc evaluation of car crash spinal trauma</li>
            <li>CT scans for detailed bone assessment of severe car accident spinal injuries</li>
            <li>Rapid referrals to imaging centers for comprehensive car crash injury evaluation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Treatment Approach</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Treatment depends on the specific injury but typically includes:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Comprehensive pain management and anti-inflammatory medications for car accident back and neck injuries</li>
            <li>Activity modifications and ergonomic guidance for car crash spinal injury recovery</li>
            <li>Specialist referrals for specialized car accident back and neck injury rehabilitation</li>
            <li>Ongoing follow-up care and monitoring for car crash spinal injury recovery progress</li>
            <li>Specialist referrals for complex car accident spinal injury cases requiring advanced treatment</li>
          </ul>
        </section>

        <RelatedTopics 
          topics={[
            { title: "Whiplash", href: "/car-accident/whiplash" },
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />
        </div>
      </div>
    </main>
  );
}
