"use client";

import { AlertTriangle } from "lucide-react";

export default function FourteenDayBanner() {
  return (
    <div className="w-full bg-[#D52128] text-white py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 animate-pulse" />
          <p className="text-sm sm:text-base md:text-lg font-bold text-center leading-tight">
            <span className="hidden sm:inline">⚠️ </span>
            Florida Law Warning: You must see a doctor within 14 days of your accident to claim your $10,000 PIP benefits. Don't wait.
          </p>
        </div>
      </div>
    </div>
  );
}






