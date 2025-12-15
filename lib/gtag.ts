// TypeScript declarations for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Google Analytics event tracking utility
// Uses dataLayer.push() for GTM compatibility
// Event naming: Analytics-only events should use 'ui_' or 'form_' prefix
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
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Form submission tracking for GA4 analytics only
// Note: Google Ads conversions are handled by GTM on /thank-you page
// Never push 'conversion' events from React - GTM handles all conversions
export function trackFormSubmission({
  formName,
  value
}: {
  formName: string;
  value?: number;
}) {
  // Track analytics event only (GTM handles conversions)
  trackEvent({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
    value: value
  });
}

// Google Ads Enhanced Conversions data push
// Pushes enhanced conversion data to dataLayer for GTM to hash and send to Google Ads
// GTM handles hashing automatically - do NOT hash in client code
// Reference: https://support.google.com/google-ads/answer/13258081
export function pushEnhancedConversion({
  email,
  phone,
  firstName,
  lastName,
  postalCode
}: {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  postalCode?: string;
}) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];

  // Sanitize phone to digits only
  const sanitizedPhone = phone?.replace(/\D/g, '');
  // Only include phone if it has at least 10 digits
  const validPhone = sanitizedPhone && sanitizedPhone.length >= 10 ? sanitizedPhone : undefined;

  // Build dataLayer object - only include fields with actual values
  const enhancedData: {
    event: string;
    user_email?: string;
    user_phone?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_postal_code?: string;
    user_country: string;
  } = {
    event: 'enhanced_conversion_form_submit',
    user_country: 'US' // Always include country
  };

  // Only add fields that have values
  if (email?.trim()) {
    enhancedData.user_email = email.trim();
  }
  if (validPhone) {
    enhancedData.user_phone = validPhone;
  }
  if (firstName?.trim()) {
    enhancedData.user_first_name = firstName.trim();
  }
  if (lastName?.trim()) {
    enhancedData.user_last_name = lastName.trim();
  }
  if (postalCode?.trim()) {
    enhancedData.user_postal_code = postalCode.trim();
  }

  window.dataLayer.push(enhancedData);
} 