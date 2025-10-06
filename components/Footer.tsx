import Image from 'next/image';
import Link from 'next/link';
import Starred from '@/components/icons/starred';
import Phone from './icons/phone';
import BookAnAppointmentPopup from './BookAnAppointmentPopup';
import { trackEvent } from '../lib/gtag';
import CallButton from './CallButton';
const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Appointment', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Locations', href: '#' },
];

const Footer = () => (
    <footer
        className="w-full bg-[#1B1819]"
    >
        <div className="flex flex-col xl:flex-row xl:space-y-0 space-y-6 items-center bg-[#1B1819] justify-between pb-10 max-w-7xl mx-auto w-full px-8 pt-8 border-t border-white/10">
            <div className='flex flex-col sm:flex-row gap-6 justify-between xl:justify-evenly items-center'>
                <div className="flex items-center gap-3">
                    <Image src="/logoheart.png" alt="Logo" width={40} height={40} />
                    <span className="text-white font-bold text-lg leading-tight">
                        Primary & Urgent<br />Care Centers
                    </span>
                </div>
                <nav>
                    <ul className="flex sm:flex-row flex-col gap-6 ">
                        {navLinks.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`text-white hover:text-[#D52128] text-base font-medium transition-colors ${item.name === 'Home' ? 'text-[#D52128]' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="text-gray-400 text-sm order-last xl:order-2 xl:mt-0 mt-4">© 2025 Primary & Urgent Care Centers. All rights reserved.</div>

        </div>
    </footer>
);

export default Footer; 