'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, Building, BookOpen, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const HeroSlider: React.FC = () => {
  return (
    <section className="relative bg-[#072438] text-white pt-28 sm:pt-36 pb-16 lg:pb-20 overflow-hidden font-sans">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2C43] via-[#072438] to-[#041624]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Institutional Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5AD35] text-[#0B2C43] text-xs font-bold uppercase tracking-wider shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                UGC Autonomous
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold tracking-wider">
                <Award className="w-3.5 h-3.5 text-[#E5AD35]" />
                NAAC 'A' Grade (Cycle-1)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-semibold tracking-wider">
                NBA Accredited
              </span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-semibold text-[#E5AD35] tracking-widest uppercase block">
                PACE Institute of Technology & Sciences
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-heading font-bold text-white leading-[1.18] tracking-tight">
                Empowering Next-Generation Engineers & Global Leaders
              </h1>
            </div>

            {/* Institutional Overview */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl">
              An autonomous institution permanently affiliated to JNTUK Kakinada and approved by AICTE, New Delhi. Delivering industry-aligned engineering, technology, and management education across 110+ acres of world-class academic infrastructure.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/admissions/courses-offered"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition-colors"
              >
                <span>Explore Academic Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/admissions/b-category"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-colors"
              >
                <span>Category-B Admissions</span>
              </Link>

              <Link
                href="/campus/facilities"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-slate-700 font-medium text-xs sm:text-sm rounded-xl transition-colors"
              >
                <span>Campus Facilities</span>
              </Link>
            </div>
          </div>

          {/* Right Authentic Photographic Campus Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] bg-[#072438]">
              <img
                src="/assets/campus/auditorium.jpg"
                alt="PACE ITS Campus Infrastructure & Central Auditorium"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072438]/80 via-transparent to-transparent pointer-events-none" />

              {/* Discrete Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-slate-900/80 px-3.5 py-2 rounded-xl border border-white/15">
                <span className="font-semibold text-slate-200">PACE ITS Campus, Ongole</span>
                <span className="text-[#E5AD35] font-bold">EAPCET: PACE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Institutional Benchmark Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5AD35]/20 text-[#E5AD35] flex items-center justify-center font-bold text-lg shrink-0 border border-[#E5AD35]/30">
              A
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">NAAC 'A' Grade</div>
              <div className="text-xs text-slate-400">Cycle-1 UGC Autonomous</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-lg shrink-0 border border-white/15">
              🏛️
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">Estd. 2008</div>
              <div className="text-xs text-slate-400">Srinivasa Educational Society</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5AD35]/20 text-[#E5AD35] flex items-center justify-center font-bold text-lg shrink-0 border border-[#E5AD35]/30">
              📚
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">13 Departments</div>
              <div className="text-xs text-slate-400">UG, PG & Polytechnic</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-lg shrink-0 border border-white/15">
              🌲
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">110+ Acres</div>
              <div className="text-xs text-slate-400">Campus on NH-16</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
