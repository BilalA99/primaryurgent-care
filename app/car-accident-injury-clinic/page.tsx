import type { Metadata } from "next";
import Link from "next/link";
import AccidentCTA from "@/components/accident/AccidentCTA";
import AccidentHero from "@/components/accident/AccidentHero";
import AccidentCard from "@/components/accident/AccidentCard";
import AccidentInfoSection from "@/components/accident/AccidentInfoSection";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import LinkCardGrid from "@/components/accident/LinkCardGrid";
import AccidentSEOContent from "@/components/accident/AccidentSEOContent";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import AccidentTypesTabs from "@/components/ui/AccidentTypesTabs";
import AccidentInjuryTypes from "@/components/car-accident/AccidentInjuryTypes";
import TrustBadges from "@/components/accident/TrustBadges";
import FourteenDayUrgencyBlock from "@/components/accident/FourteenDayUrgencyBlock";
import AttorneyFriendlySection from "@/components/accident/AttorneyFriendlySection";
import ComparisonTable from "@/components/accident/ComparisonTable";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";
import { MapPin, Phone, FileText, Shield, Clock, Users, Stethoscope, X, Dot } from "lucide-react";
import Image from "next/image";
import SlidingDiv from "@/components/SlidingAnimation";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident Urgent Care Palm Beach | PIP Exam | PrimaryUC",
  description:
    "Car accident urgent care in Palm Beach County. Same-day evaluation, PIP documentation, walk-in welcome. Onsite X-ray, Florida 14-day rule compliant. 4 locations.",
  alternates: { canonical: `${baseUrl}/car-accident-injury-clinic` },
  openGraph: {
    title: "Car Accident Urgent Care Palm Beach | PIP Exam | PrimaryUC",
    description:
      "Car accident urgent care in Palm Beach County. Same-day evaluation, PIP documentation, walk-in welcome. Onsite X-ray, Florida 14-day rule compliant. 4 locations.",
    url: `${baseUrl}/car-accident-injury-clinic`,
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Car accident doctor examining patient with neck brace in Palm Beach County urgent care",
      },
    ],
    locale: 'en_US',
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident Urgent Care Palm Beach | PIP Exam | PrimaryUC",
    description: "Car accident urgent care in Palm Beach County. Same-day evaluation, PIP documentation, walk-in welcome. Onsite X-ray, Florida 14-day rule compliant.",
    images: [`${baseUrl}/websitelogo.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const pageUrl = `${baseUrl}/car-accident-injury-clinic`;

  const serviceSchema = buildServiceSchema({
    name: "Same-day car accident injury exam",
    description: "Urgent care accident evaluation with onsite X-ray and PIP documentation",
    provider: "https://primaryuc.com/#clinic",
    areaServed: ["Palm Beach County", "Royal Palm Beach", "Lake Worth", "Palm Springs", "Lantana"],
    url: pageUrl
  });

  const faqSchemaObj = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I see a doctor immediately after a car accident?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you should seek medical attention as soon as possible after a car accident, even if you don't feel injured. Some injuries, like whiplash or internal trauma, may not show symptoms immediately but can worsen without proper treatment. Early evaluation also helps with insurance documentation."
        }
      },
      {
        "@type": "Question",
        name: "What types of injuries do you treat after car accidents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We treat a wide range of car accident injuries including whiplash, back and neck pain, soft tissue injuries, minor fractures, contusions, cuts and scrapes, headaches, and concussion symptoms. Our onsite X-ray and imaging capabilities help us diagnose and treat most urgent care-level injuries."
        }
      },
      {
        "@type": "Question",
        name: "Do you accept insurance for car accident injuries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we accept most major insurance plans including PIP (Personal Injury Protection) coverage, which is required in Florida. We also work with auto insurance companies and can provide documentation for your personal injury claim. Our team will help coordinate billing and insurance verification."
        }
      },
      {
        "@type": "Question",
        name: "How quickly can I be seen for car accident injuries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer same-day appointments and welcome walk-ins for car accident injuries. Our urgent care centers typically have wait times under 15 minutes, and we prioritize accident-related injuries to ensure you receive prompt medical attention and documentation."
        }
      },
      {
        "@type": "Question",
        name: "What documentation will I receive for my insurance claim?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide comprehensive documentation including detailed medical reports, X-ray results, treatment plans, and visit summaries. This documentation is essential for your insurance claim and any potential legal proceedings. We can also coordinate with your attorney if needed."
        }
      }
    ]
  };

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: pageUrl }
  ]);

  const webPageSchema = {
    "@type": "MedicalWebPage",
    name: "Car Accident Urgent Care Palm Beach | Same-Day Exam + PIP | PrimaryUC",
    url: pageUrl,
    description: "Car accident urgent care in Palm Beach County. Same-day eval, PIP documentation & onsite X-ray. 4 walk-in locations. Florida 14-day rule compliant.",
    about: {
      "@type": "MedicalCondition",
      name: "Motor Vehicle Collision Injuries"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/websitelogo.png`,
      width: 1200,
      height: 630
    }
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    webPageSchema,
    serviceSchema,
    faqSchemaObj
  ]);

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
      
      {/* 14-Day Rule Warning Banner */}
      <FourteenDayBanner />

      {/* Hero Section */}
      <HeroWithForm
        title="Car Accident Injury Clinic in Palm Beach County"
        subtitle={
          <p>
            Just had a crash? Our car accident doctors provide same-day exams, onsite X-ray, and documentation most insurers and attorneys request.
          </p>
        }
        checklist={[
          "Seen today — walk-ins welcome",
          "Onsite X-ray; rapid MRI/CT referrals",
          "Visit summary & documentation for insurers",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Check Car Accident Exam Availability" noWrapper={true} showHeader={false} compact={true} />}
      />

      {/* Trust & Urgency Strip */}
      <TrustBadges />

      {/* Why You Must Be Seen Within 14 Days */}
      <FourteenDayUrgencyBlock />

      {/* Florida's 14-Day PIP Rule Section */}
      <section className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 h-full px-4 sm:px-6 lg:px-8 xl:px-[60px] py-8 sm:py-12 lg:py-16 xl:py-20'>
        <div className='w-full h-full relative rounded-2xl overflow-hidden'>
          <Image 
            src="/piprule.jpg" 
            alt="Florida PIP 14-day rule documentation for car accident insurance claims in Palm Beach County" 
            fill 
            className='object-cover aspect-square'
            loading="lazy"
          />
        </div>
        <SlidingDiv position='right' className='flex flex-col gap-2'>
          <div className='flex items-start justify-center xl:py-14 py-10 space-y-6 flex-col'>
            <p className='lg:text-6xl text-5xl font-600'>Florida's 14-Day PIP Rule — See a Doctor Fast to Protect Your Claim</p>
            <div className='text-lg text-[#494647]'>
              <p>
                Under Florida's Personal Injury Protection (PIP) law, you must receive medical care within 14 days of your car accident to unlock PIP benefits no matter who was at fault. Miss this window and the insurance carrier can deny payment for treatment, imaging, prescriptions, and lost wages.<br /><br />
                Our car accident urgent care offers same-day evaluation and PIP documentation for your claim. Even "minor" aches can mask whiplash, internal bleeding, or herniated discs, so book a same-day auto-injury visit or walk in today:
              </p>
              <br />
              <p className='flex flex-row space-x-2 items-center justify-start'>
                <Dot className='w-8 h-8' /> On-site digital X-ray, CT & MRI with STAT reads (≤ 3 hrs)
              </p>
              <p className='flex flex-row space-x-2 items-center justify-start'>
                <Dot className='w-8 h-8' /> Detailed injury documentation for attorneys & insurers
              </p>
              <p className='flex flex-row space-x-2 items-center justify-start'>
                <Dot className='w-8 h-8' /> Direct PIP billing—no out-of-pocket surprise bills
              </p>
              <p className='flex flex-row space-x-2 items-center justify-start'>
                <Dot className='w-8 h-8' /> Open extended hours across Palm Beach County
              </p>
            </div>
          </div>
        </SlidingDiv>
      </section>

      {/* Types of Car Accident Injuries We Treat */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types of Car Accident Injuries We Treat
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team evaluates and treats a wide range of injuries commonly seen after motor vehicle collisions
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Neck & Whiplash Injuries</h3>
              <p className="text-gray-700">Neck pain, stiffness, headaches, and reduced range of motion after rear-end or side-impact collisions. Symptoms may develop hours or days after the crash.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Back & Spinal Injuries</h3>
              <p className="text-gray-700">Lower back pain, upper back pain, muscle strains, disc injuries, and facet joint irritation. We evaluate the full spine and check for nerve involvement.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Headaches & Concussion Symptoms</h3>
              <p className="text-gray-700">Post-accident headaches, dizziness, confusion, and concussion-like symptoms. We screen for more serious head injuries and provide appropriate care.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Soft Tissue Injuries</h3>
              <p className="text-gray-700">Muscle strains, ligament sprains, contusions, and seatbelt-related injuries. These injuries can cause significant pain and may worsen over time.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Joint & Extremity Injuries</h3>
              <p className="text-gray-700">Shoulder, knee, wrist, and ankle injuries from impact or bracing during the collision. We evaluate joint stability and range of motion.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Minor Fractures</h3>
              <p className="text-gray-700">Simple fractures that don't require emergency surgery. We have onsite X-ray to diagnose and can refer for orthopedic care when needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Early Evaluation Matters */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Early Evaluation Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting evaluated soon after a car accident benefits both your health and your insurance claim
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Clinical Benefits</h3>
              <p className="text-gray-700 mb-4">Many injuries, especially whiplash and soft-tissue trauma, may not cause immediate symptoms. Early evaluation helps identify hidden injuries before they worsen, allowing for prompt treatment and better recovery outcomes.</p>
              <p className="text-gray-700">Early intervention can also prevent chronic pain conditions and reduce the risk of long-term complications from untreated injuries.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">PIP Timing Requirements</h3>
              <p className="text-gray-700 mb-4">Florida's PIP law requires medical care within 14 days of your accident to unlock up to $10,000 in PIP benefits. Missing this deadline can result in denial of coverage for medical bills, lost wages, and related benefits.</p>
              <p className="text-gray-700">Early documentation also creates a clear timeline that links your symptoms to the collision, which is important for both insurance claims and any potential legal proceedings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Accident Types We See */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Accident Types We See
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              We treat patients after various types of motor vehicle collisions. Even minor fender-benders can cause significant injuries.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Rear-End Collisions</h3>
              <p className="text-sm text-gray-700">Common cause of whiplash and neck injuries. Even low-speed impacts can cause significant trauma.</p>
            </div>
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Side-Impact Crashes</h3>
              <p className="text-sm text-gray-700">Often cause back pain, shoulder injuries, and head trauma from lateral forces.</p>
            </div>
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Head-On Collisions</h3>
              <p className="text-sm text-gray-700">Higher-energy impacts that may cause multiple injuries including spinal trauma.</p>
            </div>
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-xl p-6 border-2 border-[#D52128]/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Low-Speed Accidents</h3>
              <p className="text-sm text-gray-700">Parking lot fender-benders and minor collisions can still cause whiplash and soft-tissue injuries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Accident Types We Treat Section */}
      <AccidentTypesTabs />

      {/* Car Accident Injuries We Treat Section */}
      <AccidentInjuryTypes />

      {/* Urgent Care vs ER Comparison */}
      <ComparisonTable />

      {/* Attorney-Friendly Documentation Section */}
      <AttorneyFriendlySection />

      {/* SEO Content Section */}
      <AccidentSEOContent 
        content="After a car accident, immediate medical evaluation is crucial for both your health and your claim. Under Florida's PIP 14-day rule, you must see a doctor within 14 days of your accident to unlock up to $10,000 in PIP benefits. Our experienced urgent care team provides comprehensive car accident injury assessments, including whiplash treatment, back and neck pain evaluation, and soft tissue injury care. We offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal injury cases. Located throughout Palm Beach County, our clinics are equipped to handle everything from minor cuts and bruises to suspected spinal injuries. Our board-certified providers understand Florida's PIP 14-day rule and the documentation insurers and attorneys expect, so your visit generates clear, organized records that support your recovery. We work closely with insurance companies, attorneys, and legal teams to ensure you receive the proper medical documentation needed for your case, including whiplash settlement documentation and PIP claim paperwork."
      />

      {/* Location Cards - Made Bigger and More Prominent */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Car Accident Urgent Care Locations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get same-day car accident injury evaluation at any of our convenient Palm Beach County locations
            </p>
          </div>
          <LinkCardGrid
            items={[
              { href: "/car-accident/royal-palm-beach", title: "Car Accident Urgent Care — Royal Palm Beach", desc: "11476 Okeechobee Blvd, Royal Palm Beach, FL 33411 • Same-day appointments available" },
              { href: "/car-accident/lake-worth", title: "Car Accident Urgent Care — Lake Worth", desc: "6447 Lake Worth Rd, Lake Worth Beach, FL 33463 • Onsite X-ray and imaging" },
              { href: "/car-accident/palm-springs", title: "Car Accident Urgent Care — Palm Springs", desc: "3460 S Congress Ave, Palm Springs, FL 33461 • PIP documentation and insurance coordination" },
              { href: "/car-accident/lantana", title: "Car Accident Urgent Care — Lantana / Jog Rd", desc: "6169 Jog Rd Unit 4B, Lake Worth Beach, FL 33463 • Walk-ins welcome, no appointment needed" },
            ]}
          />
        </div>
      </section>

      {/* Immediate Medical Care After a Crash */}
      <AccidentInfoSection
        title="Immediate Medical Care After a Crash"
        items={[
          {
            icon: <Stethoscope className="w-6 h-6" />,
            title: "Comprehensive Injury Evaluation",
            description: "Thorough assessment of head, neck, back, joints, and soft tissue injuries",
            type: 'primary'
          },
          {
            icon: <X className="w-6 h-6" />,
            title: "Onsite Imaging Services",
            description: "Digital X-ray available; rapid MRI/CT referrals when indicated",
            type: 'secondary'
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Pain Management",
            description: "Immediate pain relief and return-to-activity guidance",
            type: 'primary'
          },
          {
            icon: <FileText className="w-6 h-6" />,
            title: "Complete Documentation",
            description: "Detailed visit summaries for insurance and legal purposes",
            type: 'secondary'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Same-Day Service",
            description: "Walk-ins welcome or book online appointments",
            type: 'primary'
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: "Expert Team",
            description: "Board-certified physicians and experienced medical staff",
            type: 'secondary'
          }
        ]}
        className="bg-white"
      />

      {/* FAQ Section */}
      <AccidentFAQ />

      {/* Internal Links Section */}
      <AccidentInternalLinks />

    </main>
  );
}
