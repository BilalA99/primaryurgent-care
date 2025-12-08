import type { ReactNode } from "react";

type Props = {
  title: string;            // H1 text – render inside the component
  kicker?: string;          // small pretitle above H1 (optional)
  subtitle?: ReactNode;     // short paragraph under H1
  checklist?: string[];     // bullet list shown under subtitle
  banner?: ReactNode;       // "Need immediate care..." banner (component passed in)
  form: ReactNode;          // appointment form ReactNode (passed in)
  backgroundImage?: string; // custom background image (optional)
};

export default function HeroWithForm({
  title,
  kicker,
  subtitle,
  checklist = [],
  banner,
  form,
  backgroundImage = "/sky-and-ambulance-lights.jpg"
}: Props) {
  return (
    <section 
      className="relative w-full pt-24 md:pt-20 pb-12 min-h-[85vh] lg:min-h-[90vh] bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center center'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px] h-full flex items-center py-8">
        <div className="grid gap-6 md:gap-8 lg:gap-12 md:grid-cols-2 w-full items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-6">
            <div>
              {kicker && (
                <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[color:var(--brand-muted)]">
                  {kicker}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4">{title}</h1>
              {subtitle && <div className="mt-3 text-base md:text-lg text-white/90 leading-relaxed">{subtitle}</div>}

              {checklist.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {checklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-primary)] text-[color:var(--brand-on-primary)]">
                        {/* check icon */}
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

            {/* Banner positioned prominently in top fold */}
            {banner && <div className="mt-4">{banner}</div>}
          </div>

          {/* Right Column - Form */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="rounded-xl border border-[color:var(--brand-border)] bg-[color:var(--brand-elev)] p-4 md:p-6 shadow-lg w-full max-w-md">
              {form}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
