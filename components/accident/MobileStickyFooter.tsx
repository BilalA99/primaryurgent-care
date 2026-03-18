"use client";

import { Phone, Calendar } from "lucide-react";

interface MobileStickyFooterProps {
  phoneHref: string;
  phoneDisplay: string;
}

export default function MobileStickyFooter({ phoneHref, phoneDisplay }: MobileStickyFooterProps) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white shadow-2xl border-t-2 border-gray-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Micro trust line */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-1 text-center">
        <p className="text-[10px] text-gray-600 font-medium">⚡ Seen in under 15 min · PIP accepted</p>
      </div>

      {/* CTA buttons */}
      <div className="px-3 py-2.5 flex items-center gap-2">
        <a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold py-3 rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          aria-label={`Call now: ${phoneDisplay}`}
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">📞 Call Now</span>
        </a>
        <a
          href="#accident-form"
          className="flex-1 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold py-3 rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          aria-label="Book online"
        >
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">📅 Book Online</span>
        </a>
      </div>
    </div>
  );
}
