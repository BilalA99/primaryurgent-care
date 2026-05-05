import React from 'react';
import { CheckCircle2, X, Shield } from 'lucide-react';

const ComparisonTable: React.FC = () => {
  const features = [
    {
      feature: 'Wait Time',
      urgentCare: '15-30 minutes',
      er: '2-6 hours for non-life-threatening',
      urgentCareIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
      erIcon: <X className="w-5 h-5 text-gray-400" />
    },
    {
      feature: 'Cost (Typical)',
      urgentCare: '$100-$300',
      er: '$1,000-$3,000+',
      urgentCareIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
      erIcon: <X className="w-5 h-5 text-gray-400" />
    },
    {
      feature: 'PIP Coverage',
      urgentCare: 'PIP billing support',
      er: 'PIP billing support',
      urgentCareIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
      erIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
    },
    {
      feature: 'Onsite X-ray',
      urgentCare: 'Yes, same-day',
      er: 'Yes, available',
      urgentCareIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
      erIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
    },
    {
      feature: 'Documentation',
      urgentCare: 'Insurance-ready medical records',
      er: 'Comprehensive records',
      urgentCareIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />,
      erIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
    },
    {
      feature: 'Life-Threatening Emergencies',
      urgentCare: 'Not appropriate - call 911',
      er: 'Yes, specialized care',
      urgentCareIcon: <X className="w-5 h-5 text-[#D52128]" />,
      erIcon: <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Urgent Care vs Emergency Room: What's the Difference?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding when urgent care is appropriate can save time and money while ensuring you get the right level of care
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white">
                <th className="px-6 py-4 text-left font-semibold">Feature</th>
                <th className="px-6 py-4 text-center font-semibold">Urgent Care</th>
                <th className="px-6 py-4 text-center font-semibold">Emergency Room</th>
              </tr>
            </thead>
            <tbody>
              {features.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {item.feature}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.urgentCareIcon}
                      <span className="text-gray-700">{item.urgentCare}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {item.erIcon}
                      <span className="text-gray-700">{item.er}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] rounded-xl border-2 border-[#16A34A]/20">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#16A34A] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When to Choose Urgent Care
              </h3>
              <p className="text-gray-700 mb-3">
                Urgent care is typically appropriate for stable patients with moderate injuries, pain, cuts, bruises, suspected sprains, or minor fractures. If you can walk, breathe normally, and don't have severe chest pain or uncontrolled bleeding, urgent care may be the right choice.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                When to Go to the ER
              </h3>
              <p className="text-gray-700">
                Go directly to the ER or call 911 for severe chest pain, difficulty breathing, uncontrolled bleeding, obvious fractures with deformity, loss of consciousness, severe head injuries, or signs of spinal cord injury. When in doubt, err on the side of caution and call 911.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;






