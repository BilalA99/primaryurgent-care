import React from 'react'
import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'
import LocationFeatureCard from '@/components/ui/LocationFeatureCard'
import Ambulance from '@/components/icons/ambulance'
import Waittimes from '@/components/icons/waittimes'
import ShieldUser from '@/components/icons/shielduser'
import { LocationsScreens } from '@/components/locationsscreens'
import Link from 'next/link'
import ClinicsMap from '@/components/clinicsmap'
const LocationsPage = () => {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen lg:py-20 py-10 max-w-8xl mx-auto lg:px-[60px] px-6">
      <div className="w-full mx-auto flex flex-col items-center mb-12">
        <div className="text-sm mb-2">
          <span className="text-[#2563eb]">Locations</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center mb-4">Find a Location Near You</h1>
        <p className="text-lg text-gray-600 text-center mb-8">We're just around the corner—drop by and experience our service in person.</p>
      </div>
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {LocationsScreens.map((loc, i) => (
          <ClinicsMap key={i} startingClinic={loc} />
        ))}
      </div>

        {/* Feature cards section */}
        <div className="max-w-8xl items-stretch   mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:py-20 py-10">
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