'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, TrendingUp, Users, Award, ArrowRight, Building2, CheckCircle } from 'lucide-react';

const recruiterNames = [
  "Tata Consultancy Services", "Infosys Technologies", "Wipro Digital", 
  "Cognizant Interactive", "Tech Mahindra", "Amazon Web Services", 
  "Accenture Solutions", "Capgemini India", "HCL Technologies", 
  "DXC Technology", "Virtusa Corporation", "Hexaware Technologies"
];

export const PlacementsHighlight: React.FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9AC21]/15 text-[#073B60] text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-[#E9AC21]" />
            CAREER EMPOWERMENT CELL
          </div>
          <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-[#052D49] uppercase tracking-tight">
            RECORD-SETTING CAMPUS PLACEMENTS
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Equipping PACE graduates with rigorous coding bootcamps, aptitude mastery, mock interviews, and industry-tailored placement tracks.
          </p>
        </div>

        {/* 4 Big Placement Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#052D49] text-white p-6 rounded-2xl shadow-xl border-t-4 border-[#E9AC21] space-y-2">
            <div className="text-xs font-bold uppercase text-[#E9AC21] tracking-wider">Annual Selections</div>
            <div className="font-condensed text-4xl sm:text-5xl font-black text-white">1,200+</div>
            <p className="text-xs text-gray-300">Total job offers extended by multinational technology and core leaders.</p>
          </div>

          <div className="bg-[#073B60] text-white p-6 rounded-2xl shadow-xl border-t-4 border-[#F6C54A] space-y-2">
            <div className="text-xs font-bold uppercase text-[#F6C54A] tracking-wider">Top Global Recruiters</div>
            <div className="font-condensed text-4xl sm:text-5xl font-black text-white">150+</div>
            <p className="text-xs text-gray-300">Tier-1 IT services, software enterprises, and engineering recruiters.</p>
          </div>

          <div className="bg-[#052D49] text-white p-6 rounded-2xl shadow-xl border-t-4 border-[#E9AC21] space-y-2">
            <div className="text-xs font-bold uppercase text-[#E9AC21] tracking-wider">Career Assistance</div>
            <div className="font-condensed text-4xl sm:text-5xl font-black text-white">100%</div>
            <p className="text-xs text-gray-300">Pre-placement grooming, industry internships, and mock assessments.</p>
          </div>

          <div className="bg-[#073B60] text-white p-6 rounded-2xl shadow-xl border-t-4 border-[#F6C54A] space-y-2">
            <div className="text-xs font-bold uppercase text-[#F6C54A] tracking-wider">Training Modules</div>
            <div className="font-condensed text-4xl sm:text-5xl font-black text-white">400+</div>
            <p className="text-xs text-gray-300">Hours of corporate readiness, full-stack coding & soft skills training.</p>
          </div>
        </div>

        {/* Recruiter Logos Banner */}
        <div className="bg-[#F5F7F9] p-8 rounded-2xl border border-[#E4E9EF]">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#073B60]">
              PROUD RECRUITMENT PARTNERS
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recruiterNames.map((name, i) => (
              <div 
                key={i} 
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center text-center font-bold text-xs text-[#052D49] hover:border-[#E9AC21] hover:shadow-md transition-all h-20"
              >
                {name}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/placements-records"
              className="px-6 py-3 bg-[#073B60] hover:bg-[#052D49] text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>VIEW DETAILED PLACEMENT RECORDS</span>
              <ArrowRight className="w-4 h-4 text-[#E9AC21]" />
            </Link>
            <Link
              href="/tpo"
              className="px-6 py-3 border border-[#073B60] text-[#073B60] hover:bg-[#073B60] hover:text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              MESSAGE FROM TPO DESK
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

