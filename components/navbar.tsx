'use client';
import Image from 'next/image';
import Link from 'next/link';
import Star from "@/components/icons/star";
import { usePathname } from 'next/navigation';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Appointment', href: '/appointment' },
    { name: 'Services', href: '/service' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Locations', href: '/locations' },
];

const NavBar = () => {
    const pathname = usePathname();
    return (
       <div className=''>
            <div className="bg-white  p-4 font-sans">
                <div className="max-w-screen-xl mx-auto bg-[#FAFAFA] rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image src="/logoheart.png" alt="Logo" width={40} height={40} className="" />
                            <div className="text-red-600 font-bold text-base leading-tight">
                                <span>Primary & Urgent</span>
                                <br />
                                <span>Care Centers</span>
                            </div>
                        </Link>
    
                        <nav>
                            <ul className="flex items-center space-x-8">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        
                                        <Link href={item.href} className={`text-gray-600 font-medium text-base hover:text-red-500 ${pathname === item.href ? 'bg-red-100 text-red-600 px-4 py-2 rounded-lg' : 'px-4 py-2'}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
    
                        <button className="flex items-center bg-red-600 text-white px-[16px] py-[10px] rounded-xl font-semibold text-base">
                            <Star className="w-5 h-5 mr-3" fill="white" />
                            <span>(561) 204-5111</span>
                        </button>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default NavBar;