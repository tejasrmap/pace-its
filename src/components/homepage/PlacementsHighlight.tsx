'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, TrendingUp, Users, Award, ArrowRight, Building2, CheckCircle } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

const recruiterNames = [
  "Tata Consultancy Services", "Infosys Technologies", "Wipro Digital", 
  "Cognizant Interactive", "Tech Mahindra", "Amazon Web Services", 
  "Accenture Solutions", "Capgemini India", "HCL Technologies", 
  "DXC Technology", "Virtusa Corporation", "Hexaware Technologies"
];

export const PlacementsHighlight: React.FC = () => {
  return (
    <section className="py-20 bg-white relative font-sans">
      <Container>
        {/* Top Header */}
        <SectionHeading
          eyebrow="Training & Placement Cell"
          title="Training & Campus Placements"
          description="Equipping PACE graduates with rigorous coding bootcamps, aptitude mastery, mock interviews, and industry-tailored placement tracks."
          align="center"
        />

        {/* 4 Big Placement Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-all">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Annual Selections</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#123D5A] mt-2">850+</div>
            <p className="text-xs text-slate-500 mt-2">Total job offers extended by multinational technology and core leaders.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-all">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Highest CTC Package</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#E5AD35] mt-2">₹12.50 LPA</div>
            <p className="text-xs text-slate-500 mt-2">Top tier product enterprise placement with international engineering firm.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-all">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Recruiting Partners</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#123D5A] mt-2">75+ MNCs</div>
            <p className="text-xs text-slate-500 mt-2">Tier-1 IT services, software enterprises, and core engineering recruiters.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-all">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Average CTC Package</div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-[#123D5A] mt-2">₹4.80 LPA</div>
            <p className="text-xs text-slate-500 mt-2">Consistent upward trajectory across all engineering branches.</p>
          </div>
        </div>

        {/* Recruiter Logos Banner */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-center">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Premier Corporate Recruiting Partners
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {recruiterNames.map((name, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white rounded-xl text-xs font-semibold text-slate-700 shadow-sm border border-slate-200/70 hover:border-[#E5AD35] hover:text-[#123D5A] transition"
              >
                {name}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/placements-records"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#123D5A] hover:bg-[#0B2C43] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
            >
              <span>Explore Verified Placement Records</span>
              <ArrowRight className="w-4 h-4 text-[#E5AD35]" />
            </Link>
            <Link
              href="/trainings-and-placements"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:border-[#123D5A] text-[#123D5A] font-semibold text-xs uppercase tracking-wider rounded-xl transition"
            >
              <span>Placement Training Brochure</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
