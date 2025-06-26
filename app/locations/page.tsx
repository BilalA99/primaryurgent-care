import React from 'react'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'
import LocationFeatureCard from '@/components/ui/LocationFeatureCard'
import Ambulance from '@/components/icons/ambulance'
import Waittimes from '@/components/icons/waittimes'
import ShieldUser from '@/components/icons/shielduser'
import { LocationsScreens } from '@/components/locationsscreens'
import Link from 'next/link'
const LocationsPage = () => {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen lg:py-12 py-10 max-w-8xl mx-auto lg:px-[60px] px-6">
      <div className="w-full mx-auto flex flex-col items-center mb-12">
        <div className="text-sm mb-2">
          Home / <span className="text-[#2563eb]">Locations</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-4">Find a Location Near You</h1>
        <p className="text-lg text-gray-600 text-center mb-8">We're just around the corner—drop by and experience our service in person.</p>
      </div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {LocationsScreens.map((loc, i) => (
          <div key={i} className="relative rounded-2xl h-120 overflow-hidden shadow-md">
            {/* Map image */}
            <Image
              src={'/mapplaceholder.png'}
              alt={loc.clinic}
              fill
              className="w-full object-cover"
              priority={i === 0}
            />
            {/* Blurred overlay card */}
            <Link href={`/locations/${loc.slug}`} className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-start z-10">
              <div className="flex flex-col items-center w-full -translate-y-1/2">
                <button className="flex items-center gap-2 bg-[#D52128] text-white font-semibold px-6 py-2 rounded-full shadow-lg mb-2">
                  <MapPin className="w-5 h-5" /> Get Direction
                </button>
              </div>
              <div className="w-full rounded-2xl backdrop-blur-2xl bg-[#222]/60 p-6  space-y-5 text-white shadow-lg">
                <div className="text-2xl font-bold  leading-tight">{loc.clinic}</div>
                <div className="flex items-center gap-2 ">
                  <MapPin className="w-5 h-5 opacity-80" />
                  <span className="text-base font-medium opacity-90">{loc.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 opacity-80" />
                  <span className="text-base font-medium opacity-90">{loc.phone}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

        {/* Feature cards section */}
        <div className="max-w-8xl  mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:py-20 py-10">
        <LocationFeatureCard
          icon={<Ambulance />}
          title="Urgent Care"
          description="Primary and Urgent Care Centers provide local and personal care for a variety of general health-care needs."
        />
        <LocationFeatureCard
          icon={<Waittimes />}
          title="Short Wait Times"
          description={"Nobody likes sitting in a doctor's waiting room, not knowing when you'll be called, so we don't make you wait. Our system allows people to be seen quickly so you'll start feeling better sooner."}
        />
        <LocationFeatureCard
          icon={<ShieldUser />}
          title="Most Insurance Accepted"
          description={"Our co-pays are less than hospital emergency room fees and we will work with you to process your insurance"}
        />
      </div>
    </main>
  )
}

export default LocationsPage