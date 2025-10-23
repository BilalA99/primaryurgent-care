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
import { toJsonLd } from "@/lib/seo";
import { accidentCities } from "@/lib/accidentLocations";
import { MapPin, Phone, FileText, Shield, Clock, Users, Stethoscope, X, Dot } from "lucide-react";
import Image from "next/image";
import SlidingDiv from "@/components/SlidingAnimation";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident Clinic Palm Beach | Same-Day PIP | Primary & Urgent Care",
  description:
    "Car accident clinic in Palm Beach County. Same-day PIP exam, X-ray, injury documentation. Florida 14-day rule. Walk-ins at Royal Palm Beach, Lake Worth, Lantana.",
  keywords: [
    'car accident urgent care palm beach county',
    'post accident medical exam same day',
    'car accident injury clinic walk-in',
    'PIP documentation urgent care',
    'car accident X-ray onsite',
    'auto accident urgent care florida',
    'accident injury evaluation documentation',
    'same day accident exam palm beach',
    'walk-in accident clinic palm beach county',
    'car accident medical documentation PIP',
    'Florida PIP 14 day rule urgent care',
    'Palm Beach County car accident care'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident-injury-clinic` },
  openGraph: {
    title: "Car Accident Clinic Palm Beach | Same-Day PIP | Primary & Urgent Care",
    description:
      "Car accident clinic in Palm Beach County. Same-day PIP exam, X-ray, injury documentation. Florida 14-day rule. Walk-ins at Royal Palm Beach, Lake Worth, Lantana.",
    url: `${baseUrl}/car-accident-injury-clinic`,
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Car Accident Injury Urgent Care Palm Beach County",
      },
    ],
    locale: 'en_US',
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident Clinic Palm Beach | Same-Day PIP | Primary & Urgent Care",
    description: "Car accident clinic in Palm Beach County. Same-day PIP exam, X-ray, injury documentation. Florida 14-day rule. Walk-ins at Royal Palm Beach, Lake Worth, Lantana.",
    images: [`${baseUrl}/websitelogo.png`],
    site: '@primaryurgentcare',
  },
  robots: { index: true, follow: true }
};

export default function Page() {
  const cityList = Object.entries(accidentCities);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Primary & Urgent Care - Car Accident Injury Clinic",
    url: `${baseUrl}/car-accident-injury-clinic`,
    description:
      "Same-day urgent care after a car accident with onsite X-ray and documentation for insurance.",
    medicalSpecialty: ["Emergency Medicine", "Pain Management", "Trauma Care"],
    areaServed: [
      {
        "@type": "City",
        name: "Palm Beach County",
        containedInPlace: {
          "@type": "State", 
          name: "Florida"
        }
      }
    ],
    telephone: "+1-561-223-8024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palm Beach County",
      addressRegion: "FL", 
      addressCountry: "US"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00"
      }
    ],
    serviceType: "Urgent Care",
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Insurance", "PIP"],
    currenciesAccepted: "USD",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Accident Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Car Accident Injury Evaluation",
            description: "Comprehensive medical evaluation after car accidents"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure", 
            name: "Onsite X-Ray Imaging",
            description: "Immediate diagnostic imaging for accident injuries"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "PIP Documentation",
            description: "Complete medical documentation for PIP insurance claims"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should I see a doctor after a minor car accident?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Hidden injuries such as whiplash or concussion are common and may not show symptoms immediately. An exam protects your health and supports insurance documentation. Florida's PIP law requires medical care within 14 days to unlock benefits."
        }
      },
      {
        "@type": "Question",
        name: "Do you provide documentation for insurance claims?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We provide comprehensive medical documentation including exam findings, imaging reports, treatment plans, and visit summaries essential for PIP claims and legal cases. All documentation is provided immediately after your visit."
        }
      },
      {
        "@type": "Question",
        name: "Is treatment time-sensitive for insurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Florida's Personal Injury Protection (PIP) law requires you to seek medical care within 14 days of a car accident to unlock PIP benefits, regardless of fault. Missing this deadline can result in denial of PIP coverage for medical bills, lost wages, and other benefits."
        }
      },
      {
        "@type": "Question",
        name: "How quickly can I get seen after a car accident?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We offer same-day appointments and welcome walk-ins. Most patients are seen within 15-30 minutes of arrival, ensuring prompt evaluation and documentation. No appointment necessary for urgent accident-related injuries."
        }
      },
      {
        "@type": "Question",
        name: "What insurance do you accept for car accident injuries?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We accept most major insurance plans including PIP (Personal Injury Protection) coverage, auto insurance, and health insurance. We work directly with insurance companies and can provide documentation for your claims. Walk-ins welcome regardless of insurance status."
        }
      },
      {
        "@type": "Question",
        name: "What should I bring to my car accident exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Bring a photo ID, insurance card, and any accident-related documentation. If you have the accident report or insurance claim number, bring that as well. We'll handle all the paperwork and documentation needed for your case."
        }
      },
      {
        "@type": "Question",
        name: "Do you have onsite imaging for car accident injuries?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, we have onsite X-ray capabilities for immediate evaluation of fractures and injuries. We can also arrange MRI or CT referrals when needed. All imaging results are available same-day for your insurance documentation."
        }
      },
      {
        "@type": "Question",
        name: "How much does a car accident exam cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Costs vary based on your insurance coverage and services needed. Most insurance plans cover urgent care visits with lower copays than emergency rooms. We work with patients to provide transparent pricing and can help with insurance verification."
        }
      },
      {
        "@type": "Question",
        name: "What if I need specialist referrals after my exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We can refer you to appropriate specialists such as orthopedic surgeons, neurologists, or physical therapists based on your injury. We coordinate with specialists and provide all necessary documentation for your continued care."
        }
      },
      {
        "@type": "Question",
        name: "Can you provide documentation for legal cases?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, we provide comprehensive medical documentation suitable for legal cases including detailed exam findings, imaging reports, and treatment documentation. We work with attorneys and can provide additional documentation upon request with proper authorization."
        }
      }
    ]
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Car Accident Injury Clinic", item: `${baseUrl}/car-accident-injury-clinic` }
    ]
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(orgSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(faqSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title="Car Accident Injury Urgent Care in Palm Beach County, FL"
        subtitle={
          <p>
            If you've been in a car accident, get checked today. We provide injury exams, onsite X-ray,
            and documentation commonly needed for insurance claims.
          </p>
        }
        checklist={[
          "Seen today — walk-ins welcome",
          "Onsite X-ray; rapid MRI/CT referrals",
          "Visit summary & documentation for insurers",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title="Book Your Car Accident Exam" noWrapper={true} showHeader={false} compact={true} />}
      />

      {/* Florida's 14-Day PIP Rule Section */}
      <section className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 h-full px-4 sm:px-6 lg:px-8 xl:px-[60px] py-8 sm:py-12 lg:py-16 xl:py-20'>
        <div className='w-full h-full relative rounded-2xl overflow-hidden'>
          <Image src="/piprule.jpg" alt="Florida PIP 14-Day Rule" fill className='object-cover aspect-square' />
        </div>
        <SlidingDiv position='right' className='flex flex-col gap-2'>
          <div className='flex items-start justify-center xl:py-14 py-10 space-y-6 flex-col'>
            <p className='lg:text-6xl text-5xl font-600'>Florida's 14-Day PIP Rule — See a Doctor Fast to Protect Your Claim</p>
            <div className='text-lg text-[#494647]'>
              <p>
                Under Florida's Personal Injury Protection (PIP) law, you must receive medical care within 14 days of your car accident to unlock PIP benefits no matter who was at fault. Miss this window and the insurance carrier can deny payment for treatment, imaging, prescriptions, and lost wages.<br /><br />
                Even "minor" aches can mask whiplash, internal bleeding, or herniated discs, so book a same-day auto-injury visit or walk in today:
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

      {/* Accident Types We Treat Section */}
      <AccidentTypesTabs />

      {/* Car Accident Injuries We Treat Section */}
      <AccidentInjuryTypes />

      {/* SEO Content Section */}
      <AccidentSEOContent 
        content="After a car accident, immediate medical evaluation is crucial for your health and legal protection. Our experienced urgent care team provides comprehensive car accident injury assessments, including whiplash treatment, back and neck pain evaluation, and soft tissue injury care. We offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal injury cases. Located throughout Palm Beach County, our car accident urgent care centers are equipped to handle everything from minor cuts and bruises to whiplash and spinal injuries. Don't wait - get the medical attention you need today for your car accident injuries. Our board-certified physicians specialize in motor vehicle accident care and understand the unique challenges of treating car crash victims. We work closely with insurance companies, attorneys, and legal teams to ensure you receive the proper medical documentation needed for your case. Whether you've been involved in a rear-end collision, side-impact crash, or head-on collision, our team is trained to identify and treat the full spectrum of car accident injuries."
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
              { href: "/car-accident/royal-palm-beach", title: "Car Accident Urgent Care — Royal Palm Beach", desc: "11476 Okeechobee Blvd., Royal Palm Beach, FL • Same-day appointments available" },
              { href: "/car-accident/lake-worth", title: "Car Accident Urgent Care — Lake Worth", desc: "6447 Lake Worth Road, Lake Worth, FL • Onsite X-ray and imaging" },
              { href: "/car-accident/palm-springs", title: "Car Accident Urgent Care — Palm Springs", desc: "3696 S. Congress Ave., Palm Springs, FL • PIP documentation and insurance coordination" },
              { href: "/car-accident/lantana", title: "Car Accident Urgent Care — Lantana", desc: "6169 S Jog Road, Unit 4B, Lantana, FL • Walk-ins welcome, no appointment needed" },
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

    </main>
  );
}
