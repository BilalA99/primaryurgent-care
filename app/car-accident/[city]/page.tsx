import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccidentCTA from "@/components/accident/AccidentCTA";
import AccidentHero from "@/components/accident/AccidentHero";
import AccidentCard from "@/components/accident/AccidentCard";
import AccidentInfoSection from "@/components/accident/AccidentInfoSection";
import AccidentAppointmentForm from "@/components/accident/AccidentAppointmentForm";
import HeroWithForm from "@/components/accident/HeroWithForm";
import ImmediateCareBanner from "@/components/accident/ImmediateCareBanner";
import AccidentSEOContent from "@/components/accident/AccidentSEOContent";
import AccidentFAQ from "@/components/accident/AccidentFAQ";
import MobileCarousel from "@/components/ui/MobileCarousel";
import FourteenDayBanner from "@/components/accident/FourteenDayBanner";
import MobileStickyFooter from "@/components/accident/MobileStickyFooter";
import PatientReviewsSection from "@/components/accident/PatientReviewsSection";
import TrustBadges from "@/components/accident/TrustBadges";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";
import { accidentCities, type AccidentCityKey } from "@/lib/accidentLocations";
import { MapPin, Phone, Clock, Shield, Stethoscope, FileText } from "lucide-react";

const baseUrl = "https://primaryuc.com";

type Params = { city: AccidentCityKey };

