import React from 'react';
import Accordion from '@/components/ui/Accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface AccidentFAQProps {
  title?: string;
  faqs?: FAQItem[];
}

const AccidentFAQ: React.FC<AccidentFAQProps> = ({ 
  title = "Frequently Asked Questions About Car Accident Injuries",
  faqs = [
    {
      question: "Should I see a doctor immediately after a car accident?",
      answer: "Yes, you should seek medical attention as soon as possible after a car accident, even if you don't feel injured. Some injuries, like whiplash or internal trauma, may not show symptoms immediately but can worsen without proper treatment. Early evaluation also helps with insurance documentation."
    },
    {
      question: "What types of injuries do you treat after car accidents?",
      answer: "We treat a wide range of car accident injuries including whiplash, back and neck pain, soft tissue injuries, minor fractures, contusions, cuts and scrapes, headaches, and concussion symptoms. Our onsite X-ray and imaging capabilities help us diagnose and treat most urgent care-level injuries."
    },
    {
      question: "Do you accept insurance for car accident injuries?",
      answer: "Yes, we accept most major insurance plans including PIP (Personal Injury Protection) coverage, which is required in Florida. We also work with auto insurance companies and can provide documentation for your personal injury claim. Our team will help coordinate billing and insurance verification."
    },
    {
      question: "How quickly can I be seen for car accident injuries?",
      answer: "We offer same-day appointments and welcome walk-ins for car accident injuries. Our urgent care centers typically have wait times under 15 minutes, and we prioritize accident-related injuries to ensure you receive prompt medical attention and documentation."
    },
    {
      question: "What documentation will I receive for my insurance claim?",
      answer: "We provide comprehensive documentation including detailed medical reports, X-ray results, treatment plans, and visit summaries. This documentation is essential for your insurance claim and any potential legal proceedings. We can also coordinate with your attorney if needed."
    }
  ]
}) => {
  return (
    <section className="py-16 bg-[color:var(--brand-bg-soft)]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <Accordion 
          sections={faqs.map(faq => ({
            title: faq.question,
            content: <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          }))}
        />
      </div>
    </section>
  );
};

export default AccidentFAQ;
