'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Briefcase, Award, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

export const AcademicPrograms: React.FC = () => {
  const programs = [
    {
      degree: 'B.Tech Programs',
      level: 'Undergraduate (UG)',
      duration: '4 Years (8 Semesters)',
      intake: '13 Specialized Branches',
      description: 'Cutting-edge engineering curricula in Computer Science, AI, Machine Learning, Cyber Security, Electronics, and Core Disciplines under Autonomous guidelines.',
      badge: 'NBA & AICTE Approved',
      icon: <GraduationCap className="w-6 h-6 text-[#E5AD35]" />,
      link: '/admissions/courses-offered',
      branches: ['CSE', 'AI & DS', 'AI & ML', 'Cyber Security', 'ECE', 'EEE', 'Mechanical', 'Civil'],
    },
    {
      degree: 'M.Tech Programs',
      level: 'Postgraduate (PG)',
      duration: '2 Years (4 Semesters)',
      intake: 'Advanced Engineering',
      description: 'Master of Technology programs designed for deep technical specialization, industry-collaborated research, and advanced laboratory experimentation.',
      badge: 'Research Oriented',
      icon: <BookOpen className="w-6 h-6 text-[#E5AD35]" />,
      link: '/academics/departments/cse',
      branches: ['Computer Science & Engineering', 'VLSI & Embedded Systems'],
    },
    {
      degree: 'MBA Program',
      level: 'Postgraduate Management',
      duration: '2 Years (4 Semesters)',
      intake: '180 Seats Approved',
      description: 'Master of Business Administration offering dual specializations in Finance, Marketing, Human Resource Management, and Business Analytics.',
      badge: 'Dual Specialization',
      icon: <Briefcase className="w-6 h-6 text-[#E5AD35]" />,
      link: '/academics/departments/mba',
      branches: ['Finance', 'Human Resources', 'Marketing', 'Business Analytics'],
    },
    {
      degree: 'Polytechnic Diploma',
      level: 'State Board of Technical Education',
      duration: '3 Years (6 Semesters)',
      intake: '7 Technical Branches',
      description: 'Practical, industry-aligned diploma courses preparing students with foundational technological excellence and immediate employability.',
      badge: 'SBTET Approved',
      icon: <Award className="w-6 h-6 text-[#E5AD35]" />,
      link: '/academics/departments/polytechnic/cme',
      branches: ['Diploma CME', 'Diploma AIML', 'Diploma ECE', 'Diploma EEE', 'Diploma Civil'],
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E2E8F0]">
      <Container>
        <SectionHeading
          eyebrow="Academic Programs"
          title="Degree Programs & Academic Pathways"
          description="PACE ITS offers a wide spectrum of UGC-Autonomous undergraduate, postgraduate, and diploma courses designed to impart rigorous technological education."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.degree}
              className="bg-[#F8FAFB] rounded-2xl border border-[#E2E8F0] p-6 flex flex-col justify-between hover:border-[#123D5A]/40 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#123D5A] flex items-center justify-center group-hover:bg-[#0B2C43] transition-colors">
                    {prog.icon}
                  </div>
                  <span className="text-[10px] font-bold bg-[#E5AD35]/20 text-[#B08221] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {prog.badge}
                  </span>
                </div>

                <span className="text-xs font-semibold text-[#687783] block uppercase tracking-wider">
                  {prog.level} • {prog.duration}
                </span>

                <h3 className="font-heading font-extrabold text-xl text-[#123D5A] mt-1 group-hover:text-[#E5AD35] transition-colors">
                  {prog.degree}
                </h3>

                <p className="text-xs text-[#687783] leading-relaxed mt-2.5">
                  {prog.description}
                </p>

                <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Key Disciplines:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.branches.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-slate-700 font-medium"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E2E8F0]">
                <Link
                  href={prog.link}
                  className="flex items-center justify-between text-xs font-bold text-[#123D5A] group-hover:text-[#E5AD35] transition-colors"
                >
                  <span>Explore Curriculum</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

