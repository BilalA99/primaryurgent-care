import type { Metadata } from "next";
import Link from "next/link";
import AccidentCTA from "@/components/accident/AccidentCTA";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import CompactBooking from "@/components/accident/CompactBooking";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident Medical Documentation & PIP Exam | Florida Urgent Care",
  description:
    "Need medical documentation for an insurance or PIP claim? Get a same-day post-accident exam and complete paperwork from our Florida urgent care clinics.",
  keywords: [
    'PIP documentation',
    'car accident medical records',
    'insurance documentation',
    'PIP exam Florida',
    'auto accident medical report',
    'car accident paperwork',
    'insurance claim documentation',
    'PIP 14 day rule',
    'Palm Beach County PIP',
    'accident documentation urgent care'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/documentation-pip` },
  openGraph: {
    title: "Car Accident Medical Documentation & PIP Exam | Florida Urgent Care",
    description:
      "Same-day post-accident exam with visit summaries and imaging reports commonly needed by insurers.",
    url: `${baseUrl}/car-accident/documentation-pip`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Car Accident Medical Documentation & PIP Exam",
      },
    ],
    locale: 'en_US',
  },
  twitter: { 
    card: 'summary_large_image', 
    title: "Car Accident Medical Documentation & PIP Exam",
    description: "Same-day post-accident exam with complete documentation.",
    images: [`${baseUrl}/websitelogo.png`],
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
        acceptedAnswer: { "@type": "Answer", text: "Visit summaries, exam findings, and imaging reports when performed. Ask at check-in for any specific documents needed." }
      },
      {
        "@type": "Question",
        name: "Do you coordinate with insurers or attorneys?",
        acceptedAnswer: { "@type": "Answer", text: "We can provide standard medical documentation upon patient authorization. Confirm specifics with your insurer/attorney." }
      }
    ]
  };

  return (
    <main className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Car Accident Medical Documentation & PIP Exam"
        subtitle={<p>We complete a same-day post-accident evaluation and provide documentation commonly needed for insurance claims.</p>}
        checklist={[
          "Complete medical evaluation & documentation",
          "Visit summaries for insurers & attorneys",
          "PIP coordination & billing assistance",
        ]}
        banner={<ImmediateCareBanner />}
        form={<CompactBooking />}
      />

      <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Bring</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Photo ID and insurance card</li>
            <li>Claim number (if available) and crash details</li>
            <li>Any prior records related to the incident</li>
            <li>Police report number (if available)</li>
            <li>Other driver's insurance information</li>
          </ul>
        </section>

        <AccidentCTA />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">PIP Coverage and Requirements</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Florida PIP (Personal Injury Protection) coverage has specific requirements and timeframes:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>14-day rule: Initial treatment must begin within 14 days</li>
            <li>$10,000 in benefits for medical expenses</li>
            <li>80% coverage for medical bills</li>
            <li>Proper documentation required for claims</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Medical Documentation We Provide</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Comprehensive visit summaries with findings</li>
            <li>Diagnosis and treatment plans</li>
            <li>Imaging reports and interpretations</li>
            <li>Work restrictions and activity limitations</li>
            <li>Follow-up care recommendations</li>
            <li>Billing statements for insurance</li>
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Related Topics</h2>
          <p className="text-base md:text-lg text-gray-700">
            Related:{" "}
            <Link href="/car-accident-injury-clinic" className="underline text-[#2563eb]">Car Accident Urgent Care</Link> •{" "}
            <Link href="/car-accident/urgent-care-vs-er" className="underline text-[#2563eb]">Urgent Care vs ER</Link> •{" "}
            <Link href="/lawyers" className="underline text-[#2563eb]">Legal Records Request</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
