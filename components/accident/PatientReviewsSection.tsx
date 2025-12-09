import React from 'react';
import { Star } from 'lucide-react';
import MobileCarousel from '@/components/ui/MobileCarousel';

interface Review {
  text: string;
  name: string;
  role: string;
  theme: string;
}

const reviews: Review[] = [
  {
    text: "The paperwork process was so smooth. They helped me get all the documentation I needed for my PIP claim within the same day. The staff was knowledgeable about insurance requirements and made sure everything was properly filed.",
    name: "Sarah M.",
    role: "Car Accident Patient",
    theme: "Paperwork help"
  },
  {
    text: "I came in with severe neck pain after my accident. The doctor was thorough and the treatment plan they provided gave me immediate relief. The X-ray results came back quickly and I felt so much better after my visit.",
    name: "Michael R.",
    role: "Car Accident Patient",
    theme: "Pain relief"
  },
  {
    text: "I was seen within 15 minutes of walking in. The whole process from check-in to getting my documentation was incredibly fast. They understand the urgency after an accident and prioritize getting you the care you need quickly.",
    name: "Jennifer L.",
    role: "Car Accident Patient",
    theme: "Speed"
  }
];

const PatientReviewsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Car Accident Patients
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real experiences from patients who received prompt care and comprehensive documentation for their claims
          </p>
        </div>

        <MobileCarousel showDots={true} showArrows={false} autoPlay={false}>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF] rounded-2xl p-6 border-2 border-[#2563eb]/20 hover:border-[#2563eb]/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    fill="#2563eb"
                    color="#2563eb"
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="border-t border-[#2563eb]/20 pt-4 mt-auto">
                <div className="font-semibold text-gray-900 text-lg">{review.name}</div>
                <div className="text-gray-600 text-sm">{review.role}</div>
              </div>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </section>
  );
};

export default PatientReviewsSection;


