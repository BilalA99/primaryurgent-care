'use client';

import Script from 'next/script';
import { useConsent } from './ConsentProvider';

// Loads non-essential third-party scripts only after the matching consent
// category has been granted. GA4/GTM are excluded here because they load
// unconditionally in app/layout.tsx and rely on Google Consent Mode v2
// (default denied) to gate their own storage/network behavior.
export default function ConsentAwareScripts() {
  const { hasConsent, isReady } = useConsent();

  if (!isReady) return null;

  return (
    <>
      {hasConsent('analytics') && (
        <Script
          id="ahrefs-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var ahrefs_analytics_script = document.createElement('script');
              ahrefs_analytics_script.async = true;
              ahrefs_analytics_script.src = 'https://analytics.ahrefs.com/analytics.js';
              ahrefs_analytics_script.setAttribute('data-key', 'khUTLsUI7zITAp50h78JNA');
              document.getElementsByTagName('head')[0].appendChild(ahrefs_analytics_script);
            `,
          }}
        />
      )}
      {hasConsent('functional') && (
        <>
          <Script id="lang-config" src="/assets/lang-config.js" strategy="afterInteractive" />
          <Script id="translation-helper" src="/assets/translation.js" strategy="afterInteractive" />
          <Script
            id="google-translate-widget"
            src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
            strategy="afterInteractive"
          />
        </>
      )}
    </>
  );
}
