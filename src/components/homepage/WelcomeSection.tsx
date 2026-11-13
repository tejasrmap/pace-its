'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Users, BookOpen, Building, CheckCircle2, ArrowRight } from 'lucide-react';

const stats = [
  { number: "1,200+", label: "Placement Offers", sub: "Annual corporate selections" },
  { number: "60+", label: "Acres Campus", sub: "Lush green infrastructure" },
  { number: "13", label: "Specialized Depts", sub: "AI, CSE, Core & Management" },
  { number: "15+", label: "Patents Published", sub: "Cutting-edge innovation" },
  { number: "100%", label: "Placement Assistance", sub: "Pre-placement training cell" },
  { number: "A", label: "NAAC Grade", sub: "UGC Autonomous status" },
];

export const WelcomeSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text: Editorial Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#073B60]/10 text-[#073B60] text-xs font-bold uppercase tracking-wider">
              <span>ESTABLISHED 2008</span>
              <span>•</span>
              <span>ONGOLE, ANDHRA PRADESH</span>
            </div>

            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-[#052D49] uppercase tracking-tight leading-tight">
              WELCOME TO PACE INSTITUTE OF <br />
              <span className="text-[#E9AC21]">TECHNOLOGY & SCIENCES</span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal">
              PACE Institute of Technology & Sciences, an Autonomous institution established under the visionary leadership of Srinivasa Educational Society, is accredited by <strong>NAAC with 'A' Grade</strong> and recognized by UGC under Section 2(f) and 12(B). 
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              With permanent affiliation to JNTUK Kakinada and approval from AICTE New Delhi, PACE ITS delivers global-standard engineering, technology, and management education through an advanced outcome-based curriculum, world-class labs, AICTE IDEA Lab, and proactive industry collaborations.
            </p>

            {/* Highlights bullet list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm text-[#052D49] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E9AC21] flex-shrink-0" />
                <span>Autonomous Academic Flexibility</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#052D49] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E9AC21] flex-shrink-0" />
                <span>NBA Accredited Core Departments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#052D49] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E9AC21] flex-shrink-0" />
                <span>AICTE IDEA Lab with 3D Printing & IoT</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#052D49] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#E9AC21] flex-shrink-0" />
                <span>Extensive MOUs & Industry Partnerships</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/pace-at-glance"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#073B60] hover:bg-[#052D49] text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>INSTITUTIONAL PROFILE</span>
                <ArrowRight className="w-4 h-4 text-[#E9AC21]" />
              </Link>
              <Link
                href="/vision-and-mission"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#073B60]/30 hover:border-[#073B60] text-[#073B60] font-condensed font-semibold text-sm uppercase tracking-wider rounded-xl transition-all"
              >
                <span>VISION & MISSION</span>
              </Link>
            </div>
          </div>

          {/* Right: Key Verified Institutional Statistics */}
          <div className="lg:col-span-5 bg-[#F5F7F9] p-6 sm:p-8 rounded-2xl border border-[#E4E9EF] shadow-lg">
            <h3 className="font-condensed text-xl font-bold text-[#052D49] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E9AC21]" />
              Institutional Benchmarks
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-[#E9AC21] transition-all">
                  <div className="font-condensed font-black text-3xl sm:text-4xl text-[#073B60]">
                    {s.number}
                  </div>
                  <div className="text-xs font-bold text-[#052D49] mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#073B60] text-white flex items-center justify-between">
              <div>
                <div className="text-xs text-[#E9AC21] font-semibold uppercase">ADMISSIONS 2026–27</div>
                <div className="font-bold text-sm">Category-B & Management Quota</div>
              </div>
              <Link
                href="/admissions/b-category/apply-online/btech"
                className="px-4 py-2 bg-[#E9AC21] text-[#052D49] font-condensed font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#F6C54A] transition-colors"
              >
                APPLY →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

