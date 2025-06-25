import Image from 'next/image';
import Link from 'next/link';
import Starred from '@/components/icons/starred';
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
        <div className="flex flex-col items-center justify-center text-center px-4 pt-20"
            style={{
                background: 'linear-gradient(180deg, #D52128 0%, #1B1819 100%)',
            }}
        >
            <h2 className="text-5xl font-bold text-white mb-6">Did You Know?</h2>
            <p className="text-lg text-white max-w-3xl mb-8">
                More than 70 % of emergency-room visits could be safely treated at an urgent care center like ours, according to Truven Health Analytics. Skip the ER wait and head to Primary & Urgent Care Centers for rapid relief—from colds, flu, and strep throat to on-site X-rays, labs, immunizations, pediatrics, and occupational health. Same-day appointments, walk-ins welcome.
            </p>
            <a
                href="tel:5612045111"
                className="inline-flex items-center gap-3 bg-white text-[#D52128] font-semibold text-lg px-8 py-4 rounded-xl shadow-md mb-16"
            >
                <Starred />
                Call Now  (561) 204-5111
            </a>
        </div>
        <div className="flex flex-col md:flex-row items-center bg-[#1B1819] justify-between pb-10 max-w-7xl mx-auto w-full px-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
                <Image src="/logoheart.png" alt="Logo" width={40} height={40} />
                <span className="text-white font-bold text-lg leading-tight">
                    Primary & Urgent<br />Care Centers
                </span>
            </div>
            <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Primary & Urgent Care Centers. All rights reserved.</div>
            <nav>
                <ul className="flex gap-6">
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
    </footer>
);

export default Footer; 