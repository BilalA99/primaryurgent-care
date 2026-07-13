"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sendContactEmail, sendUserEmail } from '@/components/email/SendEmail';
import { pushEnhancedConversion } from '@/lib/gtag';
import { getAttributionData } from '@/lib/gclid';
import { useConsent } from '@/components/ConsentProvider';
import { Shield, Clock, FileText, Lock } from 'lucide-react';
import {
  getValidatedPhoneNumber,
  formatUSPhoneNumber,
  hasAtMostTenPhoneDigits,
  isValidUSPhoneNumber,
  PHONE_VALIDATION_ERROR,
} from '@/lib/validation/phone';

interface CompactAccidentFormProps {
  title: string;
  city?: string; // city name for GTM tracking
}

const CompactAccidentForm: React.FC<CompactAccidentFormProps> = ({ title, city }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredTime: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const { hasConsent } = useConsent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidUSPhoneNumber(formData.phone)) {
      setPhoneError(PHONE_VALIDATION_ERROR);
      return;
    }

    setPhoneError('');
    setIsLoading(true);

    try {
      const attribution = getAttributionData();
      const normalizedPhone = getValidatedPhoneNumber(formData.phone);

      // Fire GTM car_accident_form_submit event
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'car_accident_form_submit',
          form_location: 'hero',
          city: city || '',
          page_type: 'car_accident_city'
        });
        // Also fire gtag generate_lead
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'car_accident',
            event_label: city || ''
          });
        }
      } catch {}

      await sendContactEmail({
        name: formData.fullName,
        email: formData.email || 'noreply@unknown.com',
        phone: normalizedPhone,
        reason: formData.preferredTime ? `Preferred time: ${formData.preferredTime}` : '',
        accidentType: 'car-accident'
      });

      // Only send user confirmation email if email provided
      if (formData.email) {
        await sendUserEmail({
          name: formData.fullName,
          email: formData.email,
          phone: normalizedPhone,
          reason: formData.preferredTime ? `Preferred time: ${formData.preferredTime}` : '',
          accidentType: 'car-accident',
          gclid: attribution.gclid,
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_term: attribution.utm_term,
          utm_content: attribution.utm_content,
        });
      }

      // Push enhanced conversion data only with marketing consent (contains PII)
      if (hasConsent('marketing')) {
        const nameParts = formData.fullName.trim().split(' ');
        pushEnhancedConversion({
          email: formData.email,
          phone: normalizedPhone,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          postalCode: ''
        });
      }

      setFormData({ fullName: '', phone: '', email: '', preferredTime: '' });
      window.location.href = '/thank-you';
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">Most patients are seen in under 15 minutes.</p>

      {/* Micro trust badges */}
      <div className="flex flex-col gap-1.5 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Shield className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" />
          <span>PIP &amp; Auto Insurance Accepted</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <Clock className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
          <span>Seen in Under 15 Minutes</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700">
          <FileText className="w-3.5 h-3.5 text-[#D52128] flex-shrink-0" />
          <span>Documentation Provided</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Field 1: Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
          <Input
            type="text"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full h-11 text-sm px-3"
            autoComplete="name"
            required
          />
        </div>

        {/* Field 2: Phone */}
        <div>
          <label htmlFor="compact-accident-phone" className="text-sm font-medium text-gray-700 block mb-1">
            Phone Number
          </label>
          <Input
            id="compact-accident-phone"
            type="tel"
            placeholder="(___) ___-____"
            value={formData.phone}
            onChange={(e) => {
              if (hasAtMostTenPhoneDigits(e.target.value)) {
                handleChange('phone', formatUSPhoneNumber(e.target.value));
                if (phoneError) {
                  setPhoneError('');
                }
              }
            }}
            onBlur={() => {
              if (formData.phone && !isValidUSPhoneNumber(formData.phone)) {
                setPhoneError(PHONE_VALIDATION_ERROR);
              }
            }}
            className="w-full h-11 text-sm px-3"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? 'compact-accident-phone-error' : undefined}
            required
          />
          {phoneError && (
            <p id="compact-accident-phone-error" className="mt-1 text-sm text-red-600">
              {phoneError}
            </p>
          )}
        </div>

        {/* Field 3: Email (optional) */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Email <span className="text-gray-400 font-normal">(optional — for confirmation)</span>
          </label>
          <Input
            type="email"
            placeholder="you@email.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full h-11 text-sm px-3"
            autoComplete="email"
          />
        </div>

        {/* Field 4: Preferred Time */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Preferred Visit Time</label>
          <Select value={formData.preferredTime} onValueChange={(value) => handleChange('preferredTime', value)}>
            <SelectTrigger className="w-full h-11 text-sm">
              <SelectValue placeholder="When works best?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asap">ASAP / Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="weekend">Weekend</SelectItem>
              <SelectItem value="morning">Morning (9am–12pm)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12pm–4pm)</SelectItem>
              <SelectItem value="evening">Evening (4pm–6pm)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Privacy microcopy */}
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Lock className="w-3 h-3 flex-shrink-0" />
          No spam. We&apos;ll only contact you to confirm your visit.
        </p>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-[#D52128] hover:bg-[#b81b22] active:bg-[#9a1520] text-white text-base font-bold rounded-xl shadow-lg touch-manipulation"
        >
          {isLoading ? 'Submitting...' : 'Request Same-Day Accident Exam'}
        </Button>
      </form>
    </div>
  );
};

export default CompactAccidentForm;
