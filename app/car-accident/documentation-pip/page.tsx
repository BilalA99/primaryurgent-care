import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import AttorneyFriendlySection from "@/components/accident/AttorneyFriendlySection";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident PIP Exam & Documentation | Urgent Care + Palm Beach | PrimaryUC",
  description:
    "Car accident PIP exam and documentation at urgent care in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
  alternates: { canonical: `${baseUrl}/car-accident/documentation-pip` },
  openGraph: {
    title: "Car Accident PIP Exam & Documentation | Urgent Care + Palm Beach | PrimaryUC",
    description:
      "Car accident PIP exam and documentation at urgent care in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
    url: `${baseUrl}/car-accident/documentation-pip`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/man-on-phone-next-to-open-hood.jpg`,
        width: 1200,
        height: 630,
        alt: "Car accident PIP documentation and medical exam paperwork in Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident PIP Exam & Documentation | Urgent Care + Palm Beach | PrimaryUC",
    description: "Car accident PIP exam and documentation at urgent care in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
    images: [`${baseUrl}/man-on-phone-next-to-open-hood.jpg`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const pageUrl = `${baseUrl}/car-accident/documentation-pip`;
  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: "Documentation & PIP", url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: "Car accident PIP exam and documentation",
    description: "Same-day medical records, visit summaries, insurance paperwork for PIP claims. Florida 14-day rule compliant.",
    provider: "https://primaryuc.com/#clinic",
    areaServed: ["Palm Beach County", "Royal Palm Beach", "Lake Worth", "Palm Springs", "Lantana"],
    url: pageUrl
  });

  const faqObj = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need an attorney before I come in?",
        acceptedAnswer: { "@type": "Answer", text: "No. You can come in for an exam and documentation whether or not you have an attorney. If you decide to work with one later, we can share records once you sign a release." }
      },
      {
        "@type": "Question",
        name: "Can you update documentation over time?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Follow-up visits generate updated records that show how your symptoms and function change over weeks or months. These can be important for ongoing claims." }
      }
    ]
  };

  const webPageSchema = {
    "@type": "MedicalWebPage",
    name: "Car Accident PIP Exam & Documentation | Urgent Care + Palm Beach | PrimaryUC",
    url: pageUrl,
    description: "Car accident PIP exam and documentation at urgent care in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
    about: {
      "@type": "Service",
      name: "PIP Documentation Service"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/man-on-phone-next-to-open-hood.jpg`,
      width: 1200,
      height: 630
    }
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    serviceSchema,
    faqObj
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Car Accident PIP Documentation"
        subtitle={
          <p>
            We complete a same-day post-accident exam and create the medical documentation commonly requested by insurers and attorneys.
          </p>
        }
        checklist={[
          "Full exam and injury mapping for PIP claims",
          "Same-day visit summary and records you can share",
          "Help coordinating paperwork with insurance",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your PIP Documentation Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/man-on-phone-next-to-open-hood.jpg"
      />

      {/* Trust Badges */}
      <TrustBadges />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What Your PIP Exam Includes</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            A comprehensive PIP exam involves several key components designed to document your injuries and create a clear medical record:
          </p>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Initial History & Injury Description</h3>
              <p className="text-gray-700">We document the collision details, how your injuries occurred, and when symptoms began. This creates a clear timeline linking the accident to your medical condition.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Physical Exam Details</h3>
              <p className="text-gray-700">Comprehensive examination findings including range of motion, neurologic testing, palpation findings, and any visible injuries. All findings are documented in detail for your records.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Imaging When Indicated</h3>
              <p className="text-gray-700">If imaging is needed, we perform onsite X-rays or arrange MRI/CT referrals. All imaging results are included in your documentation package.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Treatment Discussion & Follow-Up</h3>
              <p className="text-gray-700">We discuss treatment options, medications, activity modifications, and follow-up care. All recommendations are documented for your insurance claim.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Bring to Your PIP Documentation Visit</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Photo ID and insurance card</li>
            <li>Auto insurance claim number, if available</li>
            <li>Police report or crash report number, if you have it</li>
            <li>
              Any prior medical records or imaging related to this accident
            </li>
            <li>
              Contact information for your attorney or law office, if applicable
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Types of Documentation We Commonly Prepare</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            After your exam, we generate records that are structured for insurance and legal review, including:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>
              Initial visit summary with detailed history of the crash and symptoms
            </li>
            <li>
              Physical exam findings, including neurologic and orthopedic testing
            </li>
            <li>
              Imaging reports and interpretations from X-ray or other studies
            </li>
            <li>
              Diagnoses, treatment recommendations, and medication list
            </li>
            <li>
              Work status and activity limitations, when applicable
            </li>
            <li>
              Follow-up plans and referrals for specialist care or therapy
            </li>
          </ul>
        </section>

        {/* Documentation Example Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Examples of Documentation We Provide</h2>
          <div className="bg-white rounded-xl border-2 border-[#2563eb]/20 p-6 shadow-lg">
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Visit Summary Example</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Chief Complaint: Motor vehicle collision with neck and back pain</p>
                  <p>• History of Present Illness: Patient reports [detailed injury description]</p>
                  <p>• Physical Examination: [Comprehensive findings documented]</p>
                  <p>• Assessment: [Diagnosis with ICD-10 codes]</p>
                  <p>• Plan: [Treatment recommendations and follow-up]</p>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Imaging Report</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• X-ray interpretations with detailed findings</p>
                  <p>• MRI/CT reports when applicable</p>
                  <p>• Comparison with prior studies if available</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">Treatment Documentation</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Medications prescribed with dosages</p>
                  <p>• Activity restrictions and work limitations</p>
                  <p>• Physical therapy referrals and exercise instructions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Why Documentation Timing Matters</h2>
          <p className="text-base md:text-lg text-gray-700 mb-3">
            The closer your exam is to the date of the collision, the stronger your documentation usually is. Early notes create a clear timeline: when symptoms started, how severe they were, and how they changed over time. This can influence how insurers view your claim and helps your care team track your recovery.
          </p>
        </section>

        {/* Attorney-Friendly Section */}
        <AttorneyFriendlySection />

        <RelatedTopics 
          topics={[
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" },
            { title: "Urgent Care vs ER After a Crash", href: "/car-accident/urgent-care-vs-er" },
            { title: "Whiplash", href: "/car-accident/whiplash" }
          ]}
        />

        <AccidentFAQ
          title="PIP & Documentation FAQs"
          faqs={[
            {
              question: "Do I need an attorney before I come in?",
              answer:
                "No. You can come in for an exam and documentation whether or not you have an attorney. If you decide to work with one later, we can share records once you sign a release."
            },
            {
              question: "Can you update documentation over time?",
              answer:
                "Yes. Follow-up visits generate updated records that show how your symptoms and function change over weeks or months. These can be important for ongoing claims."
            }
          ]}
        />

        {/* Internal Links Section */}
        <AccidentInternalLinks />
        </div>
      </div>
    </main>
  );
}
