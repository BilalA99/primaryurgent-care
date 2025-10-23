import React from 'react'
import Reveal from '../RevealAnimation'
import MobileCarousel from '../ui/MobileCarousel'
import NeckPain from '../icons/neckpain'
import BackPain from '../icons/backpain'
import PIPDocumentation from '../icons/pipdocumentation'
import UrgentCareVsER from '../icons/urgentcarevser'
import KneePain from '../icons/kneepain'
import Headaches from '../icons/headaches'
import Link from 'next/link'

const AccidentInjuryTypes = () => {
    return (
        <section className="w-full bg-[#FAFAFA] py-16 sm:py-18 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
            <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">Car Accident Care & Services –<br />Palm Beach</h2>
            <div className="md:text-lg text-base text-[#494647] text-center mb-12">Comprehensive car accident care including injury evaluation, PIP documentation, medical decision guidance, and same-day treatment—on-site X-ray, MRI, and direct billing.</div>
            <Reveal className='w-full overflow-hidden'>
                <MobileCarousel showDots={true} showArrows={false} autoPlay={false}>
                    <Link href="/car-accident/whiplash" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <NeckPain />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">Whiplash</div>
                    </Link>
                    <Link href="/car-accident/back-neck-pain" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <BackPain />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">Back & Neck Pain</div>
                    </Link>
                    <Link href="/car-accident/documentation-pip" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <PIPDocumentation />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">PIP Documentation</div>
                    </Link>
                    <Link href="/car-accident/urgent-care-vs-er" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <UrgentCareVsER />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">Urgent Care vs ER</div>
                    </Link>
                    <Link href="/urgent-injury-care/knee-foot-pain" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <KneePain />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">Knee & Foot Pain</div>
                    </Link>
                    <Link href="/urgent-injury-care/headaches-migraines" className="bg-white hover:scale-105 transition-all duration-300 rounded-2xl p-4 sm:p-10 flex flex-col items-start justify-between h-48 sm:h-60 shadow-sm touch-manipulation w-full max-w-[280px] mx-auto block">
                        <Headaches />
                        <div className="text-lg sm:text-2xl font-bold text-black mt-4 sm:mt-6">Headaches & Migraines</div>
                    </Link>
                </MobileCarousel>
            </Reveal>
        </section>
    )
}

export default AccidentInjuryTypes
