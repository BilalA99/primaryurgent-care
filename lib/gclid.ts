'use client';

export function captureGclid(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const keys = [
    'gclid',
    'gbraid',
    'wbraid',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_adgroup',
    'utm_keyword',
    'utm_term',
    'utm_content'
  ] as const;
  for (const key of keys) {
    const value = params.get(key);
    if (value) {
      sessionStorage.setItem(key, value);
    }
  }
  if (!sessionStorage.getItem('landing_page_url')) {
    sessionStorage.setItem('landing_page_url', window.location.href);
  }
  sessionStorage.setItem('device', getDeviceType());
}

export function getAttributionData(): {
  gclid: string;
  gbraid: string;
  wbraid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_adgroup: string;
  utm_keyword: string;
  utm_term: string;
  utm_content: string;
  landing_page_url: string;
  device: string;
} {
  if (typeof window === 'undefined') {
    return {
      gclid: '',
      gbraid: '',
      wbraid: '',
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_adgroup: '',
      utm_keyword: '',
      utm_term: '',
      utm_content: '',
      landing_page_url: '',
      device: '',
    };
  }
  return {
    gclid: sessionStorage.getItem('gclid') || '',
    gbraid: sessionStorage.getItem('gbraid') || '',
    wbraid: sessionStorage.getItem('wbraid') || '',
    utm_source: sessionStorage.getItem('utm_source') || '',
    utm_medium: sessionStorage.getItem('utm_medium') || '',
    utm_campaign: sessionStorage.getItem('utm_campaign') || '',
    utm_adgroup: sessionStorage.getItem('utm_adgroup') || '',
    utm_keyword: sessionStorage.getItem('utm_keyword') || '',
    utm_term: sessionStorage.getItem('utm_term') || '',
    utm_content: sessionStorage.getItem('utm_content') || '',
    landing_page_url: sessionStorage.getItem('landing_page_url') || '',
    device: sessionStorage.getItem('device') || getDeviceType(),
  };
}

function getDeviceType(): string {
  if (typeof window === 'undefined') return '';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
