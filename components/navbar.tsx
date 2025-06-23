import Image from 'next/image';
import Link from 'next/link';
import Star from "@/components/icons/star";

const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Appointment', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Locations', href: '#' },
];

const NavBar = () => {
    return (
        <div className="bg-gray-100 p-4 font-sans">
            <div className="max-w-screen-xl mx-auto bg-white rounded-xl shadow-sm p-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Image src="/logoheart.png" alt="Logo" width={40} height={40} className="" />
                        <div className="text-red-600 font-bold text-base leading-tight">
                            <span>Primary & Urgent</span>
                            <br />
                            <span>Care Centers</span>
                        </div>
                    </div>

                    <nav>
                        <ul className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className={`text-gray-600 font-medium text-base hover:text-red-500 ${item.name === 'Home' ? 'bg-red-100 text-red-600 px-4 py-2 rounded-lg' : 'px-4 py-2'}`}>
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
    );
};

export default NavBar;