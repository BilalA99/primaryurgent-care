import React from 'react';
import { CheckCircle2, Shield, Users } from 'lucide-react';

const TrustBadges: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-4 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start md:items-center text-sm md:text-base">
          <div className="flex items-center gap-2 flex-1">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Board-certified providers with dedicated auto-injury training</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Shield className="w-5 h-5 text-blue-300 flex-shrink-0" />
            <span>Accepted by all major insurers + PIP</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <Users className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <span>Used by 300+ car accident patients monthly</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;





