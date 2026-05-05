"use client";

import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';

const FourteenDayUrgencyBlock: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#D52128] to-[#b81b22] py-8 px-4 sm:px-6 lg:px-8 xl:px-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-white/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-white" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Why Prompt Medical Evaluation Matters
              </h2>
              <p className="text-white/90 text-base md:text-lg mb-4 leading-relaxed">
                Florida's 14-day PIP rule may affect your ability to use PIP benefits after an accident. Getting evaluated quickly can help document your symptoms, exam findings, and treatment recommendations.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Time-sensitive documentation window</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <span className="font-semibold">PIP billing support available</span>
                </div>
              </div>
              
              <Link
                href="/car-accident/documentation-pip"
                className="inline-flex items-center gap-2 text-white font-semibold hover:underline group"
              >
                Learn more about PIP documentation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourteenDayUrgencyBlock;






