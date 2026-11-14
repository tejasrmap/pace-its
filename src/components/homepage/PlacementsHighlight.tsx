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

        {/* 4 Placement Framework Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-colors">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Campus Recruitment Training</div>
            <div className="font-heading font-bold text-xl text-[#123D5A] mt-2">Comprehensive CRT</div>
            <p className="text-xs text-slate-500 mt-2">Structured training covering quantitative aptitude, logical reasoning, verbal ability, and group discussion drills.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-colors">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Technical Preparation</div>
            <div className="font-heading font-bold text-xl text-[#123D5A] mt-2">Coding & Problem Solving</div>
            <p className="text-xs text-slate-500 mt-2">Hands-on practice in Java, Python, Data Structures, and Database Management Systems mapped to industry hiring standards.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-colors">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Recruitment Drives</div>
            <div className="font-heading font-bold text-xl text-[#123D5A] mt-2">On & Off Campus Drives</div>
            <p className="text-xs text-slate-500 mt-2">Active placement partnerships with leading technology organizations and core engineering recruiters across India.</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-colors">
            <div className="text-xs font-bold uppercase text-[#123D5A] tracking-wider">Higher Education</div>
            <div className="font-heading font-bold text-xl text-[#123D5A] mt-2">Career Guidance Bureau</div>
            <p className="text-xs text-slate-500 mt-2">Mentorship and preparatory resources for GATE, competitive government examinations, and international postgraduation.</p>
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
