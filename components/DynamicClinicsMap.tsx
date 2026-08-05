"use client";

import dynamic from "next/dynamic";
import { MapPin, ExternalLink } from "lucide-react";
import { useConsent } from "@/components/ConsentProvider";
import { PRIMARY_PHONE_HREF, PRIMARY_PHONE_DISPLAY } from "@/lib/constants/phone";

const ClinicsMap = dynamic(() => import("@/components/clinicsmap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[420px] w-full rounded-2xl bg-gray-100"
      aria-label="Loading clinic map"
    />
  ),
});

interface StartingClinic {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  link?: string;
}

// Google Maps is a third-party embed gated behind Functional consent. When
// declined, we still surface the address, directions link, and phone number
// so location-page conversions are never blocked.
export default function DynamicClinicsMap({
  startingClinic,
  zoom,
}: {
  startingClinic?: StartingClinic;
  zoom?: number;
}) {
  const { hasConsent, openPreferences } = useConsent();

  if (!hasConsent("functional")) {
    const directionsHref =
      startingClinic?.link ||
      (startingClinic
        ? `https://www.google.com/maps/search/?api=1&query=${startingClinic.lat},${startingClinic.lng}`
        : "https://www.google.com/maps/search/?api=1&query=Primary+%26+Urgent+Care+Centers+Palm+Beach+County");

    return (
      <div className="h-[420px] w-full rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-3 text-center p-6">
        <MapPin className="w-8 h-8 text-gray-400" />
        <div>
          {startingClinic?.name && (
            <p className="font-semibold text-gray-800">{startingClinic.name}</p>
          )}
          {startingClinic?.address && (
            <p className="text-sm text-gray-500">{startingClinic.address}</p>
          )}
        </div>
        <p className="text-xs text-gray-500 max-w-xs">
          The interactive map requires functional cookies. Enable them in Cookie
          Preferences, or get directions below.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#174ea6] rounded-lg px-4 py-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Get Directions
          </a>
          <button
            type="button"
            onClick={openPreferences}
            className="text-sm font-semibold text-gray-700 underline hover:text-[#D52128]"
          >
            Enable Map
          </button>
        </div>
        <a
          href={PRIMARY_PHONE_HREF}
          className="text-sm font-semibold text-[#D52128] hover:underline"
        >
          Call {PRIMARY_PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  return <ClinicsMap startingClinic={startingClinic} zoom={zoom} />;
}
