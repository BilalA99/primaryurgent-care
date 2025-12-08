import type { Metadata } from "next";
import Link from "next/link";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import RelatedTopics from "@/components/accident/RelatedTopics";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import TrustBadges from "@/components/accident/TrustBadges";
import ComparisonTable from "@/components/accident/ComparisonTable";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import { toJsonLd } from "@/lib/seo";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident: Urgent Care vs ER | Palm Beach Guide",
  description:
    "Urgent care vs ER after car accident in Palm Beach County. When UC is safe, when ER is critical, cost comparison, wait times, PIP coverage. Florida 14-day rule.",
  alternates: { canonical: `${baseUrl}/car-accident/urgent-care-vs-er` },
  openGraph: {
    title: "Car Accident: Urgent Care vs ER | Palm Beach Guide",
    description:
      "Urgent care vs ER after car accident in Palm Beach County. When UC is safe, when ER is critical, cost comparison, wait times, PIP coverage. Florida 14-day rule.",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    type: 'article',
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/car-crash-woman-on-call.jpg`,
        width: 1200,
        height: 630,
        alt: "Decision guide: urgent care vs emergency room after car accident in Palm Beach County",
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident: Urgent Care vs ER | Palm Beach Guide",
    description: "Urgent care vs ER after car accident in Palm Beach County. When UC is safe, when ER is critical, cost comparison, wait times, PIP coverage. Florida 14-day rule.",
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
        name: "When is urgent care appropriate after a car accident?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care is typically appropriate for stable patients with pain, cuts, bruises, suspected sprains or simple fractures, and mild head or whiplash symptoms without red-flag signs like severe chest pain, major bleeding, or difficulty breathing. We can evaluate your condition and determine if urgent care is right for you or if you need emergency services." }
      },
      {
        "@type": "Question",
        name: "When should I go straight to the ER?",
        acceptedAnswer: { "@type": "Answer", text: "Go straight to the ER or call 911 if you have severe chest pain, trouble breathing, uncontrolled bleeding, obvious fractures with deformity, loss of consciousness, confusion, seizure, or signs of spinal cord injury. When in doubt about the severity of your condition, it's always safer to err on the side of caution and seek emergency care immediately." }
      },
      {
        "@type": "Question",
        name: "What are the cost differences between urgent care and the ER?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care visits usually cost a fraction of ER visits. Many insured patients pay an urgent care copay similar to a primary-care visit ($20-$50), while ER visits often carry much higher facility fees ($500-$1,500+) and deductibles. Most urgent care visits for car accidents range from $100-$300, while ER visits typically cost $1,000-$3,000 or more for similar conditions." }
      },
      {
        "@type": "Question",
        name: "How do wait times compare between urgent care and ER?",
        acceptedAnswer: { "@type": "Answer", text: "Urgent care typically has wait times of 15-30 minutes for most patients, while ER wait times can be 2-6 hours or more for non-life-threatening conditions. Urgent care prioritizes patients based on arrival time and appointment scheduling, while ERs must prioritize by severity of condition, which means stable patients often wait significantly longer." }
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

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Car Accident: Urgent Care vs ER | Palm Beach Guide",
    url: `${baseUrl}/car-accident/urgent-care-vs-er`,
    description: "Urgent care vs ER after car accident in Palm Beach County. When UC is safe, when ER is critical, cost comparison, wait times, PIP coverage. Florida 14-day rule.",
    about: {
      "@type": "Service",
      name: "Car Accident Medical Decision Guidance"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/car-crash-woman-on-call.jpg`,
      width: 1200,
      height: 630
    }
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(webPageSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Urgent Care vs ER After a Car Accident"
        subtitle={
          <p>
            Not every crash requires the ER. We help you understand when urgent care is safe, when the ER is critical, and how both options work with PIP.
          </p>
        }
        checklist={[
          "Guidance on where to go based on your symptoms",
          "Shorter wait times and lower costs for appropriate cases",
          "Full documentation for PIP and insurance claims",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Check If Urgent Care Is Right for You" noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/car-crash-woman-on-call.jpg"
      />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Comparison Table */}
      <ComparisonTable />

      <div className="bg-[#FAFAFA] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="max-w-4xl mx-auto">

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Deciding Between Urgent Care and ER</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            The decision depends on the severity of your symptoms and the type of injuries you've sustained. Here's guidance to help you choose:
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">When Urgent Care Is Usually Appropriate</h3>
            <p className="text-gray-700 mb-3">Urgent care is typically safe for stable patients with moderate symptoms:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Neck or back pain without severe weakness or numbness</li>
              <li>Mild head injury with no loss of consciousness and no red-flag symptoms</li>
              <li>Sprains, strains, and suspected simple fractures</li>
              <li>Lacerations that may need stitches but are controlled</li>
              <li>Seatbelt bruises and soft-tissue pain</li>
            </ul>
            <p className="text-gray-700">If you can walk, breathe normally, and don't have severe chest pain or uncontrolled bleeding, urgent care may be the right choice.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">When You Should Go Straight to the ER</h3>
            <p className="text-gray-700 mb-3 text-[#D52128] font-semibold">Always err on the side of caution. Go to the ER or call 911 for:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Severe chest pain or trouble breathing</li>
              <li>Uncontrolled bleeding or obvious major fractures</li>
              <li>Loss of consciousness, seizure, or confusion after the crash</li>
              <li>Weakness, numbness, or inability to move an arm or a leg</li>
              <li>Severe abdominal pain or signs of internal bleeding</li>
            </ul>
            <p className="text-gray-700 font-semibold">When in doubt about the severity of your condition, it's always safer to seek emergency care immediately.</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-3">Cost & Wait Time Comparison</h2>
          <p className="text-base md:text-lg text-gray-700 mb-4">
            Every situation is different, but understanding the differences can help you make an informed decision:
          </p>
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-xl p-6 border-2 border-[#16A34A]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Urgent Care Advantages</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Wait times:</strong> Typically 15-30 minutes for most patients</li>
                <li><strong>Cost:</strong> Lower copays (often $20-$50) and facility fees compared to ER</li>
                <li><strong>Total visit cost:</strong> Usually $100-$300 for car accident evaluation</li>
                <li><strong>Service:</strong> Focused on your specific injury without emergency room delays</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency Room Considerations</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Wait times:</strong> Can be 2-6 hours or more for non-life-threatening conditions</li>
                <li><strong>Cost:</strong> Higher facility fees ($500-$1,500+) and deductibles</li>
                <li><strong>Total visit cost:</strong> Typically $1,000-$3,000+ for similar conditions</li>
                <li><strong>Priority:</strong> ERs must prioritize by severity, so stable patients wait longer</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PIP Coverage for Both</h3>
              <p className="text-gray-700">
                Florida PIP coverage can apply to both urgent care and ER visits when related to the crash, as long as you are evaluated within 14 days of the crash. Both options meet the PIP requirement, but urgent care often provides better value with faster service and lower costs while delivering the same quality documentation for your claim.
              </p>
            </div>
          </div>
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

      {/* FAQ Section */}
      <AccidentFAQ
        faqs={[
          {
            question: "When is urgent care appropriate after a car accident?",
            answer: "Urgent care is typically appropriate for stable patients with pain, cuts, bruises, suspected sprains or simple fractures, and mild head or whiplash symptoms without red-flag signs like severe chest pain, major bleeding, or difficulty breathing. Our team can evaluate your condition and determine if urgent care is right for you."
          },
          {
            question: "When should I go straight to the ER?",
            answer: "Go straight to the ER or call 911 if you have severe chest pain, trouble breathing, uncontrolled bleeding, obvious fractures with deformity, loss of consciousness, confusion, seizure, or signs of spinal cord injury. When in doubt about the severity of your condition, it's always safer to err on the side of caution and seek emergency care."
          },
          {
            question: "How do costs compare between urgent care and the ER?",
            answer: "Urgent care visits usually cost a fraction of ER visits. Many insured patients pay an urgent care copay similar to a primary-care visit, while ER visits often carry much higher facility fees and deductibles. Most urgent care visits for car accidents range from $100-$300, while ER visits typically cost $1,000-$3,000 or more for similar conditions."
          },
          {
            question: "Does PIP cover both urgent care and ER?",
            answer: "Yes. Florida PIP coverage can apply to both urgent care and ER visits when related to the crash, as long as you seek medical care within 14 days. Both options meet the PIP requirement, but urgent care often provides better value with faster service and lower costs while delivering the same quality documentation for your claim."
          }
        ]}
      />

      {/* Internal Links Section */}
      <AccidentInternalLinks />
    </main>
  );
}
