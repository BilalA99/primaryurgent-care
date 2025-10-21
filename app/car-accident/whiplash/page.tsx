import type { Metadata } from "next";
import Link from "next/link";
import AccidentCTA from "@/components/accident/AccidentCTA";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import CompactBooking from "@/components/accident/CompactBooking";
import AccidentSEOContent from "@/components/accident/AccidentSEOContent";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Whiplash Treatment After a Car Accident | Urgent Care Near You",
  description:
    "Neck pain or headaches after a crash? Get a same-day whiplash evaluation, X-ray, and recovery plan at Primary & Urgent Care. Walk-ins welcome.",
  keywords: [
    'whiplash treatment',
    'whiplash after car accident',
    'neck pain car accident',
    'whiplash urgent care',
    'same day whiplash exam',
    'whiplash symptoms',
    'car accident neck injury',
    'whiplash X-ray',
    'Palm Beach County whiplash',
    'walk-in whiplash treatment'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident/whiplash` },
  openGraph: {
    title: "Whiplash Treatment After a Car Accident | Urgent Care Near You",
    description:
      "Same-day whiplash evaluation, imaging, and recovery plan after a car accident.",
    url: `${baseUrl}/car-accident/whiplash`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Whiplash Treatment After Car Accident",
      },
    ],
    locale: 'en_US',
  },
  twitter: { 
    card: 'summary_large_image', 
    title: "Whiplash Treatment After a Car Accident",
    description: "Same-day whiplash evaluation, imaging, and recovery plan.",
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
      { "@type": "ListItem", position: 3, name: "Whiplash Treatment", item: `${baseUrl}/car-accident/whiplash` }
    ]
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can whiplash start days after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Neck pain, headaches, or stiffness can appear hours or days later. An exam helps rule out more serious injury and guides recovery." }
      },
      {
        "@type": "Question",
        name: "Do I need X-ray or MRI for whiplash?",
        acceptedAnswer: { "@type": "Answer", text: "X-ray can rule out fractures; MRI may be referred if symptoms suggest soft-tissue or disc injury. We'll advise based on your exam." }
      }
    ]
  };

  return (
    <main className="w-full bg-[#FAFAFA] lg:py-20 py-10 px-4 lg:px-[60px] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Whiplash Treatment After a Car Accident"
        subtitle={<p>Neck pain or headaches after a crash? Get evaluated today.</p>}
        checklist={[
          "Assessment of neck mobility & neuro exam",
          "X-ray onsite; MRI referral when indicated",
          "Clear return-to-activity guidance",
        ]}
        banner={<ImmediateCareBanner />}
        form={<CompactBooking />}
      />

      <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When to Get Checked</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Neck pain, stiffness, reduced range of motion</li>
            <li>Headaches, dizziness, jaw or shoulder pain</li>
            <li>Pain beginning hours or days after a crash</li>
            <li>Numbness or tingling in arms or hands</li>
            <li>Difficulty concentrating or memory issues</li>
          </ul>
        </section>

        <AccidentCTA />

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Expect During Your Visit</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Thorough examination of neck range of motion and strength</li>
            <li>Assessment of neurological function</li>
            <li>X-ray imaging to rule out fractures</li>
            <li>Pain management and recovery recommendations</li>
            <li>Documentation for insurance and legal purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Recovery and Treatment Options</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            Whiplash recovery typically involves pain management, gentle exercises, and gradual return to normal activities. 
            Most people recover within weeks to months with proper care.
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Pain medication and anti-inflammatory treatments</li>
            <li>Physical therapy referrals when appropriate</li>
            <li>Activity modifications and ergonomic guidance</li>
            <li>Follow-up care recommendations</li>
          </ul>
        </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-3">Related Topics</h2>
              <p className="text-base md:text-lg text-gray-700">
                Related:{" "}
                <Link href="/car-accident/back-neck-pain" className="underline text-[#2563eb]">Back &amp; Neck Pain</Link> •{" "}
                <Link href="/car-accident/documentation-pip" className="underline text-[#2563eb]">PIP & Documentation</Link> •{" "}
                <Link href="/car-accident-injury-clinic" className="underline text-[#2563eb]">Car Accident Urgent Care</Link>
              </p>
            </section>
          </div>

          {/* SEO Content Section */}
          <AccidentSEOContent 
            content="Whiplash is one of the most common car accident injuries, occurring when the head is suddenly jerked forward and backward. This rapid movement can cause damage to the neck muscles, ligaments, and tendons. Symptoms of whiplash may not appear immediately after a car accident, making early medical evaluation crucial. Our experienced urgent care team provides comprehensive whiplash assessment including neck range of motion testing, neurologic examination, and imaging when indicated. We offer same-day whiplash treatment, pain management, and complete documentation for insurance claims. Don't delay whiplash treatment - early intervention leads to better outcomes. Our board-certified physicians specialize in whiplash injury treatment and understand the complex nature of cervical spine trauma. We work with physical therapists, chiropractors, and other specialists to develop comprehensive treatment plans for whiplash patients. Whether you're experiencing immediate neck pain or delayed whiplash symptoms, our urgent care centers are equipped to provide the evaluation and treatment you need."
          />

          {/* FAQ Section */}
          <AccidentFAQ 
            title="Frequently Asked Questions About Whiplash After Car Accidents"
            faqs={[
              {
                question: "How do I know if I have whiplash after a car accident?",
                answer: "Common whiplash symptoms include neck pain, stiffness, headaches, dizziness, and reduced range of motion. These symptoms may not appear immediately - they often develop hours or days after the accident. If you've been in a car accident, it's important to get evaluated even if you don't feel injured right away."
              },
              {
                question: "When should I seek medical attention for whiplash?",
                answer: "You should seek medical attention as soon as possible after a car accident, even if you don't feel injured. Early evaluation is crucial for whiplash treatment and insurance documentation. Our urgent care centers offer same-day appointments and can provide comprehensive whiplash assessment and treatment."
              },
              {
                question: "What tests are needed to diagnose whiplash?",
                answer: "Whiplash diagnosis typically involves a physical examination including neck range of motion testing and neurologic assessment. We may order X-rays to rule out fractures or other serious injuries. In some cases, MRI or CT scans may be recommended for more detailed evaluation of soft tissue damage."
              },
              {
                question: "How long does whiplash take to heal?",
                answer: "Whiplash recovery time varies depending on the severity of the injury. Most people recover within a few weeks to a few months with proper treatment. Early intervention, including physical therapy and pain management, can significantly improve recovery time and outcomes."
              },
              {
                question: "What treatment options are available for whiplash?",
                answer: "Whiplash treatment may include pain medication, physical therapy, neck exercises, and lifestyle modifications. Our team will develop a personalized treatment plan based on your specific symptoms and injury severity. We also provide documentation for insurance claims and coordinate with specialists when needed."
              }
            ]}
          />
        </main>
      );
    }
