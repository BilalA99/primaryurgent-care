'use client'

import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { FAQItem } from '@/types/blog'

interface FAQAccordionProps {
  faqs: FAQItem[]
  className?: string
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <div className={`bg-white rounded-2xl p-6 border border-gray-200 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openIndex === index && (
              <div className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQAccordion
