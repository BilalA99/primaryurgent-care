'use client';
import Image from 'next/image';
import Link from 'next/link';
import Star from "@/components/icons/star";
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import Phone from './icons/phone';
import BookAnAppointmentPopup from './BookAnAppointmentPopup';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Appointment', href: '/appointment' },
    {
        name: 'Services', href: '/service',
        sublinks: [
            { name: 'All Services', href: '/service' },
            { name: 'Urgent Injury Care', href: '/urgentinjurycare' },
            { name: 'Emergency Room', href: '/emergencyroom' },
            { name: 'Accident Care', href: '/paincare' },
            { name: 'Pain Management Care', href: '/pain-management-care' },
            { name: 'DOT Physical', href: '/service/dot-physical' },
            { name: 'Lawyers', href: '/lawyers' },
        ]
    },
    { name: 'Pricing', href: '/pricing' },
    {
        name: 'Locations', href: '/locations',
        sublinks: [
            { name: 'All Locations', href: '/locations' },
            { name: 'Royal Palm Beach', href: '/locations/royal-palm-beach-primary-urgent-care-center' },
            { name: 'Lake Worth', href: '/locations/lake-worth-primary-urgent-care-center' },
            { name: 'Palm Springs', href: '/locations/palm-springs-primary-urgent-care-center' },
            { name: 'Lantana', href: '/locations/lantana-primary-urgent-care-center' },

        ]
    },
    {
        name: 'Primary Care', href: '/primary-care-doctor'
    }
];

