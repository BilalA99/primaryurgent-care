import React from 'react'
import { notFound } from 'next/navigation';
import { conditions, ConditionInfoProp } from '@/components/conditions';
import BookAppointmentForm from '@/components/ui/BookAppointmentForm';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
const baseUrl = 'https://primaryuc.com';
export default async function ConditionDetails({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const conditionSlug = (await params).slug
  const condition_details = conditions.find((x: ConditionInfoProp) => x.slug === conditionSlug)
  if (!condition_details) {
    return (
      notFound()
    )
  }
  // Structured data for urgent injury care conditions
  const UrgentInjuryCareJsonLd = () => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalProcedure',
          name: condition_details?.title || 'Urgent Injury Care',
          url: `https://primaryuc.com/urgent-injury-care/${conditionSlug}`,
          provider: { '@id': 'https://primaryuc.com/#clinic' },
          medicalSpecialty: 'UrgentCare',
          availableService: condition_details?.title || 'Urgent Injury Care',
          cost: 'Varies by service and insurance',
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Palm Beach County, FL'
          },
          description: condition_details?.description || 'Get immediate treatment for injuries and medical conditions at our urgent care centers. Walk in or book online. Expert care, fast diagnosis, and comprehensive treatment.'
        })
      }}
    />
  );

  return (
    <main className='w-full flex flex-col items-center justify-center bg-white h-full'>
      <UrgentInjuryCareJsonLd />
      <Breadcrumb items={[
        { name: 'Home', href: '/' },
        { name: 'Urgent Injury Care', href: '/urgent-injury-care' },
        { name: condition_details.title, href: `/urgent-injury-care/${conditionSlug}` }
      ]} />
      <div className="w-full mx-auto flex flex-col items-center mt-20">
        <div className="text-sm mb-2">
          Urgent Injury Care / <span className="text-[#2563eb]">{condition_details?.title}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-4">{condition_details?.title}</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          {condition_details?.description}
        </p>
        <div className="flex flex-wrap gap-4 w-full self-center items-center justify-center">
        </div>
      </div>

      <section className=' max-w-[1440px] w-full h-full flex lg:flex-row flex-col overflow-hidden px-6 xl:px-[80px] xl:py-[50px] space-x-[60px]'>
        <div className='lg:w-[30%] w-full lg:order-1 order-2 bg-white flex flex-col'>
          <div className='h-fit'><BookAppointmentForm title="Request an appointment" bgColor="bg-[#FAFAFA]" textColor="text-black" /></div>
        </div>


        <div className=' w-full lg:w-[70%] lg:order-2 order-1  flex flex-col space-y-[60px] lg:mt-0 mt-6 rounded-[24px] '>
          <section className='bg-[#FAFAFA] space-y-[40px] flex flex-col w-full p-4 md:p-[40px] rounded-[24px]'>
            {/* Detail */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-5xl text-2xl'
              >
                {condition_details.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.description}
              </p>
            </div>

            {/* What are symptoms of */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-4xl text-2xl'
              >
                What Are the Symptoms of {condition_details.title}?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.symptoms}
              </p>
            </div>

            {/* Are There Specific Risk Factors  */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-4xl text-2xl'
              >
                When to Seek Care for {condition_details.title}?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.whenToSeekCare}
              </p>
            </div>
            {
              condition_details?.img &&
              <div className='rounded-2xl overflow-hidden w-full h-full aspect-video relative'><Image src={condition_details?.img} alt={condition_details?.title} fill className='object-cover' /></div>
            }
            {/*  Diagnosing */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-4xl text-2xl'
              >
                Treatment for {condition_details.title}?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.treatment}
              </p>
            </div>

            {/* Treatment for  */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-4xl text-2xl'
              >
                Prevention for {condition_details.title}?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.prevention}
              </p>
            </div>

            {/* Does ... Cause Pain? */}
            <div className=' flex flex-col space-y-[16px] '>
              <h2
                style={{
                  fontFamily: 'var(--font-reem-kufi)',
                  fontWeight: 500,
                }}
                className='text-[#111315] sm:text-4xl text-2xl'
              >
                Why Choose Primary & Urgent Care Center for {condition_details.title}?
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 400,
                }}
                className='text-[#5B5F67] sm:text-xl text-sm'
              >
                {condition_details?.urgentCareAdvantage}
              </p>
            </div>

            {/* Car Accident Context — only rendered for accident-related conditions */}
            {condition_details?.carAccidentContext && (
              <div className='flex flex-col space-y-[32px] border-t border-[#E5E7EB] pt-[40px]'>
                <div className='flex flex-col space-y-[16px]'>
                  <h2
                    style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }}
                    className='text-[#111315] sm:text-4xl text-2xl'
                  >
                    {condition_details.title} After a Car Accident
                  </h2>
                  <p
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                    className='text-[#5B5F67] sm:text-xl text-sm'
                  >
                    {condition_details.carAccidentContext.intro}
                  </p>
                </div>

                <div className='flex flex-col space-y-[16px]'>
                  <h3
                    style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }}
                    className='text-[#111315] sm:text-3xl text-xl'
                  >
                    Common Car Accident Causes of {condition_details.title}
                  </h3>
                  <ul className='list-disc pl-6 space-y-2'>
                    {condition_details.carAccidentContext.commonCauses.map((cause, i) => (
                      <li key={i} style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }} className='text-[#5B5F67] sm:text-lg text-sm'>
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='flex flex-col space-y-[16px] bg-[#FFF8F8] border border-[#D52128]/20 rounded-[16px] p-6'>
                  <h3
                    style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }}
                    className='text-[#D52128] sm:text-3xl text-xl'
                  >
                    Florida PIP & 14-Day Rule — What You Need to Know
                  </h3>
                  <p
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                    className='text-[#5B5F67] sm:text-lg text-sm'
                  >
                    {condition_details.carAccidentContext.pipNote}
                  </p>
                  <div className='flex flex-wrap gap-3 mt-2'>
                    <Link
                      href="/car-accident/documentation-pip"
                      className='inline-block bg-[#D52128] text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#b81c22] transition-colors'
                    >
                      PIP Documentation Guide
                    </Link>
                    <Link
                      href="/car-accident-injury-clinic"
                      className='inline-block border border-[#D52128] text-[#D52128] font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#D52128] hover:text-white transition-colors'
                    >
                      Car Accident Urgent Care
                    </Link>
                  </div>
                </div>

                <div className='flex flex-col space-y-[16px]'>
                  <h3
                    style={{ fontFamily: 'var(--font-reem-kufi)', fontWeight: 500 }}
                    className='text-[#111315] sm:text-3xl text-xl'
                  >
                    Why Choose PrimaryUC for Accident-Related {condition_details.title}?
                  </h3>
                  <p
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 400 }}
                    className='text-[#5B5F67] sm:text-xl text-sm'
                  >
                    {condition_details.carAccidentContext.whyUs}
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const condition_details = conditions.find(condition => condition.slug === slug);
  
  if (!condition_details) {
    return {
      title: 'Urgent Injury Care | Walk-In Medical Care Palm Beach County',
      description: 'Walk-in urgent injury care in Palm Beach County. Injuries & illness seen in under 15 min. Book online or walk in — no appointment needed.',
      keywords: [
        'urgent injury care',
        'walk-in medical care',
        'Palm Beach County urgent care',
        'immediate medical attention',
        'injury treatment',
        'illness treatment'
      ],
      openGraph: {
        title: 'Urgent Injury Care | Walk-In Medical Care Palm Beach County',
        description: 'Walk-in urgent injury care in Palm Beach County. Injuries & illness seen in under 15 min. Book online or walk in — no appointment needed.',
        url: `https://primaryuc.com/urgent-injury-care/${slug}`,
        type: 'website',
        images: [
          {
            url: '/rapidinjurycare.jpg',
            width: 1200,
            height: 630,
            alt: 'Urgent injury care Palm Beach County'
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Urgent Injury Care | Walk-In Medical Care Palm Beach County',
        description: 'Walk-in urgent injury care in Palm Beach County. Injuries & illness seen in under 15 min. Book online or walk in — no appointment needed.',
        images: ['/rapidinjurycare.jpg']
      },
      alternates: {
        canonical: `https://primaryuc.com/urgent-injury-care/${slug}`,
      },
    };
  }

  return {
    title: condition_details.metaTitle || `${condition_details.title} | Urgent Care Treatment Palm Beach County`,
    description: condition_details.metaDescription || `Get immediate treatment for ${condition_details.title.toLowerCase()} at our urgent care centers. Walk in or book online. Expert care, fast diagnosis, and comprehensive treatment. Serving Palm Beach County.`,
    keywords: condition_details.keywords || [
      condition_details.title.toLowerCase(),
      'urgent care treatment',
      'walk-in medical care',
      'Palm Beach County urgent care',
      'immediate medical attention',
      'injury treatment',
      'illness treatment'
    ],
    twitter: {
      card: 'summary_large_image',
      title: condition_details.metaTitle || `${condition_details.title} | Urgent Care Treatment Palm Beach County`,
      description: condition_details.metaDescription || `Get immediate treatment for ${condition_details.title.toLowerCase()} at our urgent care centers. Walk in or book online. Expert care, fast diagnosis, and comprehensive treatment. Serving Palm Beach County.`,
      images: [condition_details.img || '/rapidinjurycare.jpg']
    },
    alternates: {
      canonical: `https://primaryuc.com/urgent-injury-care/${slug}`,
    },
    openGraph: {
      title: condition_details?.metaTitle || `Urgent Injury Care | Palm Beach County Urgent Care`,
      description: condition_details?.metaDescription || `Walk-in urgent care for injuries in Palm Beach County. Same-day evaluation, imaging, and expert treatment. No appointment needed.`,
      url: `https://primaryuc.com/urgent-injury-care/${slug}`,
      type: 'article',
      images: [
        {
          url: condition_details?.img ? `${baseUrl}${condition_details.img}` : `${baseUrl}/urgentcarelanding.jpg`,
          width: 1200,
          height: 630,
          alt: condition_details?.title || 'Urgent Injury Care',
        },
      ],
    },
  };
}