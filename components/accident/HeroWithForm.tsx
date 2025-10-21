import type { ReactNode } from "react";

type Props = {
  title: string;            // H1 text – render inside the component
  kicker?: string;          // small pretitle above H1 (optional)
  subtitle?: ReactNode;     // short paragraph under H1
  checklist?: string[];     // bullet list shown under subtitle
  banner?: ReactNode;       // "Need immediate care..." banner (component passed in)
  form: ReactNode;          // appointment form ReactNode (passed in)
};

export default function HeroWithForm({
  title,
  kicker,
  subtitle,
  checklist = [],
  banner,
  form
}: Props) {
  return (
    <section className="relative w-full pt-16 pb-2 min-h-[80vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/sky-and-ambulance-lights.jpg)' }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-2 items-end">
        <div>
          {kicker && (
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-[color:var(--brand-muted)]">
              {kicker}
            </p>
          )}
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">{title}</h1>
          {subtitle && <div className="mt-3 text-lg text-white/90">{subtitle}</div>}

          {checklist.length > 0 && (
            <ul className="mt-5 space-y-3">
              {checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-primary)] text-[color:var(--brand-on-primary)]">
                    {/* check icon */}
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-base text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Banner sits directly under the checklist to stay within first fold */}
          {banner && <div className="mt-6">{banner}</div>}
        </div>

        {/* Form column */}
        <div className="rounded-xl border border-[color:var(--brand-border)] bg-[color:var(--brand-elev)] p-3 shadow-sm">
          {form}
        </div>
      </div>
    </section>
  );
}
