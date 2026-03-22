import React from 'react';
import { Star, CheckCircle2, Monitor, Shield, Zap, FileText } from 'lucide-react';

const badges = [
  { icon: <Star className="w-4 h-4 text-yellow-400" />, text: "4.9/5 Patient Rating" },
  { icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, text: "Board-Certified Providers" },
  { icon: <Monitor className="w-4 h-4 text-blue-300" />, text: "Onsite X-Ray & Imaging" },
  { icon: <Shield className="w-4 h-4 text-blue-300" />, text: "PIP & Auto Insurance Accepted" },
  { icon: <Zap className="w-4 h-4 text-yellow-300" />, text: "Seen in Under 15 Minutes" },
  { icon: <FileText className="w-4 h-4 text-green-400" />, text: "Documentation Provided Same Day" },
];

const TrustBadges: React.FC = () => {
  return (
    <section className="w-full bg-black text-white py-4 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: 2-column grid | Desktop: single row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3">
          {badges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="flex-shrink-0">{badge.icon}</span>
              <span className="leading-tight">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
