"use client";
import Link from "next/link";
import { PRIMARY_PHONE_HREF } from '@/lib/constants/phone';

export default function CompactBooking() {
  const click = (label: string) => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ 
        event: "cta_click", 
        cta_label: label, 
        lead_type: "Car Accident Injury", 
        page_path: window.location.pathname 
      });
    } catch {}
  };

  return (
    <div className="rounded-lg border border-[color:var(--brand-border)] bg-[color:var(--brand-elev)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Link 
          href="/appointment" 
          onClick={() => click("Compact Book Exam")}
          className="inline-flex items-center rounded-md bg-[color:var(--brand-primary)] px-4 py-2 text-sm font-medium text-[color:var(--brand-on-primary)] hover:bg-[color:var(--brand-primary-700)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)]"
        >
          Book Post-Accident Exam
        </Link>
        <a 
          href={PRIMARY_PHONE_HREF} 
          onClick={() => click("Compact Call Now")}
          className="inline-flex items-center rounded-md bg-[#D52128] px-4 py-2 text-sm font-medium text-white hover:bg-[#b81b22] focus:outline-none focus:ring-2 focus:ring-[#D52128]"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
