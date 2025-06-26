import React from 'react'
import Image from 'next/image';
import BookAppointmentForm from '@/components/ui/BookAppointmentForm';
import { Phone } from 'lucide-react';
import Star2 from '@/components/icons/star2';
import LocationsRow from '@/components/LocationsRow';

const UrgentInjuryCarePage = () => {
    return (
        <main className=''>
            <section className="relative h-full w-full xl:px-[60px] px-4">
                {/* Background image */}
                <div className="absolute inset-0 w-full h-full -z-10">
                    <Image
                        src="/urgentcarelanding.jpg"
                        alt="Urgent Injury Care Landing Background"
                        fill
                        className="object-cover w-full h-full"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#222]/80 via-[#222]/60 to-[#222]/40" />
                </div>
                <div className="relative flex flex-col md:flex-row items-center justify-between py-20 max-w-8xl mx-auto px-4 md:px-12 gap-10">
                    {/* Left: Content */}
                    <div className="flex-1 flex flex-col justify-center items-center text-white max-w-2xl">
                        <div className="mb-6">
                            <span className="bg-[rgba(255,255,255,0.20)] text-white font-semibold px-6 py-2 rounded-[12px] text-lg shadow-md backdrop-blur-[8.5px]">Urgent Injury Care</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-600 mb-6 leading-tight text-center">Fast Injury Care<br />Walk In or Book Now</h1>
                        <p className="text-lg mb-8 max-w-2xl text-center">
                            Sprain, fracture, cut, or burn? Skip the ER. Walk in or book a same-day slot and see a board-certified provider in less then 15 min. On-site X-ray, CT, MRI, and labs with STAT reads (less then 3 hrs), same-day results, splints, stitches, and pain relief at a fraction of ER cost. Most insurance accepted; $69 self-pay.
                        </p>
                        <div className="flex xl:flex-wrap xl:flex-row flex-col gap-4 w-full justify-center">
                            <button className="bg-[#D52128] text-white font-semibold px-8 py-4 xl:w-[40%] w-full justify-center rounded-xl xl:text-lg text-base shadow hover:bg-[#b81b22] transition">Find a Clinic</button>
                            <a href="tel:5612045111" className="bg-white text-[#D52128] font-semibold px-8 py-4 rounded-xl xl:text-lg text-base shadow flex xl:w-[40%] w-full justify-center items-center gap-3 hover:bg-gray-100 transition">
                                <Phone className="w-6 h-6" /> (561) 204-5111
                            </a>
                        </div>
                    </div>
                    {/* Right: Form in blurred card */}
                    <div className="flex-1 flex justify-center items-center w-full max-w-xl">
                        <BookAppointmentForm title="Request an appointment" bgColor="bg-[rgba(255,255,255,0.22)] backdrop-blur-[7.150000095367432px]" textColor="text-white" />
                    </div>
                </div>
            </section>
            <section className='grid xl:grid-cols-2 xl:gap-14 gap-10 h-full xl:px-[60px] px-4 lg:py-20 py-10'>
                <div className='w-full xl:h-full overflow-hidden h-100 relative rounded-2xl sm:block hidden  '><Image src="/rapidinjurycare.jpg" alt="Urgent Injury Care" fill className='object-cover aspect-square w-full h-full' /></div>
                <div className=' flex items-start justify-center xl:py-32 py-10 space-y-6 flex-col'>
                    <p className='text-6xl font-600'>Walk in NOW for Rapid Injury Care</p>
                    <p className='text-2xl font-600'>Sprains, Strains, Fractures & More</p>
                    <p className='text-lg text-[#494647]'>Twisted ankle? Possible fracture? Cut that needs stitches? Skip the ER line and head straight to Primary & Urgent Care Centers for hospital-level injury treatment in under 15 minutes. Our board-certified team splints sprains, reduces dislocations, repairs lacerations, and delivers on-the-spot digital X-ray, CT, and ultrasound—with STAT reads in three hours and same-day results. Book a same-day urgent care appointment or simply walk in; most insurance accepted and $69 self-pay visits keep costs predictable. Get moving again—fast, safe, affordable.</p>
                </div>
            </section>
            {/* Our Specialities Section */}
            <section className="w-full xl:py-20 py-10 px-4 xl:px-[60px]">
                <h2 className="text-5xl font-bold text-center mb-14">Our specialities</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        "Sprains, Strains & Fractures",
                        "Illness",
                        "Allergic Reactions",
                        "Stomach Pain",
                        "Digestive Issues",
                        "Work Injuries & Workers' Comp",
                        "UTIs & Women's Health",
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-[#FDF4F4] rounded-[30px] px-10 py-8 text-2xl md:text-3xl font-600 text-black text-center cursor-pointer transition-transform duration-200 hover:scale-105"
                            style={{ minWidth: '280px', flex: i === 5 ? '1 1 420px' : undefined }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </section>
            {/* Injury Types We Address Section */}
            <section className="w-full py-20 px-4 md:px-[60px] bg-[#FAFAFA]">
                <h2 className="text-6xl font-600 mb-6">Injury Types We Address</h2>
                <div className="text-lg text-black">On-Site 1.5 T MRI, Digital X-Ray, CT & Ultrasound</div>
                <div className="text-lg text-black mb-6">Walk in or book a same-day appointment our board-certified team delivers STAT MRI reads within 3 hours and same-day results, so treatment starts now, not next week.</div>
                <div className="text-base text-black mb-12">Our specialists provide care for a variety of minor injuries, including:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "Acute Injuries",
                        "Bites from Domestic Animals",
                        "Sprains & Strains",
                        "Contusions & Soft-Tissue Swelling",
                        "Cuts, Lacerations & Stitches",
                        "Eye & Ear Injuries",
                        "Fractures and Dislocations",
                        "Athletic Injuries",
                        "Bruises and Contusions",
                        "Foreign-Body Removal",
                        "Chronic Pain Issues",
                        "Wounds, Abrasions, and Burns",
                        "Cuts and Scrapes",
                    ].map((item, i) => (
                        <div key={i} className="flex items-center bg-[#F7F7F7] rounded-[20px] px-8 py-5 text-2xl font-bold text-black gap-4">
                            <span className="flex-shrink-0"><Star2 /></span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </section>
            {/* Immediate care for injuries Section */}
            <section className="relative w-full py-52 flex items-center justify-center ">
                <Image
                    src="/immediatecare.jpg"
                    alt="Immediate care for injuries"
                    fill
                    className="object-cover w-full object-center h-full -z-10"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 -z-10" />
                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Immediate care for injuries</h1>
                    <div className="text-lg md:text-xl text-white max-w-2xl mx-auto">
                        On-Site 1.5 T MRI, Digital X-Ray, CT & Ultrasound<br />
                        Walk in or book a same-day appointment our board-certified team delivers STAT MRI reads within 3 hours and same-day results, so treatment starts now, not next week.
                    </div>
                </div>
            </section>

            {/* Cuts, Scrapes & Open Wounds Section */}
            <section className='w-full bg-[#FAFAFA]'>
                <section className="w-full max-w-4xl mx-auto py-24 px-4">
                    <h2 className="text-5xl font-bold mb-2">Cuts, Scrapes & Open Wounds</h2>
                    <h3 className="text-2xl font-semibold mb-6">When to Head Straight to Urgent Care</h3>
                    <p className="text-lg text-[#494647] mb-4">Open wounds occur when the skin is broken, often due to accidents like falls or cuts from sharp objects.</p>
                    <p className="text-lg text-[#494647] mb-6">Certain wounds require medical attention to prevent complications such as excessive bleeding or infection. Seek treatment if:</p>
                    <ul className="list-disc pl-8 mb-6 text-lg text-[#494647] space-y-2">
                        <li>Bleeding doesn't stop after 20 minutes of firm pressure</li>
                        <li>The cut is deep, gaping, or exposes fat/muscle</li>
                        <li>It was caused by a rusty/dirty object or animal bite</li>
                        <li>The wound sits over a joint, face, or other sensitive area</li>
                        <li>Debris is embedded (glass, gravel, metal)</li>
                        <li>You notice numbness, loss of movement, or signs of infection (redness, swelling, pus)</li>
                    </ul>
                    <p className="text-lg text-[#494647] mb-10">Our board-certified providers clean, numb, and close wounds with stitches, skin glue, or staples, give tetanus boosters, and prescribe antibiotics when needed all in one visit.</p>
                    <div className="w-full rounded-2xl relative overflow-hidden mb-10">
                        <Image src="/cutsscrapres.jpg" alt="Cuts, Scrapes & Open Wounds" width={900} height={350} className="w-full h-[370px] object-cover rounded-2xl" />
                    </div>
                    <p className="text-lg text-[#494647] mb-6">We provide comprehensive wound care services, including sutures and medications, to avoid infections. With 43 locations in Florida and extended hours, we ensure convenient access to care.</p>
                    <p className="text-lg text-[#494647] mb-10">Our team will develop a tailored treatment plan based on your injury's specifics.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Abrasions / Road Rash</div>
                            <div className="text-base text-[#494647]">Surface scrapes need deep cleaning to prevent infection and scarring.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Avulsions & Crush Injuries</div>
                            <div className="text-base text-[#494647]">Skin or tissue torn away; rapid closure controls bleeding and preserves tissue.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Chronic wounds</div>
                            <div className="text-base text-[#494647]">Individuals with conditions like diabetes may experience slow healing and require specialized care, including debridement and advanced treatments.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Lacerations</div>
                            <div className="text-base text-[#494647]">Jagged or straight cuts often need stitches or staples for proper healing.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Burns & Scalds</div>
                            <div className="text-base text-[#494647]">Minor to moderate thermal injuries; debride, dress, and manage pain.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Animal & Human Bites</div>
                            <div className="text-base text-[#494647]">High-infection wounds; thorough irrigation and preventive antibiotics.</div>
                        </div>
                    </div>
                </section>
            </section>
            {/* Orthopedic & Sports Injuries We Treat Section */}
            <section className="w-full bg-[#FAFAFA]  px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl font-bold mb-2">Orthopedic & Sports Injuries We Treat</h2>
                    <h3 className="text-lg text-[#494647] mb-8">Identifying orthopedic injury symptoms and seeking timely treatment can expedite recovery.</h3>
                    <div className="w-full rounded-2xl overflow-hidden mb-10">
                        <Image src="/orthoandsport.jpg" alt="Orthopedic & Sports Injuries" width={900} height={350} className="w-full h-[370px] object-cover rounded-2xl" />
                    </div>
                    <p className="text-lg text-[#494647] mb-2">We offer a variety of wound care services, including sutures and medications, to prevent infections. With 43 locations in Florida and extended hours, we provide convenient access to care.</p>
                    <p className="text-lg text-[#494647] mb-10">Our team will create a personalized treatment plan based on your injury.</p>
                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Simple & Stress Fractures</div>
                            <div className="text-base text-[#494647]">Digital X-ray on site; splinting and STAT radiology reads in less then 4 3 hrs. Referral for casting or surgery when needed.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Shoulder Dislocation / Subluxation</div>
                            <div className="text-base text-[#494647]">We reduce the joint, numb pain, immobilize, and order follow-up MRI if labrum or rotator cuff damage is suspected.</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Ankle & Wrist Sprains / Strains</div>
                            <div className="text-base text-[#494647]">Rapid swelling or inability to bear weight? Rule out fracture, apply supportive brace, RICE, and anti-inflammatory meds</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6">
                            <div className="text-xl font-bold mb-2">Tendon & Ligament Tears (ACL, MCL, Achilles)</div>
                            <div className="text-base text-[#494647]">Point-of-care ultrasound screens major tears; 1.5 T MRI confirms extent so ortho referral is seamless.</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Walk-In Urgent Care Services Section */}
            <section className="w-full bg-[#FAFAFA] py-14 px-4">
                <div className="max-w-5xl mx-auto flex flex-col ">
                    <h2 className="text-5xl font-600 text-left mb-6">Walk-In Urgent Care Services</h2>
                    <div className="text-lg font-500 text-[#494647] text-left mb-10">Our specialists provide various services for minor injuries, including:</div>
                    <div className="w-full rounded-[32px] overflow-hidden mb-10">
                        <Image src="/walkininjury.jpg" alt="Walk-In Injury" width={900} height={350} className="w-full h-[340px] object-cover rounded-[32px]" />
                    </div>
                    <ul className="list-disc pl-8 mb-8 text-lg text-black w-full space-y-2">
                        <li>Stitches & Laceration Repair – walk in for numbing, sutures, staples, or skin-glue</li>
                        <li>Splinting, Bracing & Digital X-Ray – sprains, strains, simple fractures; STAT reads less then 3 hrs</li>
                        <li>Burn Treatment & Dressing Changes – minor and moderate thermal or chemical burns</li>
                        <li>Foreign-Body / Fishhook Removal – with on-site X-ray to confirm nothing's left behind</li>
                        <li>Workers' Comp & Workplace Injury Care – OSHA notes and return-to-work paperwork</li>
                        <li>Weekend Sports Injuries – sideline assessment, rapid imaging, PT / ortho referral</li>
                    </ul>
                    <div className="text-base text-gray-500 text-left mt-4">Most insurance accepted • $69 self-pay visit • seen in &lt; 15 minutes — book a same-day appointment or walk in now.</div>
                </div>
            </section>

            {/* Locations Row Section */}
            <LocationsRow />
        </main>
    )
}

export default UrgentInjuryCarePage;
