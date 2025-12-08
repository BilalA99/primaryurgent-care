import { Metadata } from "next";
import { toJsonLd } from "@/lib/seo";

const baseUrl = 'https://primaryuc.com';
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";

export const metadata: Metadata = {
  title: "Whiplash After Car Accident | Same-Day Neck Exam",
  description: "Whiplash treatment after car accident in Palm Beach County. Same-day neck exam, X-ray, pain management, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
  openGraph: {
    title: "Whiplash After Car Accident | Same-Day Neck Exam",
    description: "Whiplash treatment after car accident in Palm Beach County. Same-day neck exam, X-ray, pain management, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    url: `${baseUrl}/car-accident/whiplash`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/whiplash-hero-image.png`,
        width: 1200,
        height: 630,
        alt: "Whiplash neck pain evaluation after car accident in Palm Beach County urgent care",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Whiplash After Car Accident | Same-Day Neck Exam",
    description: "Whiplash treatment after car accident in Palm Beach County. Same-day neck exam, X-ray, pain management, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    images: [`${baseUrl}/whiplash-hero-image.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: `${baseUrl}/car-accident/whiplash` }
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

  const whiplashTreatmentSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Whiplash Treatment and Evaluation",
    description: "Comprehensive evaluation and treatment of whiplash injuries sustained in car accidents. Symptoms often develop 24-72 hours after impact, making early evaluation critical for both health and insurance documentation.",
    bodyLocation: "Neck and Cervical Spine",
    preparation: "No special preparation required - walk-ins welcome for immediate evaluation",
    procedureType: "Diagnostic Evaluation and Treatment",
    followup: "Follow-up care and monitoring as needed, specialist referrals when appropriate. Most patients improve within 2-6 weeks with proper treatment.",
    provider: {
      "@type": "MedicalOrganization",
      name: "Primary & Urgent Care Centers",
      url: `${baseUrl}/car-accident/whiplash`
    },
    medicalSpecialty: "Emergency Medicine",
    indication: "Neck pain, stiffness, headaches, or other symptoms following car accident. Most patients don't feel pain until hours or days after the crash.",
    contraindication: "Severe neurological symptoms requiring emergency room evaluation including severe weakness, loss of bladder/bowel control, or inability to move limbs"
  };

  const whiplashConditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: "Whiplash",
    alternateName: "Cervical sprain/strain",
    possibleTreatment: [
      "Pain management",
      "Anti-inflammatory medications",
      "Physical therapy",
      "Neck exercises",
      "Activity modification"
    ],
    signOrSymptom: [
      "Neck pain",
      "Neck stiffness",
      "Headaches",
      "Shoulder pain",
      "Dizziness",
      "Jaw discomfort",
      "Reduced range of motion"
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Whiplash After Car Accident | Same-Day Neck Exam",
    url: `${baseUrl}/car-accident/whiplash`,
    description: "Whiplash treatment after car accident in Palm Beach County. Same-day neck exam, X-ray, pain management, PIP documentation. Florida 14-day rule. Walk-ins welcome.",
    about: {
      "@type": "MedicalCondition",
      name: "Whiplash Injury"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/whiplash-hero-image.png`,
      width: 1200,
      height: 630
    }
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can whiplash start days after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Neck pain, headaches, or stiffness can appear hours or days later. This is why it's important to seek medical evaluation even if you feel fine initially. An exam helps rule out more serious injury and guides recovery." }
      },
      {
        "@type": "Question",
        name: "Do I need X-ray or MRI for whiplash?",
        acceptedAnswer: { "@type": "Answer", text: "X-ray can rule out fractures; MRI may be referred if symptoms suggest soft-tissue or disc injury. We have onsite X-ray capabilities and can provide same-day results for your insurance documentation." }
      },
      {
        "@type": "Question",
        name: "What are the common symptoms of whiplash after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Common symptoms include neck pain and stiffness, headaches, shoulder pain, dizziness, fatigue, and sometimes jaw pain or ringing in the ears. Symptoms may not appear immediately after the accident and can develop over 24-48 hours." }
      },
      {
        "@type": "Question",
        name: "How is whiplash diagnosed after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Diagnosis involves a comprehensive physical examination, assessment of neck range of motion, neurological tests, and potentially imaging studies like X-rays or MRI to rule out fractures or disc injuries. Our urgent care team specializes in car accident injury evaluation." }
      },
      {
        "@type": "Question",
        name: "What treatment options are available for whiplash?",
        acceptedAnswer: { "@type": "Answer", text: "Treatment may include pain management, anti-inflammatory medications, physical therapy exercises, heat/ice therapy, and in some cases, specialist referrals for advanced care. We provide comprehensive documentation for insurance claims." }
      },
      {
        "@type": "Question",
        name: "How long does whiplash recovery typically take?",
        acceptedAnswer: { "@type": "Answer", text: "Most people recover from whiplash within a few weeks to months, but some may experience chronic symptoms. Early treatment and proper documentation are important for both recovery and insurance claims. We provide ongoing monitoring and follow-up care." }
      },
      {
        "@type": "Question",
        name: "When should I seek immediate medical attention for whiplash?",
        acceptedAnswer: { "@type": "Answer", text: "Seek immediate care if you experience severe neck pain, numbness or tingling in arms/hands, difficulty walking, loss of bladder/bowel control, or worsening neurological symptoms. Our urgent care can evaluate and refer to emergency services if needed." }
      },
      {
        "@type": "Question",
        name: "What documentation do you provide for whiplash insurance claims?",
        acceptedAnswer: { "@type": "Answer", text: "We provide comprehensive medical documentation including exam findings, imaging results, treatment plans, and visit summaries essential for PIP claims and legal cases. All documentation is provided immediately after your visit." }
      },
      {
        "@type": "Question",
        name: "How much does whiplash treatment cost?",
        acceptedAnswer: { "@type": "Answer", text: "Costs vary based on your insurance coverage and services needed. Most insurance plans cover urgent care visits with lower copays than emergency rooms. We work with patients to provide transparent pricing and can help with insurance verification." }
      },
      {
        "@type": "Question",
        name: "Do you accept PIP insurance for whiplash treatment?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, we accept PIP (Personal Injury Protection) insurance for whiplash treatment. Florida's PIP law requires medical care within 14 days to unlock benefits. We work directly with insurance companies and provide all necessary documentation for your claim." }
      }
    ]
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(whiplashConditionSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(whiplashTreatmentSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(webPageSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Whiplash After a Car Accident"
        subtitle={
          <p>
            Neck pain, stiffness, or headaches after a crash can be a sign of whiplash. Our car-accident doctors evaluate your neck, rule out serious injury, and document everything for PIP and insurance.
          </p>
        }
        checklist={[
          "Comprehensive neck mobility and neurologic exam",
          "Onsite X-ray; MRI referrals when indicated",
          "Clear recovery plan and PIP-ready documentation",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Whiplash Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/whiplash-hero-image.png"
      />

      {/* Trust Badges */}
      <TrustBadges />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Symptoms After a Car Accident</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Whiplash and neck injuries can cause a variety of symptoms. Here's what to watch for:
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Neck & Whiplash Symptoms</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Neck pain, stiffness, or reduced range of motion</li>
              <li>Headaches, dizziness, jaw pain, or shoulder pain</li>
              <li>Symptoms that begin hours or days after the crash</li>
              <li>Numbness, tingling, or weakness in arms or hands</li>
              <li>Trouble concentrating, feeling "foggy," or sleep disturbances</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Whiplash Symptom Timeline</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Many people feel only shaken or sore immediately after a crash. Whiplash symptoms often build over the next 24–72 hours. Seeking care early creates a documented timeline that links your symptoms to the collision and allows your provider to rule out more serious problems.
          </p>
          <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Most patients don't feel pain until the next day</h3>
            <p className="text-gray-700 mb-4">
              This delayed onset is common with whiplash injuries. Even if you feel fine immediately after the accident, symptoms like neck stiffness, headaches, and pain often appear 12-48 hours later. Early evaluation helps document the connection between the crash and your symptoms for insurance purposes.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Expect During a Whiplash Exam</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Our comprehensive whiplash evaluation includes several key components:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">History & Crash Mechanism</h3>
              <p className="text-gray-700">We'll ask about the collision details, how your symptoms started, and when they began. Understanding the crash mechanism helps us identify potential injury patterns.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neck & Upper-Back Exam</h3>
              <p className="text-gray-700">Comprehensive examination of your neck, shoulders, and upper back including range-of-motion testing, palpation for tenderness, and assessment of muscle spasm.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neurologic Checks</h3>
              <p className="text-gray-700">We test strength, sensation, and reflexes in your arms and hands to check for nerve involvement. This helps rule out more serious spinal cord injuries.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Imaging Decisions</h3>
              <p className="text-gray-700">Based on your exam and symptoms, we may recommend X-ray to rule out fractures or MRI if soft-tissue or disc injury is suspected. We have onsite X-ray capabilities for immediate results.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Treatment Options</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Pain and anti-inflammatory medications as appropriate</li>
            <li>Guided stretches and gentle neck exercises</li>
            <li>Advice on safe activity and return-to-work timelines</li>
            <li>Referral for physical therapy or specialist care if needed</li>
            <li>
              Ongoing follow-up to monitor recovery and adjust the plan over time
            </li>
          </ul>
        </section>

        <RelatedTopics 
          topics={[
            { title: "Back & Neck Pain", href: "/car-accident/back-neck-pain" },
            { title: "PIP & Documentation", href: "/car-accident/documentation-pip" },
            { title: "Car Accident Urgent Care", href: "/car-accident-injury-clinic" }
          ]}
        />

        <AccidentFAQ
          faqs={[
            {
              question: "Can whiplash symptoms start days after a car accident?",
              answer: "Yes. Neck pain, stiffness, headaches, and dizziness may appear hours or even days after the crash. This is why it is important to be evaluated even if you feel 'okay' right after the accident. Early evaluation helps document the timeline for insurance purposes."
            },
            {
              question: "Do I need X-ray or MRI for whiplash?",
              answer: "Your provider will decide based on your exam and symptoms. X-ray can help rule out fractures, and MRI may be recommended if there is concern for disc or soft-tissue injury. We have onsite X-ray capabilities and can provide same-day results."
            },
            {
              question: "How long does whiplash recovery typically take?",
              answer: "Many people improve within 2–6 weeks with appropriate care. Some injuries take longer, especially if there is significant soft-tissue damage. Early evaluation, treatment, and follow-up can help reduce the risk of long-term symptoms."
            },
            {
              question: "Is it safe to drive with whiplash?",
              answer: "It depends on your pain, range of motion, and whether you have dizziness or neurologic symptoms. Your provider will advise you based on your exam and can provide documentation for work or driving restrictions if needed."
            },
            {
              question: "Can whiplash symptoms get worse over time?",
              answer: "Yes. It is common for soreness and stiffness to increase over the first few days. Early care can help manage pain and prevent some long-term problems. Proper documentation of symptom progression is also important for insurance claims."
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