'use client';
import { useState } from 'react';
import Image from 'next/image';

const accidentTypes = [
    {
        label: 'Automobile',
        title: 'Vehicle Collision',
        description:
            'In a crash? See a dedicated car-accident doctor today for whiplash, seat-belt bruises, knee impact, or air-bag burns. Our Palm Beach clinics offer on-site digital X-ray, CT, and 1.5 T MRI with STAT reads (less then 3 hrs), so you leave with answers—not anxiety. We complete and e-file all Florida PIP paperwork within the mandatory 14-day window, generate attorney-ready records, and bill the insurer directly no up-front surprises. Book your same day auto-injury visit now',
        image: '/vehiclecollison.jpg',
        button: 'Book Same-Day Auto-Injury Visit',
    },
    {
        label: 'Heavy Vehicle',
        title: 'Heavy Vehicle Accident',
        description:
            'Injured in a truck or bus accident? Our urgent care centers provide rapid assessment, imaging, and documentation for workplace and commercial vehicle injuries. We help you navigate insurance and return-to-work paperwork.',
        image: '/placeholder-heavyvehicle.jpg',
        button: 'Book Heavy Vehicle Injury Visit',
    },
    {
        label: 'Two-Wheeler',
        title: 'Motorcycle/Bike Accident',
        description:
            'Motorcycle or bike crash? We treat road rash, fractures, and head injuries with on-site imaging and same-day care. We also provide legal documentation for insurance and attorney needs.',
        image: '/placeholder-twowheeler.jpg',
        button: 'Book Two-Wheeler Injury Visit',
    },
    {
        label: 'Cyclist/Pedestrian',
        title: 'Cyclist/Pedestrian Injury',
        description:
            'Hit while walking or cycling? Our team provides urgent care for fractures, sprains, and soft-tissue injuries, plus documentation for insurance and legal claims.',
        image: '/placeholder-cyclist.jpg',
        button: 'Book Cyclist/Pedestrian Injury Visit',
    },
    {
        label: 'Rideshare Incident',
        title: 'Rideshare Accident',
        description:
            'Injured in an Uber or Lyft? We offer rapid evaluation, imaging, and paperwork for rideshare-related injuries, and help you file claims with the appropriate insurer.',
        image: '/placeholder-rideshare.jpg',
        button: 'Book Rideshare Injury Visit',
    },
    {
        label: 'Occupational',
        title: 'Workplace Accident',
        description:
            'Workplace fall or injury? We provide urgent care, OSHA notes, and return-to-work documentation for all occupational injuries, with on-site imaging and same-day results.',
        image: '/placeholder-occupational.jpg',
        button: 'Book Occupational Injury Visit',
    },
    {
        label: 'Trip & Fall',
        title: 'Trip & Fall Injury',
        description:
            'Slipped or tripped? We treat sprains, fractures, and head injuries, and provide documentation for insurance and legal needs.',
        image: '/placeholder-tripfall.jpg',
        button: 'Book Trip & Fall Injury Visit',
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