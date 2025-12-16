"use client";

import { Phone, AlertCircle } from "lucide-react";

interface MobileStickyFooterProps {
  phoneHref: string;
  phoneDisplay: string;
}

export default function MobileStickyFooter({ phoneHref, phoneDisplay }: MobileStickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-gradient-to-r from-[#D52128] to-[#b81b22] shadow-2xl border-t-2 border-white/20">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-semibold text-white leading-tight">14-Day Rule Applies</p>
            <p className="text-[10px] text-white/90 leading-tight truncate">Don't lose your PIP benefits</p>
          </div>
        </div>
        <a
          href={phoneHref}
          className="flex items-center gap-2 bg-white text-[#D52128] font-bold px-4 py-2.5 rounded-lg shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 animate-pulse touch-manipulation whitespace-nowrap"
          aria-label={`Call now: ${phoneDisplay}`}
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm">Call Now</span>
        </a>
      </div>
    </div>
  );
}






