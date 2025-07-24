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
import ClinicsMap from '@/components/clinicsmap'
import SlidingDiv from '@/components/SlidingAnimation'
import Reveal from '@/components/RevealAnimation'
import Testimonials from '@/components/testimonials'
import { trackEvent } from '../../../lib/gtag';
import CallButton from '../../../components/CallButton';

const LocationPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const location = LocationsScreens.find((location) => location.slug === slug)
    if (!location) return <p>Location not found</p>
    // MedicalClinic JSON-LD schema
    const LocationJsonLd = () => (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": location.clinic,
            "image": `https://primaryuc.com${location.image}`,
            "url": `https://primaryuc.com/locations/${location.slug}`,
            "telephone": location.phone,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": location.address.split(',')[0],
              "addressLocality": location.address.split(',')[1]?.trim() || '',
              "addressRegion": location.address.split(',')[2]?.split(' ')[1] || 'FL',
              "postalCode": location.address.split(',')[2]?.split(' ')[2] || '',
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
            ]
          })
        }}
      />
    );
    const citySeo = {
      'royal-palm-beach-primary-urgent-care-center': {
        title: 'Car Accident & Injury Doctor in Royal Palm Beach | PrimaryUC',
        description: 'Need a doctor after an accident in Royal Palm Beach? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.',
        intro: 'PrimaryUC is the leading injury clinic and urgent care center in Royal Palm Beach, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Royal Palm Beach businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Royal Palm Beach.'
      },
      'lake-worth-primary-urgent-care-center': {
        title: 'Car Accident & Injury Doctor in Lake Worth | PrimaryUC',
        description: 'Need a doctor after an accident in Lake Worth? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.',
        intro: 'PrimaryUC is the leading injury clinic and urgent care center in Lake Worth, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Lake Worth businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Lake Worth.'
      },
      'palm-springs-primary-urgent-care-center': {
        title: 'Car Accident & Injury Doctor in Palm Springs | PrimaryUC',
        description: 'Need a doctor after an accident in Palm Springs? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.',
        intro: 'PrimaryUC is the leading injury clinic and urgent care center in Palm Springs, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Palm Springs businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Palm Springs.'
      },
      'lantana-primary-urgent-care-center': {
        title: 'Car Accident & Injury Doctor in Lantana | PrimaryUC',
        description: 'Need a doctor after an accident in Lantana? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.',
        intro: 'PrimaryUC is the leading injury clinic and urgent care center in Lantana, providing fast, reliable treatment for accident injuries, work injuries, and everyday urgent health needs. We offer workers\' comp services for Lantana businesses and help you get the documentation you need for insurance or legal claims. If you\'ve been in a car crash, our team is your trusted car crash doctor in Lantana.'
      }
    };
    return (
        <main className=''>
            <LocationJsonLd />
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
                            <span className="bg-[rgba(255,255,255,0.20)] text-white font-500 px-6 py-2 rounded-[12px] text-lg shadow-md backdrop-blur-[8.5px]">Location/ <span className='text-white font-bold'>{location?.name}</span></span>
                        </div>
                        <h1 className="sm:text-4xl text-3xl md:text-6xl font-600 mb-6 leading-tight text-left">Welcome to {location?.clinic}</h1>
                        <p className="text-lg mb-8 lg:w-[55%] w-full text-left">
                          {citySeo[location.slug]?.intro || 'Fast, reliable care. Our expert team is here to handle your urgent health needs, anytime.'}
                        </p>
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
                                    <div className="text-gray-600 lg:text-lg text-sm">Our orthopedic specialists in {location.name} ensure quality care with innovative techniques and patient-centered approaches.</div>
                                </div>
                            </Reveal>
                            {/* Card 2 */}
                            <Reveal className='bg-[#FDF4F4] rounded-tr-2xl flex flex-col gap-2'>
                                <div className="p-6 flex flex-col gap-2 ">
                                    <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                                        <Image src={'/image.png'} alt='imaging' width={25} height={25} className='object-contain' />
                                    </div>
                                    <div className="font-bold lg:text-xl text-lg">Imaging Services</div>
                                    <div className="text-gray-600 lg:text-lg text-sm">Our orthopedic specialists in {location.name} use advanced technology for accurate assessments. We focus on patient comfort.</div>
                                </div>
                            </Reveal>
                            {/* Card 3 */}
                            <Reveal className='bg-[#FDF4F4] flex flex-col gap-2'>
                                <div className="p-6 flex flex-col gap-2">
                                    <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                                        <Image src={'/urgentinjcare.png'} alt='imaging' width={25} height={25} className='object-contain' />
                                    </div>
                                    <div className="font-bold lg:text-xl text-lg">Urgent Injury Care</div>
                                    <div className="text-gray-600 lg:text-lg text-sm">Our board-certified <span className="font-semibold">{location.name}</span> orthopedic surgeons bring years of experience and a proven track record of successful outcomes.</div>
                                </div>
                            </Reveal>
                            {/* Card 4 */}
                            <Reveal className='bg-[#F2F6FC] flex flex-col gap-2'>
                                <div className="p-6 flex flex-col gap-2">
                                    <div className="w-10 h-10 relative flex items-center justify-center rounded-full bg-white mb-2">
                                        <Image src={'/paincare.png'} alt='imaging' width={25} height={25} className='object-contain' />
                                    </div>
                                    <div className="font-bold lg:text-xl text-lg">Pain Care</div>
                                    <div className="text-gray-600 lg:text-lg text-sm">Our board-certified <span className="font-semibold">{location.name}</span> orthopedic surgeons bring years of experience and a proven track record of successful outcomes.</div>
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
            <div className='max-w-8xl mx-auto xl:px-[60px] py-10 px-4'>
                <ClinicsMap startingClinic={location} />
            </div>
            <Testimonials />
        </main>
    )
}

