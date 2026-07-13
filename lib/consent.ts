// Consent management core: types, storage, versioning, and Google Consent Mode v2 mapping.
// No personal data is ever stored in the consent object.

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface StoredConsent {
  version: string;
  consent: ConsentState;
  updatedAt: string;
}

export const CONSENT_VERSION = 'v1';
export const CONSENT_COOKIE_NAME = 'primaryuc_cookie_consent_v1';
export const CONSENT_MAX_AGE_DAYS = 365;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const ALL_GRANTED_CONSENT: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export const CONSENT_CATEGORIES: Array<{
  id: ConsentCategory;
  label: string;
  description: string;
  locked: boolean;
}> = [
  {
    id: 'necessary',
    label: 'Necessary',
    description:
      'Required for core site functionality, security, and form operation. Always active.',
    locked: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description:
      'Helps us understand website performance using privacy-conscious analytics.',
    locked: false,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description:
      'Helps measure advertising performance and improve relevant campaigns.',
    locked: false,
  },
  {
    id: 'functional',
    label: 'Functional',
    description:
      'Supports optional features like embedded tools or chat, when used.',
    locked: false,
  },
];

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.substring(name.length + 1));
  } catch {
    return null;
  }
}

function writeCookie(name: string, value: string, maxAgeDays: number): void {
  if (!isBrowser()) return;
  const maxAge = maxAgeDays * 24 * 60 * 60;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

export function getStoredConsent(): StoredConsent | null {
  const raw = readCookie(CONSENT_COOKIE_NAME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed?.version !== CONSENT_VERSION || !parsed?.consent) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState): StoredConsent {
  const record: StoredConsent = {
    version: CONSENT_VERSION,
    consent,
    updatedAt: new Date().toISOString(),
  };
  writeCookie(CONSENT_COOKIE_NAME, JSON.stringify(record), CONSENT_MAX_AGE_DAYS);
  return record;
}

interface GtagConsentPayload {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

export function buildGtagConsentPayload(consent: ConsentState): GtagConsentPayload {
  const marketing = consent.marketing ? 'granted' : 'denied';
  const analytics = consent.analytics ? 'granted' : 'denied';
  const functional = consent.functional ? 'granted' : 'denied';
  return {
    ad_storage: marketing,
    analytics_storage: analytics,
    ad_user_data: marketing,
    ad_personalization: marketing,
    functionality_storage: functional,
    personalization_storage: functional,
    security_storage: 'granted',
  };
}

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function pushConsentUpdate(consent: ConsentState): void {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer || [];
  const gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  gtag('consent', 'update', buildGtagConsentPayload(consent));
}

export function hasConsent(consent: ConsentState, category: ConsentCategory): boolean {
  return consent[category] === true;
}
