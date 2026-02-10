import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const RedFlagChecklist: React.FC = () => {
  const redFlags = [
    'Severe weakness or inability to move arms or legs',
    'Loss of bladder or bowel control',
    'Numbness or tingling that spreads or worsens',
    'Severe chest pain or difficulty breathing',
    'Uncontrolled bleeding',
    'Loss of consciousness, confusion, or seizures',
    'Severe headache with vision changes',
    'Obvious deformity or severe swelling'
  ];

  const safeForUrgentCare = [
    'Moderate pain that you can manage',
    'Stable breathing and normal heart rate',
    'Ability to walk or move without assistance',
    'Controlled bleeding that has stopped',
    'Clear mental state and alertness',
    'No signs of severe head or spinal injury'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Red Flags - Go to ER */}
          <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] rounded-2xl p-6 md:p-8 border-2 border-[#D52128]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#D52128] rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Go Straight to ER If You Have:
              </h2>
            </div>
            <ul className="space-y-3">
              {redFlags.map((flag, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#D52128] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{flag}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/80 rounded-lg border border-[#D52128]/30">
              <p className="text-sm font-semibold text-[#D52128]">
                If you experience any of these symptoms, call 911 or go to the nearest emergency room immediately.
              </p>
            </div>
          </div>

          {/* Safe for Urgent Care */}
          <div className="bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-2xl p-6 md:p-8 border-2 border-[#16A34A]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-[#16A34A] rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Urgent Care is Usually Appropriate When:
              </h2>
            </div>
            <ul className="space-y-3">
              {safeForUrgentCare.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/80 rounded-lg border border-[#16A34A]/30">
              <p className="text-sm font-semibold text-[#16A34A]">
                If you meet these criteria, urgent care can provide fast, affordable evaluation and treatment for your car accident injuries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedFlagChecklist;






