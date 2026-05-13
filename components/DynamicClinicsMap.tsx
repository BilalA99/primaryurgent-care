"use client";

import dynamic from "next/dynamic";

const ClinicsMap = dynamic(() => import("@/components/clinicsmap"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[420px] w-full rounded-2xl bg-gray-100"
      aria-label="Loading clinic map"
    />
  ),
});

export default ClinicsMap;
