'use client';
import { useState } from 'react';
import Image from 'next/image';

const accidentTypes = [
    {
        label: 'Car',
        title: 'Car Accident',
        topDescription: 'Car accidents can result in sudden impacts leading to whiplash, internal bruising from seatbelts, or knee injuries from dashboard impact. Our urgent care clinics provide immediate assessment for these and other car-accident related injuries, including Post-Traumatic Stress Disorder. We offer rapid diagnostics like X-rays to quickly identify issues, helping you start recovery without delay.',
        description:
            'In a crash? See a dedicated car-accident doctor today for whiplash, seat-belt bruises, knee impact, air-bag burns, or Post-Traumatic Stress Disorder. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less then 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly no up-front surprises. Book your same day auto-injury visit now',
        description2: 'Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day auto-injury visit now.',
        image: '/vehiclecollison.jpg',
        button: 'Book Same-Day Auto-Injury Visit',
    },
    {
        label: 'Truck',
        title: 'Truck Accident',
        topDescription: 'The immense force involved in truck accidents often causes severe injuries such as spinal trauma, fractures, and internal organ damage. Our urgent care centers are equipped to promptly evaluate and treat these complex injuries. We prioritize efficient diagnosis and care to mitigate long-term complications from such high-impact collisions.',
        description:
            'In a truck accident? See a dedicated accident doctor today for severe whiplash, spinal injuries, fractures, or internal trauma. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day auto-injury visit now.',
        image: '/truck.png',
        button: 'Book Truck Injury Visit',
    },
    {
        label: 'Motorcycle',
        title: 'Motorcycle Accident',
        topDescription: 'Motorcycle accidents frequently lead to road rash, broken bones, and head injuries due to direct impact with the ground or other vehicles. Our urgent care clinics offer specialized care for these common motorcycle accident injuries, providing quick wound treatment and imaging. We aim to get you on the path to healing swiftly after such a vulnerable incident.',
        description:
            'Been in a motorcycle accident? See a dedicated accident doctor today for road rash, fractures, head trauma, or joint dislocations. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day auto-injury visit now.',
        image: '/motorcycle.png',
        button: 'Book Two-Wheeler Injury Visit',
    },
    {
        label: 'Bicycle / Pedestrian Accident',
        title: 'Bicycle / Pedestrian Accident',
        topDescription: 'Being hit as a cyclist or pedestrian can cause concussions, broken limbs, and significant soft tissue injuries from direct impact. Our urgent care centers are prepared to assess and manage the acute injuries sustained in these vulnerable accidents. We provide timely medical attention to address your immediate needs and ensure proper initial care.',
        description: 'Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day auto-injury visit now.',
        image: '/cycle.png',
        button: 'Book Bicycle/Pedestrian Injury Visit',
    },
    {
        label: 'Rideshare Accident',
        title: 'Rideshare Accident',
        topDescription: 'njuries from rideshare accidents, while similar to car accidents, can present unique challenges due to liability and reporting. Our urgent care clinics are experienced in treating common rideshare accident injuries like whiplash and back pain. We also assist with documentation needed for your accident report and subsequent recovery process.',
        description:
            'Injured in a rideshare accident? See a dedicated accident doctor today for whiplash, back pain, sprains, or contusions. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day auto-injury visit now.',
        image: '/rideshare.png',
        button: 'Book Rideshare Accident Visit',
    },
    {
        label: 'Workplace',
        title: 'Workplace Accident',
        topDescription: "Workplace accidents, from falls to equipment-related incidents, can cause sprains, strains, or even more severe trauma. Our urgent care centers provide immediate evaluation and treatment for various occupational injuries. We focus on getting you the necessary care quickly, aiding your recovery and documentation for workers' compensation.",
        description:
            "Had a workplace accident? See a dedicated injury doctor today for sprains, strains, repetitive stress injuries, or impact trauma. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida Workers' Compensation paperwork, generate employer-ready records, and bill the insurer directly—no up-front surprises. Book your same-day injury visit now.",
        image: '/work.png',
        button: 'Book Occupational Injury Visit',
    },
    {
        label: 'Slip & Fall',
        title: 'Slip & Fall Injury',
        topDescription: "Slip and fall incidents can result in painful injuries such as sprained ankles, knee damage, wrist fractures, or head impacts. Our urgent care clinics offer prompt diagnosis and treatment for these types of sudden injuries. We provide efficient care to assess the extent of your fall-related injury and guide you towards appropriate recovery steps.",
        description:
            'Suffered a slip & fall injury? See a dedicated injury doctor today for fractures, sprained ankles, knee damage, or head impacts. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less than 3 hrs), so you leave with answers—not anxiety. We complete and e-file all necessary insurance paperwork, generate attorney-ready records, and bill the insurer directly—no up-front surprises. Book your same-day injury visit now.',
        image: '/trip.png',
        button: 'Book Slip & Fall Injury Visit',
    },
];

const AccidentTypesTabs = () => {
    const [active, setActive] = useState(0);

    const activeType = accidentTypes[active];

    return (
        <section className="w-full xl:py-20 py-10 px-4 xl:px-[60px] flex flex-col space-y-14">
            <h2 className="text-5xl md:text-6xl font-bold">Accident Types We Treat<br />in Palm Beach County, FL</h2>
            <div className="text-lg text-[#494647] ">From fender-benders to workplace falls, our board-certified team documents injuries, bills direct to PIP or workers' comp, and gets you seen in 15 minutes.</div>
            <div className="flex flex-wrap gap-4 mb-10">
                {accidentTypes.map((type, i) => (
                    <button
                        key={type.label}
                        className={`px-7 py-3 rounded-full text-lg font-semibold transition-colors ${i === active ? 'bg-[#2563eb] text-white' : 'bg-[#FDF4F4] text-black hover:bg-[#ececec]'}`}
                        onClick={() => setActive(i)}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start ">
                <div className=" flex flex-col space-y-10">
                    <h3 className="text-4xl font-bold ">{activeType.title}</h3>
                    <p className="text-lg text-[#494647]">{activeType.topDescription}</p>
                    <p className="text-lg text-[#494647]">{activeType.description}</p>
                    <button className="bg-[#D52128] text-white font-semibold px-7 py-4 rounded-xl w-fit text-lg shadow hover:bg-[#b81b22] transition">{activeType.button}</button>
                </div>
                <div className="flex-1  flex justify-center items-center">
                    <div className="w-full rounded-2xl overflow-hidden relative xl:h-150 h-100">
                        <Image src={activeType.image} alt={activeType.title} fill className=" w-full object-cover rounded-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccidentTypesTabs; 