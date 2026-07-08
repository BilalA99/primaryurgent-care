'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ALL_GRANTED_CONSENT,
  ConsentCategory,
  ConsentState,
  DEFAULT_CONSENT,
  getStoredConsent,
  pushConsentUpdate,
  storeConsent,
} from '@/lib/consent';

interface ConsentContextValue {
  consent: ConsentState;
  isReady: boolean;
  isBannerVisible: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (categories: Partial<Record<ConsentCategory, boolean>>) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  hasConsent: (category: ConsentCategory) => boolean;
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [isReady, setIsReady] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored.consent);
      pushConsentUpdate(stored.consent);
      setIsBannerVisible(false);
    } else {
      setIsBannerVisible(true);
    }
    setIsReady(true);
  }, []);

  const applyConsent = useCallback((next: ConsentState) => {
    setConsent(next);
    storeConsent(next);
    pushConsentUpdate(next);
    setIsBannerVisible(false);
    setIsPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => applyConsent(ALL_GRANTED_CONSENT), [applyConsent]);

  const rejectAll = useCallback(() => applyConsent(DEFAULT_CONSENT), [applyConsent]);

  const savePreferences = useCallback(
    (categories: Partial<Record<ConsentCategory, boolean>>) => {
      applyConsent({
        ...consent,
        ...categories,
        necessary: true,
      });
    },
    [applyConsent, consent]
  );

  const openPreferences = useCallback(() => setIsPreferencesOpen(true), []);
  const closePreferences = useCallback(() => setIsPreferencesOpen(false), []);

  const hasConsentFn = useCallback(
    (category: ConsentCategory) => consent[category] === true,
    [consent]
  );

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      isReady,
      isBannerVisible,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      hasConsent: hasConsentFn,
    }),
    [
      consent,
      isReady,
      isBannerVisible,
      isPreferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closePreferences,
      hasConsentFn,
    ]
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return ctx;
}
