'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CONSENT_CATEGORIES, ConsentCategory } from '@/lib/consent';
import { useConsent } from './ConsentProvider';

function ToggleSwitch({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors touch-manipulation ${
        checked ? 'bg-[#D52128]' : 'bg-gray-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookiePreferencesModal() {
  const { consent, isPreferencesOpen, closePreferences, savePreferences, acceptAll, rejectAll } =
    useConsent();
  const [draft, setDraft] = useState(consent);

  useEffect(() => {
    if (isPreferencesOpen) {
      setDraft(consent);
    }
  }, [isPreferencesOpen, consent]);

  const handleToggle = (category: ConsentCategory, value: boolean) => {
    if (category === 'necessary') return;
    setDraft((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = () => {
    savePreferences(draft);
  };

  return (
    <Dialog open={isPreferencesOpen} onOpenChange={(open) => !open && closePreferences()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Choose which categories of cookies and tracking technologies we&apos;re allowed
            to use. Necessary cookies are always active. You can change these settings at
            any time from the footer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {CONSENT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-3"
            >
              <div>
                <p className="text-sm font-semibold text-gray-900">{category.label}</p>
                <p className="text-xs text-gray-600 mt-0.5">{category.description}</p>
              </div>
              <ToggleSwitch
                checked={category.locked ? true : draft[category.id]}
                disabled={category.locked}
                onChange={(value) => handleToggle(category.id, value)}
                label={category.label}
              />
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2">
          <button
            type="button"
            onClick={rejectAll}
            className="flex-1 min-w-[110px] bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={acceptAll}
            className="flex-1 min-w-[110px] bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 min-w-[110px] bg-[#D52128] hover:bg-[#b81b22] text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
          >
            Save Preferences
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
