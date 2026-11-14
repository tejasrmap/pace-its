'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, Award, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const LeadershipVoice: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Founder / Chairman Dignified Statement */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md relative overflow-hidden group hover:border-[#E5AD35] transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 opacity-60" />
            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-100 text-[#071E2E]">
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
                "Our guiding philosophy at PACE ITS has always been to harmonize technical rigor with ethical leadership. By cultivating an ecosystem of outcome-based pedagogy, world-class laboratory infrastructure, and progressive autonomous governance, we empower our graduates to lead with confidence in a hyper-connected global economy."
              </blockquote>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#123D5A] text-[#E5AD35] font-heading font-bold flex items-center justify-center text-sm shadow">
                    MS
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-[#123D5A]">
                      Dr. M. Sreenivasan
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Founder & Secretary • Srinivasa Educational Society
                    </div>
                  </div>
                </div>

                <Link
                  href="/administration/chairman-message"
                  className="text-xs font-semibold text-[#123D5A] hover:text-[#E5AD35] flex items-center gap-1 transition"
                >
                  <span>Read Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Principal Statement & Autonomous Charter */}
          <div className="lg:col-span-6 bg-[#071E2E] text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
            <div className="relative z-10 space-y-5">
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

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E5AD35] text-[#071E2E] font-heading font-bold flex items-center justify-center text-sm shadow">
                    CV
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-white">
                      Dr. C. V. Subba Rao
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Principal, M.Tech, Ph.D. • JNTUK Autonomous Cadre
                    </div>
                  </div>
                </div>

                <Link
                  href="/administration/principal-profile"
                  className="text-xs font-semibold text-[#E5AD35] hover:text-white flex items-center gap-1 transition"
                >
                  <span>Principal's Office</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
