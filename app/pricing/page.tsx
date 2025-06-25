import React from 'react'
import Image from 'next/image'
import Pdf from '@/components/icons/pdf'
import Mappin from '@/components/icons/mappin'
import Calendar from '@/components/icons/calendar'
import Document from '@/components/icons/document'
import Threedots from '@/components/icons/threedots'
import PricingCard from '@/components/ui/PricingCard'
import AppointmentCard from '@/components/ui/AppointmentCard'
import Polestar from '@/components/icons/polestar'
import Securitycheck from '@/components/icons/securitycheck'

const pricingData = [
    {
        title: 'Office Visit',
        subtitle: 'for most visits',
        features: [
            'General health check-ups and consultations',
            'Assessment of acute or chronic symptoms',
            'Personalized treatment plans and follow-ups',
        ],
        price: '$69.99',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
    {
        title: 'Ultrasound',
        subtitle: 'Diagnostic Imaging',
        features: [
            'Safe and non-invasive internal imaging',
            'Ideal for pregnancy and organ health assessments',
            'Real-time imaging for accurate diagnostics',
        ],
        price: '$100.00',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
    {
        title: 'X Ray',
        subtitle: 'Diagnostic Imaging',
        features: [
            'Quick and efficient bone imaging',
            'Detects fractures, infections, and abnormalities',
            'Used for chest, limbs, and injury assessment',
        ],
        price: '$50.00',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
    {
        title: 'School Physical',
        subtitle: 'Required for school enrollment',
        features: [
            'Comprehensive health evaluation for students',
            'Vision, hearing, and developmental screening',
            'Required documentation for school records',
        ],
        price: '$9.99',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
    {
        title: 'Immigration Physical',
        subtitle: 'USCIS-certified exams',
        features: [
            'Exam by a certified civil surgeon',
            'Includes blood tests, vaccines, and documentation',
            'All required forms completed for immigration',
        ],
        price: '$400.00',
        priceNote: '/ one time payment',
        icon: <Securitycheck />,
    },
    {
        title: 'MRI',
        subtitle: 'Magnetic Resonance Imaging',
        features: [
            'Detailed imaging of soft tissues and organs',
            'Non-invasive and radiation-free',
            'Used for brain, spine, and joint diagnostics',
        ],
        price: '$200.00',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
    {
        title: 'Suboxone',
        subtitle: 'Initial visit only.',
        features: [
            'Medication-assisted treatment for opioid dependence',
            'Evaluation and personalized recovery plan',
            'Confidential, compassionate care',
        ],
        price: '$299.00',
        priceNote: '/ one time payment',
        icon: <Polestar />,
    },
]

const insuranceData = ["Motor Vehicle Accidents", "Workers Compensations", "Aetna",  "Cigna", "BlueCross Blue Shield", "Florida Medicare", "Florida Medicaid",]
const PricingPage = () => {
    return (
        <main className="w-full bg-[#FAFAFA] space-y-20  flex flex-col items-center px-4 lg:px-[60px] min-h-screen">
            <section className='w-full h-full py-20 border'>
                <div className="max-w-8xl mx-auto  rounded-2xl bg-[#F2F6FC] grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 p-8 md:p-12 items-center shadow-sm">
                    {/* Left: Text and Buttons */}
                    <div className="flex flex-col gap-6 justify-center h-full">
                        <p className='text-black text-sm'>Home/<span className="text-[#2563eb] text-sm mb-1 font-[500]">Appointment</span></p>
                        <h1 className="text-4xl md:text-6xl font-[600] text-black mb-2 ">Payment &<br/>Insurance Information</h1>
                        <p className="text-base md:text-xl font-[500] text-[#494647]">
                        Need hospital-level urgent care in Palm Beach County minus ER pricing? Primary & Urgent Care Centers accepts most insurance (Aetna, BCBS, Cigna, Medicare, Medicaid, workers’ comp, PIP) and quotes every cost up front. No coverage? A flat $69 self-pay urgent care visit keeps care affordable, with low, posted rates for X-ray, labs, CT, MRI, and ultrasound. Book a same-day appointment or walk in and be seen in under 15 minutes. Honest, transparent pricing and no-surprise bills that’s why patients searching “urgent care cost near me” choose us.
                        </p>
                    
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            {insuranceData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Document fill="#0445BF" width={20} height={20}/>
                                    <p className="text-base md:text-lg text-[#0445BF]">{item}</p>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Threedots/>
                                <p className="text-base md:text-lg text-[#D52128]">And More</p>
                            </div>
                        </div>
                    </div>
                    {/* Right: Image */}
                    <div className="flex justify-center relative items-center w-full h-full mt-8 md:mt-0">
                        <Image
                            src="/insurance.jpg"
                            alt="Insurance"
                            fill
                            className="rounded-2xl object-cover w-full object-center h-full"
                        />
                    </div>
                </div>
            </section>
            <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
                {/* Top row */}
                <PricingCard {...pricingData[0]} />
                <PricingCard {...pricingData[1]} />
                <PricingCard {...pricingData[2]} />
                {/* Second row */}
                <PricingCard {...pricingData[3]} />
                <AppointmentCard height='auto'/>
                <PricingCard {...pricingData[4]} />
                {/* Third row */}
                <PricingCard {...pricingData[5]} />
                <PricingCard {...pricingData[6]} />
            </div>
        </main>
    )
}

export default PricingPage  