import React from 'react';

interface AccidentSEOContentProps {
  content?: string;
}

const AccidentSEOContent: React.FC<AccidentSEOContentProps> = ({ 
  content = `After a car accident, immediate medical evaluation is crucial for your health and legal protection. Our experienced urgent care team provides comprehensive car accident injury assessments, including whiplash treatment, back and neck pain evaluation, and soft tissue injury care. We offer same-day appointments, onsite digital X-rays, and complete documentation for insurance claims and personal injury cases.`

}) => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AccidentSEOContent;