export default LocationPage

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const location = LocationsScreens.find((x) => x.slug === params.slug);
  const baseUrl = 'https://wpucc.com';
  const url = `${baseUrl}/locations/${params.slug}`;
  const citySeo = {
    'royal-palm-beach-primary-urgent-care-center': {
      title: 'Car Accident & Injury Doctor in Royal Palm Beach | PrimaryUC',
      description: 'Need a doctor after an accident in Royal Palm Beach? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.'
    },
    'lake-worth-primary-urgent-care-center': {
      title: 'Car Accident & Injury Doctor in Lake Worth | PrimaryUC',
      description: 'Need a doctor after an accident in Lake Worth? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.'
    },
    'palm-springs-primary-urgent-care-center': {
      title: 'Car Accident & Injury Doctor in Palm Springs | PrimaryUC',
      description: 'Need a doctor after an accident in Palm Springs? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.'
    },
    'lantana-primary-urgent-care-center': {
      title: 'Car Accident & Injury Doctor in Lantana | PrimaryUC',
      description: 'Need a doctor after an accident in Lantana? PrimaryUC offers immediate care for car crash, work, and slip & fall injuries. Walk-ins welcome.'
    }
  };
  return {
    title: citySeo[params.slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
    description: citySeo[params.slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
    keywords: location?.keywords || [
      'urgent care Palm Beach County',
      'walk-in clinic Palm Beach',
      'medical clinic Palm Beach',
      'emergency care Palm Beach',
      'primary care Palm Beach',
      'family doctor Palm Beach',
      'same day doctor appointment Palm Beach'
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: citySeo[params.slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
      description: citySeo[params.slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
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
      title: citySeo[params.slug]?.title || location?.metaTitle || 'Urgent Care Palm Beach County | Walk-In Clinic & Primary Care',
      description: citySeo[params.slug]?.description || location?.metaDescription || 'Palm Beach County urgent care and walk-in clinics. Fast, affordable care for injuries, illness, and physicals. No appointment needed. Four convenient locations.',
      images: [location?.image ? `${baseUrl}${location.image}` : `${baseUrl}/servicelanding.jpg`],
    },
  };
}