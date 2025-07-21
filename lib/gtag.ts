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