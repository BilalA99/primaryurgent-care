import React from 'react'
import Image from 'next/image'
import Phone from '@/components/icons/phone'
import BookAppointmentForm from '@/components/ui/BookAppointmentForm'
import { LocationsScreens } from '@/components/locationsscreens'
import { notFound } from 'next/navigation'
import Reviews from '@/components/Reviews'
import Doctor from '@/components/icons/doctor'
import GradientImage from '@/components/ui/GradientImage'
import ShieldUser from '@/components/icons/shielduser'
import LocationFeatureCard from '@/components/ui/LocationFeatureCard'
import Star from '@/components/icons/star'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Mappin2 from '@/components/icons/mappin2'
import ClinicsMap from '@/components/DynamicClinicsMap'
import SlidingDiv from '@/components/SlidingAnimation'
import Reveal from '@/components/RevealAnimation'
import Testimonials from '@/components/testimonials'
import { trackEvent } from '../../../lib/gtag';
import CallButton from '../../../components/CallButton';
import { buildBreadcrumb, buildServiceSchema, buildGraphSchema, toJsonLd } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';

const LocationPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const location = LocationsScreens.find((location) => location.slug === slug)
  if (!location) return <p>Location not found</p>
  // MedicalClinic JSON-LD schema
  const LocationJsonLd = () => {
    const baseUrl = 'https://primaryuc.com';
    const pageUrl = `${baseUrl}/locations/${location.slug}`;
    const clinicId = `${pageUrl}#clinic`;
    const cityName = location.displayName || location.name;
    const clinicSchema = {
      "@type": "MedicalClinic",
      "@id": clinicId,
      "name": location.clinic,
      "image": `${baseUrl}${location.image}`,
      "url": pageUrl,
      "telephone": `+1-${location.phone.replace(/-/g, '')}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": location.address,
        "addressLocality": location.city || location.name,
        "addressRegion": "FL",
        "postalCode": location.postalCode || '',
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.lat,
        "longitude": location.lng
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "08:00",
          "closes": "20:00"
        }
      ],
      "priceRange": "$$",
      "paymentAccepted": ["Cash", "Credit Card", "Insurance", "PIP"],
      "currenciesAccepted": "USD",
      "serviceArea": {
        "@type": "City",
        "name": location.city || location.name,
        "containedInPlace": {
          "@type": "State",
          "name": "Florida"
        }
      },
      ...(location.gmbUrl ? {
        "sameAs": [location.gmbUrl],
        "hasMap": location.gmbUrl
      } : {}),
      "branchOf": { "@id": "https://primaryuc.com/#clinic" },
      "parentOrganization": { "@id": "https://primaryuc.com/#organization" }
    };

    const breadcrumbSchema = buildBreadcrumb([
      { name: "Home", url: baseUrl },
      { name: "Locations", url: `${baseUrl}/locations` },
      { name: location.clinic, url: pageUrl }
    ]);

    const serviceSchema = buildServiceSchema({
      name: `Car accident injury exam in ${cityName}`,
      description: `Same-day car accident injury evaluation with onsite X-ray and PIP documentation in ${location.city || location.name}, FL`,
      provider: clinicId,
      areaServed: [location.city || location.name, "Palm Beach County", "Florida"],
      url: pageUrl
    });

    const webPageSchema = {
      "@type": "WebPage",
      "name": citySeo[location.slug]?.title || location.clinic,
      "url": pageUrl,
      "description": citySeo[location.slug]?.description || location.metaDescription || '',
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${baseUrl}${location.image}`,
        "width": 1200,
        "height": 630
      },
      "mainEntity": { "@id": clinicId }
    };

    const graphSchema = buildGraphSchema([
      clinicSchema,
      breadcrumbSchema,
      webPageSchema,
      serviceSchema
    ]);

    return (
      <script type="application/ld+json" dangerouslySetInnerHTML={toJsonLd(graphSchema)} />
    );
  };
  const citySeo = {
    'royal-palm-beach-primary-urgent-care-center': {
      title: 'Royal Palm Beach Urgent Care & Car Accident | PrimaryUC',
      description: 'Urgent care & car accident doctor in Royal Palm Beach, FL. Walk-in X-ray, PIP exams, same-day care. Serves Wellington, Loxahatchee. Call 561-355-2651.',
      intro: 'PrimaryUC is the leading injury clinic and urgent care center in Royal Palm Beach, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Royal Palm Beach businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Royal Palm Beach.'
    },
    'lake-worth-primary-urgent-care-center': {
      title: 'Lake Worth Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Lake Worth Beach, FL. Walk-in X-ray, PIP exams, same-day care. Serves Boynton Beach, Lantana. Call 561-355-2651.',
      intro: 'PrimaryUC is the leading injury clinic and urgent care center in Lake Worth, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Lake Worth businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Lake Worth.'
    },
    'palm-springs-primary-urgent-care-center': {
      title: 'Palm Springs Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Palm Springs, FL. Walk-in X-ray, PIP exams, same-day care. Serves Greenacres, Lake Worth. Call 561-355-2651.',
      intro: 'PrimaryUC is the leading injury clinic and urgent care center in Palm Springs, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Palm Springs businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Palm Springs.'
    },
    'lantana-primary-urgent-care-center': {
      title: 'Lantana Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Lantana / Jog Rd, FL. Walk-in X-ray, PIP exams, same-day care. Serves Boynton Beach, Hypoluxo. Call 561-355-2651.',
      intro: 'PrimaryUC is the leading injury clinic and urgent care center serving the Lantana / Jog Rd area in Lake Worth Beach, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Lantana and surrounding area businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor serving the Lantana, Boynton Beach, and Hypoluxo areas.'
    }
  };
  return (
    <main className=''>
      <LocationJsonLd />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Locations', href: '/locations' },
        { name: location.clinic, href: `/locations/${location.slug}` }
      ]} />
      <section className="relative h-full w-full xl:px-[60px] px-2">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={location?.image}
            alt="Pain Care Landing Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#222]/80 via-[#222]/60 to-[#222]/40" />
        </div>

        <div className="relative flex flex-col xl:flex-row items-center justify-between lg:py-20 py-10 max-w-8xl mx-auto px-4 lg:px-12 gap-10">
          {/* Left: Content */}
          <div className="flex-1 flex flex-col justify-center items-start text-white xl:max-w-2xl">
            <div className="mb-6">
              <span className="bg-[rgba(255,255,255,0.20)] text-white font-500 px-6 py-2 rounded-[12px] text-lg shadow-md backdrop-blur-[8.5px]">Location/ <span className='text-white font-bold'>{location?.displayName || location?.name}</span></span>
            </div>
            <h1 className="sm:text-4xl text-3xl md:text-6xl font-600 mb-6 leading-tight text-left">Welcome to {location?.clinic}</h1>
            <p className="text-lg mb-8 lg:w-[55%] w-full text-left">
              {citySeo[location.slug]?.intro || 'Fast, reliable care. Our expert team is here to handle your urgent health needs, anytime.'}
            </p>
            {location.gmbUrl && (
              <a
                href={location.gmbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 bg-white/90 backdrop-blur-sm text-gray-900 font-medium px-6 py-3 rounded-xl xl:text-base text-sm shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center gap-3 lg:w-[55%] w-full group"
              >
                <MapPin className="w-5 h-5 text-[#D52128] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="flex-1 text-left">
                  {location.address}, {location.city}, FL {location.postalCode}
                </span>
              </a>
            )}
            <div className="flex flex-wrap gap-4 w-full">
              <CallButton label="locations_slug_page" className="bg-white text-[black] font-semibold px-8 py-4 rounded-xl xl:text-lg text-base shadow flex lg:w-[40%] sm:w-fit w-full justify-center items-center gap-3 hover:bg-gray-100 transition">
                Contact Us
              </CallButton>
            </div>
          </div>
          {/* Right: Form in blurred card */}
          <div className="flex-1 flex justify-center items-center w-full max-w-xl">
            <BookAppointmentForm title="Request an appointment" bgColor="bg-[rgba(255,255,255,0.22)] backdrop-blur-[7.150000095367432px]" textColor="text-white" />
          </div>
        </div>
      </section>
      {/* Why Choose Section */}
      <section className='w-full bg-white py-10 px-4 lg:px-[60px] flex flex-col items-center'>
        <div className='flex xl:flex-row flex-col self-center max-w-8xl xl:space-y-0 space-y-6 xl:space-x-12 space-x-0 justify-between items-center'>
          <h2 className="text-4xl xl:w-[50%] w-full lg:text-6xl font-bold ">Why Choose {location?.clinic}</h2>
          <SlidingDiv className='text-lg xl:w-[50%] w-full text-gray-700' position='right'><p className="">From advanced MRI and CT scans to expert X-rays and ultrasounds, our urgent care services are designed to deliver fast, accurate results when you need them most — all under one roof, with a compassionate touch.</p></SlidingDiv>
        </div>
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center xl:py-20 py-10 px-4 md:px-0">
          {/* Left: Text and Features */}
          <div>
            <div className="sm:grid flex flex-col sm:grid-cols-2 ">
              {/* Card 1 */}
              <Reveal className='bg-[#F2F6FC] rounded-tl-2xl *:flex flex-col gap-2  border border-gray-100'>
                <div className=" p-6 flex flex-col gap-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white mb-2">
                    <span className="text-2xl"><Doctor /></span>
                  </div>
                  <div className="font-bold lg:text-xl text-lg">World - Class Expertise</div>
                  <div className="text-gray-600 lg:text-lg text-sm">Our orthopedic specialists in {location.displayName || location.name} ensure quality care with innovative techniques and patient-centered approaches.</div>
                </div>
              </Reveal>
              {/* Card 2 */}
              <Reveal className='bg-[#FDF4F4] rounded-tr-2xl flex flex-col gap-2'>
                <div className="p-6 flex flex-col gap-2 ">
                  <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                    <Image src={'/image.png'} alt='imaging' width={25} height={25} className='object-contain' />
                  </div>
                  <div className="font-bold lg:text-xl text-lg">Imaging Services</div>
                  <div className="text-gray-600 lg:text-lg text-sm">Our orthopedic specialists in {location.displayName || location.name} use advanced technology for accurate assessments. We focus on patient comfort.</div>
                </div>
              </Reveal>
              {/* Card 3 */}
              <Reveal className='bg-[#FDF4F4] flex flex-col gap-2'>
                <div className="p-6 flex flex-col gap-2">
                  <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                    <Image src={'/urgentinjcare.png'} alt='imaging' width={25} height={25} className='object-contain' />
                  </div>
                  <div className="font-bold lg:text-xl text-lg">Urgent Injury Care</div>
                  <div className="text-gray-600 lg:text-lg text-sm">Our board-certified <span className="font-semibold">{location.displayName || location.name}</span> orthopedic surgeons bring years of experience and a proven track record of successful outcomes.</div>
                </div>
              </Reveal>
              {/* Card 4 */}
              <Reveal className='bg-[#F2F6FC] flex flex-col gap-2'>
                <div className="p-6 flex flex-col gap-2">
                  <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                    <Image src={'/paincare.png'} alt='pain management' width={25} height={25} className='object-contain' />
                  </div>
                  <div className="font-bold lg:text-xl text-lg">Pain Care</div>
                  <div className="text-gray-600 lg:text-lg text-sm">Our board-certified <span className="font-semibold">{location.displayName || location.name}</span> orthopedic surgeons bring years of experience and a proven track record of successful outcomes.</div>
                </div>
              </Reveal>
              {/* Card 5 */}
              <Reveal className='bg-white rounded-b-2xl flex flex-col gap-2 col-span-2'>
                <div className="p-6 flex flex-col gap-2">
                  <div className="font-bold flex flex-row justify-between items-center">
                    <p className='lg:text-xl text-lg'>  Explore our Emergency care</p>
                    <ShieldUser />
                  </div>
                  <div className="text-gray-600 lg:text-lg text-sm">Our co-pays are less than hospital emergency room fees and we will work with you to process your insurance</div>
                </div>
              </Reveal>
            </div>
          </div>
          {/* Right: Image */}
          <div className="flex justify-center items-center h-full">
            <div className="rounded-2xl overflow-hidden shadow-lg w-full h-full">
              <GradientImage src={location?.subimg} alt={location?.clinic} className="object-cover w-full h-full" />
            </div>
          </div>
        </div>
      </section>
      {/* Location Details & Address */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Contact</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-[#2563eb] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">Address</p>
                      <p className="text-gray-700">{location.address}, {location.city || location.name}, FL {location.postalCode}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-6 h-6 text-[#2563eb] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">Phone</p>
                      <a href={`tel:+1${location.phone.replace(/-/g, '')}`} className="text-gray-700 hover:text-[#2563eb]">
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {location.gmbUrl && (
                  <a
                    href={location.gmbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <MapPin className="w-5 h-5" />
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Location Unique */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            What Makes Our {location.displayName || location.name} Location Unique
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Access & Parking</h3>
              <p className="text-gray-700">Conveniently located at {location.address}, {location.city}, FL {location.postalCode} with ample parking available. Quick access from major roads makes getting care fast and stress-free.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Onsite Digital X-Ray</h3>
              <p className="text-gray-700">State-of-the-art digital X-ray equipment available onsite for immediate imaging results during your visit. No need to travel to separate imaging centers.</p>
            </div>
            <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-6 border-2 border-[#2563eb]/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Spacious Exam Rooms</h3>
              <p className="text-gray-700">Large, comfortable exam rooms designed for thorough evaluations and patient comfort during your visit. Our {location.city} location features modern facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hyperlocal Content */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Serving {location.city || location.name} & Nearby Communities
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="space-y-4 text-lg text-gray-700">
              {location.slug === 'royal-palm-beach-primary-urgent-care-center' && (
                <>
                  <p>Our Royal Palm Beach urgent care center is conveniently located at 11476 Okeechobee Blvd, Royal Palm Beach, FL 33411, making it easily accessible from Wellington, Loxahatchee, and surrounding Palm Beach County communities. We're near Commons Park and serve patients throughout the Royal Palm Beach area along SR-7 (Okeechobee Blvd).</p>
                  <p>Whether you're coming from Wellington via Forest Hill Blvd or from Loxahatchee along Okeechobee Blvd, our location offers quick access and convenient parking for same-day urgent care and <Link href="/car-accident-injury-clinic" className="text-[#2563eb] hover:underline font-medium">car accident urgent care</Link> evaluation. Our clinic is well-positioned to serve patients throughout western Palm Beach County.</p>
                </>
              )}
              {location.slug === 'lake-worth-primary-urgent-care-center' && (
                <>
                  <p>Our Lake Worth Beach urgent care center at 6447 Lake Worth Rd, Lake Worth Beach, FL 33463 serves patients from throughout Palm Beach County, including nearby communities along Congress Ave, Jog Road, and Hypoluxo Road. We're easily accessible from Palm Beach State College and surrounding neighborhoods.</p>
                  <p>Patients from Boynton Beach, Lantana, Greenacres, and surrounding areas find our Lake Worth Beach location convenient for same-day care, <Link href="/car-accident-injury-clinic" className="text-[#2563eb] hover:underline font-medium">car accident urgent care</Link> evaluation, and comprehensive medical services. Our clinic is centrally located along Lake Worth Road, providing easy access from major thoroughfares.</p>
                </>
              )}
              {location.slug === 'palm-springs-primary-urgent-care-center' && (
                <>
                  <p>Our Palm Springs urgent care center at 3460 S Congress Ave, Palm Springs, FL 33461 serves patients from Greenacres, Lake Worth Beach, and surrounding communities. Located along a major corridor, we're easily accessible from Forest Hill Blvd and nearby neighborhoods.</p>
                  <p>Whether you're coming from Greenacres via Forest Hill Blvd or from other Palm Beach County areas, our Palm Springs location provides convenient access to same-day urgent care, <Link href="/car-accident-injury-clinic" className="text-[#2563eb] hover:underline font-medium">car accident urgent care</Link> evaluation, and comprehensive medical services. Our clinic is well-positioned along S Congress Ave to serve central Palm Beach County.</p>
                </>
              )}
              {location.slug === 'lantana-primary-urgent-care-center' && (
                <>
                  <p>Our Jog Road location in Lake Worth Beach (Lantana / Jog Rd area) serves patients from Boynton Beach, Lantana, Hypoluxo, and surrounding communities along the Jog Road and Hypoluxo Road corridors. Located at 6169 Jog Rd Unit 4B, Lake Worth Beach, FL 33463, we're easily accessible from major thoroughfares and nearby neighborhoods.</p>
                  <p>Patients from throughout southern Palm Beach County find our Jog Road location convenient for same-day care, <Link href="/car-accident-injury-clinic" className="text-[#2563eb] hover:underline font-medium">car accident urgent care</Link> evaluation, and comprehensive medical services. Our clinic is well-positioned to serve the Lantana, Boynton Beach, and Hypoluxo areas, with quick access from Hypoluxo Road and nearby residential communities.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Car Accident Cross-Link — connects location page to corresponding car accident city page */}
      {(() => {
        const accidentSlugMap: Record<string, string> = {
          'royal-palm-beach-primary-urgent-care-center': 'royal-palm-beach',
          'lake-worth-primary-urgent-care-center': 'lake-worth',
          'palm-springs-primary-urgent-care-center': 'palm-springs',
          'lantana-primary-urgent-care-center': 'lantana',
        };
        const accidentSlug = accidentSlugMap[location.slug];
        const cityName = location.displayName || location.name;
        if (!accidentSlug) return null;
        return (
          <section className="py-12 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Car Accident Care in {cityName}
              </h2>
              <p className="text-gray-600 mb-6">
                Were you in a car accident near {cityName}? Same-day evaluation, PIP documentation, and onsite X-ray available at this location. Florida's 14-day rule applies — don't wait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/car-accident/${accidentSlug}`}
                  className="bg-[#D52128] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#b81b22] transition"
                >
                  Car Accident Doctor in {cityName}
                </Link>
                <Link
                  href="/lawyers"
                  className="bg-white text-[#D52128] border border-[#D52128] font-semibold px-8 py-3 rounded-xl hover:bg-red-50 transition"
                >
                  Medical Records for Attorneys
                </Link>
              </div>
            </div>
          </section>
        );
      })()}

      <div className='max-w-8xl mx-auto xl:px-[60px] py-10 px-4'>
        <ClinicsMap startingClinic={location} />
      </div>
      <Testimonials />
    </main>
  )
}

export default LocationPage

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = LocationsScreens.find((x) => x.slug === slug);
  const baseUrl = 'https://primaryuc.com';
  const url = `${baseUrl}/locations/${slug}`;
  const citySeo = {
    'royal-palm-beach-primary-urgent-care-center': {
      title: 'Royal Palm Beach Urgent Care & Car Accident | PrimaryUC',
      description: 'Urgent care & car accident doctor in Royal Palm Beach, FL. Walk-in X-ray, PIP exams, same-day care. Serves Wellington, Loxahatchee. Call 561-355-2651.'
    },
    'lake-worth-primary-urgent-care-center': {
      title: 'Lake Worth Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Lake Worth Beach, FL. Walk-in X-ray, PIP exams, same-day care. Serves Boynton Beach, Lantana. Call 561-355-2651.'
    },
    'palm-springs-primary-urgent-care-center': {
      title: 'Palm Springs Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Palm Springs, FL. Walk-in X-ray, PIP exams, same-day care. Serves Greenacres, Lake Worth. Call 561-355-2651.'
    },
    'lantana-primary-urgent-care-center': {
      title: 'Lantana Urgent Care & Car Accident Doctor | PrimaryUC',
      description: 'Urgent care & car accident doctor in Lantana / Jog Rd, FL. Walk-in X-ray, PIP exams, same-day care. Serves Boynton Beach, Hypoluxo. Call 561-355-2651.'
    }
  };
  return {
    title: citySeo[slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
    description: citySeo[slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: citySeo[slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
      description: citySeo[slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
      url,
      type: 'article',
      images: [
        {
          url: location?.image ? `${baseUrl}${location.image}` : `${baseUrl}/servicelanding.jpg`,
          width: 1200,
          height: 630,
          alt: location?.clinic || 'Urgent Care Location',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: citySeo[slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
      description: citySeo[slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
      images: [location?.image ? `${baseUrl}${location.image}` : `${baseUrl}/servicelanding.jpg`],
    },
  };
}
