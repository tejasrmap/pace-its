'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, Award, CheckCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const AdmissionCta: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#052D49] via-[#073B60] to-[#052D49] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#E9AC21_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9AC21] text-[#052D49] text-xs font-bold uppercase tracking-widest font-condensed">
                ENROLLMENT 2026–27
              </span>

              <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                BEGIN YOUR ENGINEERING & LEADERSHIP JOURNEY AT PACE ITS
              </h2>

              <p className="text-gray-200 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                Join an autonomous academic institution where rigorous pedagogy, innovative labs, and high-impact campus placements shape future leaders. Admissions open for Category-B and Management Quota.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E9AC21]" />
                  <span>Merit-based Admissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E9AC21]" />
                  <span>Scholarship Support Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#E9AC21]" />
                  <span>Dedicated Career Guidance</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-3">
              <Link
                href="/admissions/b-category/apply-online/btech"
                className="w-full py-4 text-center bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-black text-base uppercase tracking-wider rounded-xl shadow-lg hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5"
              >
                APPLY FOR B.TECH ONLINE →
              </Link>

              <Link
                href="/admissions/b-category/apply-online/mba"
                className="w-full py-3.5 text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
              >
                APPLY FOR MBA ADMISSION
              </Link>

              <Link
                href="/admissions/courses-offered"
                className="w-full py-3 text-center text-xs text-gray-300 hover:text-[#E9AC21] transition-colors underline-offset-4 hover:underline"
              >
                Explore Courses Offered & Intake Capacity
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

