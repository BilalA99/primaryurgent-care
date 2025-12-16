import React from 'react';
import { FileText, Shield, CheckCircle2 } from 'lucide-react';

const AttorneyFriendlySection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#F2F6FC] to-[#E8F2FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-[60px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Attorney-Ready Documentation
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We create thorough, organized medical records that support your case documentation needs
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-[#2563eb]/20 shadow-lg hover:shadow-xl transition-all">
            <div className="flex-shrink-0 w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-[#2563eb]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Comprehensive Records
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Detailed visit summaries, exam findings, imaging reports, and treatment plans formatted for easy review by legal teams and insurance adjusters.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#2563eb]/20 shadow-lg hover:shadow-xl transition-all">
            <div className="flex-shrink-0 w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-[#2563eb]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Timeline Documentation
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Clear chronology of your injuries, symptoms, and treatment that establishes a documented connection between the accident and your medical needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#2563eb]/20 shadow-lg hover:shadow-xl transition-all">
            <div className="flex-shrink-0 w-14 h-14 bg-[#2563eb]/10 rounded-xl flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#2563eb]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Coordinated Care
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We coordinate with attorneys and insurance companies when properly authorized, making the documentation process as smooth as possible for your case.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic">
            Note: We provide medical documentation and coordinate with legal teams when authorized. We do not provide legal advice or guarantee specific outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AttorneyFriendlySection;






