import React from 'react'
import Image from 'next/image'
import Phone from '@/components/icons/phone'
import BookAppointmentForm from '@/components/ui/BookAppointmentForm'
import { LocationsScreens } from '@/components/locationsscreens'
import { notFound } from 'next/navigation'
const LocationPage = async ({params}: {params: Promise<{slug: string}>}) => {
  const { slug } = await params
  const location = LocationsScreens.find((location) => location.slug === slug)
  if(!location) return <p>Location not found</p>
  return (
    <main className='w-full bg-[#FAFAFA] min-h-screen py-12 max-w-8xl mx-auto px-[60px]'>
        <section className="relative h-full w-full px-[60px]">
            {/* Background image */}
            <div className="absolute inset-0 w-full h-full -z-10">
                <Image
                    src="/paincare.jpg"
                    alt="Pain Care Landing Background"
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#222]/80 via-[#222]/60 to-[#222]/40" />
            </div>
            <div className="relative flex flex-col md:flex-row items-center justify-between py-20 max-w-8xl mx-auto px-4 md:px-12 gap-10">
                {/* Left: Content */}
                <div className="flex-1 flex flex-col justify-center items-start text-white max-w-2xl">
                    <div className="mb-6">
                        <span className="bg-[rgba(255,255,255,0.20)] text-white font-semibold px-6 py-2 rounded-[12px] text-lg shadow-md backdrop-blur-[8.5px]">Location/<span className='text-white font-bold'>{location?.name}</span></span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-600 mb-6 leading-tight text-center">Welcome to {location?.name} Primary & Urgent Care Center</h1>
                    <p className="text-lg mb-8 max-w-2xl text-center">
                    Fast, reliable care. Our expert team is here to handle your urgent health needs, anytime.
                    </p>
                    <div className="flex flex-wrap gap-4 w-full justify-center">
    
                        <a href="tel:5612045111" className="bg-white text-black font-semibold px-8 py-4 rounded-xl text-lg shadow flex w-[40%] justify-center items-center gap-3 hover:bg-gray-100 transition">
                            Contact Us
                        </a>
                    </div>
                </div>
                {/* Right: Form in blurred card */}
                <div className="flex-1 flex justify-center items-center w-full max-w-xl">
                    <BookAppointmentForm title="Request Same-Day Visit" bgColor="bg-[rgba(255,255,255,0.22)] backdrop-blur-[7.150000095367432px]" textColor="text-white" />
                </div>
            </div>
        </section>
    </main>
  )
}

export default LocationPage