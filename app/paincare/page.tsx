import BookAppointmentForm from '@/components/ui/BookAppointmentForm'
import Phone from '@/components/icons/phone'
import Image from 'next/image'
import React from 'react'
import AccidentTypesTabs from '@/components/ui/AccidentTypesTabs'
import NeckPain from '@/components/icons/neckpain';
import BackPain from '@/components/icons/backpain';
import HandPain from '@/components/icons/handpain';
import ShoulderPain from '@/components/icons/shoulderpain';
import KneePain from '@/components/icons/kneepain';
import Headaches from '@/components/icons/headaches';

const PainCare = () => {
    return (
        <main>
            <section className="relative h-full w-full xl:px-[60px] px-4">
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
                <div className="relative flex flex-col lg:flex-row items-center justify-between xl:py-20 py-10 max-w-8xl mx-auto px-4 md:px-12 gap-10">
                    {/* Left: Content */}
                    <div className="flex-1 flex flex-col justify-center items-center text-white max-w-2xl">
                        <div className="mb-6">
                            <span className="bg-[rgba(255,255,255,0.20)] text-white font-semibold px-6 py-2 rounded-[12px] text-lg shadow-md backdrop-blur-[8.5px]">Pain Care</span>
                        </div>
                        <h1 className="md:text-5xl xl:text-6xl text-4xl font-600 mb-6 leading-tight text-center">Auto-Accident & Personal-Injury Urgent Care Book Same-Day</h1>
                        <p className="text-lg mb-8 max-w-2xl text-center">
                            Whiplash, back or neck pain, headaches, seat-belt bruises? Get hospital-level imaging, doctor documentation. Seen in less then 15 min, on-site X-ray & MRI with STAT reads (less then 3 hrs), most insurance accepted, $69 self-pay.<br /><br />Free medical records & bills sent to your attorney within 24 hrs.
                        </p>
                        <div className="flex xl:flex-wrap xl:flex-row flex-col gap-4 w-full justify-center">
                            <button className="bg-[#D52128] text-white font-semibold px-8 py-4 xl:w-[40%] w-full justify-center rounded-xl xl:text-lg text-base shadow hover:bg-[#b81b22] transition">Find a Clinic</button>
                            <a href="tel:5612045111" className="bg-white text-[#D52128] font-semibold px-8 py-4 rounded-xl xl:text-lg text-base shadow flex xl:w-[40%] w-full justify-center items-center gap-3 hover:bg-gray-100 transition">
                                <Phone /> (561) 204-5111
                            </a>
                        </div>
                    </div>
                    {/* Right: Form in blurred card */}
                    <div className="flex-1 flex justify-center items-center w-full max-w-xl">
                        <BookAppointmentForm title="Request Same-Day Visit" bgColor="bg-[rgba(255,255,255,0.22)] backdrop-blur-[7.150000095367432px]" textColor="text-white" />
                    </div>
                </div>
            </section>

            <section className='grid lg:grid-cols-2 gap-14 h-full xl:px-[60px] px-4 lg:py-20 py-2'>
                <div className='w-full h-full relative rounded-2xl overflow-hidden '><Image src="/piprule.jpg" alt="Urgent Injury Care" fill className='object-cover aspect-square' /></div>
                <div className=' flex items-start justify-center xl:py-14 py-10 space-y-6 flex-col'>
                    <p className='lg:text-6xl text-5xl font-600'>Florida's 14-Day PIP Rule  See a Doctor Fast to Protect Your Claim</p>
                    <p className='text-lg text-[#494647]'>
                        Under Florida's Personal Injury Protection (PIP) law, you must receive medical care within 14 days of your car accident to unlock PIP benefits no matter who was at fault. Miss this window and the insurance carrier can deny payment for treatment, imaging, prescriptions, and lost wages.<br /><br />
                        Even "minor" aches can mask whiplash, internal bleeding, or herniated discs, so book a same-day auto-injury visit or walk in today:
                        <br />
                        <li>On-site digital X-ray, CT & MRI with STAT reads (≤ 3 hrs)</li>
                        <li>Detailed injury documentation for attorneys & insurers</li>
                        <li>Direct PIP billing—no out-of-pocket surprise bills</li>
                        <li>Open extended hours across Palm Beach County</li>
                    </p>
                </div>
            </section>
            <AccidentTypesTabs />
            <section className="relative w-full xl:py-52 py-10 flex items-center justify-center ">
                <Image
                    src="/car-accident.jpg"
                    alt="Immediate care for injuries"
                    fill
                    className="object-cover w-full object-center h-full -z-10"
                    priority
                />
                <div className="absolute inset-0 bg-[#570000]/50 -z-10" />
                <div className="flex flex-col items-center justify-center h-full text-center self-center xl:w-[50%] w-full">
                    <h1 className="lg:text-5xl md:text-6xl text-4xl font-bold text-white mb-6">Car-Accident Injury Care  Palm Beach County, FL</h1>
                    <div className="text-lg md:text-xl text-white max-w-2xl mx-auto">
                        Seen in less then 15 min by a car-accident doctor for whiplash, back or neck pain, and seat-belt injuries. On-site X-ray, CT, MRI with STAT reads (less then 3 hrs) and PIP paperwork filed within Florida's 14-day rule no out-of-pocket surprise.
                    </div>
                </div>
            </section>
            {/* Pain & Injuries We Treat After Accidents Section */}
            <section className="w-full bg-[#FAFAFA] py-20 px-4 md:px-[60px]">
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">Pain & Injuries We Treat After Accidents –<br />Palm Beach</h2>
                <div className="md:text-lg text-base text-[#494647] text-center mb-12">Seen in less then 15 min for whiplash, nerve pain, headaches, or joint injuries—on-site X-ray, MRI, and direct PIP billing.</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <NeckPain />
                        <div className="text-2xl font-bold text-black mt-6">Neck Pain</div>
                    </div>
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <BackPain />
                        <div className="text-2xl font-bold text-black mt-6">Back Pain</div>
                    </div>
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <HandPain />
                        <div className="text-2xl font-bold text-black mt-6">Hand Pain</div>
                    </div>
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <ShoulderPain />
                        <div className="text-2xl font-bold text-black mt-6">Shoulder Pain</div>
                    </div>
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <KneePain />
                        <div className="text-2xl font-bold text-black mt-6">Knee & Foot Pain</div>
                    </div>
                    <div className="bg-white rounded-2xl p-10 flex flex-col items-start justify-between h-60 shadow-sm">
                        <Headaches />
                        <div className="text-2xl font-bold text-black mt-6">Headaches & Migraines</div>
                    </div>
                </div>
            </section>
            
        </main>
    )
}

export default PainCare