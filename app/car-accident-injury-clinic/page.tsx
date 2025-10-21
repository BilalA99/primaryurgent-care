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
import { toJsonLd } from "@/lib/seo";
import { accidentCities } from "@/lib/accidentLocations";
import { MapPin, Phone, FileText, Shield, Clock, Users, Stethoscope, X } from "lucide-react";

const baseUrl = "https://primaryuc.com";

export const metadata: Metadata = {
  title: "Car Accident Injury Urgent Care | Same-Day Exam, X-Ray & Documentation",
  description:
    "Injured in a car accident? Get a same-day medical exam, onsite X-ray, and insurance documentation at Primary & Urgent Care. Walk-ins welcome.",
  keywords: [
    'car accident urgent care',
    'post accident medical exam',
    'car accident injury clinic',
    'same day accident exam',
    'PIP documentation',
    'car accident X-ray',
    'auto accident urgent care',
    'accident injury evaluation',
    'Palm Beach County accident care',
    'walk-in accident clinic'
  ].join(', '),
  alternates: { canonical: `${baseUrl}/car-accident-injury-clinic` },
  openGraph: {
    title: "Car Accident Injury Urgent Care | Same-Day Exam, X-Ray & Documentation",
    description:
      "Same-day car accident exams, onsite X-ray, and documentation for insurance. Walk-ins welcome or book online.",
    url: `${baseUrl}/car-accident-injury-clinic`,
    siteName: "Primary & Urgent Care Centers",
    images: [
      {
        url: `${baseUrl}/websitelogo.png`,
        width: 1200,
        height: 630,
        alt: "Car Accident Injury Urgent Care",
      },
    ],
    locale: 'en_US',
    type: 'article'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Accident Injury Urgent Care | Same-Day Exam, X-Ray & Documentation",
    description: "Same-day exam, X-ray & documentation for car accident injuries.",
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
    medicalSpecialty: ["Emergency", "PainManagement"],
    areaServed: ["Palm Beach County, FL"],
    telephone: "+1-561-223-8024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palm Beach County",
      addressRegion: "FL",
      addressCountry: "US"
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
            "Yes. Hidden injuries such as whiplash or concussion are common. An exam protects your health and supports insurance documentation."
        }
      },
      {
        "@type": "Question",
        name: "Do you provide documentation for insurance claims?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We provide visit summaries and imaging reports that are commonly requested by insurers and attorneys."
        }
      },
      {
        "@type": "Question",
        name: "Is treatment time-sensitive for insurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Many policies require timely evaluation after a crash (e.g., Florida PIP has time windows). Confirm your plan's details."
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

      {/* SEO Content Section */}
      <AccidentSEOContent 
        content="After a car accident, immediate medical evaluation is crucial for your health and legal protection. Our experienced urgent care team provides comprehensive car accident injury assessments, including whiplash treatment, back and neck pain evaluation, and soft tissue injury care. We offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal injury cases. Located throughout Palm Beach County, our car accident urgent care centers are equipped to handle everything from minor cuts and bruises to whiplash and spinal injuries. Don't wait - get the medical attention you need today for your car accident injuries. Our board-certified physicians specialize in motor vehicle accident care and understand the unique challenges of treating car crash victims. We work closely with insurance companies, attorneys, and legal teams to ensure you receive the proper medical documentation needed for your case. Whether you've been involved in a rear-end collision, side-impact crash, or head-on collision, our team is trained to identify and treat the full spectrum of car accident injuries."
      />

      {/* Location Cards - Made Bigger and More Prominent */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4">
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
