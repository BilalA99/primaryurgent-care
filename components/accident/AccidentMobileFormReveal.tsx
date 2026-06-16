"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Phone, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatUSPhoneNumber,
  hasAtMostTenPhoneDigits,
} from "@/lib/validation/phone";

type DataLayerEvent = Record<string, string | number | boolean | null | undefined>;

function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

interface AccidentMobileFormRevealProps {
  phoneHref: string;
  phoneDisplay: string;
  children: ReactNode; // full CompactAccidentForm rendered server-side
}

export default function AccidentMobileFormReveal({
  phoneHref,
  phoneDisplay,
  children,
}: AccidentMobileFormRevealProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openDialog = useCallback(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const slug = path.split("/").filter(Boolean).pop() || "";
    pushDataLayerEvent({
      event: "car_accident_mobile_hero_form_open",
      page_type: "car_accident_location",
      location_slug: slug,
      form_type: "same_day_accident_exam",
      cta_text: "Request Exam",
      cta_position: "mobile_hero_top_fold",
      page_path: path,
    });
    setIsDialogOpen(true);
  }, []);

  const handleCallClick = useCallback(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const slug = path.split("/").filter(Boolean).pop() || "";
    pushDataLayerEvent({
      event: "car_accident_mobile_hero_call_click",
      page_type: "car_accident_location",
      location_slug: slug,
      phone_number: phoneDisplay,
      cta_text: "Call Now",
      cta_position: "mobile_hero_top_fold",
      page_path: path,
    });
  }, [phoneDisplay]);

  // Sticky footer "Request Exam" dispatches this to open the dialog
  useEffect(() => {
    const handler = () => setIsDialogOpen(true);
    window.addEventListener("primaryuc:expand-accident-form", handler);
    return () => window.removeEventListener("primaryuc:expand-accident-form", handler);
  }, []);

  return (
    <>
      {/* ── Mobile-only hero CTA block ── */}
      <div className="md:hidden mt-4 space-y-3">

        {/* Mini form card */}
        <div className="bg-white rounded-2xl p-5 shadow-2xl">
          <p className="text-gray-900 font-bold text-base leading-tight mb-0.5">
            Hurt in an accident?
          </p>
          <p className="text-gray-500 text-xs mb-3">
            Same-day exams &middot; PIP accepted &middot; No referral needed
          </p>

          <div className="space-y-2.5 mb-3">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="tel"
                inputMode="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  if (hasAtMostTenPhoneDigits(e.target.value)) {
                    setPhone(formatUSPhoneNumber(e.target.value));
                  }
                }}
                autoComplete="tel"
                className="w-full h-11 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={openDialog}
            className="w-full h-12 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold text-base rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          >
            Request Same-Day Exam &rarr;
          </button>

          <p className="text-[11px] text-gray-400 text-center mt-2">
            Same-day accident exams &middot; PIP accepted &middot; No obligation
          </p>
        </div>

        {/* Call Now — below the card */}
        <a
          href={phoneHref}
          onClick={handleCallClick}
          className="flex items-center justify-center gap-3 w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          style={{ minHeight: "52px" }}
          aria-label={`Call now: ${phoneDisplay}`}
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          Call Now: {phoneDisplay}
        </a>
      </div>

      {/* ── Full exam form dialog ── */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[92dvh] overflow-y-auto w-full max-w-[calc(100%-1.5rem)] sm:max-w-lg p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Request a Same-Day Accident Exam
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-6 pt-4">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
