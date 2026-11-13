'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Terminal, Shield, Network, Zap, Settings, Building, Briefcase, Atom, Layers, ArrowRight } from 'lucide-react';

interface Dept {
  code: string;
  name: string;
  slug: string;
  type: 'ug' | 'pg' | 'diploma';
  icon: any;
  desc: string;
  intake?: string;
}

const departments: Dept[] = [
  {
    code: "CSE",
    name: "Computer Science & Engineering",
    slug: "cse",
    type: "ug",
    icon: Terminal,
    desc: "Premier department offering industry-ready curriculum in Cloud, Distributed Systems, Software Engineering & Advanced Algorithms.",
    intake: "480 Seats"
  },
  {
    code: "AI & DS",
    name: "Artificial Intelligence & Data Science",
    slug: "artificial-intelligence-and-data-science",
    type: "ug",
    icon: Cpu,
    desc: "State-of-the-art specialization in Deep Learning, Big Data Analytics, Natural Language Processing, and Computer Vision.",
    intake: "180 Seats"
  },
  {
    code: "AI & ML",
    name: "Artificial Intelligence & Machine Learning",
    slug: "artificial-intelligence-and-machine-learning",
    type: "ug",
    icon: Cpu,
    desc: "Comprehensive engineering in Machine Intelligence, Neural Networks, Autonomous Systems, and Predictive Modeling.",
    intake: "180 Seats"
  },
  {
    code: "IoT & CS",
    name: "CSE (IoT & Cyber Security incl. Blockchain)",
    slug: "internet-of-things-cyber-security",
    type: "ug",
    icon: Shield,
    desc: "Next-generation engineering in Smart Sensors, Embedded Systems, Network Forensics, Cryptography, and Smart Contracts.",
    intake: "60 Seats"
  },
  {
    code: "CSIT",
    name: "Computer Science & Information Technology",
    slug: "csit",
    type: "ug",
    icon: Network,
    desc: "Hybrid computing discipline integrating core Computer Science theory with enterprise IT infrastructure and software architecture.",
    intake: "60 Seats"
  },
  {
    code: "IT",
    name: "Information Technology",
    slug: "it",
    type: "ug",
    icon: Network,
    desc: "Focused on web technologies, enterprise applications, software quality engineering, and global database systems.",
    intake: "60 Seats"
  },
  {
    code: "ECE",
    name: "Electronics & Communication Engineering",
    slug: "ece",
    type: "ug",
    icon: Zap,
    desc: "NBA-accredited program in VLSI design, Embedded Robotics, Wireless Communications, and Signal Processing.",
    intake: "180 Seats"
  },
  {
    code: "EEE",
    name: "Electrical & Electronics Engineering",
    slug: "eee",
    type: "ug",
    icon: Zap,
    desc: "Core discipline in Smart Grid Systems, Renewable Energy, Power Electronics, Electric Vehicles, and Industrial Drives.",
    intake: "60 Seats"
  },
  {
    code: "MECH",
    name: "Mechanical Engineering",
    slug: "mech",
    type: "ug",
    icon: Settings,
    desc: "Industry 4.0 ready program in Robotics, CAD/CAM/CAE, Thermal Power, Mechatronics, and Advanced Materials.",
    intake: "60 Seats"
  },
  {
    code: "CIVIL",
    name: "Civil Engineering",
    slug: "civil",
    type: "ug",
    icon: Building,
    desc: "Infrastructure development, Structural Engineering, GIS & Remote Sensing, Environmental Studies, and Geotechnical labs.",
    intake: "60 Seats"
  },
  {
    code: "MBA",
    name: "Master of Business Administration",
    slug: "mba",
    type: "pg",
    icon: Briefcase,
    desc: "Postgraduate management education in Finance, Human Resources, Marketing, Business Analytics, and Logistics Management.",
    intake: "180 Seats"
  },
  {
    code: "H & S",
    name: "Humanities & Sciences",
    slug: "h-and-s",
    type: "ug",
    icon: Atom,
    desc: "Foundational sciences fostering analytical skills in Engineering Mathematics, Applied Physics, Chemistry, and Professional English.",
    intake: "Foundation"
  }
];

export const DepartmentsGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ug' | 'pg' | 'diploma'>('all');

  const filteredDepts = filter === 'all' 
    ? departments 
    : departments.filter(d => d.type === filter);

  return (
    <section className="py-20 bg-[#F5F7F9] border-t border-b border-[#E4E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#E9AC21] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              ACADEMIC EXCELLENCE
            </div>
            <h2 className="font-condensed text-3xl sm:text-4xl lg:text-5xl font-black text-[#052D49] uppercase tracking-tight">
              SCHOOLS & ACADEMIC DEPARTMENTS
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-2">
              13 specialized degree programs driven by outcome-based education, modern laboratories, and expert faculty.
            </p>
          </div>

          {/* Department Filter Tabs */}
          <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-condensed transition-all ${
                filter === 'all' ? 'bg-[#073B60] text-white shadow-sm' : 'text-gray-600 hover:text-[#073B60]'
              }`}
            >
              All Departments
            </button>
            <button
              onClick={() => setFilter('ug')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-condensed transition-all ${
                filter === 'ug' ? 'bg-[#073B60] text-white shadow-sm' : 'text-gray-600 hover:text-[#073B60]'
              }`}
            >
              B.Tech Engineering
            </button>
            <button
              onClick={() => setFilter('pg')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider font-condensed transition-all ${
                filter === 'pg' ? 'bg-[#073B60] text-white shadow-sm' : 'text-gray-600 hover:text-[#073B60]'
              }`}
            >
              Postgraduate (MBA)
            </button>
          </div>
        </div>

        {/* Departments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.code}
                className="bg-white rounded-2xl p-6 border border-[#E4E9EF] shadow-sm hover:border-[#E9AC21] hover-card-elevation flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#073B60]/10 text-[#073B60] group-hover:bg-[#E9AC21] group-hover:text-[#052D49] flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    {d.intake && (
                      <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                        {d.intake}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-[#E9AC21] uppercase tracking-wider mb-1">
                    {d.code}
                  </div>
                  <h3 className="font-condensed text-xl font-bold text-[#052D49] group-hover:text-[#073B60] transition-colors leading-tight">
                    {d.name}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/academics/departments/${d.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#073B60] group-hover:text-[#E9AC21] transition-colors"
                  >
                    <span>Department Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/committees/statutory-committees/board-of-studies/${d.slug === 'artificial-intelligence-and-data-science' ? 'ai-ds' : d.slug === 'artificial-intelligence-and-machine-learning' ? 'ai-ml' : d.slug}`}
                    className="text-[11px] text-gray-400 hover:text-[#073B60] transition-colors font-medium"
                  >
                    BOS
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Polytechnic Diploma Banner */}
        <div className="mt-12 bg-[#073B60] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#0A4A78]">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#E9AC21] uppercase tracking-widest">
              POLYTECHNIC WING
            </span>
            <h3 className="font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-wide">
              Diploma Engineering Programs (Polytechnic)
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              Specialized 3-year state-board diploma programs in CME, AIML, ECE, EEE, and Civil Engineering with industry internships.
            </p>
          </div>
          <Link
            href="/academics/departments/polytechnic/cme"
            className="px-6 py-3 bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex-shrink-0"
          >
            EXPLORE DIPLOMA WING →
          </Link>
        </div>

      </div>
    </section>
  );
};

