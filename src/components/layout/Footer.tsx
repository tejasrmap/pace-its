'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Award, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#052D49] text-gray-300 border-t-4 border-[#E9AC21]">
      {/* Top Accreditation Banner */}
      <div className="bg-[#04243A] py-8 border-b border-[#0A4A78]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#E9AC21] text-[#052D49] font-condensed font-black text-2xl flex items-center justify-center">
                P
              </div>
              <div>
                <h3 className="font-condensed text-xl font-bold text-white tracking-wide uppercase">
                  PACE INSTITUTE OF TECHNOLOGY & SCIENCES
                </h3>
                <p className="text-xs text-[#E9AC21] font-semibold">
                  An Autonomous Institution • Approved by AICTE, New Delhi • Permanently Affiliated to JNTUK
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                NAAC 'A' GRADE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49]">
                UGC AUTONOMOUS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                NBA ACCREDITED
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                ISO 9001:2015
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Institutional Info & Contact */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#0A4A78] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              Campus Location
            </h4>
            <p className="text-sm leading-relaxed text-gray-300">
              NH-16, Near Valluramma Temple, Ongole, Prakasam District, Andhra Pradesh, India - 523272.
            </p>
            <div className="space-y-2 pt-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E9AC21]" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E9AC21]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="pt-4 flex items-center space-x-3">
              {Object.entries(siteConfig.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#073B60] hover:bg-[#E9AC21] text-gray-300 hover:text-[#052D49] flex items-center justify-center transition-colors text-xs font-bold uppercase"
                  aria-label={key}
                >
                  {key[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Mandatory Disclosures & Downloads */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#0A4A78] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              Statutory Disclosures
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/Mandatory Disclosure PACEITS-KQ.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Mandatory Disclosure</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/rti-latest.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>RTI Act Disclosures</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>NIRF 2024 Ranking</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/student hand book.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Student Hand Book</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/HR Policy Book.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>HR Policy Book</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://pace.ac.in/public/assets/images/Institutional Development Plan_PACEITS.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Institutional Development Plan</span>
                </a>
              </li>
              <li>
                <Link href="/organization-chart" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Organization Chart</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Admissions */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#0A4A78] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              Academics & Exams
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admissions/admission-procedure" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Admission Procedure</span>
                </Link>
              </li>
              <li>
                <Link href="/admissions/courses-offered" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Courses Offered & Intake</span>
                </Link>
              </li>
              <li>
                <Link href="/admissions/fee-details" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Fee Structure</span>
                </Link>
              </li>
              <li>
                <Link href="/academics/academic-calendar" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Academic Calendar</span>
                </Link>
              </li>
              <li>
                <Link href="/regulations" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Academic Regulations</span>
                </Link>
              </li>
              <li>
                <Link href="/0/examinations-cell" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Examinations Cell</span>
                </Link>
              </li>
              <li>
                <Link href="/1/examinations-cell" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Exam Results Archive</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Portals & Online Services */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#0A4A78] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E9AC21]" />
              Portals & Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={siteConfig.erpPortal} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center justify-between text-amber-200 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                    <span>ECAP ERP / Fee Payment</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a 
                  href={siteConfig.alumniPortal} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                    <span>PACE Alumni Portal</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a 
                  href={siteConfig.grievanceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#E9AC21] flex items-center justify-between text-yellow-300 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                    <span>Online Grievance Submission</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <Link href="/trainings-and-placements" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Training & Placement Cell</span>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#E9AC21] flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>Contact Administration</span>
                </Link>
              </li>
              <li>
                <Link href="/admissions/b-category/apply-online/btech" className="inline-block mt-3 px-4 py-2 bg-[#E9AC21] text-[#052D49] font-bold rounded-lg hover:bg-[#F6C54A] transition-colors text-xs uppercase tracking-wider font-condensed">
                  Apply for Admission →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Attribution Bar */}
      <div className="bg-[#031B2C] py-6 border-t border-[#073B60] text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} PACE Institute of Technology & Sciences. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacypolicy" className="hover:text-[#E9AC21] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termsandconditions" className="hover:text-[#E9AC21] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-500">•</span>
            <span className="text-gray-300 font-medium">
              Developed & Modernized by <span className="text-[#E9AC21] font-bold">GT InnoX LLP</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

