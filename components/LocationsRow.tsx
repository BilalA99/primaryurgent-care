import React from 'react'
import LocationCard from './ui/LocationCard'
const LocationsRow = () => {
  return (
    <section className="w-full bg-[#FAFAFA] py-12 px-6 xl:px-[60px] relative">
        <div className="max-w-8xl mx-auto flex flex-col">
          <div className="lg:flex lg:flex-row lg:flex-wrap flex flex-col lg:items-center items-start lg:justify-between w-full lg:gap-5">
            {[
              { location: "Lake Worth", phone: "(561) 433-1700" },
              { location: "Royal Palm Beach", phone: "(561) 204-5111" },
              { location: "Palm Springs", phone: "(561) 969-1595" },
              { location: "Lantana", phone: "(561) 249-6959" }
            ].map((locationData, index) => (
              <React.Fragment key={locationData.location}>
                <div className={`w-full flex items-start lg:border-0 ${index === 1 ? 'border-t-[#0445BF] border-b-[#0445BF] border' : index === 2 ? 'border-b-[#0445BF] border' : ''} border-l-0 border-r-0 lg:py-0 py-4`}>
                  <LocationCard location={locationData.location} phone={locationData.phone} />
                </div>
                {index < 3 && (
                  <div 
                    className={`hidden ${index < 2 ? 'lg:block' : 'xl:block'} h-20 w-[2px] ${index < 2 ? 'xl:mx-4' : 'mx-4'}`} 
                    style={{ background: 'linear-gradient(180deg, #DD4D53 0%, #FFFFFF 50%, #0445BF 100%)' }} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
  )
}

export default LocationsRow