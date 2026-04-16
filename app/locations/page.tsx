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

export const metadata = {
  title: "Urgent Care Locations Palm Beach | Car Accident | 4 Clinics",
  description: "4 urgent care locations in Palm Beach County for car accidents & injuries. Walk-ins welcome, PIP accepted, X-ray onsite.",
  openGraph: {
    title: "Urgent Care Locations Palm Beach | Car Accident | 4 Clinics",
    description: "4 urgent care locations in Palm Beach County for car accidents & injuries. Walk-ins welcome, PIP accepted, X-ray onsite.",
    url: "https://primaryuc.com/locations",
    images: [
      { url: "https://primaryuc.com/servicelanding.jpg", width: 1200, height: 630, alt: "Urgent Care Locations Palm Beach County" }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Urgent Care Locations Palm Beach | Car Accident | 4 Clinics",
    description: "4 urgent care locations in Palm Beach County for car accidents & injuries. Walk-ins welcome, PIP accepted, X-ray onsite.",
    images: [
      { url: "https://primaryuc.com/servicelanding.jpg", alt: "Urgent Care Locations Palm Beach County" }
    ]
  },
  alternates: {
    canonical: "https://primaryuc.com/locations"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/apple-icon.png",
    apple: "/apple-icon.png"
  }
};

function LocationsJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://primaryuc.com/locations#webpage",
              "url": "https://primaryuc.com/locations",
              "name": "Urgent Care Locations Palm Beach | 4 Clinics | PrimaryUC",
              "description": "4 urgent care locations in Palm Beach County. Royal Palm Beach, Lake Worth, Palm Springs, Lantana / Jog Rd. Walk-ins, PIP accepted, X-ray onsite.",
              "about": { "@id": "https://primaryuc.com/#clinic" },
              "inLanguage": "en-US",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primaryuc.com" },
                  { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://primaryuc.com/locations" }
                ]
              }
            },
            ...LocationsScreens.map(loc => ({
              "@type": "MedicalClinic",
              "@id": `https://primaryuc.com/locations/${loc.slug}#clinic`,
              "name": loc.clinic,
              "url": `https://primaryuc.com/locations/${loc.slug}`,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": loc.address,
                "addressLocality": loc.city || loc.name,
                "addressRegion": "FL",
                "postalCode": loc.postalCode || '',
                "addressCountry": "US"
              },
              "telephone": `+1-${loc.phone.replace(/-/g, '')}`,
              "branchOf": { "@id": "https://primaryuc.com/#clinic" },
              ...(loc.gmbUrl ? { "sameAs": [loc.gmbUrl], "hasMap": loc.gmbUrl } : {}),
              ...(loc.lat && loc.lng ? {
                "geo": { "@type": "GeoCoordinates", "latitude": loc.lat, "longitude": loc.lng }
              } : {})
            }))
          ]
        })
      }}
    />
  );
}

const LocationsPage = () => {
  return (
    <main className="w-full bg-[#FAFAFA] min-h-screen lg:py-20 py-10 max-w-8xl mx-auto lg:px-[60px] px-6">
      <LocationsJsonLd />
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