import Image from 'next/image';
import Link from 'next/link';
import Starred from '@/components/icons/starred';
import Phone from './icons/phone';
import BookAnAppointmentPopup from './BookAnAppointmentPopup';
import { trackEvent } from '../lib/gtag';
import CallButton from './CallButton';
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Appointment', href: '/appointment' },
    { name: 'Services', href: '/service' },
    { name: 'Urgent Injury Care', href: '/urgent-injury-care' },
    { name: 'Emergency Room', href: '/emergency-room' },
    { name: 'Car Accident Care', href: '/car-accident-injury-clinic' },
    { name: 'Pain Management Care', href: '/pain-management-care' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Locations', href: '/locations' },
    { name: 'Primary Care', href: '/primary-care-doctor' },
    { name: 'Blogs', href: '/blog' },
];

const Footer = () => (
    <footer className="w-full bg-[#1B1819]">
        <div className="max-w-7xl mx-auto px-8 pt-12 pb-8 border-t border-white/10">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                {/* Brand Section */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                        <Image src="/logoheart.png" alt="Logo" width={40} height={40} />
                        <span className="text-white font-bold text-lg leading-tight">
                            Primary & Urgent<br />Care Centers
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Providing comprehensive urgent care and primary care services throughout Palm Beach County, Florida.
                    </p>
                </div>

                {/* Services Section */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-semibold text-lg mb-4">Services</h3>
                    <ul className="space-y-3">
                        <li><Link href="/urgent-injury-care" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Urgent Injury Care</Link></li>
                        <li><Link href="/emergency-room" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Emergency Room</Link></li>
                        <li><Link href="/car-accident-injury-clinic" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Car Accident Care</Link></li>
                        <li><Link href="/pain-management-care" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Pain Management</Link></li>
                        <li><Link href="/primary-care-doctor" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Primary Care</Link></li>
                    </ul>
                </div>

                {/* Quick Links Section */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        <li><Link href="/" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Home</Link></li>
                        <li><Link href="/appointment" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Book Appointment</Link></li>
                        <li><Link href="/locations" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Locations</Link></li>
                        <li><Link href="/pricing" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Pricing</Link></li>
                        <li><Link href="/blog" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Blog</Link></li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="lg:col-span-1">
                    <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
                    <ul className="space-y-3">
                        <li><Link href="/service" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">All Services</Link></li>
                        <li><Link href="/sitemap.xml" className="text-gray-400 hover:text-[#D52128] text-sm transition-colors">Sitemap</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2025 Primary & Urgent Care Centers. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <span>Serving Palm Beach County, FL</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer; 