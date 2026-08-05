"use client";

import { useState, useCallback, useEffect } from "react";
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

type DataLayerEvent = Record<
  string,
  string | number | boolean | null | undefined
>;

function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export default function HomepageMobileHeroForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [accidentType, setAccidentType] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  const openDialog = useCallback(() => {
    const isDesktop = window.matchMedia("(min-width: 1280px)").matches;
    pushDataLayerEvent({
      event: isDesktop ? "desktop_hero_form_open" : "mobile_hero_form_open",
      page_type: "home",
      form_type: "appointment",
      cta_text: "Request Appointment",
      cta_position: isDesktop
        ? "desktop_hero_top_fold"
        : "mobile_hero_top_fold",
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

  return (
    <>
      <div
        data-testid="homepage-hero-mini-form"
        data-hydrated={isHydrated ? "true" : "false"}
        className="w-full xl:max-w-xl xl:ml-auto space-y-3"
      >
        {/* Mini form card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl">
          <p className="text-gray-900 font-bold text-lg sm:text-xl leading-tight mb-1">
            Need to be seen today?
          </p>
          <p className="text-gray-500 text-sm mb-4 sm:mb-5">
            Same-day appointments available — walk-ins welcome.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <label htmlFor="hero-first-name" className="sr-only">
                First name
              </label>
              <input
                id="hero-first-name"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                autoComplete="given-name"
                className="w-full h-12 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <label htmlFor="hero-last-name" className="sr-only">
                Last name
              </label>
              <input
                id="hero-last-name"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                autoComplete="family-name"
                className="w-full h-12 pl-9 pr-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <label htmlFor="hero-phone" className="sr-only">
                Phone number
              </label>
              <input
                id="hero-phone"
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
            <div className="relative">
              <label htmlFor="hero-accident-type" className="sr-only">
                Type of accident
              </label>
              <select
                id="hero-accident-type"
                value={accidentType}
                onChange={(event) => setAccidentType(event.target.value)}
                className="w-full h-12 px-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition"
              >
                <option value="">Type of accident (optional)</option>
                <option value="Workplace Accident">Workplace Accident</option>
                <option value="Car Accident">Car Accident</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Truck Accident">Truck Accident</option>
                <option value="Motorcycle Accident">Motorcycle Accident</option>
                <option value="Slip and Fall">Slip and Fall</option>
                <option value="Pedestrian Accident">Pedestrian Accident</option>
                <option value="No Accident">No Accident</option>
                <option value="Other">Other</option>
              </select>
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
            Same-day appointments &middot; Walk-ins welcome &middot; No
            obligation
          </p>
        </div>

        {/* Mobile/tablet call CTA; desktop retains the header call CTA. */}
        <a
          href="tel:+15613552651"
          onClick={handleCallClick}
          className="xl:hidden flex items-center justify-center gap-3 w-full bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-bold text-base rounded-xl shadow-lg touch-manipulation transition-colors duration-200"
          style={{ minHeight: "52px" }}
          aria-label="Call now: 561-355-2651"
        >
          <Phone className="w-5 h-5 flex-shrink-0" />
          Call Now: 561-355-2651
        </a>
      </div>

      {/* ── Full appointment form dialog ── */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[92dvh] overflow-y-auto w-full max-w-[calc(100%-1.5rem)] sm:max-w-2xl p-0 gap-0">
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
              initialFirstName={firstName}
              initialLastName={lastName}
              initialPhone={phone}
              initialType={accidentType}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
