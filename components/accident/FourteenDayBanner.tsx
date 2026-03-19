"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface FourteenDayBannerProps {
  phoneHref?: string;
  phoneDisplay?: string;
}

export default function FourteenDayBanner({ phoneHref, phoneDisplay }: FourteenDayBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check sessionStorage — hide if previously dismissed
    try {
      if (!sessionStorage.getItem('14day_banner_dismissed')) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('14day_banner_dismissed', '1');
    } catch {}
  };

  if (!visible) return null;

  return (
    <div className="sticky top-0 md:top-24 z-40 w-full bg-[#B91C1C] text-white py-2.5 px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Icon + Text */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 animate-pulse" />
          {/* Full text on md+ */}
          <p className="hidden md:block text-sm md:text-base font-bold leading-tight">
            Florida 14-Day Rule: You must see a doctor within 14 days of your accident to protect up to $10,000 in PIP benefits.
          </p>
          {/* Short text on mobile */}
          <p className="md:hidden text-sm font-bold leading-tight">
            14-Day Rule — Don&apos;t Wait.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {phoneHref ? (
            <a
              href={phoneHref}
              className="ca-pulse-cta inline-flex items-center gap-1 bg-white text-[#B91C1C] font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation whitespace-nowrap"
            >
              Call Now
            </a>
          ) : (
            <a
              href="#accident-form"
              className="ca-pulse-cta inline-flex items-center gap-1 bg-white text-[#B91C1C] font-bold text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation whitespace-nowrap"
            >
              Book Now
            </a>
          )}
          <button
            onClick={dismiss}
            aria-label="Dismiss 14-day rule banner"
            className="p-1 hover:bg-white/20 active:bg-white/30 rounded transition-colors touch-manipulation"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
