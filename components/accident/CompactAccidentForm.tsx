"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sendContactEmail, sendUserEmail } from '@/components/email/SendEmail';
import { pushEnhancedConversion } from '@/lib/gtag';
import { Shield, Clock, Lock } from 'lucide-react';

interface CompactAccidentFormProps {
  title: string;
}

const CompactAccidentForm: React.FC<CompactAccidentFormProps> = ({ title }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postalCode: '',
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Combine first and last name for email functions
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      await sendContactEmail({
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        reason: formData.message,
        accidentType: formData.type
      });
      await sendUserEmail({
        name: fullName,
        email: formData.email,
        phone: formData.phone
      });
      
      // Push enhanced conversion data to dataLayer (GTM handles hashing and conversion)
      pushEnhancedConversion({
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        postalCode: formData.postalCode
      });
      
      setFormData({ firstName: '', lastName: '', email: '', phone: '', postalCode: '', type: '', message: '' });
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
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">First Name</label>
            <Input
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="w-full h-9 text-sm px-3"
              required
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 block mb-1">Last Name</label>
            <Input
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="w-full h-9 text-sm px-3"
              required
            />
          </div>
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
          <label className="text-sm font-medium text-gray-700 block mb-1">ZIP Code</label>
          <Input
            type="text"
            placeholder="Enter your ZIP code"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            className="w-full h-9 text-sm px-3"
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

      {/* Trust Indicators */}
      <div className="mt-4 space-y-2 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="w-4 h-4 text-[#16A34A]" />
          <span>Takes &lt;60 seconds</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Lock className="w-4 h-4 text-[#2563eb]" />
          <span>Your information is secure and private</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield className="w-4 h-4 text-[#16A34A]" />
          <span>No spam, we respect your privacy</span>
        </div>
      </div>
    </div>
  );
};

export default CompactAccidentForm;
