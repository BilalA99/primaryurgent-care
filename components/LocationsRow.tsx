import React from 'react'
import LocationCard from './ui/LocationCard'
const LocationsRow = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-12 px-4 lg:px-[60px] relative">
        <div className="max-w-8xl mx-auto flex flex-col">
          <div className="flex flex-row items-center justify-between w-full gap-0">
            <LocationCard location="Royal Palm Beach" phone="(561) 204-5111" />
            <div className="hidden md:block h-20 w-[2px] mx-4" style={{ background: 'linear-gradient(180deg, #DD4D53 0%, #FFFFFF 50%, #0445BF 100%)' }} />
            <LocationCard location="Lake Worth" phone="(561) 433-1700" />
            <div className="hidden md:block h-20 w-[2px] mx-4" style={{ background: 'linear-gradient(180deg, #DD4D53 0%, #FFFFFF 50%, #0445BF 100%)' }} />
            <LocationCard location="Palm Springs" phone="(561) 969-1595" />
            <div className="hidden md:block h-20 w-[2px] mx-4" style={{ background: 'linear-gradient(180deg, #DD4D53 0%, #FFFFFF 50%, #0445BF 100%)' }} />
            <LocationCard location="Lantana" phone="(561) 249-6959" />
          </div>
        </div>
      </section>
  )
}

export default LocationsRow