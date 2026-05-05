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
              If you&apos;ve been in a car accident in {city}, Florida, a prompt medical evaluation can help
              identify injuries that are not obvious right away and create a clear medical record. Florida&apos;s
              14-day PIP rule may affect your ability to use PIP benefits after an accident. Getting evaluated
              quickly can help document your symptoms, exam findings, and treatment recommendations. Our {city}
              car accident urgent care clinic offers same-day visits when available, and walk-ins are welcome.
            </p>

            <h3>What to Do After a Car Accident in {city}</h3>
            <ol>
              <li>Check yourself and passengers for injuries and call 911 if needed.</li>
              <li>Exchange insurance information and document the scene with photos.</li>
              <li>Obtain a copy of the police report as soon as it&apos;s available.</li>
              <li>
                <strong>Get evaluated promptly</strong> — visit our {city} walk-in car accident clinic
                at {address} to document your symptoms, exam findings, and treatment recommendations.
              </li>
              <li>
                Contact your PIP insurance provider if you need to open a claim. Our team provides clear
                medical documentation for PIP and insurance records.
              </li>
            </ol>

            <h3>Why Choose PrimaryUC for Car Accident Care in {city}</h3>
            <p>
              Our {city} location at {address} specializes in car accident injury evaluation, whiplash
              treatment, and back and neck pain care after a collision. We offer same-day car accident
              exams, onsite digital X-ray imaging, and comprehensive PIP documentation — all under one
              roof. Every visit generates clear exam findings, diagnoses, imaging records when performed,
              and follow-up recommendations you can share with your insurance provider if needed.
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
