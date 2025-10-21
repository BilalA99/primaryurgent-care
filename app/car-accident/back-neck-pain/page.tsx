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
  title: "Back & Neck Pain After a Car Accident | Same-Day Evaluation",
  description:
    "Back or neck pain after a crash? Visit Primary & Urgent Care for a same-day injury evaluation, X-ray, and treatment plan.",
  keywords: [
    'back pain car accident',
    'neck pain car accident',
    'spinal injury car accident',
    'back pain urgent care',
    'neck pain urgent care',
    'car accident spine evaluation',
    'back injury X-ray',
    'neck injury X-ray',
    'Palm Beach County back pain',
    'walk-in back pain treatment'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/back-neck-pain` },
  openGraph: {
    title: "Back & Neck Pain After a Car Accident | Same-Day Evaluation",
    description:
      "Same-day evaluation, X-ray, and treatment plan for back or neck pain after a car accident.",
    url: `${baseUrl}/car-accident/back-neck-pain`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Back & Neck Pain After Car Accident",
      },
    ],
    locale: 'en_US',
  },
  twitter: { 
    card: 'summary_large_image', 
    title: "Back & Neck Pain After a Car Accident",
    description: "Same-day evaluation, X-ray, and treatment plan.",
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
      { "@type": "ListItem", position: 3, name: "Back & Neck Pain", item: `${baseUrl}/car-accident/back-neck-pain` }
    ]
  };

  return (
    <main className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Back & Neck Pain After a Car Accident"
        subtitle={<p>Back or neck pain after a crash should be evaluated promptly. We assess for spinal tenderness, nerve symptoms, and indications for imaging.</p>}
        checklist={[
          "Range of motion, strength, and neurologic exam",
          "Red flags requiring ER vs urgent care",
          "When X-ray or MRI referrals are indicated",
        ]}
        banner={<ImmediateCareBanner />}
        form={<CompactBooking />}
      />

      <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What We Check</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Range of motion, strength, and neurologic exam</li>
            <li>Red flags requiring ER vs urgent care</li>
            <li>When X-ray or MRI referrals are indicated</li>
            <li>Pain patterns and symptom onset</li>
            <li>Functional limitations and daily activities</li>
          </ul>
        </section>

        <AccidentCTA />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Common Back and Neck Injuries</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Muscle strains and ligament sprains</li>
            <li>Herniated or bulging discs</li>
            <li>Spinal compression fractures</li>
            <li>Facet joint injuries</li>
            <li>Nerve root compression</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Diagnostic Imaging</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            We may recommend imaging based on your symptoms and physical examination findings.
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>X-rays to assess bone alignment and fractures</li>
            <li>MRI for soft tissue and disc evaluation</li>
            <li>CT scans for detailed bone assessment</li>
            <li>Rapid referrals to imaging centers when needed</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Treatment Approach</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Treatment depends on the specific injury but typically includes:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Pain management and anti-inflammatory medications</li>
            <li>Activity modifications and ergonomic guidance</li>
            <li>Physical therapy referrals when appropriate</li>
            <li>Follow-up care and monitoring</li>
            <li>Specialist referrals for complex cases</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Related Topics</h2>
          <p className="text-base md:text-lg text-gray-700">
            Related:{" "}
            <Link href="/car-accident/whiplash" className="underline text-[#2563eb]">Whiplash</Link> •{" "}
            <Link href="/car-accident/documentation-pip" className="underline text-[#2563eb]">PIP & Documentation</Link> •{" "}
            <Link href="/car-accident-injury-clinic" className="underline text-[#2563eb]">Car Accident Urgent Care</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
