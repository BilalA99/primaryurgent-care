import React from 'react'
import { services } from '@/components/Services'
import Image from 'next/image'
const EmergencyRoomPage = async ({params}: {params: Promise<{slug: string}>}) => {
  const {slug} = await params
  const service = services.find(service => service.slug === slug)
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen lg:py-20 py-10 max-w-8xl mx-auto lg:px-[60px] px-6">
      <div className="w-full mx-auto flex flex-col items-center mb-12">
        <div className="text-sm mb-2">
          Emergency Room / <span className="text-[#2563eb]">{service?.title}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-4">{service?.title}</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          {service?.description}
        </p>
        <div className="flex flex-wrap gap-4 w-full self-center items-center justify-center justify-center">
          <a href="tel:5612045111" className="bg-white text-[black] font-semibold px-8 py-4 rounded-xl xl:text-lg text-base shadow flex lg:w-[40%] sm:w-fit w-full justify-center items-center gap-3 hover:bg-gray-100 transition">
            Contact Us
          </a>
        </div>
      </div>
      <div className="w-full mx-auto h-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">What is a {service?.title}?</h2>
          <p className="md:text-lg text-md text-gray-600">{service?.whatItIs}</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-black">Why choose an {service?.title}?</h2>
          <p className="md:text-lg text-md text-gray-600">{service?.whyChooseUs}</p>
        </div>
      </div>
      <div className='relative w-full items-center justify-center rounded-2xl my-4 sm:block hidden overflow-hidden self-center h-140'><Image src={service?.imageSrc} alt={service?.title} fill className='aspect-video  w-full h-full' /></div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4 col-span-1 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-black">How does a {service?.title} work?</h2>
          <p className="md:text-lg text-md text-gray-600">{service?.howItWorks}</p>
        </div>
        <div className="flex flex-col gap-4 col-span-1 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-black">Why choose Primary & Urgent Care Center for a {service?.title}?</h2>
          <p className="md:text-lg text-md text-gray-600">{service?.urgentCareAdvantage}</p>
        </div>
        <div className='sm:col-span-2 col-span-1 flex flex-col gap-4'>
          <h2 className='text-xl md:text-2xl font-bold text-black'>Costs at a Primary & Urgent Care Center</h2>
          <p className='md:text-lg text-md text-gray-600'>{service?.costs}</p>
        </div>
       </div>
      </main>
  )
}

export default EmergencyRoomPage