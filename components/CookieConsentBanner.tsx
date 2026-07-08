'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useConsent } from './ConsentProvider';

export default function CookieConsentBanner() {
  const { isBannerVisible, isPreferencesOpen, acceptAll, rejectAll, openPreferences } = useConsent();
  const pathname = usePathname();
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    if (!isBannerVisible) return;

    const measure = () => {
      const stickyFooter = document.querySelector<HTMLElement>('[data-mobile-sticky-footer]');
      setBottomOffset(stickyFooter ? stickyFooter.getBoundingClientRect().height : 0);
    };

    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);

    const el = document.querySelector<HTMLElement>('[data-mobile-sticky-footer]');
    const observer = el ? new ResizeObserver(measure) : null;
    if (el && observer) observer.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, [isBannerVisible, pathname]);

  if (!isBannerVisible || isPreferencesOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 z-[70] flex justify-center px-3 pb-3 sm:px-4 sm:pb-4 pointer-events-none transition-[bottom] duration-150"
      style={{ bottom: bottomOffset }}
    >
      <div className="pointer-events-auto w-full max-w-3xl rounded-2xl border border-black/10 bg-white shadow-2xl p-4 sm:p-5">
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          We use cookies and similar technologies to improve the website, measure
          performance, and support marketing. You can accept all, reject non-essential
          cookies, or manage preferences. Necessary cookies are always active.{' '}
          <Link href="/privacy-policy" className="underline text-gray-900 hover:text-[#D52128]">
            Privacy Policy
          </Link>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 min-w-[120px] bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors touch-manipulation"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={rejectAll}
            className="flex-1 min-w-[120px] bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors touch-manipulation"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={openPreferences}
            className="flex-1 min-w-[120px] text-sm font-semibold text-gray-700 hover:text-[#D52128] underline rounded-lg px-4 py-2.5 transition-colors touch-manipulation"
          >
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
