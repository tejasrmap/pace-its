'use client';

import React from 'react';
import Link from 'next/link';
import { Lightbulb, FileText, Cpu, Compass, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const researchHighlights = [
  {
    icon: Lightbulb,
    title: "Patents & Intellectual Property",
    desc: "Intellectual property filings and published patents by faculty and student research teams in agricultural IoT, computer vision, and power systems.",
    link: "/research-and-development/patents",
    badge: "IPR Cell"
  },
  {
    icon: Cpu,
    title: "AICTE IDEA Laboratory",
    desc: "AICTE-sanctioned central laboratory equipped with high-precision 3D printers, laser cutters, CNC routing, and embedded IoT prototyping stations.",
    link: "/aicte-idea-lab",
    badge: "Sanctioned Lab"
  },
  {
    icon: FileText,
    title: "Peer-Reviewed Publications",
    desc: "Faculty scientific contributions published across national and international journals and conference proceedings.",
    link: "/research-and-development/publications-and-patents",
    badge: "Research Cell"
  },
  {
    icon: Compass,
    title: "Innovation Council (IIC & EDC)",
    desc: "Ministry of Education recognized Institution's Innovation Council (IIC) and EDC providing seed incubation and startup acceleration.",
    link: "/research-and-development/iic",
    badge: "Incubation Hub"
  }
];

export const ResearchInnovation: React.FC = () => {
  return (
    <section className="py-20 bg-[#072438] text-white relative font-sans border-t border-slate-800">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5AD35]/20 border border-[#E5AD35]/30 text-[#E5AD35] text-xs font-bold uppercase tracking-wider mb-3">
              Discovery & Intellectual Property
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight leading-[1.2]">
              Research, Patents & Innovation Ecosystem
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 font-normal leading-relaxed">
              Transforming academic curiosity into impactful technologies through sponsored R&D grants, patent filings, and multidisciplinary lab experiments.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/research-and-development/about-research-and-development"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition shadow-md"
            >
              <span>Explore Research Cell</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchHighlights.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B2C43] border border-slate-700/80 rounded-2xl p-6 hover:border-[#E5AD35] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#E5AD35]/20 text-[#E5AD35] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E5AD35] bg-[#E5AD35]/15 border border-[#E5AD35]/30 px-2 py-0.5 rounded-full">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#E5AD35] transition leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-700">
                  <Link
                    href={r.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