export async function generateStaticParams() {
  return Object.keys(accidentCities).map((city) => ({ city: city as AccidentCityKey }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const c = accidentCities[city];
  if (!c) return {};
    const title = `Car Accident Urgent Care in ${c.displayName || c.name} | Same-Day Injury Exam + PIP | PrimaryUC`;
    const url = `${baseUrl}/car-accident/${city}`;
    return {
      title,
      description: `Car accident urgent care in ${c.displayName || c.name}, FL. Same-day injury exam, walk-in welcome, PIP documentation. Onsite X-ray. Florida 14-day rule. Call ${c.phoneDisplay}.`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: `Car accident urgent care in ${c.displayName || c.name}, FL. Same-day injury exam, walk-in welcome, PIP documentation. Onsite X-ray. Florida 14-day rule.`,
      url,
      siteName: "Primary & Urgent Care Centers",
      images: [
        {
          url: `${baseUrl}/image-auto-accident-involving-two-cars.jpg`,
          width: 1200,
          height: 630,
          alt: `Car accident doctor examining patient after rear-end collision in ${c.name}, FL urgent care`,
        },
      ],
      locale: 'en_US',
      type: 'article'
    },
    twitter: { 
      card: 'summary_large_image', 
      title, 
      description: `Car accident urgent care in ${c.displayName || c.name}, FL. Same-day injury exam, walk-in welcome, PIP documentation. Onsite X-ray. Florida 14-day rule.`,
      images: [`${baseUrl}/image-auto-accident-involving-two-cars.jpg`],
      site: '@primaryurgentcare',
    },
    robots: { index: true, follow: true }
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const c = accidentCities[city];
  if (!c) notFound();

  const pageUrl = `${baseUrl}/car-accident/${city}`;
  const clinicId = `${pageUrl}#clinic`;

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: `Car Accident Urgent Care — ${c.displayName || c.name}`, url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: `Car accident injury exam in ${c.displayName || c.name}`,
    description: `Same-day car accident injury evaluation with onsite X-ray and PIP documentation in ${c.city}, FL`,
    provider: clinicId,
    areaServed: [c.city, "Palm Beach County", "Florida"],
    url: pageUrl
  });

  const localClinic = {
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: `Primary & Urgent Care — Car Accident Urgent Care (${c.displayName || c.name})`,
    url: `${baseUrl}/car-accident/${city}`,
    description: `Same-day car accident injury care in ${c.city}, FL. Onsite X-ray and PIP documentation.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: c.city,
      addressRegion: "FL",
      addressCountry: "US",
      postalCode: c.postalCode
    },
    telephone: c.phone,
    medicalSpecialty: ["Emergency Medicine", "Pain Management", "Trauma Care", "Urgent Care"],
    serviceType: ["Car Accident Injury Care", "PIP Documentation", "Urgent Care"],
    areaServed: {
      "@type": "City",
      name: c.city,
      containedInPlace: {
        "@type": "State",
        name: "Florida"
      }
    },
    ...(c.coordinates ? {
      geo: {
        "@type": "GeoCoordinates",
        latitude: c.coordinates.lat,
        longitude: c.coordinates.lng
      }
    } : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "09:00",
        closes: "20:00"
      }
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Insurance", "PIP"],
    currenciesAccepted: "USD",
    sameAs: c.gmbUrl ? [c.gmbUrl] : undefined,
    hasMap: c.gmbUrl
  };

  const faqSchemaObj = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How quickly can I be seen for car accident injuries in ${c.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `We offer same-day appointments and welcome walk-ins at our ${c.name} location. Wait times are typically under 15 minutes for auto-injury visits. We prioritize accident-related injuries to ensure you receive prompt medical attention and documentation. No appointment is necessary, and we understand the urgency of getting evaluated within Florida's 14-day PIP window to protect your benefits.`
        }
      },
      {
        "@type": "Question",
        name: "What types of car accident injuries do you treat?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `We treat whiplash, back and neck pain, joint injuries, soft-tissue strains, minor fractures, contusions, cuts and scrapes, headaches, and concussion-like symptoms. Our ${c.name} location has onsite X-ray capabilities and can arrange MRI or CT referrals when needed. We provide comprehensive evaluation and treatment for most urgent care-level car accident injuries with same-day documentation.`
        }
      },
      {
        "@type": "Question",
        name: "Do you provide documentation for insurance claims?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Every visit generates a detailed summary that includes exam findings, diagnoses, imaging results, and recommended treatment. These records are designed to support PIP and other insurance claims. We format all documentation for easy review by insurance adjusters and can coordinate with your attorney when properly authorized."
        }
      },
      {
        "@type": "Question",
        name: "Do you accept PIP and auto insurance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We accept most major insurance plans, including PIP coverage and many auto insurance plans. Our team verifies coverage and handles claim-related paperwork whenever possible. We work directly with insurance companies to ensure proper processing of your claim and can help coordinate benefits and billing."
        }
      },
      {
        "@type": "Question",
        name: "What should I bring to my exam?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bring a photo ID, your insurance card, and any accident-related paperwork such as the claim number or police report, if available. If you have prior medical records related to this accident, bring those as well. We'll handle all the paperwork and documentation needed for your case."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Car Accident Doctor in ${c.displayName || c.name} | Same-Day Exam`,
    url: `${baseUrl}/car-accident/${city}`,
    description: `Car accident doctor in ${c.displayName || c.name}, FL. Same-day exam, onsite X-ray, PIP documentation. Florida 14-day rule. Walk-ins welcome.`,
    about: {
      "@type": "MedicalCondition",
      name: "Motor Vehicle Collision Injuries"
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/image-auto-accident-involving-two-cars.jpg`,
      width: 1200,
      height: 630
    }
  };

  const graphSchema = buildGraphSchema([
    breadcrumb,
    localClinic,
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
        title={`Car Accident Doctor in ${c.displayName || c.name}, FL`}
        subtitle={
          <div>
            <p className="mb-2">
              Recent crash in {c.displayName || c.name}? Get a same-day accident exam at{' '}
              {c.gmbUrl ? (
                <a
                  href={c.gmbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline hover:text-blue-200 transition-colors font-medium"
                >
                  {c.address}, {c.city}, FL {c.postalCode}
                </a>
              ) : (
                <span>{c.address}, {c.city}, FL {c.postalCode}</span>
              )}. Seen in under 15 minutes at our {c.displayName || c.name} location.
            </p>
            <p className="text-lg font-semibold text-white">
              Call now:{' '}
              <a
                href={c.phoneHref}
                className="text-white underline hover:text-blue-200 transition-colors"
              >
                {c.phoneDisplay}
              </a>
            </p>
          </div>
        }
        checklist={[
          "Rapid triage & evaluation",
          "Onsite X-ray; MRI/CT referrals when indicated",
          "Documentation provided upon request",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title={`Check Car Accident Exam Availability in ${c.name}`} noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/image-auto-accident-involving-two-cars.jpg"
      />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Why Get Seen Now */}
      <AccidentInfoSection
        title="Why Get Seen Now"
        items={[
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Protect Your PIP Benefits",
            description: "Florida's 14-day rule means delayed care can put your $10,000 PIP benefits at risk.",
            type: 'warning'
          },
          {
            icon: <FileText className="w-6 h-6" />,
            title: "Stronger Documentation",
            description: "Early notes, exam findings, and imaging create a clear timeline insurers and attorneys can follow.",
            type: 'info'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Catch Hidden Injuries",
            description: "Whiplash, concussions, and disc injuries often feel worse days later — early evaluation finds them sooner.",
            type: 'warning'
          }
        ]}
        className="bg-white"
      />

      {/* Services & Treatment */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Imaging & Treatment Services in {c.displayName || c.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive care for whiplash, back and neck pain, joint injuries, and soft-tissue trauma after a collision.
            </p>
          </div>

          <MobileCarousel showDots={true} showArrows={false} autoPlay={false}>
            <AccidentCard
              title="Back & Neck Pain"
              description="Spine-focused evaluation after rear-end or side-impact collisions."
              href="/car-accident/back-neck-pain"
              icon={<Stethoscope className="w-6 h-6 text-[#2563eb]" />}
              features={["Range-of-motion & neurologic testing", "Spinal tenderness & disc-injury screening", "Imaging referrals when indicated"]}
              variant="primary"
            />
            
            <AccidentCard
              title="Whiplash Treatment"
              description="Neck pain, stiffness, or headaches after a crash."
              href="/car-accident/whiplash"
              icon={<Shield className="w-6 h-6 text-[#D52128]" />}
              features={["Neck exam & neurologic screening", "Onsite X-ray as needed", "Personalized recovery plan"]}
              variant="secondary"
            />
            
            <AccidentCard
              title="Digital X-Ray"
              description="Onsite imaging during your visit so you don't lose time."
              href="/emergency-room/digital-x-ray"
              icon={<FileText className="w-6 h-6 text-[#16A34A]" />}
              features={["Same-day results", "High-quality digital images", "Reports formatted for insurers"]}
              variant="accent"
            />
          </MobileCarousel>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <PatientReviewsSection />

      {/* Our {City} Accident Clinic */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our {c.displayName || c.name} Accident Clinic
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conveniently located in {c.city}, our car accident injury clinic serves patients throughout Palm Beach County. We provide same-day evaluation, onsite X-ray, and comprehensive PIP documentation for auto accident injuries.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-[#2563eb]/20 shadow-lg">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Left Column - Address & Hours */}
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Address</h3>
                    {c.gmbUrl ? (
                      <a
                        href={c.gmbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 text-lg hover:text-[#2563eb] transition-colors underline"
                      >
                        {c.address}, {c.city}, FL {c.postalCode}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-lg">{c.address}, {c.city}, FL {c.postalCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-[#16A34A]/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[#16A34A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Hours</h3>
                    <p className="text-gray-600 text-lg">Monday-Friday 9am-6pm</p>
                    <p className="text-gray-600 text-lg">Saturday 9am-4pm</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Call Now Button */}
              <div className="flex flex-col justify-center">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                  <div className="text-center mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-[#D52128]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-[#D52128]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Get Checked?</h3>
                    <p className="text-gray-600 mb-4">
                      Call now to schedule a same-day car accident exam in {c.displayName || c.name}.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={c.phoneHref}
                      className="w-full bg-[#D52128] hover:bg-[#b81b22] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Phone className="w-5 h-5" />
                      {c.phoneDisplay}
                    </a>
                    
                    {c.gmbUrl && (
                      <a
                        href={c.gmbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <MapPin className="w-5 h-5" />
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & Documentation */}
      <AccidentInfoSection
        title="Insurance & Documentation"
        items={[
          {
            icon: <FileText className="w-6 h-6" />,
            title: "PIP Claims Support",
            description: "Complete documentation tailored to Florida PIP requirements, including visit summaries, diagnoses, and recommended treatment.",
            type: 'info'
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Attorney-Friendly Records",
            description: "Structured medical records and imaging reports that legal teams can easily review and reference.",
            type: 'success'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "14-Day Rule Compliance",
            description: "We ensure your initial auto-injury evaluation occurs within Florida's 14-day PIP window whenever possible.",
            type: 'warning'
          }
        ]}
        className="bg-[#FAFAFA]"
      />

      {/* Car Accident Care in {City} */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Car Accident Care in {c.displayName || c.name}
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              Our {c.displayName || c.name} car accident injury clinic serves patients throughout Palm Beach County, including nearby communities. Located at{' '}
              {c.gmbUrl ? (
                <a
                  href={c.gmbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-900 underline hover:text-[#2563eb] transition-colors font-medium"
                >
                  {c.address}, {c.city}, FL {c.postalCode}
                </a>
              ) : (
                <span>{c.address}, {c.city}, FL {c.postalCode}</span>
              )}, we're easily accessible from major roads and neighborhoods in the area.
            </p>
            <p>
              Auto accident patients from {c.city} and surrounding areas come to us for same-day injury evaluation, onsite X-ray imaging, and comprehensive PIP documentation. Our {c.displayName || c.name} location is equipped with digital X-ray capabilities and experienced providers who specialize in car accident injury care.
            </p>
            <p>
              Whether you've been in a rear-end collision on local roads, a side-impact crash, or a parking lot accident, our car accident doctors in {c.city} can evaluate your injuries, provide treatment, and create the documentation your insurance company and attorney need.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <AccidentSEOContent 
        content={`If you've been in a car accident in ${c.displayName || c.name}, Florida, immediate medical evaluation is essential for both your health and your claim. Under Florida's PIP 14-day rule, you must see a doctor within 14 days of your accident to unlock up to $10,000 in PIP benefits. Our car accident doctors at the ${c.displayName || c.name} clinic provide comprehensive injury assessments, including whiplash care, back and neck pain evaluation, and soft-tissue injury treatment. Located at ${c.address}, ${c.city}, FL ${c.postalCode}, we offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal-injury cases. Our board-certified providers in ${c.city} routinely care for local drivers after rear-end collisions, side-impact crashes, and parking-lot accidents. We understand the documentation insurers and attorneys expect, so each visit generates clear notes, diagnoses, and follow-up plans that support both your recovery and your paperwork.`}
      />

      {/* Internal Links Section */}
      <AccidentInternalLinks />

      {/* FAQ Section */}
      <AccidentFAQ 
        title={`Frequently Asked Questions About Car Accident Injuries in ${c.displayName || c.name}`}
        faqs={[
          {
            question: `How quickly can I be seen for car accident injuries in ${c.displayName || c.name}?`,
            answer: `We offer same-day appointments and welcome walk-ins at our ${c.displayName || c.name} location. Wait times are typically under 15 minutes for auto-injury visits. We prioritize accident-related injuries to ensure you receive prompt medical attention and documentation. No appointment is necessary, and we understand the urgency of getting evaluated within Florida's 14-day PIP window to protect your benefits.`
          },
          {
            question: "What types of car accident injuries do you treat?",
            answer: `We treat whiplash, back and neck pain, joint injuries, soft-tissue strains, minor fractures, contusions, cuts and scrapes, headaches, and concussion-like symptoms. Our ${c.displayName || c.name} location has onsite X-ray capabilities and can arrange MRI or CT referrals when needed. We provide comprehensive evaluation and treatment for most urgent care-level car accident injuries with same-day documentation.`
          },
          {
            question: "Do you provide documentation for insurance claims?",
            answer:
              "Yes. Every visit generates a detailed summary that includes exam findings, diagnoses, imaging results, and recommended treatment. These records are designed to support PIP and other insurance claims. We format all documentation for easy review by insurance adjusters and can coordinate with your attorney when properly authorized."
          },
          {
            question: "Do you accept PIP and auto insurance?",
            answer:
              "We accept most major insurance plans, including PIP coverage and many auto insurance plans. Our team verifies coverage and handles claim-related paperwork whenever possible. We work directly with insurance companies to ensure proper processing of your claim and can help coordinate benefits and billing."
          },
          {
            question: "What should I bring to my exam?",
            answer:
              "Bring a photo ID, your insurance card, and any accident-related paperwork such as the claim number or police report, if available. If you have prior medical records related to this accident, bring those as well. We'll handle all the paperwork and documentation needed for your case."
          }
        ]}
      />

      {/* Mobile Sticky Footer */}
      <MobileStickyFooter phoneHref={c.phoneHref} phoneDisplay={c.phoneDisplay} />
    </main>
  );
}
