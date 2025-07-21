import React from 'react'
import { services } from '@/components/Services'
import Image from 'next/image'
import Reveal from '@/components/RevealAnimation'
import CallButton from '@/components/CallButton';

const EmergencyRoomPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const service = services.find(service => service.slug === slug)
  
  // Structured data for emergency room services
  const EmergencyRoomServiceJsonLd = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: service?.title || 'Emergency Room Service',
          description: service?.description || 'Hospital-level emergency care service',
          url: `https://primaryuc.com/emergencyroom/${slug}`,
          provider: {
            '@type': 'MedicalClinic',
            name: 'Primary & Urgent Care Centers of Palm Beach County',
            url: 'https://primaryuc.com',
            areaServed: {
              '@type': 'AdministrativeArea',
              name: 'Palm Beach County, FL'
            }
          },
          medicalSpecialty: 'EmergencyCare',
          availableService: service?.title || 'Emergency Room Service',
          cost: 'Varies by service and insurance',
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Palm Beach County, FL'
          }
        })
      }}
    />
  );
  
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen lg:py-20 py-10 max-w-8xl mx-auto lg:px-[60px] px-6">
      <EmergencyRoomServiceJsonLd />
      <div className="w-full mx-auto flex flex-col items-center mb-12">
        <div className="text-sm mb-2">
          Emergency Room / <span className="text-[#2563eb]">{service?.title}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-4">{service?.title}</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          {service?.description}
        </p>
        <div className="flex flex-wrap gap-4 w-full self-center items-center justify-center">
          <CallButton label="emergencyroom_slug_page" className="bg-white text-[black] font-semibold px-8 py-4 rounded-xl xl:text-lg text-base shadow flex lg:w-[40%] sm:w-fit w-full justify-center items-center gap-3 hover:bg-gray-100 transition">
            Contact Us
          </CallButton>
        </div>
      </div>
      <div className="w-full mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <Reveal className='w-full'>
          <div className="flex flex-col gap-4 col-span-1">
            <h2 className="text-xl md:text-2xl font-bold text-black">What is a {service?.title}?</h2>
            <p className="md:text-lg text-md text-gray-600">{service?.whatItIs}</p>
          </div>
        </Reveal>
        <div className='w-full relative rounded-2xl overflow-hidden col-span-1'><Image src={service?.imageSrc || ''} alt={service?.title || ''} fill className='object-cover' /></div>
        <Reveal className='w-full col-span-2'>
          <div className="flex flex-col gap-4  ">
            <h2 className="text-xl md:text-2xl font-bold text-black">Why choose an {service?.title}?</h2>
            <p className="md:text-lg text-md text-gray-600">{service?.whyChooseUs}</p>
          </div>
        </Reveal>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 h-full md:grid-cols-2 gap-8 mt-4">
        <Reveal className='w-full'>
          <div className="flex flex-col gap-4 col-span-1 w-full">
            <h2 className="text-xl md:text-2xl font-bold text-black">How does a {service?.title} work?</h2>
            <p className="md:text-lg text-md text-gray-600">{service?.howItWorks}</p>
          </div>
        </Reveal>
        <Reveal className='w-full'>
          <div className="flex flex-col gap-4 col-span-1 w-full">
            <h2 className="text-xl md:text-2xl font-bold text-black">Why choose Primary & Urgent Care Center for a {service?.title}?</h2>
            <p className="md:text-lg text-md text-gray-600">{service?.urgentCareAdvantage}</p>
          </div>
        </Reveal>
        <div className='w-full relative rounded-2xl overflow-hidden col-span-1 '><Image src={service?.imageSrc2 || ''} alt={service?.title || ''} fill className='object-cover' /></div>
        <Reveal className='w-full'>
          <div className='sm:col-span-1 col-span-1 flex flex-col gap-4'>
            <h2 className='text-xl md:text-2xl font-bold text-black'>Costs at a Primary & Urgent Care Center</h2>
            <p className='md:text-lg text-md text-gray-600'>{service?.costs}</p>
          </div>
        </Reveal>
      </div>
    </main>
  )
}

export default EmergencyRoomPage

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find(service => service.slug === params.slug);
  
  if (!service) {
    return {
      title: 'Emergency Room Services | Hospital-Level Care Palm Beach County',
      description: 'Walk-in emergency room alternative with hospital-level care, advanced imaging, and board-certified doctors. Less than 15 min wait. Serving Palm Beach County.',
      alternates: {
        canonical: `https://primaryuc.com/emergencyroom/${params.slug}`,
      },
    };
  }

  return {
    title: service.metaTitle || `${service.title} | Emergency Room Services Palm Beach County`,
    description: service.metaDescription || `Get ${service.title.toLowerCase()} at our emergency room alternative. Walk-in hospital-level care with advanced imaging and board-certified doctors. Less than 15 min wait. Serving Palm Beach County.`,
    keywords: service.keywords || [
      'emergency room services',
      'hospital-level care',
      'urgent care Palm Beach',
      'walk-in emergency care',
      'advanced imaging',
      'board-certified doctors',
      'Palm Beach County emergency care'
    ],
    openGraph: {
      title: service.metaTitle || `${service.title} | Emergency Room Services Palm Beach County`,
      description: service.metaDescription || `Get ${service.title.toLowerCase()} at our emergency room alternative. Walk-in hospital-level care with advanced imaging and board-certified doctors. Less than 15 min wait. Serving Palm Beach County.`,
      url: `https://primaryuc.com/emergencyroom/${params.slug}`,
      type: 'website',
      images: [
        {
          url: service.imageSrc || '/hospitalcare.jpg',
          width: 1200,
          height: 630,
          alt: `${service.title} - Emergency Room Services Palm Beach County`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle || `${service.title} | Emergency Room Services Palm Beach County`,
      description: service.metaDescription || `Get ${service.title.toLowerCase()} at our emergency room alternative. Walk-in hospital-level care with advanced imaging and board-certified doctors. Less than 15 min wait. Serving Palm Beach County.`,
      images: [service.imageSrc || '/hospitalcare.jpg']
    },
    alternates: {
      canonical: `https://primaryuc.com/emergencyroom/${params.slug}`,
    },
   
  };
}