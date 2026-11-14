'use client';

import React from 'react';
import Link from 'next/link';
import { Building, BookOpen, Music, Home, Trophy, Bus, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

const facilities = [
  {
    icon: Building,
    title: "110+ Acre Green Campus",
    desc: "Expansive green academic zone situated along NH-16 with modern academic blocks, solar energy infrastructure, and landscaped gardens.",
    link: "/campus/facilities"
  },
  {
    icon: BookOpen,
    title: "Air-Conditioned Central Library",
    desc: "Extensive repository of over 60,000 volumes, IEEE digital subscriptions, DELNET, National Digital Library (NDL), and quiet reading zones.",
    link: "/campus-life/central-library"
  },
  {
    icon: Music,
    title: "Auditorium & Seminar Halls",
    desc: "Acoustically designed 1,500-seat central auditorium along with multiple departmental air-conditioned seminar halls with digital projection.",
    link: "/campus/auditorium"
  },
  {
    icon: Home,
    title: "Modern Student Hostels",
    desc: "Separate secure residential hostels for boys and girls with RO purified water, Wi-Fi connectivity, medical care, and hygienic dining halls.",
    link: "/campus/hostel"
  },
  {
    icon: Trophy,
    title: "Sports & Physical Fitness Complex",
    desc: "Outdoor grounds for cricket, football, basketball, and athletics track alongside indoor sports facilities and a fitness gymnasium.",
    link: "/campus/sports-and-games"
  },
  {
    icon: Bus,
    title: "Institutional Transport Fleet",
    desc: "A dedicated fleet of 50+ college buses operating safe routes connecting Ongole, Chirala, Singarayakonda, Addanki, and Kandukur.",
    link: "/campus/facilities"
  }
];

export const FacilitiesShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white font-sans">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <SectionHeading
            eyebrow="Campus Infrastructure"
            title="Campus Living & Academic Facilities"
            description="Purpose-built infrastructure designed to foster academic concentration, student well-being, and vibrant extracurricular pursuits."
            align="left"
          />

          <Link
            href="/campus/facilities"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-[#123D5A] hover:text-white text-[#123D5A] font-bold text-xs uppercase tracking-wider rounded-xl transition shrink-0"
          >
            <span>All Facilities</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-[#E5AD35] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#123D5A] group-hover:bg-[#E5AD35] group-hover:text-[#0B2C43] flex items-center justify-center transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#123D5A] group-hover:text-[#0B2C43] transition-colors leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100">
                  <Link
                    href={f.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123D5A] group-hover:text-[#E5AD35] transition-colors"
                  >
                    <span>View Facility Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
