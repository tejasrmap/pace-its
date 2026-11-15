'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ChevronDown, GraduationCap, ArrowRight, ShieldCheck, Phone, ExternalLink } from 'lucide-react';
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
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (title: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

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
        { title: 'PACE At a Glance', href: '/pace-at-glance', desc: 'Institutional heritage, vision, and campus milestones' },
        { title: 'Vision & Mission', href: '/vision-and-mission', desc: 'Educational objectives and core values' },
        { title: 'Accreditation & Approvals', href: '/affiliation-and-accreditation', desc: 'UGC Autonomous, NAAC A Grade, NBA, AICTE, JNTUK' },
        { title: 'Leadership & Messages', href: '/administration/chairman-message', desc: 'Chairman, Secretary & Principal executive profiles' },
        { title: 'Principal Profile', href: '/administration/principal-profile', desc: 'Office of the Principal, Dr. G. V. K. Murthy' },
        { title: 'Organization Hierarchy', href: '/organization-chart', desc: 'Administrative and academic governance tree' },
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
        { title: 'Admission Procedure 2026–27', href: '/admissions/admission-procedure', desc: 'Step-by-step enrollment process and quotas' },
        { title: 'Degree Programs & Intake', href: '/admissions/courses-offered', desc: 'Sanctioned intake capacity across UG & PG' },
        { title: 'Fee Structure & Scholarships', href: '/admissions/fee-details', desc: 'Institutional fee details and merit awards' },
        { title: 'Category-B (Management Quota)', href: '/admissions/b-category/applications', desc: 'Merit-based direct admission guidelines' },
        { title: 'Apply Online for B.Tech', href: '/admissions/b-category/apply-online/btech', desc: 'Immediate online prospective application' },
      ],
    },
    {
      title: 'Placements',
      href: '/trainings-and-placements',
      children: [
        { title: 'Training & Placements Cell', href: '/trainings-and-placements', desc: 'Corporate readiness and training frameworks' },
        { title: 'Placement Records & Companies', href: '/placements-records', desc: 'Annual placement statistics and recruited batches' },
        { title: 'Skill Development Hub', href: '/skill-development', desc: 'Industry certifications and coding labs' },
        { title: 'Career Guidance Bureau', href: '/career-guidance-cell', desc: 'Higher education and competitive exam prep' },
      ],
    },
    {
      title: 'Research',
      href: '/research-and-development/about-research-and-development',
      children: [
        { title: 'R&D Cell & Innovation', href: '/research-and-development/about-research-and-development', desc: 'Institutional discovery and research initiatives' },
        { title: 'Patents Granted & Published', href: '/research-and-development/patents', desc: 'Faculty & student patent publications' },
        { title: 'AICTE IDEA Laboratory', href: '/aicte-idea-lab', desc: '3D Printing, Laser CNC & Prototyping' },
        { title: 'Industry MoUs & Centers', href: '/research-and-development/mou-partners', desc: 'Corporate & industrial collaborative centers' },
      ],
    },
    {
      title: 'Campus Life',
      href: '/campus/facilities',
      children: [
        { title: 'Campus Facilities Overview', href: '/campus/facilities', desc: 'Panoramic residential campus along NH-16' },
        { title: 'Central Library & Reading Halls', href: '/campus/facilities', desc: 'Volumes, DELNET, and IEEE digital learning resources' },
        { title: 'Student Hostels & Dining', href: '/campus/hostel', desc: 'Secure residential facilities for men & women' },
        { title: 'Sports & Gymnasium Arena', href: '/campus/sports-and-games', desc: 'Cricket, athletics, indoor sports & fitness' },
        { title: 'Events Photo Archive', href: '/college-events', desc: '204 official institutional photo albums' },
      ],
    },
    {
      title: 'Governance',
      href: '/committees/statutory-committees/governing-body',
      children: [
        { title: 'Governing Body', href: '/committees/statutory-committees/governing-body', desc: 'Apex institutional administrative council' },
        { title: 'Academic Council', href: '/committees/statutory-committees/academic-council', desc: 'Autonomous curricula approval body' },
        { title: 'Anti-Ragging Committee', href: '/committees/non-statutory-committees/anti-ragging-committee', desc: 'UGC compliant safety & discipline cell' },
        { title: 'Internal Complaints (ICC)', href: '/committees/non-statutory-committees/internal-complaints-committee', desc: 'Statutory gender sensitization bureau' },
        { title: 'Grievance Redressal Cell', href: '/committees/non-statutory-committees/grievance-redressal-committee', desc: 'Student & faculty grievance portal' },
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 font-sans ${
          isScrolled
            ? 'bg-[#071E2E] shadow-xl border-b border-white/10'
            : 'bg-[#071E2E] border-b border-white/10'
        }`}
      >
        <TopBar />

        <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 lg:h-22">
            {/* Zone 1 (Left): Authentic Institutional Brand */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-2.5 group shrink-0 min-w-0">
              <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg bg-white p-1 shadow-sm shrink-0 flex items-center justify-center">
                <img
                  src="/assets/branding/pace-crest.png"
                  alt="PACE Institute of Technology & Sciences"
                  className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-heading text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white leading-tight uppercase group-hover:text-[#E5AD35] transition-colors truncate">
                  PACE ITS
                </span>
                <span className="text-[9px] sm:text-[10px] text-amber-200 font-medium tracking-wide flex items-center gap-1 whitespace-nowrap">
                  <span>AUTONOMOUS</span>
                  <span>•</span>
                  <span>NAAC 'A'</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">NBA</span>
                </span>
                <span className="text-[9px] text-slate-300 tracking-wider hidden 2xl:block whitespace-nowrap">
                  PERMANENTLY AFFILIATED TO JNTUK
                </span>
              </div>
            </Link>

            {/* Zone 2 (Center): Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 2xl:space-x-3">
              {navItems.map((item, idx) => {
                const isAcademics = item.isMega;
                const isRightSide = idx >= navItems.length - 2;

                return (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.children) {
                          setActiveDropdown(activeDropdown === item.title ? null : item.title);
                        }
                      }}
                      className={`flex items-center gap-1 px-2 xl:px-2.5 2xl:px-3 py-2 text-xs xl:text-xs 2xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                        activeDropdown === item.title
                          ? 'text-[#E5AD35] bg-white/5 font-semibold'
                          : 'text-slate-100 hover:text-[#E5AD35]'
                      }`}
                    >
                      <span className="whitespace-nowrap">{item.title}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 shrink-0 ${
                          activeDropdown === item.title ? 'rotate-180 text-[#E5AD35]' : ''
                        }`}
                      />
                    </Link>

                    {/* Elite Light MegaMenu for Academics */}
                    {isAcademics && activeDropdown === item.title && (
                      <div
                        className="absolute top-full left-0 lg:left-[-120px] xl:left-[-80px] 2xl:left-[-40px] pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="w-[min(820px,calc(100vw-32px))] max-w-[820px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 xl:p-7 text-slate-800 relative before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                        <div className="grid grid-cols-12 gap-7">
                          {/* Left: Undergraduate B.Tech Programs (5 cols) */}
                          <div className="col-span-5 space-y-2 border-r border-slate-100 pr-5">
                            <div className="font-heading text-sm font-bold text-[#123D5A] border-b-2 border-[#E5AD35] pb-2 flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <GraduationCap className="w-4 h-4 text-[#E5AD35]" />
                                B.Tech Disciplines
                              </span>
                              <span className="text-[10px] text-slate-400 font-normal">UG Programs</span>
                            </div>
                            <div className="grid grid-cols-1 gap-0.5 text-xs">
                              {[
                                { title: 'Computer Science & Engineering', code: 'CSE', href: '/academics/departments/cse' },
                                { title: 'Artificial Intelligence & Data Science', code: 'AI&DS', href: '/academics/departments/artificial-intelligence-and-data-science' },
                                { title: 'Artificial Intelligence & Machine Learning', code: 'AI&ML', href: '/academics/departments/artificial-intelligence-and-machine-learning' },
                                { title: 'Cyber Security (incl. IoT & Blockchain)', code: 'CS-IoT', href: '/academics/departments/internet-of-things-cyber-security' },
                                { title: 'Information Technology', code: 'IT', href: '/academics/departments/it' },
                                { title: 'Electronics & Communication Engg', code: 'ECE', href: '/academics/departments/ece' },
                                { title: 'Electrical & Electronics Engg', code: 'EEE', href: '/academics/departments/eee' },
                                { title: 'Mechanical Engineering', code: 'MECH', href: '/academics/departments/mech' },
                                { title: 'Civil Engineering', code: 'CIVIL', href: '/academics/departments/civil' },
                              ].map((dept) => (
                                <Link
                                  key={dept.code}
                                  href={dept.href}
                                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#123D5A] transition group"
                                >
                                  <span className="font-medium group-hover:font-semibold truncate pr-2">{dept.title}</span>
                                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-[#E5AD35]">{dept.code}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Middle: Polytechnic & Postgraduate (4 cols) */}
                          <div className="col-span-4 space-y-2 border-r border-slate-100 pr-4">
                            <div className="font-heading text-sm font-bold text-[#123D5A] border-b-2 border-[#E5AD35] pb-2 flex items-center justify-between">
                              <span>Polytechnic & PG</span>
                              <span className="text-[10px] text-slate-400 font-normal">Diploma / Masters</span>
                            </div>
                            <div className="space-y-0.5 text-xs">
                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">
                                Polytechnic Diploma
                              </div>
                              {[
                                { title: 'Diploma in Computer Engg (CME)', href: '/academics/departments/polytechnic/cme' },
                                { title: 'Diploma in AI & Machine Learning', href: '/academics/departments/polytechnic/aimlj' },
                                { title: 'Diploma in ECE', href: '/academics/departments/polytechnic/ece' },
                                { title: 'Diploma in EEE', href: '/academics/departments/polytechnic/eee' },
                                { title: 'Diploma in Civil Engineering', href: '/academics/departments/polytechnic/civil' },
                              ].map((p) => (
                                <Link
                                  key={p.title}
                                  href={p.href}
                                  className="block py-1 px-2 rounded hover:bg-slate-50 text-slate-600 hover:text-[#123D5A] transition"
                                >
                                  {p.title}
                                </Link>
                              ))}

                              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-2">
                                Postgraduate Studies
                              </div>
                              <Link
                                href="/academics/departments/mba"
                                className="block py-1 px-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#123D5A] font-medium"
                              >
                                Master of Business Administration (MBA)
                              </Link>
                              <Link
                                href="/academics/departments/ece"
                                className="block py-1 px-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#123D5A] font-medium"
                              >
                                M.Tech in VLSI & Embedded Systems
                              </Link>
                            </div>
                          </div>

                          {/* Right: Academic Affairs & Autonomous Code (3 cols) */}
                          <div className="col-span-3 space-y-3">
                            <div className="font-heading text-sm font-bold text-[#123D5A] border-b-2 border-[#E5AD35] pb-2">
                              Academic Affairs
                            </div>
                            <div className="space-y-1 text-xs">
                              {[
                                { title: 'Academic Calendar', href: '/academics/academic-calendar' },
                                { title: 'Autonomous Regulations (PR-23)', href: '/regulations' },
                                { title: 'Curriculum & Syllabi', href: '/curriculum_syllabus' },
                                { title: 'Examinations Cell', href: '/0/examinations-cell' },
                                { title: 'Result Verification Portal', href: '/1/examinations-cell' },
                              ].map((item) => (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  className="block py-1.5 px-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#123D5A] font-medium transition"
                                >
                                  {item.title}
                                </Link>
                              ))}
                            </div>

                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-[#E5AD35] block">
                                Autonomous Code
                              </span>
                              <span className="font-heading font-bold text-sm text-[#123D5A] block mt-0.5">
                                EAPCET Code: PACE
                              </span>
                              <span className="text-[10px] text-slate-500 block mt-1 leading-snug">
                                AICTE Approved • Permanent JNTUK Affiliation
                              </span>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Dropdown for other menus */}
                    {!isAcademics && item.children && activeDropdown === item.title && (
                      <div
                        className={`absolute top-full ${isRightSide ? 'right-0' : 'left-0'} pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150`}
                        onMouseEnter={() => handleMouseEnter(item.title)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 text-slate-800 relative before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3">
                          <div className="space-y-0.5">
                            {item.children.map((sub) => (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                className="block px-3 py-2 rounded-xl hover:bg-slate-50 transition group"
                              >
                                <div className="text-xs font-semibold text-slate-800 group-hover:text-[#123D5A]">
                                  {sub.title}
                                </div>
                                {sub.desc && (
                                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                                    {sub.desc}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Zone 3 (Right): Search + High-Conversion Admission CTA */}
            <div className="relative z-20 flex items-center space-x-1 sm:space-x-2.5 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 text-slate-200 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
              aria-label="Search pages and documents"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              href="/admissions/b-category/apply-online/btech"
              className="hidden sm:inline-flex lg:hidden 2xl:inline-flex items-center gap-1.5 px-3 2xl:px-4 py-2 2xl:py-2.5 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors whitespace-nowrap"
            >
              <span>Category-B Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition"
                aria-label="Open mobile navigation menu"
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
