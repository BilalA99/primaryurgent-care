import React from 'react';
import { CheckCircle, AlertTriangle, FileText, Users, Clock, Shield } from 'lucide-react';

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  type?: 'success' | 'warning' | 'info';
}

interface AccidentInfoSectionProps {
  title: string;
  items: InfoItem[];
  className?: string;
}

const AccidentInfoSection: React.FC<AccidentInfoSectionProps> = ({
  title,
  items,
  className = ''
}) => {
  const getTypeStyles = (type: string = 'primary') => {
    switch (type) {
      case 'primary':
        return {
          container: 'bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] border-[#2563eb]/20 hover:border-[#2563eb]/40',
          icon: 'text-[#2563eb] bg-[#2563eb]/10',
          title: 'text-[#2563eb]'
        };
      case 'secondary':
        return {
          container: 'bg-gradient-to-br from-[#F0F4FF] to-[#E0E7FF] border-[#6366F1]/20 hover:border-[#6366F1]/40',
          icon: 'text-[#6366F1] bg-[#6366F1]/10',
          title: 'text-[#6366F1]'
        };
      default:
        return {
          container: 'bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] border-[#2563eb]/20 hover:border-[#2563eb]/40',
          icon: 'text-[#2563eb] bg-[#2563eb]/10',
          title: 'text-[#2563eb]'
        };
    }
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-[60px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const styles = getTypeStyles(item.type);
            return (
              <div
                key={index}
                className={`
                  p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] cursor-pointer
                  ${styles.container}
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-semibold mb-2 ${styles.title}`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccidentInfoSection;
