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
    <div className="rounded-lg border border-[color:var(--brand-border)] bg-[color:var(--brand-bg-soft)] p-2">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-gray-900">Need immediate care after a car crash?</p>
          <p className="text-sm text-gray-700">
            Same-day exam, onsite X-ray, and documentation for insurance claims.
          </p>
        </div>
        <div className="flex gap-1">
          <a
            href="tel:+15612238024"
            onClick={() => click("Banner Call Now")}
            className="flex items-center justify-center rounded-md bg-[#D52128] px-5 py-3 text-base font-medium text-white hover:bg-[#b81b22] focus:outline-none focus:ring-2 focus:ring-[#D52128] text-center"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
