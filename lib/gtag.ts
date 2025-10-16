// TypeScript declarations for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        send_to?: string;
        value?: string | number;
        currency?: string;
        event_category?: string;
        event_label?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

// Google Analytics event tracking utility
export function trackEvent({
  action,
  category,
  label,
  value
}: {
  action: string;
  category?: string;
  label?: string;
  value?: string | number;
}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Google Ads conversion tracking utility
export function trackConversion({
  conversionId,
  conversionLabel,
  value,
  currency = 'USD'
}: {
  conversionId?: string;
  conversionLabel?: string;
  value?: number;
  currency?: string;
}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Track Google Ads conversion
    window.gtag('event', 'conversion', {
      send_to: conversionId ? `${conversionId}/${conversionLabel}` : undefined,
      value: value,
      currency: currency,
    });
  }
}

// Combined form submission tracking for both GA and Google Ads
export function trackFormSubmission({
  formName,
  conversionId,
  conversionLabel,
  value,
  currency = 'USD'
}: {
  formName: string;
  conversionId?: string;
  conversionLabel?: string;
  value?: number;
  currency?: string;
}) {
  // Track in Google Analytics
  trackEvent({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
    value: value
  });

  // Track Google Ads conversion if conversion details provided
  if (conversionId && conversionLabel) {
    trackConversion({
      conversionId,
      conversionLabel,
      value,
      currency
    });
  }
} 