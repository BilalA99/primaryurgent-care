"use client";

import Link from "next/link";
import CallButton from "@/components/CallButton";
import Phone from "@/components/icons/phone";
import Mappin from "@/components/icons/mappin";
import { PRIMARY_PHONE_HREF } from "@/lib/constants/phone";

type Props = {
  citySlug?: string;
  phoneHref?: string;
  directionsHref?: string;
  variant?: "primary" | "subtle";
};

export default function AccidentCTA({
  citySlug,
  phoneHref = PRIMARY_PHONE_HREF,
  directionsHref,
  variant = "primary"
}: Props) {
  const onClick = (label: string) => {
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'cta_click',
        cta_label: label,
        page_path: window.location.pathname,
        lead_type: 'Car Accident Injury'
      });
    } catch {}
  };

  return (
    <div className={`flex flex-wrap gap-3 ${variant === "subtle" ? "mt-4" : "mt-8"}`}>
      <CallButton 
        label="Call for Immediate Care"
        href={phoneHref}
        className="bg-[#D52128] text-white font-medium px-5 py-3 rounded-lg flex items-center justify-center text-base hover:bg-[#b81b22] transition gap-2"
      >
        <Phone fill="white" /> Call Now
      </CallButton>

      {directionsHref && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener"
          className="border border-gray-400 text-black font-medium px-5 py-3 rounded-lg flex items-center justify-center text-base bg-white hover:bg-gray-100 transition gap-2"
          aria-label="Get directions to the clinic"
          onClick={() => onClick("Get Directions")}
        >
          <Mappin /> Get Directions
        </a>
      )}
    </div>
  );
}
