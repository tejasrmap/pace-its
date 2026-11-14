'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Award, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2C43] text-slate-300 border-t-4 border-[#E5AD35] font-sans">
      {/* Top Institutional Accreditation Banner */}
      <div className="bg-[#071E2E] py-8 border-b border-[#123D5A]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E5AD35] to-[#F6C54A] text-[#0B2C43] font-heading font-bold text-2xl flex items-center justify-center shadow">
                P
              </div>
              <div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-wide uppercase">
                  PACE INSTITUTE OF TECHNOLOGY & SCIENCES (AUTONOMOUS)
                </h3>
                <p className="text-xs text-[#E5AD35] font-semibold">
                  Approved by AICTE, New Delhi • Permanently Affiliated to JNTUK • Accredited by NAAC with 'A+' Grade
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] shadow">
                UGC AUTONOMOUS
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                NAAC 'A+' GRADE
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                NBA ACCREDITED
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                EAPCET CODE: PACE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Institutional Identity & Campus */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#123D5A] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
              Campus Location
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              NH-16, Near Valluramma Temple, Valluru, Ongole, Prakasam District, Andhra Pradesh, India - 523272.
            </p>
            <div className="space-y-2 pt-1 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E5AD35]" />
                <a href="tel:+919581456310" className="hover:text-white transition-colors">
                  +91 95814 56310 / 56311
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E5AD35]" />
                <a href="mailto:principal@pace.ac.in" className="hover:text-white transition-colors">
                  principal@pace.ac.in
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-3 flex items-center space-x-2.5">
              {[
                { name: 'FB', url: 'https://www.facebook.com/PACEITS' },
                { name: 'IN', url: 'https://www.linkedin.com/school/pace-institute-of-technology-and-sciences' },
                { name: 'YT', url: 'https://www.youtube.com/@PACEITS' },
                { name: 'IG', url: 'https://www.instagram.com/paceits' },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#123D5A] hover:bg-[#E5AD35] text-slate-200 hover:text-[#0B2C43] flex items-center justify-center transition-colors text-xs font-bold uppercase"
                  aria-label={s.name}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Statutory Disclosures & Policies */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#123D5A] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
              Mandatory Disclosures
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://pace.ac.in/public/assets/images/Mandatory%20Disclosure%20PACEITS-KQ.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>AICTE Mandatory Disclosure</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pace.ac.in/public/assets/images/rti-latest.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>RTI Act Disclosures</span>
                </a>
              </li>
              <li>
                <a
                  href="https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>NIRF 2024 Institutional Report</span>
                </a>
              </li>
              <li>
                <Link
                  href="/affiliation-and-accreditation"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Affiliation & Accreditations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/organization-chart"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Organization & Governance Chart</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/iqac"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Internal Quality Assurance Cell (IQAC)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academics & Admissions */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#123D5A] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
              Academics & Admissions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/admissions/admission-procedure"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Admission Procedure & Eligibility</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions/courses-offered"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Approved Courses & Intake Capacities</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/academics/academic-calendar"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Academic Calendar (Autonomous)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/regulations"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Academic Regulations & Syllabi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/0/examinations-cell"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Autonomous Examinations Cell</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/1/examinations-cell"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Examination Results Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Portals & Application */}
          <div className="space-y-4">
            <h4 className="font-condensed text-lg font-bold text-white uppercase tracking-wider border-b border-[#123D5A] pb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
              Online Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://ecap.pace.ac.in/default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5AD35] flex items-center justify-between text-amber-300 transition-colors font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    <span>ECAP Student / Fee ERP</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href="https://alumni.pace.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E5AD35] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    <span>PACE Alumni Network</span>
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </li>
              <li>
                <Link
                  href="/trainings-and-placements"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Training & Placement Cell</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#E5AD35] flex items-center gap-1.5 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                  <span>Contact Institutional Desk</span>
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admissions/b-category/apply-online/btech"
                  className="inline-block w-full py-2.5 text-center bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold rounded-lg transition-colors text-xs uppercase tracking-wider font-condensed shadow"
                >
                  Apply Online (Category-B) →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Attribution Bar */}
      <div className="bg-[#051622] py-6 border-t border-[#123D5A]/40 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} PACE Institute of Technology & Sciences (Autonomous). All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacypolicy" className="hover:text-[#E5AD35] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/termsandconditions" className="hover:text-[#E5AD35] transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-medium">
              Reconstructed & Modernized by <span className="text-[#E5AD35] font-bold">GT InnoX LLP</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
