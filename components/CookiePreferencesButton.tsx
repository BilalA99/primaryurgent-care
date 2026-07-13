'use client';

import { useConsent } from './ConsentProvider';

export default function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useConsent();

  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie Preferences
    </button>
  );
}
