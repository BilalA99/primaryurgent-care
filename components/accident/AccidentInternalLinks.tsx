import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, FileText, Stethoscope, Shield, Clock, Calendar } from 'lucide-react';

const AccidentInternalLinks: React.FC = () => {
  const links = [
    {
      title: 'Book a Car Accident Exam',
      href: '/appointment',
      icon: <Calendar className="w-6 h-6" />,
      description: 'Schedule same-day car accident exam'
    },
    {
      title: 'Car Accident Urgent Care Exam',
      href: '/car-accident-injury-clinic',
      icon: <Stethoscope className="w-6 h-6" />,
      description: 'Same-day car accident urgent care exam and PIP documentation'
    },
    {
      title: 'Royal Palm Beach',
      href: '/car-accident/royal-palm-beach',
      icon: <MapPin className="w-6 h-6" />,
      description: 'Car accident doctor in Royal Palm Beach'
    },
    {
      title: 'Lake Worth',
      href: '/car-accident/lake-worth',
      icon: <MapPin className="w-6 h-6" />,
      description: 'Car accident doctor in Lake Worth'
    },
    {
      title: 'Palm Springs',
      href: '/car-accident/palm-springs',
      icon: <MapPin className="w-6 h-6" />,
      description: 'Car accident doctor in Palm Springs'
    },
    {
      title: 'Lantana / Jog Rd',
      href: '/car-accident/lantana',
      icon: <MapPin className="w-6 h-6" />,
      description: 'Car accident doctor in Lantana / Jog Rd area (Lake Worth Beach)'
    },
    {
      title: 'Whiplash Treatment',
      href: '/car-accident/whiplash',
      icon: <FileText className="w-6 h-6" />,
      description: 'Neck pain and whiplash after a crash'
    },
    {
      title: 'Back & Neck Pain',
      href: '/car-accident/back-neck-pain',
      icon: <Shield className="w-6 h-6" />,
      description: 'Spinal injury evaluation and treatment'
    },
    {
      title: 'PIP Documentation',
      href: '/car-accident/documentation-pip',
      icon: <FileText className="w-6 h-6" />,
      description: 'Medical records and PIP exam documentation'
    },
    {
      title: 'Urgent Care vs ER',
      href: '/car-accident/urgent-care-vs-er',
      icon: <Clock className="w-6 h-6" />,
      description: 'When to choose urgent care or emergency room'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Car Accident Care Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore all our car accident services, locations, and information pages
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-5 border-2 border-[#2563eb]/20 hover:border-[#2563eb]/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2563eb]/10 rounded-lg flex items-center justify-center text-[#2563eb]">
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#2563eb] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {link.description}
                  </p>
                  <div className="flex items-center text-[#2563eb] text-sm font-medium">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccidentInternalLinks;






