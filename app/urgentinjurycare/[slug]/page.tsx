import React from 'react'
import { notFound } from 'next/navigation';
import { conditions, ConditionInfoProp } from '@/components/conditions';
import BookAppointmentForm from '@/components/ui/BookAppointmentForm';
import Image from 'next/image';

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
          description: condition_details?.description || 'Comprehensive urgent care treatment for injuries and medical conditions',
          url: `https://primaryuc.com/urgentinjurycare/${slug}`,
          provider: {
            '@type': 'MedicalClinic',
            name: 'Primary & Urgent Care Centers of Palm Beach County',
            url: 'https://primaryuc.com',
            areaServed: {
              '@type': 'AdministrativeArea',
              name: 'Palm Beach County, FL'
            }
          },
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
      {/* Landing */}
      {/* <section className="w-full h-full flex flex-col relative overflow-hidden" >
        <div 
        style={{
        background: 'white',
        filter: 'blur(30px)'
        }}
        className="w-full h-[120px] absolute top-0 z-[1] border border-red-500"
        />
        <Image src={ConditionDetialsLanding} className=" max-h-[945px] h-full absolute top-0 object-cover object-top pt-16 self-end w-full lg:pr-0 lg:pl-[100px]" alt="Doctor Diagnosing a Old Patient"/>

        <div className="z-[1] flex flex-col w-full h-full  text-left relative md:pt-20 lg:pt-40">
            <div className="lg:w-[60%] w-full h-full absolute left-0 top-0"
            style={{
            background : 'linear-gradient(90deg, #5FBBEC 20.16%, rgba(95, 187, 236, 0.26) 90%,  rgba(255,0,0,0) 100%)',
            }}
            />

<div className=' px-6 xl:px-[80px] z-[2]'>
            <nav aria-label="Breadcrumb" className=' mt-[220px] flex flex-row space-x-[4px] rounded-[62px] w-fit xl:w-[20%] items-center justify-center px-[20px] py-[10px]'
            style={{
                background : 'rgba(255, 255, 255, 0.50)'
            }}
            >
                <span
                style={{
                    fontFamily: "var(--font-reem-kufi)",
                    fontWeight: 400,
                }}
                className="text-[#022968]"
                >
                    Condition
                </span>
    
                <span
                style={{
                    fontFamily: "var(--font-reem-kufi)",
                    fontWeight: 400,
                }}
                className="text-[#022968]"
                >
                    /
                </span>
    
                <span
                style={{
                    fontFamily: "var(--font-reem-kufi)",
                    fontWeight: 400,
                }}
                className="text-[#2358AC]"
                >
                    Condition Details
                </span>
            </nav>
        </div>
        <div className="px-6 xl:px-[80px] z-[2] flex flex-row space-x-[20px] items-center justify-start mt-[12px] w-[85%] lg:w-[62%] xl:w-[55%]">
            <span
              style={{
                  fontFamily: "var(--font-reem-kufi)",
                  fontWeight: 400,
              }}
              className="text-[#022968] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
                {condition_details.title}
            </span>
        </div>

        <div className="z-[2] px-6 xl:px-[80px] mt-[24px]  lg:w-[55%] pb-8">
            <p
            style={{
                fontWeight: 400,
            }}
            className="text-white text-shadow-sm sm:text-lg text-sm"
            >
                {condition_details.body}
            </p>
        </div>
        </div>
        </section> */}
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
          </section>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const condition_details = conditions.find(condition => condition.slug === params.slug);
  
  if (!condition_details) {
    return {
      title: 'Urgent Injury Care | Walk-In Medical Care Palm Beach County',
      description: 'Get immediate care for injuries, illnesses, and medical conditions at our urgent care centers. Walk in or book online. Seen in 15 minutes or less. Serving Palm Beach County.',
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
        description: 'Get immediate care for injuries, illnesses, and medical conditions at our urgent care centers. Walk in or book online. Seen in 15 minutes or less. Serving Palm Beach County.',
        url: `https://primaryuc.com/urgentinjurycare/${params.slug}`,
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
        description: 'Get immediate care for injuries, illnesses, and medical conditions at our urgent care centers. Walk in or book online. Seen in 15 minutes or less. Serving Palm Beach County.',
        images: ['/rapidinjurycare.jpg']
      },
      alternates: {
        canonical: `https://primaryuc.com/urgentinjurycare/${params.slug}`,
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
    openGraph: {
      title: condition_details.metaTitle || `${condition_details.title} | Urgent Care Treatment Palm Beach County`,
      description: condition_details.metaDescription || `Get immediate treatment for ${condition_details.title.toLowerCase()} at our urgent care centers. Walk in or book online. Expert care, fast diagnosis, and comprehensive treatment. Serving Palm Beach County.`,
      url: `https://primaryuc.com/urgentinjurycare/${params.slug}`,
      type: 'website',
      images: [
        {
          url: condition_details.img || '/rapidinjurycare.jpg',
          width: 1200,
          height: 630,
          alt: `${condition_details.title} - Urgent care treatment Palm Beach County`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: condition_details.metaTitle || `${condition_details.title} | Urgent Care Treatment Palm Beach County`,
      description: condition_details.metaDescription || `Get immediate treatment for ${condition_details.title.toLowerCase()} at our urgent care centers. Walk in or book online. Expert care, fast diagnosis, and comprehensive treatment. Serving Palm Beach County.`,
      images: [condition_details.img || '/rapidinjurycare.jpg']
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: condition_details?.metaTitle || `Urgent Injury Care | Palm Beach County Urgent Care`,
      description: condition_details?.metaDescription || `Walk-in urgent care for injuries in Palm Beach County. Same-day evaluation, imaging, and expert treatment. No appointment needed.`,
      url,
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
    twitter: {
      card: 'summary_large_image',
      title: condition_details?.metaTitle || `Urgent Injury Care | Palm Beach County Urgent Care`,
      description: condition_details?.metaDescription || `Walk-in urgent care for injuries in Palm Beach County. Same-day evaluation, imaging, and expert treatment. No appointment needed.`,
      images: [condition_details?.img ? `${baseUrl}${condition_details.img}` : `${baseUrl}/urgentcarelanding.jpg`],
    },
  };
}