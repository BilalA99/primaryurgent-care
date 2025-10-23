import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident: Urgent Care vs ER Palm Beach | Primary & Urgent Care",
  description:
    "Car accident care: Urgent care vs ER in Palm Beach County. Faster service, lower cost, same PIP coverage. Walk-ins welcome at 4 locations. Call (561) 223-8024.",
  keywords: [
    'urgent care vs ER car accident palm beach county',
    'should I go to ER or urgent care car accident',
    'car accident urgent care vs emergency room florida',
    'urgent care car accident injury palm beach',
    'ER vs urgent care cost car accident',
    'car accident medical decision florida',
    'when to go to ER after crash palm beach county',
    'urgent care car accident treatment florida',
    'Palm Beach County urgent care vs ER car accident',
    'car accident medical options florida',
    'Florida PIP urgent care vs ER',
    'Palm Beach County urgent care car accident'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/urgent-care-vs-er` },
  openGraph: {
    title: "Car Accident: Urgent Care vs ER Palm Beach | Primary & Urgent Care",
    description:
      "Car accident care: Urgent care vs ER in Palm Beach County. Faster service, lower cost, same PIP coverage. Walk-ins welcome at 4 locations. Call (561) 223-8024.",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/car-crash-woman-on-call.jpg`,
        width: 1200,
        height: 630,
        alt: "Urgent Care vs ER After Car Accident Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident: Urgent Care vs ER Palm Beach | Primary & Urgent Care",
    description: "Car accident care: Urgent care vs ER in Palm Beach County. Faster service, lower cost, same PIP coverage. Walk-ins welcome at 4 locations. Call (561) 223-8024.",
    images: [`${baseUrl}/car-crash-woman-on-call.jpg`],
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I go to urgent care vs ER after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Choose urgent care for minor to moderate injuries like cuts, bruises, sprains, whiplash, or back pain without life-threatening symptoms. Go to the ER for severe bleeding, broken bones, head injuries, chest pain, or loss of consciousness." }
      },
      {
        "@type": "Question",
        name: "What are the cost differences between urgent care and ER?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care typically costs 3-5 times less than ER visits. Most urgent care visits cost $100-300, while ER visits can cost $1,000-3,000 or more. Insurance copays are also lower at urgent care centers." }
      },
      {
        "@type": "Question",
        name: "How do wait times compare between urgent care and ER?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care typically has wait times of 15-30 minutes, while ER wait times can be 2-6 hours or more. Urgent care prioritizes patients based on arrival time, while ERs prioritize by severity of condition." }
      },
      {
        "@type": "Question",
        name: "What services are available at urgent care for car accidents?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care provides injury evaluation, X-rays, wound care, pain management, and documentation for insurance claims. We can also refer to specialists or transfer to ER if more advanced care is needed." }
      },
      {
        "@type": "Question",
        name: "Can urgent care transfer me to ER if needed?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, urgent care can transfer patients to ER when more advanced care is needed. We coordinate transfers and provide all medical documentation to ensure continuity of care." }
      },
      {
        "@type": "Question",
        name: "How does insurance coverage differ between urgent care and ER?",
        acceptedAnswer: { "@type": "Answer", text: "Most insurance plans cover both urgent care and ER visits, but copays and deductibles are typically lower for urgent care. PIP insurance covers both options, but urgent care often provides better value." }
      },
      {
        "@type": "Question",
        name: "What documentation quality can I expect from urgent care?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care provides comprehensive medical documentation including detailed exam findings, imaging results, treatment plans, and visit summaries. Documentation quality is equivalent to ER visits and suitable for insurance claims and legal cases." }
      },
      {
        "@type": "Question",
        name: "When should I definitely go to the ER instead of urgent care?",
        acceptedAnswer: { "@type": "Answer", text: "Go to ER for severe bleeding, broken bones, head injuries with loss of consciousness, chest pain, difficulty breathing, severe abdominal pain, or any life-threatening symptoms. When in doubt, call 911." }
      },
      {
        "@type": "Question",
        name: "Can urgent care provide follow-up care after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, urgent care can provide follow-up care, monitor healing progress, adjust treatment plans, and coordinate with specialists. We maintain continuity of care throughout your recovery process." }
      },
      {
        "@type": "Question",
        name: "How does PIP coverage work for urgent care vs ER?",
        acceptedAnswer: { "@type": "Answer", text: "PIP insurance covers both urgent care and ER visits, but urgent care often provides better value with lower costs and faster service. Both options meet Florida's PIP 14-day requirement for coverage." }
      }
    ]
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faqSchema)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Urgent Care vs ER After a Car Accident"
        subtitle={<p>For minor to moderate injuries without life-threatening symptoms, urgent care is typically faster and more affordable than the ER. We triage and refer to the ER when necessary.</p>}
        checklist={[
          "Faster service with shorter wait times for car accident injury evaluation and treatment",
          "Lower cost than emergency room visits for car crash injury care and documentation",
          "Comprehensive triage and ER referrals when needed for serious car accident trauma",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Car Accident Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/car-crash-woman-on-call.jpg"
      />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When Urgent Care is Usually Appropriate</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Neck or back pain, suspected whiplash from car accident trauma</li>
            <li>Minor head injury with no red flags following car crash impact</li>
            <li>Sprains/strains, suspected simple fractures from car accident injuries</li>
            <li>Lacerations suitable for stitches from car crash glass or metal debris</li>
            <li>Muscle pain and soft tissue injuries from car accident whiplash and impact</li>
            <li>Minor cuts, bruises, and abrasions from car crash seatbelt or airbag injuries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When to Go to the ER</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Severe head injury with loss of consciousness from car accident trauma</li>
            <li>Severe bleeding that won't stop from car crash lacerations or injuries</li>
            <li>Chest pain or difficulty breathing following car accident impact</li>
            <li>Suspected spinal cord injury from severe car crash trauma</li>
            <li>Broken bones with deformity or open wounds from car accident impact</li>
            <li>Signs of internal bleeding or shock from severe car crash injuries</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Cost Comparison</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Urgent care is typically much more affordable than emergency room visits:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Urgent care visits for car accident injuries: $89-$150 typically</li>
            <li>ER visits for car crash trauma: $500-$2,000+ typically</li>
            <li>Same insurance coverage for car accident injury treatment in most cases</li>
            <li>Lower copays and deductibles for car crash urgent care vs ER treatment</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Wait Time Comparison</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Urgent care typically offers much shorter wait times:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Urgent care for car accident injuries: 15-30 minutes average wait time</li>
            <li>ER for car crash trauma: 2-6 hours average wait time</li>
            <li>Same-day appointments available for car accident injury evaluation</li>
            <li>Walk-ins welcome for immediate car crash injury assessment and treatment</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Services Available at Urgent Care</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Onsite X-ray imaging for car accident injury assessment and documentation</li>
            <li>Same-day lab testing for car crash injury evaluation and blood work</li>
            <li>Sutures and wound care for car accident lacerations and cuts</li>
            <li>Splinting and casting for car crash fractures and broken bones</li>
            <li>Pain management for car accident injury treatment and recovery</li>
            <li>Physical examinations for comprehensive car crash injury assessment</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Insurance Coverage</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Most insurance plans cover urgent care visits the same as ER visits, but with:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Lower copays for car accident injury treatment at urgent care vs ER</li>
            <li>Lower deductibles for car crash injury care and medical documentation</li>
            <li>No facility fees for car accident injury evaluation and treatment</li>
            <li>Direct billing available for car crash injury claims and PIP processing</li>
          </ul>
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
    </main>
  );
}
