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
  title: "Urgent Care vs ER After a Car Accident | Which Should You Choose?",
  description:
    "Not sure whether to visit the ER or urgent care after a crash? Learn when urgent care is faster, more affordable, and still covered by insurance.",
  keywords: [
    'urgent care vs ER car accident',
    'should I go to ER or urgent care',
    'car accident urgent care vs emergency room',
    'urgent care car accident injury',
    'ER vs urgent care cost',
    'car accident medical decision',
    'when to go to ER after crash',
    'urgent care car accident treatment',
    'Palm Beach County urgent care vs ER',
    'car accident medical options'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/urgent-care-vs-er` },
  openGraph: {
    title: "Urgent Care vs ER After a Car Accident | Which Should You Choose?",
    description:
      "When urgent care is appropriate vs when to go to the ER after a car accident.",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Urgent Care vs ER After Car Accident",
      },
    ],
    locale: 'en_US',
  },
  twitter: { 
    card: 'summary_large_image', 
    title: "Urgent Care vs ER After a Car Accident",
    description: "When urgent care is appropriate vs when to go to the ER.",
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
      { "@type": "ListItem", position: 3, name: "Urgent Care vs ER", item: `${baseUrl}/car-accident/urgent-care-vs-er` }
    ]
  };

  return (
    <main className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Urgent Care vs ER After a Car Accident"
        subtitle={<p>For minor to moderate injuries without life-threatening symptoms, urgent care is typically faster and more affordable than the ER. We triage and refer to the ER when necessary.</p>}
        checklist={[
          "Faster service with shorter wait times",
          "Lower cost than emergency room visits",
          "Comprehensive triage & ER referrals when needed",
        ]}
        banner={<ImmediateCareBanner />}
        form={<CompactBooking />}
      />

      <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When Urgent Care is Usually Appropriate</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Neck or back pain, suspected whiplash</li>
            <li>Minor head injury with no red flags</li>
            <li>Sprains/strains, suspected simple fractures</li>
            <li>Lacerations suitable for stitches</li>
            <li>Muscle pain and soft tissue injuries</li>
            <li>Minor cuts, bruises, and abrasions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When to Go to the ER</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Severe head injury with loss of consciousness</li>
            <li>Severe bleeding that won't stop</li>
            <li>Chest pain or difficulty breathing</li>
            <li>Suspected spinal cord injury</li>
            <li>Broken bones with deformity or open wounds</li>
            <li>Signs of internal bleeding or shock</li>
          </ul>
        </section>

        <AccidentCTA />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Cost Comparison</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Urgent care is typically much more affordable than emergency room visits:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Urgent care visits: $89-$150 typically</li>
            <li>ER visits: $500-$2,000+ typically</li>
            <li>Same insurance coverage in most cases</li>
            <li>Lower copays and deductibles</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Wait Time Comparison</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Urgent care typically offers much shorter wait times:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Urgent care: 15-30 minutes average</li>
            <li>ER: 2-6 hours average wait time</li>
            <li>Same-day appointments available</li>
            <li>Walk-ins welcome</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Services Available at Urgent Care</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Onsite X-ray imaging</li>
            <li>Same-day lab testing</li>
            <li>Sutures and wound care</li>
            <li>Splinting and casting</li>
            <li>Pain management</li>
            <li>Physical examinations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Insurance Coverage</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Most insurance plans cover urgent care visits the same as ER visits, but with:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Lower copays</li>
            <li>Lower deductibles</li>
            <li>No facility fees</li>
            <li>Direct billing available</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Related Topics</h2>
          <p className="text-base md:text-lg text-gray-700">
            Related:{" "}
            <Link href="/car-accident/documentation-pip" className="underline text-[#2563eb]">PIP & Documentation</Link> •{" "}
            <Link href="/car-accident/whiplash" className="underline text-[#2563eb]">Whiplash</Link> •{" "}
            <Link href="/car-accident-injury-clinic" className="underline text-[#2563eb]">Car Accident Urgent Care</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
