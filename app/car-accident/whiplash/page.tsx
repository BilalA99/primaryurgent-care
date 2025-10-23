import { Metadata } from "next";
import { toJsonLd } from "@/lib/seo";

const baseUrl = 'https://primaryuc.com';
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import RelatedTopics from "@/components/accident/RelatedTopics";

export const metadata: Metadata = {
  title: "Car Accident Whiplash Treatment Palm Beach | Primary & Urgent Care",
  description: "Whiplash treatment after car accident in Palm Beach County. Same-day evaluation, X-ray, pain management, PIP documentation. Walk-ins welcome. Call (561) 223-8024.",
  keywords: [
    "whiplash treatment palm beach county",
    "car accident whiplash florida",
    "whiplash injury urgent care same day",
    "post accident neck pain evaluation",
    "whiplash evaluation palm beach",
    "neck injury treatment urgent care",
    "whiplash documentation PIP",
    "car crash neck injury florida",
    "urgent care whiplash palm beach county",
    "PIP whiplash treatment florida",
    "delayed whiplash symptoms",
    "Florida PIP 14 day whiplash"
  ],
  openGraph: {
    title: "Car Accident Whiplash Treatment Palm Beach | Primary & Urgent Care",
    description: "Whiplash treatment after car accident in Palm Beach County. Same-day evaluation, X-ray, pain management, PIP documentation. Walk-ins welcome. Call (561) 223-8024.",
    url: `${baseUrl}/car-accident/whiplash`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/whiplash-hero-image.png`,
        width: 1200,
        height: 630,
        alt: "Whiplash Treatment After Car Accident Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident Whiplash Treatment Palm Beach | Primary & Urgent Care",
    description: "Whiplash treatment after car accident in Palm Beach County. Same-day evaluation, X-ray, pain management, PIP documentation. Walk-ins welcome. Call (561) 223-8024.",
    images: [`${baseUrl}/whiplash-hero-image.png`],
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

  const whiplashTreatmentSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Whiplash Treatment and Evaluation",
    description: "Comprehensive evaluation and treatment of whiplash injuries sustained in car accidents",
    bodyLocation: "Neck and Cervical Spine",
    preparation: "No special preparation required - walk-ins welcome for immediate evaluation",
    procedureType: "Diagnostic Evaluation and Treatment",
    followup: "Follow-up care and monitoring as needed, specialist referrals when appropriate",
    provider: {
      "@type": "MedicalOrganization",
      name: "Primary & Urgent Care Centers",
      url: `${baseUrl}/car-accident/whiplash`
    },
    medicalSpecialty: "Emergency Medicine",
    indication: "Neck pain, stiffness, headaches, or other symptoms following car accident",
    contraindication: "Severe neurological symptoms requiring emergency room evaluation"
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
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(whiplashTreatmentSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faq)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Whiplash Treatment After a Car Accident"
        subtitle={<p>Neck pain or headaches after a crash? Get evaluated today.</p>}
        checklist={[
          "Comprehensive neck mobility assessment and neurological examination for car accident whiplash injuries",
          "Onsite X-ray imaging and MRI referral when indicated for serious car crash neck trauma",
          "Clear return-to-work and activity guidance for car accident whiplash recovery",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Whiplash Exam" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/whiplash-hero-image.png"
      />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">When to Get Checked</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Severe neck pain, stiffness, and reduced range of motion after car accident whiplash injury</li>
            <li>Headaches, dizziness, jaw pain, or shoulder pain following car crash trauma</li>
            <li>Delayed whiplash symptoms beginning hours or days after the car accident</li>
            <li>Numbness, tingling, or weakness in arms or hands from car accident neck injury</li>
            <li>Difficulty concentrating, memory issues, or cognitive problems after car crash whiplash</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">What to Expect During Your Visit</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Detailed medical history review and comprehensive car accident injury documentation</li>
            <li>Thorough physical examination of neck, shoulders, and arms for car crash whiplash assessment</li>
            <li>Complete range of motion and strength testing for car accident neck injury evaluation</li>
            <li>Comprehensive neurological screening for nerve damage from car accident whiplash trauma</li>
            <li>Onsite X-ray imaging if indicated to rule out fractures from car crash neck injury</li>
            <li>Detailed discussion of car accident whiplash treatment options and recovery timeline</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Treatment Options</h2>
          <ul className="list-disc ml-6 space-y-2 mb-6">
            <li>Comprehensive pain management with appropriate medications for car accident whiplash treatment</li>
            <li>Detailed ice and heat therapy instructions for car crash neck injury recovery</li>
            <li>Customized neck exercises and stretching program for car accident whiplash rehabilitation</li>
            <li>Activity modifications and return-to-work guidance for car crash injury recovery</li>
            <li>Referral to specialized specialists for severe car accident whiplash cases</li>
            <li>Ongoing follow-up care and monitoring plan for car crash whiplash recovery progress</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Recovery Timeline</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Most car accident whiplash injuries improve within 2-6 weeks with proper medical care and treatment. Severe car crash whiplash cases may take several months to fully recover. Early evaluation and treatment after a car accident can help speed whiplash recovery and prevent chronic neck pain issues from developing.
          </p>
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
              question: "Can whiplash start days after a car accident?",
              answer: "Yes. Neck pain, headaches, or stiffness can appear hours or days later. An exam helps rule out more serious injury and guides recovery."
            },
            {
              question: "Do I need X-ray or MRI for whiplash?",
              answer: "X-ray can rule out fractures; MRI may be referred if symptoms suggest soft-tissue or disc injury. We'll advise based on your exam."
            },
            {
              question: "How long does whiplash take to heal?",
              answer: "Most whiplash injuries improve within 2-6 weeks with proper care. Severe cases may take several months. Early evaluation and treatment can help speed recovery."
            },
            {
              question: "Can I work with whiplash?",
              answer: "It depends on your symptoms and job requirements. We'll provide activity modifications and documentation for work accommodations if needed."
            },
            {
              question: "What treatment options are available for whiplash?",
              answer: "Whiplash treatment may include pain medication, neck exercises, and lifestyle modifications. Our team will develop a personalized treatment plan based on your specific symptoms and injury severity. We also provide documentation for insurance claims and coordinate with specialists when needed."
            }
          ]}
        />
        </div>
      </div>
    </main>
  );
}