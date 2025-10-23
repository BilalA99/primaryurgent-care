import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Clock, Shield } from 'lucide-react';

interface AccidentCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  features?: string[];
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const AccidentCard: React.FC<AccidentCardProps> = ({
  title,
  description,
  href,
  icon,
  features = [],
  variant = 'primary',
  className = ''
}) => {
  const variantStyles = {
    primary: 'bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] border-[#2563eb]/20 hover:border-[#2563eb]/40',
    secondary: 'bg-gradient-to-br from-[#FDF4F4] to-[#FEE2E2] border-[#D52128]/20 hover:border-[#D52128]/40',
    accent: 'bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-[#16A34A]/20 hover:border-[#16A34A]/40'
  };

  return (
    <Link href={href} className={`group block ${className}`}>
      <div className={`
        relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] h-full touch-manipulation w-full
        ${variantStyles[variant]}
      `}>
        {/* Icon */}
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-white/80 shadow-sm">
            {icon}
          </div>
        )}
        
        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#2563eb] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
          
          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight className="w-5 h-5 text-[#2563eb]" />
        </div>
      </div>
    </Link>
  );
};

export default AccidentCard;
