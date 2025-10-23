// components/icons/UrgentCareVsER.tsx
import * as React from "react";

type Props = {
  size?: number;
  className?: string;
  colors?: {
    outline?: string;
    kitBody?: string;
    kitCross?: string;
    kitShadow?: string;
    stopwatchRing?: string;
    stopwatchFace?: string;
  };
  ariaLabel?: string;
};

const UrgentCareVsER: React.FC<Props> = ({
  size = 62,
  className,
  ariaLabel = "Urgent Care vs ER icon",
  colors,
}) => {
  const c = {
    outline: colors?.outline ?? "#1F2937",
    kitBody: colors?.kitBody ?? "#E9F0F7",
    kitCross: colors?.kitCross ?? "#FF6B6B",
    kitShadow: colors?.kitShadow ?? "#D6E3EF",
    stopwatchRing: colors?.stopwatchRing ?? "#F6C453",
    stopwatchFace: colors?.stopwatchFace ?? "#FFFFFF",
  };

  return (
    <svg
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel || undefined}
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* --- First-Aid Kit Body --- */}
      <rect
        x="28"
        y="52"
        width="160"
        height="128"
        rx="16"
        ry="16"
        fill={c.kitBody}
        stroke={c.outline}
        strokeWidth="8"
      />

       {/* Handle centered to cross (x=108) - mathematically centered */}
       <path
         d="M52 52 v-8 c0-8.837 7.163-16 16-16 h80 c8.837 0 16 7.163 16 16 v8"
         fill="none"
         stroke={c.outline}
         strokeWidth="8"
         strokeLinecap="round"
       />

      {/* Subtle bottom lip */}
      <path
        d="M36 152 H188"
        stroke={c.kitShadow}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* --- Centered Cross --- */}
      <g transform="translate(68,76)">
        <rect
          x="0"
          y="28"
          width="80"
          height="28"
          rx="5"
          fill={c.kitCross}
          stroke={c.outline}
          strokeWidth="5"
        />
        <rect
          x="26"
          y="0"
          width="28"
          height="80"
          rx="5"
          fill={c.kitCross}
          stroke={c.outline}
          strokeWidth="5"
        />
      </g>

      {/* --- Stopwatch --- */}
      <g transform="translate(150,138)">
        <circle
          cx="44"
          cy="52"
          r="44"
          fill={c.stopwatchFace}
          stroke={c.stopwatchRing}
          strokeWidth="12"
        />
        <circle
          cx="44"
          cy="52"
          r="44"
          fill="none"
          stroke={c.outline}
          strokeWidth="8"
        />
        <rect
          x="36"
          y="-2"
          width="16"
          height="12"
          rx="3"
          fill={c.stopwatchFace}
          stroke={c.outline}
          strokeWidth="6"
        />
        <path
          d="M44 -14 c7 0 12 5 12 12"
          fill="none"
          stroke={c.outline}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M44,52 L44,8 A44,44 0 0,1 84,52 Z"
          fill={c.kitCross}
          opacity="0.95"
        />
        <line
          x1="44"
          y1="52"
          x2="44"
          y2="22"
          stroke={c.outline}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="44"
          y1="52"
          x2="66"
          y2="52"
          stroke={c.outline}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="44" cy="52" r="5" fill={c.outline} />
      </g>
    </svg>
  );
};

export default UrgentCareVsER;
