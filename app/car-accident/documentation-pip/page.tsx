import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident PIP Documentation Palm Beach | Primary & Urgent Care",
  description:
    "Car accident PIP documentation in Palm Beach County. Same-day exam, medical records, insurance paperwork. Florida 14-day rule. Walk-ins welcome. Call (561) 223-8024.",
  keywords: [
    'PIP documentation palm beach county',
    'car accident medical records florida',
    'Florida PIP 14 day rule urgent care',
    'car accident documentation palm beach',
    'PIP exam urgent care same day',
    'car accident medical report florida',
    'PIP insurance documentation palm beach county',
    'car crash medical records florida',
    'Florida PIP requirements urgent care',
    'car accident documentation urgent care palm beach',
    'PIP claim documentation florida',
    'Palm Beach County PIP exam'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/documentation-pip` },
  openGraph: {
    title: "Car Accident PIP Documentation Palm Beach | Primary & Urgent Care",
    description:
      "Car accident PIP documentation in Palm Beach County. Same-day exam, medical records, insurance paperwork. Florida 14-day rule. Walk-ins welcome. Call (561) 223-8024.",
    url: `${baseUrl}/car-accident/documentation-pip`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/man-on-phone-next-to-open-hood.jpg`,
        width: 1200,
        height: 630,
        alt: "Car Accident Medical Documentation & PIP Exam Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident PIP Documentation Palm Beach | Primary & Urgent Care",
    description: "Car accident PIP documentation in Palm Beach County. Same-day exam, medical records, insurance paperwork. Florida 14-day rule. Walk-ins welcome. Call (561) 223-8024.",
    images: [`${baseUrl}/man-on-phone-next-to-open-hood.jpg`],
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
      { "@type": "ListItem", position: 3, name: "Documentation & PIP", item: `${baseUrl}/car-accident/documentation-pip` }
    ]
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What documents do you provide after the visit?",
        acceptedAnswer: { "@type": "Answer", text: "We provide detailed visit summaries, exam findings, imaging reports, and treatment documentation. All documentation is available immediately after your visit and tailored to meet PIP claim requirements." }
      },
      {
        "@type": "Question",
        name: "Do you coordinate with insurers or attorneys?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, we coordinate directly with insurance companies for PIP claims and provide all necessary documentation. We also work with attorneys and legal teams to ensure proper documentation for your case." }
      },
      {
        "@type": "Question",
        name: "What is the Florida PIP 14-day rule?",
        acceptedAnswer: { "@type": "Answer", text: "Florida's Personal Injury Protection (PIP) law requires you to seek medical care within 14 days of a car accident to unlock PIP benefits, regardless of fault. Missing this deadline can result in denial of PIP coverage for medical bills, lost wages, and other benefits." }
      },
      {
        "@type": "Question",
        name: "How quickly can I get my medical documentation?",
        acceptedAnswer: { "@type": "Answer", text: "Medical documentation is typically available immediately after your visit. We can provide visit summaries, imaging reports, and treatment plans on the same day as your evaluation. No waiting periods for documentation." }
      },
      {
        "@type": "Question",
        name: "What documentation is included in the visit summary?",
        acceptedAnswer: { "@type": "Answer", text: "Visit summaries include detailed exam findings, diagnosis, treatment recommendations, follow-up care instructions, and any restrictions or limitations. All summaries are formatted to meet insurance and legal documentation requirements." }
      },
      {
        "@type": "Question",
        name: "How do you coordinate with my insurance company?",
        acceptedAnswer: { "@type": "Answer", text: "We handle all insurance coordination including billing, claim submission, and documentation requests. Our team works directly with PIP insurance companies to ensure proper processing of your claim and timely payment." }
      },
      {
        "@type": "Question",
        name: "Can you provide documentation for legal cases?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, we provide comprehensive medical documentation suitable for legal cases including detailed exam findings, imaging reports, and treatment documentation. We work with attorneys and can provide additional documentation upon request with proper authorization." }
      },
      {
        "@type": "Question",
        name: "How long does it take to get medical records?",
        acceptedAnswer: { "@type": "Answer", text: "Medical records and documentation are available immediately after your visit. We can provide copies of all records, imaging results, and treatment documentation on the same day as your evaluation." }
      },
      {
        "@type": "Question",
        name: "Do you provide follow-up documentation?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, we provide ongoing documentation for follow-up visits, treatment progress, and any changes in your condition. We maintain comprehensive records throughout your treatment to support your PIP claim and legal case if needed." }
      },
      {
        "@type": "Question",
        name: "What specific PIP documentation do you provide?",
        acceptedAnswer: { "@type": "Answer", text: "We provide comprehensive PIP documentation including medical reports, treatment plans, imaging results, visit summaries, and any additional documentation requested by your insurance company. All documentation meets Florida PIP requirements and legal standards." }
      }
    ]
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Car Accident Medical Documentation & PIP Exam"
        subtitle={<p>We complete a same-day post-accident evaluation and provide documentation commonly needed for insurance claims.</p>}
        checklist={[
          "Complete medical evaluation and comprehensive documentation for car accident PIP claims",
          "Detailed visit summaries and medical reports for insurance companies and attorneys",
          "PIP coordination and billing assistance for car crash injury claims processing",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your PIP Documentation Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/man-on-phone-next-to-open-hood.jpg"
      />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Bring</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Photo ID and car accident insurance card for PIP claims processing</li>
            <li>Claim number (if available) and detailed car crash incident details</li>
            <li>Any prior medical records related to the car accident injury</li>
            <li>Police report number (if available) for car crash documentation</li>
            <li>Other driver's insurance information for car accident claims processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">PIP Coverage and Requirements</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Florida PIP (Personal Injury Protection) coverage has specific requirements and timeframes:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>14-day rule: Initial car accident treatment must begin within 14 days of the crash</li>
            <li>$10,000 in PIP benefits for car accident medical expenses and injury treatment</li>
            <li>80% coverage for medical bills related to car crash injuries</li>
            <li>Proper medical documentation required for car accident PIP claims processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Medical Documentation We Provide</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Comprehensive visit summaries with detailed car accident injury findings and documentation</li>
            <li>Medical diagnosis and treatment plans for car crash injury recovery and PIP claims</li>
            <li>Imaging reports and interpretations for car accident spinal and soft tissue injuries</li>
            <li>Work restrictions and activity limitations documentation for car crash injury recovery</li>
            <li>Follow-up care recommendations for ongoing car accident injury treatment and rehabilitation</li>
            <li>Detailed billing statements for car accident insurance claims and PIP processing</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Legal Documentation</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            For legal cases, we can provide additional documentation upon request:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Detailed medical records</li>
            <li>Expert medical opinions when appropriate</li>
            <li>Coordinated care with your attorney</li>
            <li>Medical lien services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Insurance Coordination</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            We work with most insurance providers and can help coordinate:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Direct billing to insurance companies</li>
            <li>Prior authorization for treatments</li>
            <li>Coordination of benefits</li>
            <li>Appeals and claim assistance</li>
          </ul>
        </section>

        <RelatedTopics 
          topics={[
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" },
            { title: "Urgent Care vs ER", href: "/car-accident/urgent-care-vs-er" },
            { title: "Legal Records Request", href: "/lawyers" }
          ]}
        />
        </div>
      </div>
    </main>
  );
}
