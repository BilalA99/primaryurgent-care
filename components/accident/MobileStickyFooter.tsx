"use client";

import type { MouseEvent } from "react";
import { Phone, Calendar } from "lucide-react";

interface MobileStickyFooterProps {
  phoneHref: string;
  phoneDisplay: string;
}

export default function MobileStickyFooter({ phoneHref, phoneDisplay }: MobileStickyFooterProps) {
  const scrollToForm = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const form = document.getElementById("accident-appointment-form");
    if (!form) {
      document.getElementById("accident-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const stickyHeight = event.currentTarget.closest("[data-mobile-sticky-footer]")?.getBoundingClientRect().height || 88;
    const formBottom = form.getBoundingClientRect().bottom + window.scrollY;
    const targetY = Math.max(0, formBottom - window.innerHeight + stickyHeight + 16);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <div
      data-mobile-sticky-footer
      className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white shadow-2xl border-t-2 border-gray-200"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Micro trust line */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-1 text-center">
        <p className="text-[10px] text-gray-600 font-medium">Same-day accident exams · PIP accepted</p>
      </div>

      {/* CTA buttons */}
      <div className="px-3 py-2.5 flex items-center gap-2">
        <a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold py-3 rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          aria-label={`Call now: ${phoneDisplay}`}
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Call Now</span>
        </a>
        <a
          href="#accident-appointment-form"
          onClick={scrollToForm}
          className="flex-1 flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold py-3 rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          aria-label="Request same-day accident exam"
        >
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm">Request Exam</span>
        </a>
      </div>
    </div>
  );
}
