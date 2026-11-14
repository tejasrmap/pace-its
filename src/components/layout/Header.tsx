'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ChevronDown, GraduationCap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      title: 'About',
      href: '/pace-at-glance',
      children: [
        { title: 'PACE At a Glance', href: '/pace-at-glance' },
        { title: 'Vision & Mission', href: '/vision-and-mission' },
        { title: 'Accreditation & Approvals', href: '/affiliation-and-accreditation' },
        { title: 'Leadership & Messages', href: '/administration/chairman-message' },
        { title: 'Principal Profile', href: '/administration/principal-profile' },
        { title: 'Organization Hierarchy', href: '/organization-chart' },
      ],
    },
    {
      title: 'Academics',
      href: '/academics/academic-calendar',
      isMega: true,
    },
    {
      title: 'Admissions',
      href: '/admissions/admission-procedure',
      children: [
        { title: 'Admission Procedure', href: '/admissions/admission-procedure' },
        { title: 'Courses Offered & Intake', href: '/admissions/courses-offered' },
        { title: 'Fee Structure', href: '/admissions/fee-details' },
        { title: 'Category-B (Management Quota)', href: '/admissions/b-category' },
        { title: 'Apply Online - B.Tech', href: '/admissions/b-category/apply-online/btech' },
      ],
    },
    {
      title: 'Placements',
      href: '/trainings-and-placements',
      children: [
        { title: 'Training & Placements Overview', href: '/trainings-and-placements' },
        { title: 'Placement Records & Salary', href: '/placements-records' },
        { title: 'Skill Development Center', href: '/skill-development' },
        { title: 'Career Guidance Cell', href: '/career-guidance-cell' },
      ],
    },
    {
      title: 'Research',
      href: '/research-and-development/about-research-and-development',
      children: [
        { title: 'R&D Cell Overview', href: '/research-and-development/about-research-and-development' },
        { title: 'Patents Granted & Published', href: '/research-and-development/patents' },
        { title: 'Sponsored Research Projects', href: '/research-and-development/sponsored-projects' },
        { title: 'AICTE IDEA Lab', href: '/aicte-idea-lab' },
        { title: 'Industry MoUs & Centers', href: '/research-and-development/mou-partners' },
      ],
    },
    {
      title: 'Campus Life',
      href: '/campus/facilities',
      children: [
        { title: 'Campus Facilities Overview', href: '/campus/facilities' },
        { title: 'Central Library & Reading Halls', href: '/campus-life/central-library' },
        { title: 'Student Hostels & Dining', href: '/campus/hostel' },
        { title: 'Sports & Gymnasium', href: '/campus/sports-and-games' },
        { title: 'Photo & Video Gallery', href: '/campus/gallery' },
      ],
    },
    {
      title: 'Committees',
      href: '/committees/statutory-committees/governing-body',
      children: [
        { title: 'Governing Body', href: '/committees/statutory-committees/governing-body' },
        { title: 'Academic Council', href: '/committees/statutory-committees/academic-council' },
        { title: 'Anti-Ragging Committee', href: '/committees/non-statutory-committees/anti-ragging-committee' },
        { title: 'Internal Complaints (ICC)', href: '/committees/non-statutory-committees/internal-complaints-committee' },
        { title: 'Grievance Redressal Cell', href: '/committees/non-statutory-committees/grievance-redressal-committee' },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-sans ${
          isScrolled
            ? 'bg-[#0B2C43]/95 backdrop-blur-md shadow-lg border-b border-[#123D5A]'
            : 'bg-[#0B2C43]/90 backdrop-blur-sm border-b border-white/10'
        }`}
      >
        <TopBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Monogram */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-[#E5AD35] to-[#F6C54A] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform flex-shrink-0 border border-white/20">
                <span className="font-heading font-black text-2xl text-[#0B2C43]">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white leading-tight uppercase group-hover:text-[#E5AD35] transition-colors">
                  PACE ITS
                </span>
                <span className="text-[10px] text-slate-300 font-medium tracking-wide hidden sm:block">
                  AUTONOMOUS • NAAC 'A+' GRADE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isAcademics = item.isMega;

                return (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.title)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
                        activeDropdown === item.title
                          ? 'text-[#E5AD35] bg-white/5'
                          : 'text-slate-100 hover:text-[#E5AD35]'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                          activeDropdown === item.title ? 'rotate-180 text-[#E5AD35]' : ''
                        }`}
                      />
                    </Link>

                    {/* Pristine Light MegaMenu for Academics */}
                    {isAcademics && activeDropdown === item.title && (
                      <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[760px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-slate-800">
                        <div className="grid grid-cols-3 gap-6 text-xs">
                          {/* Column 1: Undergraduate B.Tech */}
                          <div>
                            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#123D5A] border-b-2 border-[#E5AD35] pb-2 mb-2.5 flex items-center gap-1.5">
                              <GraduationCap className="w-4 h-4 text-[#E5AD35]" />
                              <span>B.Tech Programs</span>
                            </div>
                            <div className="space-y-0.5">
                              {[
                                { title: 'Computer Science (CSE)', href: '/academics/departments/cse' },
                                { title: 'AI & Data Science', href: '/academics/departments/artificial-intelligence-and-data-science' },
                                { title: 'AI & Machine Learning', href: '/academics/departments/artificial-intelligence-and-machine-learning' },
                                { title: 'Cyber Security (IoT)', href: '/academics/departments/internet-of-things-cyber-security' },
                                { title: 'Information Technology', href: '/academics/departments/it' },
                                { title: 'Electronics & Comm (ECE)', href: '/academics/departments/ece' },
                                { title: 'Electrical & Electronics (EEE)', href: '/academics/departments/eee' },
                                { title: 'Mechanical Engineering', href: '/academics/departments/mech' },
                                { title: 'Civil Engineering', href: '/academics/departments/civil' },
                              ].map((dept) => (
                                <Link
                                  key={dept.title}
                                  href={dept.href}
                                  className="block py-1 px-2 rounded-md hover:bg-slate-100 hover:text-[#123D5A] text-slate-600 font-medium transition"
                                >
                                  {dept.title}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Polytechnic & PG */}
                          <div>
                            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#123D5A] border-b-2 border-[#E5AD35] pb-2 mb-2.5">
                              Polytechnic & PG
                            </div>
                            <div className="space-y-0.5">
                              {[
                                { title: 'Diploma CME (Computer)', href: '/academics/departments/polytechnic/cme' },
                                { title: 'Diploma AIML', href: '/academics/departments/polytechnic/aimlj' },
                                { title: 'Diploma ECE', href: '/academics/departments/polytechnic/ece' },
                                { title: 'Diploma EEE', href: '/academics/departments/polytechnic/eee' },
                                { title: 'Diploma Civil', href: '/academics/departments/polytechnic/civil' },
                                { title: 'MBA (Business Admin)', href: '/academics/departments/mba' },
                                { title: 'M.Tech in VLSI & ES', href: '/academics/departments/ece' },
                                { title: 'Humanities & Sciences', href: '/academics/departments/h-and-s' },
                              ].map((prog) => (
                                <Link
                                  key={prog.title}
                                  href={prog.href}
                                  className="block py-1 px-2 rounded-md hover:bg-slate-100 hover:text-[#123D5A] text-slate-600 font-medium transition"
                                >
                                  {prog.title}
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Academic Affairs */}
                          <div>
                            <div className="font-heading text-xs font-bold uppercase tracking-wider text-[#123D5A] border-b-2 border-[#E5AD35] pb-2 mb-2.5">
                              Academic Affairs
                            </div>
                            <div className="space-y-0.5">
                              {[
                                { title: 'Academic Calendar', href: '/academics/academic-calendar' },
                                { title: 'Autonomous Regulations (PR-23)', href: '/regulations' },
                                { title: 'Curriculum & Syllabi', href: '/curriculum_syllabus' },
                                { title: 'Autonomous Examinations Cell', href: '/0/examinations-cell' },
                                { title: 'Results Portal', href: '/1/examinations-cell' },
                              ].map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block py-1 px-2 rounded-md hover:bg-slate-100 hover:text-[#123D5A] text-slate-600 font-medium transition"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>

                            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-bold uppercase text-[#123D5A] block">
                                Autonomous Code
                              </span>
                              <span className="text-[#0B2C43] font-bold text-xs block">
                                EAPCET Code: PACE
                              </span>
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                AICTE Approved • Permanent JNTUK Affiliation
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Dropdown */}
                    {!isAcademics && item.children && activeDropdown === item.title && (
                      <div className="absolute top-[calc(100%+4px)] left-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-slate-800">
                        <div className="space-y-0.5">
                          {item.children.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              className="block px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#123D5A] hover:bg-slate-50 rounded-lg transition"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: Search + Category-B CTA + Mobile Hamburger */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                aria-label="Search pages and documents"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/admissions/b-category/apply-online/btech"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition"
              >
                <span>Apply 2026–27</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
};
