import type { ReactNode } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";

type Props = {
  title: string;            // H1 text – render inside the component
  kicker?: string;          // small pretitle above H1 (optional)
  subtitle?: ReactNode;     // short paragraph under H1
  checklist?: string[];     // bullet list shown under subtitle
  banner?: ReactNode;       // "Need immediate care..." banner (component passed in)
  form: ReactNode;          // appointment form ReactNode (passed in)
  backgroundImage?: string; // custom background image (optional)
  phoneHref?: string;       // tel: link for the hero phone CTA button
  phoneDisplay?: string;    // display text for phone CTA
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
      className="relative w-full pt-24 md:pt-20 pb-12 min-h-[85vh] lg:min-h-[90vh] overflow-hidden"
    >
      {/* Background image via Next.js Image for LCP optimization */}
      <Image
        src={backgroundImage}
        alt="Car accident injury clinic"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        quality={85}
      />

      {/* Dark gradient overlay — bottom-heavy for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px] h-full flex items-center py-8">
        <div className="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-2 w-full items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-5">
            <div>
              {kicker && (
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-white/80">
                  {kicker}
                </p>
              )}
              <h1 className="ca-fade-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">
                {title}
              </h1>
              {subtitle && (
                <div className="ca-fade-up ca-stagger-1 mt-3 text-base md:text-lg text-white/90 leading-relaxed">
                  {subtitle}
                </div>
              )}

              {checklist.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {checklist.map((item, i) => (
                    <li
                      key={i}
                      className={`ca-fade-up ca-stagger-${i + 1} flex items-start gap-3`}
                    >
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

            {/* Prominent phone CTA — large red button */}
            {phoneHref && (
              <a
                href={phoneHref}
                className="ca-pulse-cta inline-flex items-center justify-center gap-3 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg touch-manipulation transition-colors duration-200 w-full md:w-auto"
                aria-label={`Call now: ${phoneDisplay}`}
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                {phoneDisplay ? `Call Now: ${phoneDisplay}` : "Call Now"}
              </a>
            )}

            {/* Banner positioned prominently in top fold */}
            {banner && <div className="mt-2">{banner}</div>}
          </div>

          {/* Right Column - Form */}
          <div className="ca-fade-in ca-stagger-2 flex items-center justify-center md:justify-end">
            <div className="rounded-xl border border-white/20 bg-white shadow-2xl p-4 md:p-6 w-full max-w-md">
              {form}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
