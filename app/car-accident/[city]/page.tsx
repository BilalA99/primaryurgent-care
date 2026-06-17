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
import PatientReviewsSection from "@/components/accident/PatientReviewsSection";
import TrustBadges from "@/components/accident/TrustBadges";
import AccidentInternalLinks from "@/components/accident/AccidentInternalLinks";
import { toJsonLd, buildBreadcrumb, buildServiceSchema, buildGraphSchema } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";
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

  const cityName = c.displayName || c.name;
  const isLakeWorth = city === "lake-worth";
  const heroTitle = isLakeWorth
    ? "Urgent Care After a Car Accident in Lake Worth, FL"
    : `Car Accident Doctor in ${cityName}, FL`;
  const title = isLakeWorth
    ? "Urgent Care After Car Accident Lake Worth | PrimaryUC"
    : `Car Accident Doctor in ${cityName}, FL | Same-Day Exam · PIP Accepted | PrimaryUC`;
  const description = isLakeWorth
    ? `Same-day car accident exams in Lake Worth with on-site X-ray, injury documentation, and PIP billing support. Walk in or request a visit.`
    : `Hurt in a car accident in ${cityName}? Get a same-day injury exam at PrimaryUC. Onsite X-ray, PIP documentation, walk-ins welcome. Florida 14-day rule support. Call ${c.phoneDisplay}.`;
  const url = `${baseUrl}/car-accident/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
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
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/image-auto-accident-involving-two-cars.jpg`],
      site: '@primaryurgentcare',
    },
    robots: { index: true, follow: true },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': c.city,
      ...(c.coordinates ? {
        'geo.position': `${c.coordinates.lat};${c.coordinates.lng}`,
        'ICBM': `${c.coordinates.lat}, ${c.coordinates.lng}`
      } : {})
    }
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const c = accidentCities[city];
  if (!c) notFound();

  const cityName = c.displayName || c.name;
  const isLakeWorth = city === "lake-worth";
  const heroTitle = isLakeWorth
    ? "Urgent Care After a Car Accident in Lake Worth, FL"
    : `Car Accident Doctor in ${cityName}, FL`;
  const pageUrl = `${baseUrl}/car-accident/${city}`;
  const clinicId = `${pageUrl}#clinic`;

  const breadcrumb = buildBreadcrumb([
    { name: "Home", url: baseUrl },
    { name: "Car Accident Urgent Care", url: `${baseUrl}/car-accident-injury-clinic` },
    { name: `Car Accident Urgent Care — ${cityName}`, url: pageUrl }
  ]);

  const serviceSchema = buildServiceSchema({
    name: `Car accident injury exam in ${cityName}`,
    description: `Same-day car accident injury evaluation with onsite X-ray and PIP documentation in ${c.city}, FL`,
    provider: clinicId,
    areaServed: [c.city, "Palm Beach County", "Florida"],
    url: pageUrl
  });

  const localClinic = {
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": clinicId,
    name: `Primary & Urgent Care — Car Accident Urgent Care (${cityName})`,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5"
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
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "16:00"
      }
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Insurance", "PIP"],
    currenciesAccepted: "USD",
    sameAs: c.gmbUrl ? [c.gmbUrl] : undefined,
    hasMap: c.gmbUrl
  };

  // Single source of truth for visible <AccidentFAQ /> + JSON-LD FAQPage schema.
  // Same array referenced below in the schema graph AND by the AccidentFAQ component near the bottom of the page.
  const cityAccidentFaqs = [
    {
      question: `How quickly can I be seen for car accident injuries in ${cityName}?`,
      answer: `We offer same-day appointments and welcome walk-ins at our ${cityName} location. Auto-injury visits are prioritized when possible so you can receive prompt medical evaluation and documentation. Getting evaluated quickly can help document symptoms, exam findings, and treatment recommendations within Florida's 14-day PIP window.`,
    },
    {
      question: "What types of car accident injuries do you treat?",
      answer: `We treat whiplash, back and neck pain, joint injuries, soft-tissue strains, minor fractures, contusions, cuts and scrapes, headaches, and concussion-like symptoms. Our ${cityName} location has onsite X-ray capabilities and can arrange MRI or CT referrals when needed. We provide comprehensive evaluation and treatment for most urgent care-level car accident injuries with same-day documentation.`,
    },
    {
      question: "Do you provide documentation for insurance claims?",
      answer:
        "Yes. Every visit generates a detailed summary that includes exam findings, diagnoses, imaging results when performed, and recommended treatment. These records are designed for PIP and insurance documentation and can be shared with your insurance provider if needed.",
    },
    {
      question: "Do you accept PIP and auto insurance?",
      answer:
        "We accept most major insurance plans, including PIP coverage and many auto insurance plans. Our team verifies coverage and handles claim-related paperwork whenever possible. We work directly with insurance companies to ensure proper processing of your claim and can help coordinate benefits and billing.",
    },
    {
      question: "What should I bring to my exam?",
      answer:
        "Bring a photo ID, your insurance card, and any accident-related paperwork such as the claim number or police report, if available. If you have prior medical records related to this accident, bring those as well. We'll handle all the paperwork and documentation needed for your case.",
    },
    {
      question: `Is Primary UC open on weekends for car accident walk-ins in ${cityName}?`,
      answer: `Yes. Our ${cityName} location accepts walk-ins for car accident injuries during regular hours, including weekend hours. No appointment is required, but calling ahead helps us prepare your visit and minimize wait time. Call us at ${c.phoneDisplay} or check the location page for current hours.`,
    },
    {
      question: "What is Florida's 14-day PIP rule, and why does it matter?",
      answer: `Florida's PIP 14-day rule requires you to receive your initial medical visit within 14 days of the accident to access your Personal Injury Protection benefits. The clock counts from the crash date, not the day your symptoms started. The same statute also requires an Emergency Medical Condition (EMC) certification by a qualifying provider — MD, DO, PA, APRN, or dentist — to unlock the full $10,000 PIP medical cap. Without an EMC determination, PIP medical benefits cap at $2,500. Our ${cityName} car accident doctors meet both requirements in a single same-day visit. Call ${c.phoneDisplay} or walk in.`,
    },
    {
      question: `Why see a medical doctor for car accident injuries in ${cityName} instead of a chiropractor?`,
      answer: `Both medical doctors and chiropractors can satisfy Florida's 14-day PIP rule for initial services. But only a medical doctor, osteopathic physician, dentist, physician assistant, or advanced practice registered nurse can certify the Emergency Medical Condition needed to access the full $10,000 PIP medical benefit — chiropractors cannot, under Florida law. A medical doctor at our ${cityName} location can also order and read on-site X-ray, refer for MRI when soft-tissue or nerve injury is suspected, and screen for serious conditions a chiropractic visit cannot detect. Chiropractic care can be a valuable follow-up once those serious causes have been ruled out.`,
    },
  ];

  const faqSchemaObj = {
    "@type": "FAQPage",
    mainEntity: cityAccidentFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isLakeWorth ? heroTitle : `Car Accident Doctor in ${cityName} | Same-Day Exam`,
    url: `${baseUrl}/car-accident/${city}`,
    description: isLakeWorth
      ? `Urgent care after a car accident in Lake Worth, FL. Same-day exams, on-site X-ray, injury documentation, and PIP billing support.`
      : `Car accident doctor in ${cityName}, FL. Same-day exam, onsite X-ray, PIP documentation. Florida 14-day rule support. Walk-ins welcome.`,
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
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Car Accident Care', href: '/car-accident-injury-clinic' },
        { name: `Car Accident Doctor — ${cityName}`, href: `/car-accident/${city}` }
      ]} />

      {/* 14-Day Rule Warning Banner — sticky, dismissable */}
      <FourteenDayBanner phoneHref={c.phoneHref} phoneDisplay={c.phoneDisplay} />

      {/* Hero Section */}
      <HeroWithForm
        title={heroTitle}
        subtitle={
          <div>
            <p className="mb-2">
              Same-day car accident exams with on-site X-ray, injury documentation, and PIP billing support in {cityName}. Walk in or request a visit today.
            </p>
            <p className="text-sm md:text-base text-white/80">
              Convenient care at{' '}
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
              )}.
            </p>
          </div>
        }
        checklist={[
          "No referral needed",
          "Same-day accident exams",
          "On-site X-ray available",
          "PIP documentation provided",
          "Florida 14-day PIP support",
          "Walk-ins welcome",
        ]}
        phoneHref={c.phoneHref}
        phoneDisplay={c.phoneDisplay}
        form={
          <AccidentAppointmentForm
            title={`Get a Same-Day Exam in ${c.name}`}
            noWrapper={true}
            showHeader={false}
            compact={true}
            city={cityName}
          />
        }
        backgroundImage="https://mountainspineortho.b-cdn.net/PrimaryUC-images/image-auto-accident-involving-two-cars.jpg"
      />

      {/* Trust Badges — immediately after hero */}
      <TrustBadges />

      {/* Why Get Seen Now */}
      <AccidentInfoSection
        title="Why Get Seen Now"
        items={[
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Florida 14-Day PIP Support",
            description: "Florida's 14-day PIP rule may affect your ability to use PIP benefits after an accident.",
            type: 'warning'
          },
          {
            icon: <FileText className="w-6 h-6" />,
            title: "Clear Medical Documentation",
            description: "Early visit notes, exam findings, imaging records when performed, and follow-up recommendations create a clear medical record.",
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
              Imaging & Treatment Services in {cityName}
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
              Our {cityName} Accident Clinic
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
                    <p className="text-gray-600 text-lg">Monday–Friday 9am–6pm</p>
                    <p className="text-gray-600 text-lg">Saturday 9am–4pm</p>
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
                      Call now to schedule a same-day car accident exam in {cityName}.
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
            description: "Medical documentation for PIP and insurance claims, including visit summaries, diagnoses, and recommended treatment.",
            type: 'info'
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Insurance-Ready Records",
            description: "Clear medical records you can share with your insurance provider if needed, including imaging reports when performed.",
            type: 'success'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Prompt Evaluation",
            description: "Getting evaluated quickly can help document your symptoms, exam findings, and treatment recommendations.",
            type: 'warning'
          }
        ]}
        className="bg-[#FAFAFA]"
      />

      {/* Urgent Care vs ER Safety Guidance */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="rounded-2xl border-2 border-[#2563eb]/20 bg-gradient-to-br from-[#F2F6FC] to-white p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Should You Go to Urgent Care or the ER After a Car Accident?
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                PrimaryUC can evaluate stable, non-life-threatening accident injuries such as neck pain, back pain, headaches, soreness, sprains, strains, and possible minor fractures.
              </p>
              <p>
                If you have severe chest pain, trouble breathing, loss of consciousness, severe bleeding, confusion, stroke-like symptoms, severe abdominal pain, or major trauma, call 911 or go to the emergency room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Car Accident Care in {City} */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Car Accident Injury Care in {cityName}, FL
          </h2>
          <div className="space-y-4 text-lg text-gray-700">
            <h3 className="text-2xl font-bold text-gray-900">What to Do After a Car Accident in {cityName}</h3>
            <p>
              Our {cityName} car accident injury clinic serves patients throughout Palm Beach County, including nearby communities. Located at{' '}
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
            <ul className="list-disc pl-6 space-y-2">
              <li>Get checked if you develop neck pain, back pain, headaches, soreness, dizziness, or limited movement.</li>
              <li>Bring your photo ID, insurance information, claim details, and any accident paperwork you have.</li>
              <li>Ask for documentation of your symptoms, exam findings, imaging records when performed, and follow-up recommendations.</li>
            </ul>
            <h3 className="text-2xl font-bold text-gray-900">Why Choose PrimaryUC for Accident Care?</h3>
            <p>
              Auto accident patients from {c.city} and surrounding areas come to us for same-day injury evaluation, onsite X-ray imaging, and comprehensive PIP documentation. Our {cityName} location is equipped with digital X-ray capabilities and experienced providers who specialize in car accident injury care.
            </p>
            <h3 className="text-2xl font-bold text-gray-900">Serving {cityName} and Nearby Areas</h3>
            <p>
              Whether you've been in a rear-end collision on local roads, a side-impact crash, or a parking lot accident, our car accident doctors in {c.city} can evaluate your injuries, provide treatment, and create documentation for PIP and insurance claims.
            </p>
            <p>
              Serving Lake Worth, Lake Worth Beach, Palm Springs, Greenacres, Lantana, and nearby Palm Beach County communities.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section — structured */}
      <AccidentSEOContent
        data={{
          city: cityName,
          cityFull: `${c.city}, FL`,
          address: `${c.address}, ${c.city}, FL ${c.postalCode}`,
          phone: c.phoneDisplay,
          phoneHref: c.phoneHref
        }}
      />

      {/* Internal Links Section */}
      <AccidentInternalLinks />

      {/* FAQ Section */}
      <AccidentFAQ
        title={`Frequently Asked Questions About Car Accident Injuries in ${cityName}`}
        faqs={cityAccidentFaqs}
      />

      {/* Location Cross-Link — connects car accident page to corresponding clinic location */}
      {(() => {
        const locationSlugMap: Record<string, string> = {
          'royal-palm-beach': 'royal-palm-beach-primary-urgent-care-center',
          'lake-worth': 'lake-worth-primary-urgent-care-center',
          'palm-springs': 'palm-springs-primary-urgent-care-center',
          'lantana': 'lantana-primary-urgent-care-center',
        };
        const locationSlug = locationSlugMap[city];
        if (!locationSlug) return null;
        return (
          <section className="py-10 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Visit Our {cityName} Clinic
              </h2>
              <p className="text-gray-600 mb-6">
                Our {cityName} urgent care clinic is ready to see car accident patients same-day. Walk in or book your appointment online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/locations/${locationSlug}`}
                  className="bg-[#2563eb] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#1d4ed8] transition"
                >
                  View {cityName} Clinic Details
                </Link>
                <Link
                  href="/lawyers"
                  className="bg-white text-[#2563eb] border border-[#2563eb] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                  Medical Records Request
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

    </main>
  );
}
