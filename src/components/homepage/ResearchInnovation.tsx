'use client';

import React from 'react';
import Link from 'next/link';
import { Lightbulb, FileText, Cpu, Compass, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

const researchHighlights = [
  {
    icon: Lightbulb,
    title: "Patents Granted & Published",
    desc: "Faculty and student innovators hold multiple published patents in IoT smart irrigation, AI surveillance, and drone automation.",
    link: "/research-and-development/patents",
    badge: "15+ Patents"
  },
  {
    icon: Cpu,
    title: "AICTE IDEA LAB",
    desc: "Elite sanctioned laboratory equipped with advanced 3D printers, laser cutters, CNC routing, and embedded IoT prototyping rigs.",
    link: "/aicte-idea-lab",
    badge: "Sanctioned Lab"
  },
  {
    icon: FileText,
    title: "PACE Publishers",
    desc: "Institutional publishing wing promoting peer-reviewed academic journals, research proceedings, and engineering research papers.",
    link: "/research-and-development/pace-publishers",
    badge: "Open Access"
  },
  {
    icon: Compass,
    title: "Entrepreneurship & IIC",
    desc: "MoE recognized Institution's Innovation Council (IIC) and EDC providing seed incubation, mentorship, and startup acceleration.",
    link: "/research-and-development/iic",
    badge: "Startup Hub"
  }
];

export const ResearchInnovation: React.FC = () => {
  return (
    <section className="py-20 bg-[#062C46] text-white relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#073B60] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9AC21] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              DISCOVERY & INTELLECTUAL PROPERTY
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              RESEARCH, PATENTS & INNOVATION
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-2xl mt-2 font-light">
              Transforming academic curiosity into impactful technologies through sponsored R&D, patent filings, and multidisciplinary lab experiments.
            </p>
          </div>

          <div className="mt-6 lg:mt-0">
            <Link
              href="/research-and-development/about-research-and-development"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <span>EXPLORE R&D INITIATIVES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {researchHighlights.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-[#052D49]/90 border border-[#0A4A78] rounded-2xl p-6 flex flex-col justify-between hover:border-[#E9AC21] transition-all hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#073B60] text-[#E9AC21] flex items-center justify-center group-hover:bg-[#E9AC21] group-hover:text-[#052D49] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-[#E9AC21] bg-[#073B60] px-2.5 py-1 rounded-full border border-[#0A4A78]">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="font-condensed text-xl font-bold text-white group-hover:text-[#E9AC21] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2.5 leading-relaxed font-light">
                    {r.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#0A4A78]">
                  <Link
                    href={r.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E9AC21] hover:text-white transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Research Policy & Consultancy Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#073B60] to-[#052D49] border border-[#0A4A78] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-[#E9AC21] flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">PACE Institutional Research Policy & Guidelines</h4>
              <p className="text-xs text-gray-300">Preserving ethical research practices, faculty publications incentives, and patent support.</p>
            </div>
          </div>
          <a
            href="https://pace.ac.in/public/assets/images/researchpolicy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold uppercase tracking-wider font-condensed flex items-center gap-1.5 transition-all flex-shrink-0"
          >
            <span>Download Policy PDF</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#E9AC21]" />
          </a>
        </div>

      </div>
    </section>
  );
};

