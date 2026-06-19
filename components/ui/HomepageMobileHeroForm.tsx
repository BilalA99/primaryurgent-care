"use client";

import { useState, useCallback } from "react";
import { Phone, User } from "lucide-react";
import BookAppointmentForm from "@/components/ui/BookAppointmentForm";
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

export default function HomepageMobileHeroForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openDialog = useCallback(() => {
    pushDataLayerEvent({
      event: "mobile_hero_form_open",
      page_type: "home",
      form_type: "appointment",
      cta_text: "Request Appointment",
      cta_position: "mobile_hero_top_fold",
      page_path: window.location.pathname,
    });
    setIsDialogOpen(true);
  }, []);

  const handleCallClick = useCallback(() => {
    pushDataLayerEvent({
      event: "mobile_hero_call_click",
      page_type: "home",
      phone_number: "561-355-2651",
      cta_text: "Call Now: 561-355-2651",
      cta_position: "mobile_hero_top_fold",
      page_path: window.location.pathname,
    });
  }, []);

  // Split "First Last" into parts for pre-population
  const nameParts = name.trim().split(/\s+/);
  const initialFirstName = nameParts[0] ?? "";
  const initialLastName = nameParts.slice(1).join(" ");

  return (
    <>
      {/* ── Mobile / tablet hero panel (hidden at xl+ where sidebar form renders) ── */}
      <div className="xl:hidden w-full space-y-3">

        {/* Mini form card */}
        <div className="bg-white rounded-2xl p-5 shadow-2xl">
          <p className="text-gray-900 font-bold text-lg leading-tight mb-0.5">
            Need to be seen today?
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Same-day appointments available — walk-ins welcome.
          </p>

          <div className="space-y-3 mb-4">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="w-full h-12 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
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
                className="w-full h-12 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={openDialog}
            className="w-full h-12 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold text-base rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          >
            Request Appointment &rarr;
          </button>

          <p className="text-[11px] text-gray-400 text-center mt-2.5">
            Same-day appointments &middot; Walk-ins welcome &middot; No obligation
          </p>
        </div>

        {/* Call Now — below the card */}
        <a
          href="tel:+15613552651"
          onClick={handleCallClick}
          className="flex items-center justify-center gap-3 w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          style={{ minHeight: "52px" }}
          aria-label="Call now: 561-355-2651"
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          Call Now: 561-355-2651
        </a>
      </div>

      {/* ── Desktop xl+: full sidebar form (unchanged) ── */}
      <div className="hidden xl:block w-full h-full">
        <BookAppointmentForm
          title="Request an appointment"
          bgColor="backdrop-blur-3xl lg:p-8 p-4 rounded-2xl"
          textColor="text-white"
        />
      </div>

      {/* ── Full appointment form dialog ── */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[92dvh] overflow-y-auto w-full max-w-[calc(100%-1.5rem)] sm:max-w-lg p-0 gap-0">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              Request an Appointment
            </DialogTitle>
          </DialogHeader>
          <div className="px-2 pb-6">
            <BookAppointmentForm
              title=""
              bgColor="bg-transparent p-4"
              textColor="text-gray-900"
              initialFirstName={initialFirstName}
              initialLastName={initialLastName}
              initialPhone={phone}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
