"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sendContactEmail, sendUserEmail } from '@/components/email/SendEmail';

interface CompactAccidentFormProps {
  title: string;
}

const CompactAccidentForm: React.FC<CompactAccidentFormProps> = ({ title }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.message,
        accidentType: formData.type
      });
      await sendUserEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
      
      // Track form submission
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'engagement',
          event_label: 'CompactAccidentForm',
          value: 1
        });
      }
      
      setFormData({ name: '', email: '', phone: '', type: '', message: '' });
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
    <div className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-xl p-4 w-full">
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full h-9 text-sm px-3"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full h-9 text-sm px-3"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Phone</label>
          <Input
            type="tel"
            placeholder="Enter your phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full h-9 text-sm px-3"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Accident Type</label>
          <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger className="w-full h-9 text-sm">
              <SelectValue placeholder="Select accident type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="car-accident">Car Accident</SelectItem>
              <SelectItem value="motorcycle-accident">Motorcycle Accident</SelectItem>
              <SelectItem value="truck-accident">Truck Accident</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Message</label>
          <Textarea
            placeholder="Describe your injuries or concerns"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className="w-full h-16 text-sm px-3 resize-none"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium"
        >
          {isLoading ? 'Submitting...' : 'Book Appointment'}
        </Button>
      </form>
    </div>
  );
};

export default CompactAccidentForm;
