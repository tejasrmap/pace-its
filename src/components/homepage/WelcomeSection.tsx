'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Users, BookOpen, Building, CheckCircle2, ArrowRight } from 'lucide-react';

const stats = [
  { number: "2008", label: "Established", sub: "Srinivasa Educational Society" },
  { number: "NH-16", label: "Campus Location", sub: "Valluru, Ongole, Prakasam Dist" },
  { number: "13", label: "Academic Depts", sub: "UG, PG & Polytechnic" },
  { number: "PACE", label: "EAPCET Code", sub: "Autonomous institution code" },
  { number: "NBA", label: "Accredited", sub: "Programmes in EEE, ECE & CSE" },
  { number: "A", label: "NAAC Grade", sub: "Cycle 1, UGC Autonomous" },
];

export const WelcomeSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text: Editorial Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#123D5A] text-xs font-bold uppercase tracking-wider">
              <span>Established 2008</span>
              <span>•</span>
              <span>Ongole, Andhra Pradesh</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#123D5A] tracking-tight leading-[1.2]">
              Welcome to PACE Institute of{' '}
              <span className="text-[#E5AD35] block sm:inline">Technology & Sciences</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              PACE Institute of Technology & Sciences is an autonomous academic institution established under the visionary leadership of Srinivasa Educational Society, permanently affiliated with <strong>JNTUK Kakinada</strong> and approved by <strong>AICTE, New Delhi</strong>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Accredited with <strong>NAAC 'A' Grade (Cycle-1)</strong> and recognized under Section 2(f) and 12(B) of the UGC Act, PACE ITS delivers outcome-based technical education across 13 engineering and postgraduate disciplines, supported by advanced research centers, AICTE IDEA Laboratory, and robust industry partnerships.
            </p>

            {/* Highlights bullet list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Autonomous Academic Flexibility (PR-23)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>NBA Accredited Core Departments</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AICTE IDEA Lab with 3D Printing & IoT</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>28+ Industry MoUs & Collaborative Centers</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/pace-at-glance"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#123D5A] hover:bg-[#0B2C43] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                <span>Institutional Profile</span>
                <ArrowRight className="w-4 h-4 text-[#E5AD35]" />
              </Link>
              <Link
                href="/vision-and-mission"
                className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300 hover:border-[#123D5A] text-[#123D5A] font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
              >
                <span>Vision & Mission</span>
              </Link>
            </div>
          </div>

          {/* Right: Key Verified Institutional Statistics */}
          <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md">
            <h3 className="font-heading text-lg font-bold text-[#123D5A] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E5AD35]" />
              Institutional Benchmarks
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm hover:border-[#E5AD35] transition-all">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#123D5A]">
                    {s.number}
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-1 uppercase tracking-wider">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
