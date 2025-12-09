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
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident PIP Exam & Documentation | Palm Beach",
  description:
    "Car accident PIP exam and documentation in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
  alternates: { canonical: `${baseUrl}/car-accident/documentation-pip` },
  openGraph: {
    title: "Car Accident PIP Exam & Documentation | Palm Beach",
    description:
      "Car accident PIP exam and documentation in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
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
    title: "Car Accident PIP Exam & Documentation | Palm Beach",
    description: "Car accident PIP exam and documentation in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
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
        acceptedAnswer: { "@type": "Answer", text: "We provide detailed visit summaries, exam findings, diagnoses, imaging reports, treatment plans, and follow-up recommendations. All records are created in a format insurers and legal teams can easily review. Documentation includes comprehensive notes about your injuries, symptoms, and recommended treatment." }
      },
      {
        "@type": "Question",
        name: "Do you coordinate with insurers or attorneys?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. We coordinate directly with insurance companies for PIP claims and can share records with attorneys when properly authorized. Our goal is to make the paperwork side of your case as smooth as possible. We handle billing, claim submission, and documentation requests efficiently." }
      },
      {
        "@type": "Question",
        name: "What is the Florida PIP 14-day rule?",
        acceptedAnswer: { "@type": "Answer", text: "Florida's PIP law requires you to seek medical care within 14 days of a car accident to unlock PIP benefits. Waiting beyond this window can lead to denial of coverage for medical bills and related benefits. Early documentation creates a clear timeline that supports your claim and helps track your recovery." }
      },
      {
        "@type": "Question",
        name: "How quickly can I get my medical documentation?",
        acceptedAnswer: { "@type": "Answer", text: "Most documentation is available the same day as your visit. You leave with a clear summary of your exam and treatment, and we store electronic records for future requests. All visit summaries, imaging reports, and treatment plans are prepared immediately and formatted for insurance and legal use." }
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

  const pipProcedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "PIP Exam and Medical Documentation",
    description: "Comprehensive medical examination and documentation for Florida PIP insurance claims after car accidents. Includes exam findings, imaging results, treatment plans, and visit summaries.",
    procedureType: "Diagnostic Evaluation and Documentation",
    provider: {
      "@type": "MedicalOrganization",
      name: "Primary & Urgent Care Centers",
      url: `${baseUrl}/car-accident/documentation-pip`
    },
    medicalSpecialty: "Emergency Medicine",
    indication: "Car accident injury requiring medical evaluation and documentation for PIP insurance claims within Florida's 14-day requirement"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Car Accident PIP Exam & Documentation | Palm Beach",
    url: `${baseUrl}/car-accident/documentation-pip`,
    description: "Car accident PIP exam and documentation in Palm Beach County. Same-day medical records, visit summaries, insurance paperwork. Florida 14-day rule compliant.",
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

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(pipProcedureSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(webPageSchema)} />
      
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
