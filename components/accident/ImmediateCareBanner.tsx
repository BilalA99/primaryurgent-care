"use client";

export default function ImmediateCareBanner() {
  const click = (label: string) => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: "cta_click",
        cta_label: label,
        lead_type: "Car Accident Injury",
        page_path: window.location.pathname,
      });
    } catch {}
  };

  return (
    <div className="rounded-xl border-2 border-white/30 bg-white/95 backdrop-blur-md p-5 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">Need immediate care after a car crash?</p>
          <p className="text-sm sm:text-base text-gray-700">
            Same-day exam, onsite X-ray, and documentation for insurance claims.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="tel:+15612238024"
            onClick={() => click("Banner Call Now")}
            className="inline-flex items-center justify-center rounded-lg bg-[#D52128] px-6 py-3 text-base sm:text-lg font-semibold text-white hover:bg-[#b81b22] focus:outline-none focus:ring-2 focus:ring-[#D52128] touch-manipulation transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
