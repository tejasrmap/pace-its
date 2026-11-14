'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ChevronDown, GraduationCap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { mainNavigation } from '@/data/navigation';
import { TopBar } from './TopBar';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  isTransparentDefault?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isTransparentDefault = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBgClass = isScrolled
    ? 'bg-[#123D5A] shadow-lg py-2.5 border-b border-[#0B2C43]'
    : isTransparentDefault
    ? 'bg-gradient-to-b from-[#0B2C43]/95 via-[#0B2C43]/70 to-transparent py-3.5'
    : 'bg-[#123D5A] py-3 shadow-md border-b border-[#0B2C43]';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${headerBgClass}`}>
        <TopBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Institutional Logo & Monogram */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E5AD35] to-[#F6C54A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0 border border-white/20">
                <span className="font-condensed font-black text-2xl text-[#0B2C43]">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed text-xl sm:text-2xl font-black tracking-tight text-white leading-tight uppercase group-hover:text-[#E5AD35] transition-colors">
                  PACE ITS
                </span>
                <span className="text-[10px] text-slate-200 tracking-wider font-semibold flex items-center gap-1">
                  <span>AUTONOMOUS</span>
                  <span className="text-[#E5AD35]">•</span>
                  <span>NAAC 'A+' GRADE</span>
                  <span className="text-[#E5AD35]">•</span>
                  <span>NBA</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
              {mainNavigation.map((item) => {
                const isAcademics = item.title === 'Academics';
                const isCommittees = item.title === 'Committees';
                const isAdmissions = item.title === 'Admissions';

                return (
                  <div
                    key={item.title}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-white hover:text-[#E5AD35] rounded-lg transition-colors"
                    >
                      <span>{item.title}</span>
                      {item.children && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 group-hover:text-[#E5AD35] transition-transform" />
                      )}
                    </Link>

                    {/* Mega Menu for Academics (Multi-Column) */}
                    {isAcademics && activeDropdown === item.title && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#0B2C43] border border-[#123D5A] rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="grid grid-cols-3 gap-6 text-xs">
                          {/* Column 1: Engineering UG */}
                          <div>
                            <div className="font-condensed text-sm font-bold uppercase tracking-wider text-[#E5AD35] border-b border-[#123D5A] pb-2 mb-2 flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4" />
                              <span>B.Tech Programs</span>
                            </div>
                            <div className="space-y-1">
                              {[
                                { title: 'CSE', href: '/academics/departments/cse' },
                                { title: 'AI & Data Science', href: '/academics/departments/artificial-intelligence-and-data-science' },
                                { title: 'AI & Machine Learning', href: '/academics/departments/artificial-intelligence-and-machine-learning' },
                                { title: 'CSE (Cyber Security)', href: '/academics/departments/internet-of-things-cyber-security' },
                                { title: 'CSIT', href: '/academics/departments/csit' },
                                { title: 'Information Technology', href: '/academics/departments/it' },
                                { title: 'ECE', href: '/academics/departments/ece' },
                                { title: 'EEE', href: '/academics/departments/eee' },
                                { title: 'Mechanical Engineering', href: '/academics/departments/mech' },
                                { title: 'Civil Engineering', href: '/academics/departments/civil' },
                              ].map((dept) => (
                                <Link
                                  key={dept.title}
                                  href={dept.href}
                                  className="block py-1 px-2 rounded hover:bg-[#123D5A] text-slate-200 hover:text-white transition"
                                >
                                  {dept.title}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Polytechnic & PG */}
                          <div>
                            <div className="font-condensed text-sm font-bold uppercase tracking-wider text-[#E5AD35] border-b border-[#123D5A] pb-2 mb-2">
                              Polytechnic & PG
                            </div>
                            <div className="space-y-1">
                              {[
                                { title: 'Diploma CME (Computer Engg)', href: '/academics/departments/polytechnic/cme' },
                                { title: 'Diploma AIML', href: '/academics/departments/polytechnic/aimlj' },
                                { title: 'Diploma ECE', href: '/academics/departments/polytechnic/ece' },
                                { title: 'Diploma EEE', href: '/academics/departments/polytechnic/eee' },
                                { title: 'Diploma Civil', href: '/academics/departments/polytechnic/civil' },
                                { title: 'MBA (Master of Business Admin)', href: '/academics/departments/mba' },
                                { title: 'Humanities & Sciences (H&S)', href: '/academics/departments/h-and-s' },
                              ].map((prog) => (
                                <Link
                                  key={prog.title}
                                  href={prog.href}
                                  className="block py-1 px-2 rounded hover:bg-[#123D5A] text-slate-200 hover:text-white transition"
                                >
                                  {prog.title}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Governance & Examinations */}
                          <div>
                            <div className="font-condensed text-sm font-bold uppercase tracking-wider text-[#E5AD35] border-b border-[#123D5A] pb-2 mb-2">
                              Academic Affairs
                            </div>
                            <div className="space-y-1">
                              {[
                                { title: 'Academic Calendar', href: '/academics/academic-calendar' },
                                { title: 'Autonomous Regulations', href: '/regulations' },
                                { title: 'Curriculum & Syllabi', href: '/curriculum_syllabus' },
                                { title: 'Examinations Cell', href: '/0/examinations-cell' },
                                { title: 'Results Archive', href: '/1/examinations-cell' },
                              ].map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block py-1 px-2 rounded hover:bg-[#123D5A] text-slate-200 hover:text-white transition font-semibold"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>

                            <div className="mt-4 p-3 rounded-xl bg-[#123D5A]/80 border border-[#E5AD35]/30">
                              <span className="text-[10px] font-bold uppercase text-[#E5AD35] block">
                                Autonomous Code
                              </span>
                              <span className="text-white font-bold text-sm block">EAPCET Code: PACE</span>
                              <span className="text-[11px] text-slate-300 block mt-0.5">
                                AICTE Approved • Permanent JNTUK Affiliation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Dropdown for other menus */}
                    {!isAcademics && item.children && activeDropdown === item.title && (
                      <div className="absolute top-full left-0 w-72 bg-[#0B2C43] border border-[#123D5A] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="space-y-0.5">
                          {item.children.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block p-2 rounded-lg hover:bg-[#123D5A] transition group"
                            >
                              <div className="text-xs font-semibold text-white group-hover:text-[#E5AD35] flex items-center justify-between">
                                <span>{subItem.title}</span>
                                {subItem.badge && (
                                  <span className="text-[10px] bg-[#E5AD35] text-[#0B2C43] px-1.5 py-0.2 rounded font-bold">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              {subItem.description && (
                                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                                  {subItem.description}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* RIGHT: Search & Admissions CTA */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                aria-label="Search website"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/admissions/b-category/apply-online/btech"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] text-xs font-bold uppercase tracking-wider font-condensed transition shadow"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Apply 2026–27</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="xl:hidden p-2 text-white hover:bg-white/10 rounded-lg"
                aria-label="Open mobile navigation"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
};
