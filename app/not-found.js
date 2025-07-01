import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MapPin, Clock, ArrowLeft, Home, User, Calendar } from 'lucide-react'

export const metadata = {
  title: "404 Not Found | Urgent Care Palm Beach County | Primary & Urgent Care Centers",
  description:
    "Page not found. Need urgent care? Book an appointment, find a walk-in clinic, or get directions to Primary & Urgent Care Centers in Palm Beach County. Seen in 15 minutes or less, board-certified providers, multiple locations.",
  keywords: [
    "404 not found",
    "urgent care Palm Beach County",
    "walk-in clinic Palm Beach",
    "book urgent care appointment",
    "urgent care near me",
    "find urgent care location",
    "board-certified urgent care",
    "quick care Palm Beach",
    "emergency care Palm Beach County"
  ],
  openGraph: {
    title: "404 Not Found | Urgent Care Palm Beach County | Primary & Urgent Care Centers",
    description:
      "Page not found. Need urgent care? Book an appointment, find a walk-in clinic, or get directions to Primary & Urgent Care Centers in Palm Beach County. Seen in 15 minutes or less, board-certified providers, multiple locations.",
    url: "https://primaryurgentcare.com/404",
    type: "website",
    images: [
      {
        url: "/doctorwithpatient.jpg",
        width: 1200,
        height: 630,
        alt: "404 urgent care not found Palm Beach County"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "404 Not Found | Urgent Care Palm Beach County | Primary & Urgent Care Centers",
    description:
      "Page not found. Need urgent care? Book an appointment, find a walk-in clinic, or get directions to Primary & Urgent Care Centers in Palm Beach County. Seen in 15 minutes or less, board-certified providers, multiple locations.",
    images: [
      "/doctorwithpatient.jpg"
    ]
  },
  alternates: {
    canonical: "https://primaryurgentcare.com/404"
  }
};

// Structured data for 404 page (site-wide urgent care info)
const NotFoundJsonLd = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: 'Primary & Urgent Care Centers of Palm Beach County',
        url: 'https://primaryurgentcare.com',
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Palm Beach County, FL'
        },
        medicalSpecialty: [
          'UrgentCare',
          'WalkInClinic',
          'EmergencyCare'
        ],
        availableService: [
          'Same-Day Appointments',
          'Walk-In Visits',
          'Board-Certified Providers',
          'Multiple Locations',
          'Quick Care (Seen in 15 Minutes)',
          'Insurance & Self-Pay Accepted'
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'See locations page',
          addressLocality: 'Palm Beach County',
          addressRegion: 'FL',
          postalCode: '',
          addressCountry: 'US'
        },
        telephone: '+1-561-555-5555',
        description: 'Page not found. Need urgent care? Book an appointment, find a walk-in clinic, or get directions to Primary & Urgent Care Centers in Palm Beach County. Seen in 15 minutes or less, board-certified providers, multiple locations.'
      })
    }}
  />
);

const NotFound = () => {
    return (
        <>
            <NotFoundJsonLd />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Header with emergency contact */}
                <div className="bg-red-600 text-white py-2 px-6">
                    <div className="max-w-8xl mx-auto flex items-center justify-center space-x-4 text-sm">
                        <Phone className="w-4 h-4" />
                        <span>Emergency: Call (561) 204-5111</span>
                        <span>•</span>
                        <span>Open 7 days a week</span>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - 404 content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-6xl lg:text-8xl font-bold text-gray-900">404</h1>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                                    Page Not Found
                                </h2>
                                <p className="text-lg text-gray-600 max-w-md">
                                    The page you're looking for doesn't exist. But don't worry - our urgent care team is here to help with your medical needs.
                                </p>
                            </div>

                            {/* Quick actions */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Need Medical Care?</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Link
                                        href="/appointment"
                                        className="flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-300"
                                    >
                                        <Calendar className="w-5 h-5" />
                                        <span>Book Appointment</span>
                                    </Link>
                                    <Link
                                        href="/locations"
                                        className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
                                    >
                                        <MapPin className="w-5 h-5" />
                                        <span>Find Location</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Navigation options */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-900">Quick Navigation</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Link
                                        href="/"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition duration-300"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Home</span>
                                    </Link>
                                    <Link
                                        href="/service"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition duration-300"
                                    >
                                        <User className="w-4 h-4" />
                                        <span>Our Services</span>
                                    </Link>
                                    <Link
                                        href="/locations"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition duration-300"
                                    >
                                        <MapPin className="w-4 h-4" />
                                        <span>Locations</span>
                                    </Link>
                                    <Link
                                        href="/pricing"
                                        className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition duration-300"
                                    >
                                        <span>$</span>
                                        <span>Pricing</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Emergency info */}
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-red-900 mb-2">Medical Emergency?</h3>
                                <p className="text-red-800 mb-3">
                                    If you're experiencing a medical emergency, call 911 immediately or visit our nearest urgent care center.
                                </p>
                                <div className="flex items-center space-x-2 text-red-700">
                                    <Phone className="w-4 h-4" />
                                    <span className="font-semibold">(561) 204-5111</span>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Medical image */}
                        <div className="relative">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden">
                                <Image
                                    src="/doctorwithpatient.jpg"
                                    alt="Doctor with patient"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">Professional Medical Care</h3>
                                    <p className="text-white/90">Our team is ready to help with your urgent care needs</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section with additional info */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <Clock className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Quick Care</h3>
                            <p className="text-gray-600">Seen in 15 minutes or less</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <MapPin className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Multiple Locations</h3>
                            <p className="text-gray-600">Convenient locations across Palm Beach County</p>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <User className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Expert Care</h3>
                            <p className="text-gray-600">Board-certified providers</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound