'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const AdmissionCta: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#072438] via-[#0B2C43] to-[#072438] text-white relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5AD35]/20 border border-[#E5AD35]/30 text-[#E5AD35] text-xs font-bold uppercase tracking-wider">
                Admissions 2026–27
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.2]">
                Begin Your Engineering & Leadership Journey at PACE ITS
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
                Join an autonomous academic institution where rigorous outcome-based curricula, cutting-edge labs, and high-impact campus placements shape future technological leaders. Admissions open for Category-B and Management Quota.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5AD35]" />
                  <span>Merit-based Category-B Admissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5AD35]" />
                  <span>Merit Scholarship Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E5AD35]" />
                  <span>Dedicated Career Guidance Cell</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <Link
                href="/admissions/b-category/apply-online/btech"
                className="w-full py-3.5 px-6 text-center bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Apply for B.Tech Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admissions/b-category/apply-online/mba"
                className="w-full py-3 px-6 text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all"
              >
                Apply for MBA Program
              </Link>

              <div className="pt-2 text-center text-xs text-slate-400">
                Admissions Helpline:{' '}
                <a href="tel:+919581456310" className="text-amber-300 font-bold hover:underline">
                  +91 95814 56310
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
