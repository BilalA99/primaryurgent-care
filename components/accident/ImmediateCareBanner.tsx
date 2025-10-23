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
    <div className="rounded-lg border border-[color:var(--brand-border)] bg-[color:var(--brand-bg-soft)] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm sm:text-base font-semibold">Need immediate care after a car crash?</p>
          <p className="text-sm text-[color:var(--brand-muted)]">
            Same-day exam, onsite X-ray, and documentation for insurance claims.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="tel:+15612238024"
            onClick={() => click("Banner Call Now")}
            className="inline-flex items-center justify-center rounded-md bg-[#D52128] px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-[#b81b22] focus:outline-none focus:ring-2 focus:ring-[#D52128] touch-manipulation transition-all duration-200"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}
