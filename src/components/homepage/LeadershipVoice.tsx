'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, Award, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const LeadershipVoice: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Chairman Statement */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-50 text-[#071E2E]">
                  <Quote className="w-5 h-5 text-[#E5AD35]" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5AD35] block">
                    From the Desk of the Chairman
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#123D5A]">
                    Visionary Academic Leadership
                  </h3>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-700 leading-relaxed italic border-l-2 border-[#E5AD35] pl-4">
                "Our guiding philosophy at PACE ITS has always been to harmonize technical rigor with ethical leadership. By cultivating an ecosystem of outcome-based pedagogy, state-of-the-art laboratory infrastructure, and progressive autonomous governance, we empower our students to emerge as competent professionals and responsible citizens."
              </blockquote>
            </div>

            <div className="pt-6 mt-6 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/branding/chairman.png"
                  alt="Dr. M. Venu Gopal Rao"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E5AD35] bg-slate-100"
                />
                <div>
                  <div className="font-heading font-bold text-sm text-[#123D5A]">
                    Dr. M. Venu Gopal Rao
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Chairman • Srinivasa Educational Society
                  </div>
                </div>
              </div>

              <Link
                href="/administration/chairman-message"
                className="text-xs font-semibold text-[#123D5A] hover:text-[#E5AD35] flex items-center gap-1 transition-colors"
              >
                <span>Read Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Principal Statement */}
          <div className="lg:col-span-6 bg-[#0B2C43] text-white rounded-2xl p-8 sm:p-10 border border-slate-800 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-white/10 text-[#E5AD35]">
                  <ShieldCheck className="w-5 h-5 text-[#E5AD35]" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E5AD35] block">
                    Principal & Academic Executive
                  </span>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Excellence in Autonomous Pedagogy
                  </h3>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-[#E5AD35] pl-4">
                "As a UGC Autonomous institution, our curriculum is engineered in real-time alignment with industry demands through active Boards of Studies. PACE ITS stands committed to nurturing problem solvers, innovators, and entrepreneurs capable of driving societal transformation."
              </blockquote>
            </div>

            <div className="pt-6 mt-6 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/branding/principal.jpg"
                  alt="Dr. G. V. K. Murthy"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E5AD35] bg-slate-800"
                />
                <div>
                  <div className="font-heading font-bold text-sm text-white">
                    Dr. G. V. K. Murthy
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Principal • PACE Institute of Technology & Sciences
                  </div>
                </div>
              </div>

              <Link
                href="/administration/principal-profile"
                className="text-xs font-semibold text-[#E5AD35] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Principal's Office</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

