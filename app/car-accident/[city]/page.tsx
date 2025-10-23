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
import { toJsonLd } from "@/lib/seo";
import { accidentCities, type AccidentCityKey } from "@/lib/accidentLocations";
import { MapPin, Phone, Clock, Shield, Stethoscope, FileText } from "lucide-react";

const baseUrl = "https://primaryuc.com";

type Params = { city: AccidentCityKey };

export async function generateStaticParams() {
  return Object.keys(accidentCities).map((city) => ({ city: city as AccidentCityKey }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = accidentCities[params.city];
  if (!c) return {};
    const title = `Car Accident Doctor ${c.name} FL | Urgent Care & PIP Documentation`;
    const url = `${baseUrl}/car-accident/${params.city}`;
    return {
      title,
      description: `Car accident urgent care in ${c.name}, Palm Beach County. Same-day PIP exam, X-ray, injury documentation. Walk-ins welcome. Florida 14-day rule compliant. Call ${c.phoneDisplay}.`,
    keywords: [
      `car accident urgent care ${c.name} florida`,
      `post accident exam ${c.name} palm beach county`,
      `auto accident clinic ${c.name} fl`,
      `accident injury evaluation ${c.name}`,
      `PIP documentation ${c.name} florida`,
      `same day accident exam ${c.name}`,
      `walk-in accident clinic ${c.name}`,
      `Palm Beach County accident care ${c.name}`,
      `car accident X-ray ${c.name}`,
      `urgent care ${c.name} car accident`,
      `Florida PIP 14 day rule ${c.name}`,
      `car accident medical documentation ${c.name}`
    ].join(', '),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: `Car accident injury clinic in ${c.name}, FL. Same-day exams, X-ray, and PIP documentation.`,
      url,
      siteName: "Primary & Urgent Care Centers",
      images: [
        {
          url: `${baseUrl}/image-auto-accident-involving-two-cars.jpg`,
          width: 1200,
          height: 630,
          alt: `Car Accident Urgent Care in ${c.name}, FL - Two cars involved in rear-end collision`,
        },
      ],
      locale: 'en_US',
      type: 'article'
    },
    twitter: { 
      card: 'summary_large_image', 
      title, 
      description: `Same-day car accident care in ${c.name}, FL.`,
      images: [`${baseUrl}/image-auto-accident-involving-two-cars.jpg`],
      site: '@primaryurgentcare',
    },
    robots: { index: true, follow: true }
  };
}

export default function Page({ params }: { params: Params }) {
  const c = accidentCities[params.city];
  if (!c) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Car Accident Injury Clinic", item: `${baseUrl}/car-accident-injury-clinic` },
      { "@type": "ListItem", position: 3, name: `Car Accident Urgent Care — ${c.name}`, item: `${baseUrl}/car-accident/${params.city}` }
    ]
  };

  const localClinic = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Primary & Urgent Care — Car Accident Urgent Care (${c.name})`,
    url: `${baseUrl}/car-accident/${params.city}`,
    description: `Same-day car accident injury care in ${c.name}, FL. Onsite X-ray and PIP documentation.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address.split(',')[0],
      addressLocality: c.name,
      addressRegion: "FL",
      addressCountry: "US",
      postalCode: c.address.split(',')[2].trim().split(' ')[1] || "33411"
    },
    telephone: c.phone,
    medicalSpecialty: ["Emergency Medicine", "Pain Management", "Trauma Care"],
    areaServed: [
      {
        "@type": "City",
        name: c.name,
        containedInPlace: {
          "@type": "State",
          name: "Florida"
        }
      }
    ],
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
    sameAs: c.gmb ? [c.gmb] : undefined
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(localClinic)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title={`Car Accident Urgent Care in ${c.name}, FL`}
        subtitle={
          <div>
            <p className="mb-2">Get evaluated today after a car crash. Address: {c.address}.</p>
            <p className="text-lg font-semibold text-white">
              Phone: {c.phoneDisplay}
            </p>
          </div>
        }
        checklist={[
          "Rapid triage & evaluation",
          "Onsite X-ray; MRI/CT referrals when indicated",
          "Documentation provided upon request",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title={`Book Your Car Accident Exam in ${c.name}`} noWrapper={true} showHeader={false} compact={true} />}
        backgroundImage="/image-auto-accident-involving-two-cars.jpg"
      />

      {/* Why Get Seen Now */}
      <AccidentInfoSection
        title="Why Get Seen Now"
        items={[
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Rule Out Serious Injuries",
            description: "Early evaluation helps identify fractures or serious injuries that may not be immediately apparent",
            type: 'warning'
          },
          {
            icon: <FileText className="w-6 h-6" />,
            title: "Insurance Documentation",
            description: "Proper documentation from the start strengthens your insurance claim and legal case",
            type: 'info'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "Time-Sensitive Care",
            description: "Many insurance plans have time limits for seeking medical care after an accident",
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
              Imaging & Treatment Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive care for whiplash, back/neck pain, joint injuries, and soft-tissue trauma
            </p>
          </div>

          <MobileCarousel showDots={true} showArrows={false} autoPlay={false}>
            <AccidentCard
              title="Back & Neck Pain"
              description="Comprehensive evaluation for spinal injuries and soft tissue damage."
              href="/car-accident/back-neck-pain"
              icon={<Stethoscope className="w-6 h-6 text-[#2563eb]" />}
              features={["Range of motion testing", "Neurologic exam", "Imaging referrals"]}
              variant="primary"
            />
            
            <AccidentCard
              title="Whiplash Treatment"
              description="Neck pain and headaches after a crash? Get same-day evaluation and treatment."
              href="/car-accident/whiplash"
              icon={<Shield className="w-6 h-6 text-[#D52128]" />}
              features={["Same-day evaluation", "X-ray imaging", "Pain management"]}
              variant="secondary"
            />
            
            <AccidentCard
              title="Digital X-Ray"
              description="Onsite imaging services for immediate diagnosis and treatment planning."
              href="/emergencyroom/digital-x-ray"
              icon={<FileText className="w-6 h-6 text-[#16A34A]" />}
              features={["Same-day results", "High-quality imaging", "Expert interpretation"]}
              variant="accent"
            />
          </MobileCarousel>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our {c.name} Location
            </h2>
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
                    <p className="text-gray-600 text-lg">{c.address}</p>
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Get Started?</h3>
                    <p className="text-gray-600 mb-4">Call now for immediate care</p>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={c.phoneHref}
                      className="w-full bg-[#D52128] hover:bg-[#b81b22] text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Phone className="w-5 h-5" />
                      {c.phoneDisplay}
                    </a>
                    
                    {c.gmb && (
                      <a
                        href={c.gmb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white font-semibold py-3 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <MapPin className="w-5 h-5" />
                        Get Directions
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
            description: "Complete documentation for Florida PIP claims and insurance coordination",
            type: 'info'
          },
          {
            icon: <Shield className="w-6 h-6" />,
            title: "Legal Documentation",
            description: "Detailed medical records and visit summaries for legal cases",
            type: 'success'
          },
          {
            icon: <Clock className="w-6 h-6" />,
            title: "14-Day Rule Compliance",
            description: "We ensure timely evaluation within Florida's PIP 14-day requirement",
            type: 'warning'
          }
        ]}
        className="bg-[#FAFAFA]"
      />

      {/* SEO Content Section */}
      <AccidentSEOContent 
        content={`If you've been in a car accident in ${c.name}, Florida, immediate medical evaluation is essential for your health and legal protection. Our experienced urgent care team at ${c.name} provides comprehensive car accident injury assessments, including whiplash treatment, back and neck pain evaluation, and soft tissue injury care. Located at ${c.address}, we offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal injury cases. Don't wait - get the medical attention you need today for your car accident injuries in ${c.name}. Our board-certified physicians at the ${c.name} location specialize in motor vehicle accident care and understand the unique challenges of treating car crash victims in Palm Beach County. We work closely with insurance companies, attorneys, and legal teams to ensure you receive the proper medical documentation needed for your case. Whether you've been involved in a rear-end collision, side-impact crash, or head-on collision in ${c.name}, our team is trained to identify and treat the full spectrum of car accident injuries.`}
      />

      {/* FAQ Section */}
      <AccidentFAQ 
        title={`Frequently Asked Questions About Car Accident Injuries in ${c.name}`}
        faqs={[
          {
            question: `How quickly can I be seen for car accident injuries in ${c.name}?`,
            answer: `We offer same-day appointments and welcome walk-ins at our ${c.name} location. Our urgent care center typically has wait times under 15 minutes, and we prioritize accident-related injuries to ensure you receive prompt medical attention and documentation.`
          },
          {
            question: "What types of car accident injuries do you treat?",
            answer: `At our ${c.name} location, we treat a wide range of car accident injuries including whiplash, back and neck pain, soft tissue injuries, minor fractures, contusions, cuts and scrapes, headaches, and concussion symptoms. Our onsite X-ray and imaging capabilities help us diagnose and treat most urgent care-level injuries.`
          },
          {
            question: "Do you provide documentation for insurance claims?",
            answer: `Yes, we provide comprehensive documentation including detailed medical reports, X-ray results, treatment plans, and visit summaries. This documentation is essential for your insurance claim and any potential legal proceedings. We can also coordinate with your attorney if needed.`
          },
          {
            question: "Do you accept insurance for car accident injuries?",
            answer: "Yes, we accept most major insurance plans including PIP (Personal Injury Protection) coverage, which is required in Florida. We also work with auto insurance companies and can provide documentation for your personal injury claim. Our team will help coordinate billing and insurance verification."
          },
          {
            question: "What should I do immediately after a car accident?",
            answer: `After ensuring everyone's safety and calling 911 if needed, seek medical attention as soon as possible. Even if you don't feel injured, some injuries may not show symptoms immediately. Our ${c.name} location is equipped to provide comprehensive evaluation and documentation for your car accident injuries.`
          },
          {
            question: `What are your hours at the ${c.name} location?`,
            answer: `Our ${c.name} location is open Monday through Sunday from 9:00 AM to 8:00 PM. We understand that car accidents can happen at any time, so we maintain extended hours to accommodate urgent injury evaluations and documentation needs. Walk-ins are always welcome.`
          },
          {
            question: `Is parking available at your ${c.name} location?`,
            answer: `Yes, we have convenient parking available at our ${c.name} location. Our facility is easily accessible and designed to accommodate patients who may be experiencing pain or mobility issues after a car accident. The parking area is well-lit and close to the entrance.`
          },
          {
            question: "What should I bring to my car accident exam?",
            answer: `Please bring a photo ID, your insurance card, and any accident-related documentation you may have. If you have the accident report or insurance claim number, bring that as well. We'll handle all the paperwork and documentation needed for your case at our ${c.name} location.`
          },
          {
            question: "Do you have onsite imaging at this location?",
            answer: `Yes, our ${c.name} location has onsite X-ray capabilities for immediate evaluation of fractures and injuries. We can also arrange MRI or CT referrals when needed. All imaging results are available same-day for your insurance documentation and legal proceedings.`
          },
          {
            question: "Can you refer me to specialists if needed?",
            answer: `Absolutely. Our ${c.name} location can refer you to appropriate specialists such as orthopedic surgeons, neurologists, or physical therapists based on your injury. We coordinate with specialists throughout Palm Beach County and provide all necessary documentation for your continued care.`
          }
        ]}
      />
    </main>
  );
}
