'use client';

import React from 'react';
import Link from 'next/link';
import { Building, BookOpen, Music, Home, Trophy, Bus, ArrowRight } from 'lucide-react';

const facilities = [
  {
    icon: Building,
    title: "60-Acre Eco-Friendly Campus",
    desc: "Expansive green academic zone situated along NH-16 with cutting-edge academic blocks, solar energy, and rainwater harvesting.",
    link: "/campus/facilities"
  },
  {
    icon: BookOpen,
    title: "Air-Conditioned Central Library",
    desc: "Massive repository of over 45,000 volumes, IEEE digital access, DELNET, National Digital Library (NDL), and e-journals.",
    link: "/campus/facilities"
  },
  {
    icon: Music,
    title: "Auditorium & Seminar Halls",
    desc: "Acoustically treated 1,500-seat central auditorium along with multiple departmental seminar halls with multimedia projection.",
    link: "/campus/auditorium"
  },
  {
    icon: Home,
    title: "Modern Student Hostels",
    desc: "Separate high-security residential facilities for boys and girls with RO water, Wi-Fi connectivity, medical care, and hygienic mess.",
    link: "/campus/hostel"
  },
  {
    icon: Trophy,
    title: "Sports & Physical Fitness",
    desc: "Extensive outdoor grounds for cricket and football, volleyball, basketball, athletics track, and fully equipped gymnasium.",
    link: "/campus/sports-and-games"
  },
  {
    icon: Bus,
    title: "Comprehensive Transport Fleet",
    desc: "A dedicated fleet of 50+ college buses operating safe routes connecting Ongole, Chirala, Singarayakonda, Addanki, and Kandukur.",
    link: "/campus/facilities"
  }
];

export const FacilitiesShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9AC21] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              CAMPUS INFRASTRUCTURE
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-[#052D49] uppercase tracking-tight">
              WORLD-CLASS CAMPUS LIVING & FACILITIES
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-2">
              Crafted to provide an enriching collegiate ecosystem that seamlessly balances rigorous academic pursuits with holistic personal wellness.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/campus/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#073B60] text-[#073B60] hover:bg-[#073B60] hover:text-white font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
            >
              <span>VIEW ALL FACILITIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 6 Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5F7F9] rounded-2xl p-6 border border-[#E4E9EF] hover:border-[#E9AC21] transition-all hover-card-elevation flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#073B60] shadow-sm flex items-center justify-center group-hover:bg-[#E9AC21] group-hover:text-[#052D49] transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-condensed text-xl font-bold text-[#052D49] group-hover:text-[#073B60] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200">
                  <Link
                    href={fac.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#073B60] group-hover:text-[#E9AC21] transition-colors"
                  >
                    <span>Explore Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

