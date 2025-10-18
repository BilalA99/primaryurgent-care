'use client';
import Image from 'next/image';
import Link from 'next/link';
import Star from "@/components/icons/star";
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Globe } from 'lucide-react';
import Phone from './icons/phone';
import BookAnAppointmentPopup from './BookAnAppointmentPopup';
import { trackEvent } from '../lib/gtag';
import CallButton from './CallButton';
import { parseCookies, setCookie } from 'nookies';

const COOKIE_NAME = 'googtrans';

interface LanguageDescriptor {
    name: string;
    title: string;
}

declare global {
    interface Window {
        __GOOGLE_TRANSLATION_CONFIG__: {
            languages: LanguageDescriptor[];
            defaultLanguage: string;
        };
    }
}

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
    },
    { name: 'Blogs', href: '/blog' }
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
    const [currentLanguage, setCurrentLanguage] = useState<string>();
    const [languageConfig, setLanguageConfig] = useState<any>();
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const languageDropdownRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => setSidebarOpen((v) => !v);
    const closeSidebar = () => setSidebarOpen(false);

    // Function to clear conflicting cookies
    const clearConflictingCookies = () => {
        if (typeof window !== 'undefined') {
            const cookies = document.cookie.split(';');
            const googtransCookies = cookies.filter(cookie =>
                cookie.trim().startsWith('googtrans=')
            );

            // If there are multiple googtrans cookies, clear them all
            if (googtransCookies.length > 1) {
                const domains = [
                    '', // current domain
                    '.primaryuc.com',
                    'primaryuc.com',
                    '.www.primaryuc.com',
                    'www.primaryuc.com'
                ];

                domains.forEach(domain => {
                    ['/', '/auto', '/en', '/es', '/fr', '/pt', '/ur', '/pa'].forEach(path => {
                        document.cookie = `googtrans=; domain=${domain}; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
                    });
                });

                console.log('Cleared conflicting googtrans cookies');
            }
        }
    };

    // Close language dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Initialize translation engine
    useEffect(() => {
        // Clear conflicting cookies first
        clearConflictingCookies();

        const initializeLanguage = () => {
            const cookies = parseCookies();
            const existingLanguageCookieValue = cookies[COOKIE_NAME];
            let languageValue;

            if (existingLanguageCookieValue) {
                const sp = existingLanguageCookieValue.split('/');
                if (sp.length > 2) {
                    languageValue = sp[2];
                }
            }

            // Use window instead of global for browser environment
            if (typeof window !== 'undefined' && window.__GOOGLE_TRANSLATION_CONFIG__) {
                if (!languageValue) {
                    languageValue = window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
                }
                setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);
            }

            if (languageValue) {
                setCurrentLanguage(languageValue);
            }
        };

        // Try to initialize immediately
        initializeLanguage();

        // If config is not available, wait for it to load
        if (typeof window !== 'undefined' && !window.__GOOGLE_TRANSLATION_CONFIG__) {
            const checkConfig = setInterval(() => {
                if (window.__GOOGLE_TRANSLATION_CONFIG__) {
                    clearInterval(checkConfig);
                    initializeLanguage();
                }
            }, 100);

            // Clear interval after 5 seconds to prevent infinite checking
            setTimeout(() => clearInterval(checkConfig), 5000);
        }
    }, []);

    const switchLanguage = (lang: string) => {
        // Clear all existing googtrans cookies first
        if (typeof window !== 'undefined') {
            // Clear cookies for different domain variations
            const domains = [
                '', // current domain
                '.primaryuc.com',
                'primaryuc.com',
                '.www.primaryuc.com',
                'www.primaryuc.com'
            ];

            domains.forEach(domain => {
                // Clear with different path variations
                ['/', '/auto', '/en', '/es', '/fr', '/pt', '/ur', '/pa'].forEach(path => {
                    document.cookie = `googtrans=; domain=${domain}; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
                });
            });
        }

        // Set new cookie with proper domain and path
        setCookie(null, COOKIE_NAME, '/auto/' + lang, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            sameSite: 'lax'
        });

        // Force reload to apply translation
        window.location.reload();
    };

    const getCurrentLanguageTitle = () => {
        if (!languageConfig || !currentLanguage) return 'EN';
        const lang = languageConfig.languages.find((l: LanguageDescriptor) => l.name === currentLanguage);
        return lang ? lang.title : 'EN';
    };

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
                                        <Link 
                                            href={item.href} 
                                            className={`text-gray-600 font-medium text-base hover:text-red-500 ${pathname === item.href ? 'bg-red-100 text-red-600 px-4 py-2 rounded-lg' : 'px-4 py-2'}`}
                                            onClick={() => {
                                                if (item.name === 'Blogs') {
                                                    window?.dataLayer?.push({ 
                                                        event: 'nav_click', 
                                                        link_text: 'Blogs', 
                                                        link_url: '/blog' 
                                                    });
                                                }
                                            }}
                                        >
                                            {item.name}
                                        </Link>
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
                        <CallButton label="navbar" className="hidden xl:flex hover:cursor-pointer items-center flex-row space-x-4 bg-red-600 text-white px-[16px] py-[10px] rounded-xl font-semibold text-base">
                            <Phone fill="white" />
                            <span>561-223-8024</span>
                        </CallButton>

                        {/* Desktop Language Switcher */}
                        {languageConfig && (
                            <div className="hidden xl:block relative" ref={languageDropdownRef}>
                                <button
                                    onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                                    className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                                >
                                    <Globe className="w-4 h-4 text-[#D52128]" />
                                    <span className="font-medium">{getCurrentLanguageTitle()}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isLanguageDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 min-w-[160px] bg-white shadow-lg rounded-xl border border-gray-100 z-20">
                                        {languageConfig.languages.map((lang: LanguageDescriptor) => (
                                            <button
                                                key={lang.name}
                                                onClick={() => {
                                                    switchLanguage(lang.name);
                                                    setIsLanguageDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 transition-colors first:rounded-t-xl last:rounded-b-xl ${currentLanguage === lang.name ? 'bg-red-100 text-red-600' : 'text-gray-700'
                                                    }`}
                                            >
                                                {lang.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {/* <BookAnAppointmentPopup>
                            <button className="hidden xl:flex hover:cursor-pointer items-center flex-row space-x-4 bg-red-600 text-white px-[16px] py-[10px] rounded-xl font-semibold text-base">
                                Contact Us
                            </button>
                        </BookAnAppointmentPopup> */}

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
                                    onClick={() => {
                                        closeSidebar();
                                        if (item.name === 'Blogs') {
                                            window?.dataLayer?.push({ 
                                                event: 'nav_click', 
                                                link_text: 'Blogs', 
                                                link_url: '/blog' 
                                            });
                                        }
                                    }}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    ))}

                    {/* Mobile Language Switcher */}
                    {languageConfig && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <Globe className="w-5 h-5 text-[#D52128]" />
                                <span className="text-gray-700 font-semibold text-lg">Language</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {languageConfig.languages.map((lang: LanguageDescriptor) => (
                                    <button
                                        key={lang.name}
                                        onClick={() => {
                                            switchLanguage(lang.name);
                                            closeSidebar();
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentLanguage === lang.name
                                            ? 'bg-red-100 text-red-600'
                                            : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                                            }`}
                                    >
                                        {lang.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </nav>
            </aside>
        </div>
    );
};

export default NavBar;