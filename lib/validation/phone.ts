export const PHONE_VALIDATION_ERROR = 'Please enter a valid phone number.';

const US_PHONE_FORMAT =
  /^(?:\([2-9]\d{2}\)|[2-9]\d{2})[\s.-]?[2-9]\d{2}[\s.-]?\d{4}$/;

/**
 * Removes standard US phone formatting.
 * Unexpected characters are intentionally preserved so validation rejects them.
 */
export function normalizePhoneNumber(value: string): string {
  return String(value ?? '').trim().replace(/[\s().-]/g, '');
}

export function hasAtMostTenPhoneDigits(value: string): boolean {
  return String(value ?? '').replace(/\D/g, '').length <= 10;
}

export function formatUSPhoneNumber(value: string): string {
  const digits = String(value ?? '').replace(/\D/g, '').slice(0, 10);

  if (digits.length === 0) {
    return '';
  }

  if (digits.length < 4) {
    return `(${digits}`;
  }

  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isRepeatedNumber(phoneNumber: string): boolean {
  return /^(\d)\1{9}$/.test(phoneNumber);
}

function isSequentialNumber(phoneNumber: string): boolean {
  const digits = phoneNumber.split('').map(Number);
  const isAscending = digits.every(
    (digit, index) => index === 0 || digit === (digits[index - 1] + 1) % 10
  );
  const isDescending = digits.every(
    (digit, index) => index === 0 || digit === (digits[index - 1] + 9) % 10
  );

  return isAscending || isDescending;
}

export function isValidUSPhoneNumber(value: string): boolean {
  const trimmedValue = String(value ?? '').trim();

  if (!US_PHONE_FORMAT.test(trimmedValue)) {
    return false;
  }

  const normalizedPhone = normalizePhoneNumber(trimmedValue);

  if (!/^\d{10}$/.test(normalizedPhone)) {
    return false;
  }

  const areaCode = normalizedPhone.slice(0, 3);
  const exchangeCode = normalizedPhone.slice(3, 6);

  if (
    areaCode.startsWith('0') ||
    areaCode.startsWith('1') ||
    exchangeCode.startsWith('0') ||
    exchangeCode.startsWith('1')
  ) {
    return false;
  }

  return !isRepeatedNumber(normalizedPhone) && !isSequentialNumber(normalizedPhone);
}

export function getPhoneValidationError(value: string): string | null {
  return isValidUSPhoneNumber(value) ? null : PHONE_VALIDATION_ERROR;
}

export function getValidatedPhoneNumber(value: string): string {
  if (!isValidUSPhoneNumber(value)) {
    throw new Error(PHONE_VALIDATION_ERROR);
  }

  return normalizePhoneNumber(value);
}
