import type { ReactNode } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import AccidentMobileFormReveal from "@/components/accident/AccidentMobileFormReveal";

type Props = {
  title: string;
  kicker?: string;
  subtitle?: ReactNode;
  checklist?: string[];
  banner?: ReactNode;
  form: ReactNode;
  backgroundImage?: string;
  phoneHref?: string;
  phoneDisplay?: string;
};

export default function HeroWithForm({
  title,
  kicker,
  subtitle,
  checklist = [],
  banner,
  form,
  backgroundImage = "/sky-and-ambulance-lights.jpg",
  phoneHref,
  phoneDisplay
}: Props) {
  return (
    <section
      id="accident-form"
      className="relative w-full pt-8 md:pt-20 pb-8 md:pb-12 md:min-h-[85vh] lg:min-h-[90vh] overflow-hidden"
    >
      <Image
        src={backgroundImage}
        alt="Car accident injury clinic"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        quality={85}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px] h-full flex items-center py-4 md:py-8">
        <div className="grid gap-4 md:gap-8 lg:gap-12 md:grid-cols-2 w-full items-center">

          {/* Left Column */}
          <div className="flex flex-col space-y-3 md:space-y-5">
            <div>
              {kicker && (
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/80">
                  {kicker}
                </p>
              )}
              <h1 className="ca-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-2 md:mb-4">
                {title}
              </h1>

              {/* Subtitle — desktop only; declutters mobile so form sits higher */}
              {subtitle && (
                <div className="hidden md:block ca-fade-up ca-stagger-1 mt-2 md:mt-3 text-base md:text-lg text-white/90 leading-relaxed">
                  {subtitle}
                </div>
              )}

              {/* Checklist — desktop only */}
              {checklist.length > 0 && (
                <ul className="hidden md:flex mt-4 md:mt-5 flex-col space-y-2.5 md:space-y-3">
                  {checklist.map((item, i) => (
                    <li key={i} className={`ca-fade-up ca-stagger-${i + 1} flex items-start gap-3`}>
                      <span className="mt-1 inline-flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full bg-[#D52128] text-white">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 md:h-4 md:w-4">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-base md:text-lg text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Phone CTA — desktop only */}
            {phoneHref && (
              <a
                href={phoneHref}
                className="ca-pulse-cta hidden md:inline-flex items-center justify-center gap-3 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg touch-manipulation transition-colors duration-200 md:w-auto"
                aria-label={`Call now: ${phoneDisplay}`}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                {phoneDisplay ? `Call Now: ${phoneDisplay}` : "Call Now"}
              </a>
            )}

            {/* Mobile: mini form card + Call Now (immediately after H1) */}
            <AccidentMobileFormReveal
              phoneHref={phoneHref || "tel:+15613552651"}
              phoneDisplay={phoneDisplay || "561-355-2651"}
            >
              {form}
            </AccidentMobileFormReveal>

            {banner && <div className="mt-2 hidden md:block">{banner}</div>}
          </div>

          {/* Right Column — desktop form card */}
          <div className="hidden md:flex ca-fade-in ca-stagger-2 items-center justify-center md:justify-end">
            <div id="accident-appointment-form" className="rounded-xl border border-white/20 bg-white shadow-2xl p-4 md:p-6 w-full max-w-md scroll-mb-24">
              {form}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
