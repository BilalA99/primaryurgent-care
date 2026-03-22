import React from 'react';
import BookAppointmentForm from '@/components/ui/BookAppointmentForm';
import CompactAccidentForm from './CompactAccidentForm';

interface AccidentAppointmentFormProps {
  title?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
  noWrapper?: boolean;
  showHeader?: boolean;
  compact?: boolean;
  city?: string; // city name for GTM tracking
}

const AccidentAppointmentForm: React.FC<AccidentAppointmentFormProps> = ({
  title = "Check Injury Eligibility",
  bgColor = "bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF]",
  textColor = "text-gray-900",
  className = "",
  noWrapper = false,
  showHeader = true,
  compact = false,
  city
}) => {
  const formContent = (
    <div className={compact ? '' : 'bg-white rounded-2xl shadow-lg border border-gray-200 p-8'}>
      {compact ? (
        <CompactAccidentForm title={title} city={city} />
      ) : (
        <BookAppointmentForm
          title={title}
          bgColor={bgColor}
          textColor={textColor}
        />
      )}
    </div>
  );

  if (noWrapper) {
    return (
      <div className={className}>
        {formContent}
      </div>
    );
  }

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 lg:px-[60px]">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Schedule Your Car Accident Exam
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get same-day evaluation and documentation for your car accident injuries.
              Book online or walk-in today.
            </p>
          </div>
        )}

        {formContent}
      </div>
    </section>
  );
};

export default AccidentAppointmentForm;
