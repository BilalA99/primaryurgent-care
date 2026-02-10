// Centralized phone number constants for Google Ads call tracking
// All phone numbers must use +1 prefix for proper tel: link format
// This ensures compatibility with Google Forwarding Numbers

/**
 * Primary phone number in raw digits format (no formatting)
 * Used for tel: links and structured data
 */
export const PRIMARY_PHONE = "+15612238024";

/**
 * Primary phone number formatted for display
 * Used in UI components and text content
 */
export const PRIMARY_PHONE_DISPLAY = "(561) 223-8024";

/**
 * Primary phone number as tel: href
 * Used for all tel: links to ensure Google Ads can inject forwarding numbers
 */
export const PRIMARY_PHONE_HREF = "tel:+15612238024";

/**
 * Primary phone number for structured data (JSON-LD)
 * Format: +1-XXX-XXX-XXXX
 */
export const PRIMARY_PHONE_STRUCTURED = "+1-561-223-8024";


