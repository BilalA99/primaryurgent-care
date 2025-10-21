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
  const title = `Car Accident Urgent Care in ${c.name}, FL | Same-Day Exam & X-Ray`;
  const url = `${baseUrl}/car-accident/${params.city}`;
  return {
    title,
    description: `Post-accident urgent care in ${c.name}. Same-day exam, X-ray, and documentation for insurance claims. Call ${c.phoneDisplay} or book online today.`,
    keywords: [
      `car accident urgent care ${c.name}`,
      `post accident exam ${c.name}`,
      `auto accident clinic ${c.name}`,
      `accident injury evaluation ${c.name}`,
      `PIP documentation ${c.name}`,
      `same day accident exam ${c.name}`,
      `walk-in accident clinic ${c.name}`,
      `Palm Beach County accident care`
    ].join(', '),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: `Car accident injury clinic in ${c.name}. Same-day exams, X-ray, and documentation.`,
      url,
      siteName: "Primary & Urgent Care Centers",
      images: [
        {
          url: `${baseUrl}/websitelogo.png`,
          width: 1200,
          height: 630,
          alt: `Car Accident Urgent Care in ${c.name}`,
        },
      ],
      locale: 'en_US',
      type: 'article'
    },
    twitter: { 
      card: 'summary_large_image', 
      title, 
      description: `Same-day car accident care in ${c.name}.`,
      images: [`${baseUrl}/websitelogo.png`],
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
    "@type": "MedicalClinic",
    name: `Primary & Urgent Care — Car Accident Urgent Care (${c.name})`,
    url: `${baseUrl}/car-accident/${params.city}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address.split(',')[0],
      addressLocality: c.name,
      addressRegion: "FL",
      addressCountry: "US"
    },
    telephone: c.phoneDisplay,
    medicalSpecialty: ["Emergency", "PainManagement"],
    areaServed: `${c.name}, FL`,
    sameAs: c.gmb ? [c.gmb] : undefined
  };

  return (
    <main className="w-full min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(localClinic)} />
      
      {/* Hero Section */}
      <HeroWithForm
        title={`Car Accident Urgent Care in ${c.name}, FL`}
        subtitle={<p>Get evaluated today after a car crash. Address: {c.address}. Phone: {c.phoneDisplay}.</p>}
        checklist={[
          "Rapid triage & evaluation",
          "Onsite X-ray; MRI/CT referrals when indicated",
          "Documentation provided upon request",
        ]}
        banner={<ImmediateCareBanner />}
        form={<AccidentAppointmentForm title={`Book Your Car Accident Exam in ${c.name}`} noWrapper={true} showHeader={false} compact={true} />}
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
        <div className="max-w-7xl mx-auto px-4 lg:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Imaging & Treatment Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive care for whiplash, back/neck pain, joint injuries, and soft-tissue trauma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-[60px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our {c.name} Location
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-2xl p-8 border-2 border-[#2563eb]/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2563eb]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">{c.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#D52128]/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[#D52128]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href={c.phoneHref} className="text-[#D52128] hover:underline">
                      {c.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#16A34A]/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#16A34A]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Hours</h3>
                    <p className="text-gray-600">Monday-Friday 9am-6pm</p>
                    <p className="text-gray-600">Saturday 9am-4pm</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <AccidentCTA
                  citySlug={params.city}
                  phoneHref={c.phoneHref}
                  directionsHref={c.gmb}
                />
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
          }
        ]}
      />
    </main>
  );
}
