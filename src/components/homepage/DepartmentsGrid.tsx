'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Terminal, Shield, Network, Zap, Settings, Building, Briefcase, Atom, Layers, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

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
    desc: "Premier department offering industry-ready curriculum in Cloud Computing, Distributed Systems, Software Engineering & Advanced Algorithms.",
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
    name: "CSE (IoT & Cyber Security)",
    slug: "internet-of-things-cyber-security",
    type: "ug",
    icon: Shield,
    desc: "Industrial IoT protocols, Cryptography, Blockchain architectures, and Penetration Testing defense frameworks.",
    intake: "60 Seats"
  },
  {
    code: "CSIT",
    name: "Computer Science & Information Tech",
    slug: "csit",
    type: "ug",
    icon: Network,
    desc: "Cross-disciplinary computing focusing on Full-Stack Enterprise Development, Database Systems, and Cloud Infrastructure.",
    intake: "60 Seats"
  },
  {
    code: "IT",
    name: "Information Technology",
    slug: "it",
    type: "ug",
    icon: Layers,
    desc: "Application Development, Web Architecture, Enterprise Networks, and Systems Engineering.",
    intake: "60 Seats"
  },
  {
    code: "ECE",
    name: "Electronics & Communication Engg",
    slug: "ece",
    type: "ug",
    icon: Zap,
    desc: "VLSI Circuit Design, Embedded Systems, Signal Processing, and Modern RF Communication.",
    intake: "180 Seats"
  },
  {
    code: "EEE",
    name: "Electrical & Electronics Engg",
    slug: "eee",
    type: "ug",
    icon: Zap,
    desc: "Smart Grids, Renewable Solar/Wind Energy Systems, Electric Vehicles, and Industrial Automation.",
    intake: "60 Seats"
  },
  {
    code: "MECH",
    name: "Mechanical Engineering",
    slug: "mech",
    type: "ug",
    icon: Settings,
    desc: "Robotics, Thermal Engineering, CAD/CAM/CAE Modeling, Advanced Manufacturing, and Industrial Metallurgy.",
    intake: "60 Seats"
  },
  {
    code: "CIVIL",
    name: "Civil Engineering",
    slug: "civil",
    type: "ug",
    icon: Building,
    desc: "Structural Analysis, Geotechnical Engineering, Smart Cities, Transportation, and Environmental Water Resources.",
    intake: "60 Seats"
  },
  {
    code: "MBA",
    name: "Management Studies (MBA)",
    slug: "mba",
    type: "pg",
    icon: Briefcase,
    desc: "Dual specialization in Financial Management, Marketing Strategy, Human Resource Development, and Business Analytics.",
    intake: "180 Seats"
  },
  {
    code: "H&S",
    name: "Humanities & Sciences (H&S)",
    slug: "h-and-s",
    type: "ug",
    icon: Atom,
    desc: "Foundational sciences fostering analytical skills in Engineering Mathematics, Applied Physics, Chemistry, and Professional English.",
    intake: "Foundation"
  }
];

export const DepartmentsGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'ug' | 'pg'>('all');

  const filteredDepts = filter === 'all' 
    ? departments 
    : departments.filter(d => d.type === filter);

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200 font-sans">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <SectionHeading
            eyebrow="Academic Excellence"
            title="Schools & Academic Departments"
            description="13 specialized degree programs driven by outcome-based education, modern laboratories, and expert faculty."
            align="left"
          />

          {/* Department Filter Tabs */}
          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'all' ? 'bg-[#123D5A] text-white shadow-sm' : 'text-slate-600 hover:text-[#123D5A]'
              }`}
            >
              All Departments
            </button>
            <button
              onClick={() => setFilter('ug')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'ug' ? 'bg-[#123D5A] text-white shadow-sm' : 'text-slate-600 hover:text-[#123D5A]'
              }`}
            >
              B.Tech Engineering
            </button>
            <button
              onClick={() => setFilter('pg')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === 'pg' ? 'bg-[#123D5A] text-white shadow-sm' : 'text-slate-600 hover:text-[#123D5A]'
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
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-[#E5AD35] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-[#123D5A] group-hover:bg-[#E5AD35] group-hover:text-[#0B2C43] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    {d.intake && (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {d.intake}
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] font-bold text-[#E5AD35] uppercase tracking-wider mb-1">
                    {d.code}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#123D5A] group-hover:text-[#0B2C43] transition-colors leading-tight">
                    {d.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {d.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/academics/departments/${d.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123D5A] group-hover:text-[#E5AD35] transition-colors"
                  >
                    <span>Department Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/academics/departments/${d.slug}`}
                    className="text-[11px] text-slate-400 hover:text-[#123D5A] transition-colors font-medium"
                  >
                    Curriculum ↗
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Polytechnic Diploma Banner */}
        <div className="mt-10 bg-gradient-to-r from-[#0B2C43] to-[#123D5A] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#E5AD35] uppercase tracking-widest">
              State Board Diploma Wing
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
              Polytechnic Diploma Programs
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              3-year state-board technical diploma courses in Computer Engineering, AIML, ECE, EEE, and Civil Engineering with specialized laboratory workshops.
            </p>
          </div>
          <Link
            href="/academics/departments/polytechnic/cme"
            className="px-5 py-3 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <span>Explore Polytechnic Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
};