// Inline HamburgerIcon for mobile menu
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <span className="relative w-7 h-7 flex flex-col justify-center items-center">
        <span className={`block h-0.5 w-7 bg-[#D52128] rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block h-0.5 w-7 bg-[#D52128] rounded transition-all duration-300 my-1 ${open ? 'opacity-0' : ''}`}></span>
        <span className={`block h-0.5 w-7 bg-[#D52128] rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
    </span>
);

const NavBar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openSidebarIndex, setOpenSidebarIndex] = useState<number | null>(null); // for mobile accordion
    const toggleSidebar = () => setSidebarOpen((v) => !v);
    const closeSidebar = () => setSidebarOpen(false);

    // Desktop dropdown logic: purely CSS hover
    // Mobile: handle accordion open/close

    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex w-full'>
            <div className="bg-white p-4 font-sans w-full border">
                <div className=" bg-[#FAFAFA] rounded-xl p-3">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-3">
                            <Image src="/logoheart.png" alt="Logo" width={40} height={40} className="" />
                            <div className="text-red-600 font-bold text-base leading-tight">
                                <span>Primary & Urgent</span>
                                <br />
                                <span>Care Centers</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden xl:block">
                            <ul className="flex items-center space-x-8">
                                {navItems.map((item, idx) => (
                                    <li key={item.name} className="relative group">
                                        <Link href={item.href} className={`text-gray-600 font-medium text-base hover:text-red-500 ${pathname === item.href ? 'bg-red-100 text-red-600 px-4 py-2 rounded-lg' : 'px-4 py-2'}`}>{item.name}</Link>
                                        {item.sublinks && (
                                            <ul className="absolute left-0 top-full mt-2 min-w-[220px] bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all z-20 border border-gray-100">
                                                {item.sublinks.map((sub) => (
                                                    <li key={sub.name}>
                                                        <Link
                                                            href={sub.href}
                                                            className={`block px-5 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 whitespace-nowrap ${pathname === sub.href ? 'bg-red-100 text-red-600' : ''}`}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Desktop Call Button */}
                        {/* <a href="tel:5612310250" className="hidden xl:flex hover:cursor-pointer items-center flex-row space-x-4 bg-red-600 text-white px-[16px] py-[10px] rounded-xl font-semibold text-base">
                            <Phone fill="white" />
                            <span>(561) 231-0250</span>
                        </a> */}
                          <BookAnAppointmentPopup>
                              <button  className="hidden xl:flex hover:cursor-pointer items-center flex-row space-x-4 bg-red-600 text-white px-[16px] py-[10px] rounded-xl font-semibold text-base">
                                Contact Us
                              </button>
                          </BookAnAppointmentPopup>

                        {/* Hamburger Button (Mobile) */}
                        <button
                            className={`xl:hidden text-[#D52128] flex p-2 z-50 ml-2 bg-white rounded-xl backdrop-blur-3xl ${isSidebarOpen ? 'hidden' : ''}`}
                            onClick={toggleSidebar}
                            aria-label="Toggle menu"
                            aria-expanded={isSidebarOpen}
                            aria-controls="mobile-sidebar"
                        >
                            <HamburgerIcon open={isSidebarOpen} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay (Visible when sidebar is open, below xl) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-30 xl:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                id="mobile-sidebar"
                className={`fixed top-0 right-0 h-full w-full sm:w-[65%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 xl:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
                aria-hidden={!isSidebarOpen}
            >
                <div className="p-6 flex justify-end">
                    <button
                        className="xl:hidden text-[#D52128] flex p-2 z-50 ml-auto bg-white rounded-xl backdrop-blur-3xl"
                        onClick={toggleSidebar}
                        aria-label="Close menu"
                        aria-expanded={isSidebarOpen}
                        aria-controls="mobile-sidebar"
                    >
                        <HamburgerIcon open={isSidebarOpen} />
                    </button>
                </div>
                <nav className="mt-8 flex flex-col space-y-2 px-6 pb-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {navItems.map((item, idx) => (
                        <div key={item.name}>
                            {item.sublinks ? (
                                <>
                                    <button
                                        className={`w-full flex items-center justify-between text-gray-700 font-semibold text-lg rounded-lg px-4 py-3 transition-colors ${openSidebarIndex === idx ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                                        onClick={() => setOpenSidebarIndex(openSidebarIndex === idx ? null : idx)}
                                        aria-expanded={openSidebarIndex === idx}
                                        aria-controls={`sidebar-sublinks-${idx}`}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronRight className={`ml-2 w-4 h-4 transition-transform ${openSidebarIndex === idx ? 'rotate-90 text-red-600' : 'text-gray-400'}`} />
                                    </button>
                                    <div
                                        id={`sidebar-sublinks-${idx}`}
                                        className={`pl-4 border-l border-gray-100 overflow-hidden transition-all ${openSidebarIndex === idx ? 'max-h-96 py-1' : 'max-h-0 py-0'} duration-300`}
                                        style={{ transitionProperty: 'max-height, padding' }}
                                    >
                                        {item.sublinks.map((sub) => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                className={`block px-3 py-2 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 text-base ${pathname === sub.href ? 'bg-red-100 text-red-600' : ''}`}
                                                onClick={closeSidebar}
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`block text-gray-700 font-semibold text-lg rounded-lg px-4 py-3 transition-colors ${pathname === item.href ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                                    onClick={closeSidebar}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}
                    {/* <a href="tel:5612310250‬"
                        className="w-full mt-6 group hover:cursor-pointer max-h-[40px] h-full px-[20px] py-2 rounded-[62px] flex items-center justify-center bg-[#D52128] text-white text-[15px] font-semibold"
                        onClick={closeSidebar}
                    >
                        <span className='group-hover:scale-[1.1] transition-all duration-300 ease-in-out'>Contact Us</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none" className="pl-2">
                            <path d="M12.3982 0.768483C12.0402 0.410504 11.4598 0.410506 11.1018 0.768488C10.7438 1.12647 10.7438 1.70687 11.1018 2.06485L14.1203 5.08333H1.66667C1.16041 5.08333 0.75 5.49374 0.75 6C0.75 6.50626 1.16041 6.91667 1.66667 6.91667H14.1203L11.1018 9.93516C10.7439 10.2931 10.7439 10.8735 11.1019 11.2315C11.4598 11.5895 12.0402 11.5895 12.3982 11.2315L16.9766 6.65303C16.9935 6.63637 17.0098 6.61905 17.0254 6.60112C17.0873 6.52997 17.1365 6.45154 17.1728 6.36885C17.2221 6.25677 17.2496 6.13294 17.25 6.00273L17.25 6C17.25 5.99717 17.25 5.99434 17.25 5.99152C17.2489 5.87623 17.2266 5.76602 17.1867 5.66463C17.142 5.55068 17.0736 5.44387 16.9815 5.35178L12.3982 0.768483Z" fill="#E5F6FF" />
                        </svg>
                    </a> */}
                </nav>
            </aside>
        </div>
    );
};

export default NavBar;