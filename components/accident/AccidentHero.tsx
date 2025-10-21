import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';
import AccidentCTA from './AccidentCTA';
import AccidentAppointmentForm from './AccidentAppointmentForm';

interface AccidentHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: string[];
  citySlug?: string;
  phoneHref?: string;
  directionsHref?: string;
  showFormInHero?: boolean;
  formTitle?: string;
}

const AccidentHero: React.FC<AccidentHeroProps> = ({
  title,
  subtitle,
  description,
  imageSrc = '/car-accident.jpg',
  imageAlt = 'Car Accident Care',
  features = [
    'Same-day evaluation & treatment',
    'On-site X-ray & imaging',
    'PIP documentation & billing',
    'Insurance coordination',
    'Attorney referrals available'
  ],
  citySlug,
  phoneHref,
  directionsHref,
  showFormInHero = false,
  formTitle = "Book Your Car Accident Exam"
}) => {
  return (
    <section className="relative w-full min-h-[80vh] bg-gradient-to-br from-[#F2F6FC] via-white to-[#FDF4F4] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-16 h-16">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2563eb]">
            <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#D52128]">
            <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute top-60 left-1/4 w-8 h-8">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#2563eb]">
            <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-[60px] py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-[#2563eb]/10 text-[#2563eb] rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              {subtitle}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {description}
            </p>

            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <AccidentCTA 
                citySlug={citySlug}
                phoneHref={phoneHref}
                directionsHref={directionsHref}
              />
            </div>
          </div>

          {/* Right Content - Form or Image */}
          <div className="relative">
            {showFormInHero ? (
              <AccidentAppointmentForm 
                title={formTitle}
                noWrapper={true}
                showHeader={false}
                className="w-full"
              />
            ) : (
              <>
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#2563eb]" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">&lt; 15 min wait</div>
                      <div className="text-xs text-gray-500">Average</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#D52128]" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">4 Locations</div>
                      <div className="text-xs text-gray-500">Palm Beach County</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccidentHero;
