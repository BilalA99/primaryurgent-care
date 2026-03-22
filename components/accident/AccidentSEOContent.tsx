import React from 'react';

export interface AccidentSEOContentData {
  city: string;           // display name (e.g., "Lake Worth")
  cityFull: string;       // city + state (e.g., "Lake Worth, FL")
  address: string;        // full clinic address
  phone: string;          // display phone
  phoneHref: string;      // tel: href
  nearbyAreas?: string;   // comma-separated nearby neighborhoods / cities
}

interface AccidentSEOContentProps {
  // Legacy: flat string (kept for backwards compat)
  content?: string;
  // New: structured data object
  data?: AccidentSEOContentData;
}

const AccidentSEOContent: React.FC<AccidentSEOContentProps> = ({ content, data }) => {
  // Use structured rendering when data is provided
  if (data) {
    const { city, cityFull, address, phone, phoneHref, nearbyAreas } = data;
    return (
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none text-gray-700">

            <h2>Car Accident Injury Care in {cityFull}</h2>
            <p>
              If you&apos;ve been in a car accident in {city}, Florida, immediate medical evaluation is essential
              for both your health and your claim. Under Florida&apos;s PIP 14-day rule, you must see a car
              accident doctor within 14 days of your accident to unlock up to $10,000 in PIP benefits.
              Waiting longer risks losing those benefits permanently. Our {city} car accident urgent care
              clinic is open same-day — walk-ins are always welcome.
            </p>

            <h3>What to Do After a Car Accident in {city}</h3>
            <ol>
              <li>Check yourself and passengers for injuries and call 911 if needed.</li>
              <li>Exchange insurance information and document the scene with photos.</li>
              <li>Obtain a copy of the police report as soon as it&apos;s available.</li>
              <li>
                <strong>See a doctor within 14 days</strong> — visit our {city} walk-in car accident clinic
                at {address} to protect your PIP benefits and start documentation immediately.
              </li>
              <li>
                Contact your PIP insurance provider to open a claim. Our team provides all the
                documentation adjusters and attorneys need.
              </li>
            </ol>

            <h3>Why Choose PrimaryUC for Car Accident Care in {city}</h3>
            <p>
              Our {city} location at {address} specializes in car accident injury evaluation, whiplash
              treatment, and back and neck pain care after a collision. We offer same-day car accident
              exams, onsite digital X-ray imaging, and comprehensive PIP documentation — all under one
              roof. Our board-certified providers understand exactly what insurers and attorneys need,
              and every visit generates clear exam findings, diagnoses, and a follow-up plan that
              supports your personal injury case.
            </p>
            <p>
              As a PIP doctor in {city}, we accept most major auto insurance plans and handle
              claim-related paperwork to minimize the burden on you after a stressful accident.
              Whether you were rear-ended on a local road, hit in a side-impact crash, or injured
              in a parking lot collision, our {city} car accident injury clinic is ready to see
              you today.
            </p>

            <h3>Serving {city} and Surrounding Palm Beach County Areas</h3>
            <p>
              Our walk-in car accident clinic in {city} serves patients throughout Palm Beach County,
              {nearbyAreas ? ` including ${nearbyAreas}, ` : ' '}and the surrounding South Florida
              communities. If you need a same-day car accident exam, whiplash treatment, or PIP
              documentation in {cityFull}, call{' '}
              <a href={phoneHref}>{phone}</a> or walk in — no appointment needed.
            </p>

          </article>
        </div>
      </section>
    );
  }

  // Fallback: legacy flat string
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
