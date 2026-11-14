'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Container } from '@/components/ui/Container';
import { 
  Building, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  GraduationCap, 
  Microscope, 
  Globe2, 
  Users, 
  Compass, 
  FileText, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface InstitutionalTemplateProps {
  page: any;
}

export const InstitutionalTemplate: React.FC<InstitutionalTemplateProps> = ({ page }) => {
  const pathname = usePathname();

  const breadcrumbs = [
    { name: page.section || "Institution", href: `/${page.canonicalPath.split('/')[1]}` },
    { name: page.title }
  ];

  const quickLinks = [
    { title: "PACE at a Glance", href: "/pace-at-glance" },
    { title: "Vision & Mission", href: "/vision-and-mission" },
    { title: "Affiliation & Accreditation", href: "/affiliation-and-accreditation" },
    { title: "Organization Chart", href: "/organization-chart" },
    { title: "Awards & Accolades", href: "/awards-and-accolades" },
    { title: "Why PACE ITS", href: "/why-pace" },
    { title: "Admissions Procedure", href: "/admissions/admission-procedure" },
    { title: "Campus Facilities", href: "/campus/facilities" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  const paragraphs = page.fullText
    ? page.fullText.split('\n\n').map((p: string) => p.trim()).filter((p: string) => p.length > 15)
    : [];

  const leadParagraph = paragraphs.length > 0 ? paragraphs[0] : null;
  const subsequentParagraphs = paragraphs.length > 1 ? paragraphs.slice(1) : [];

  // Descriptive card headings and icons for multi-paragraph inner pages
  const thematicIcons = [
    { icon: GraduationCap, title: "Academic Architecture & Emerging Domains" },
    { icon: Microscope, title: "Research, Innovation & Incubation" },
    { icon: Building, title: "Campus Infrastructure & Learning Ecosystem" },
    { icon: Users, title: "Industry Immersion & Career Enablement" },
    { icon: Globe2, title: "Global Alliances & International Collaborations" },
    { icon: Award, title: "Holistic Development & Community Impact" },
  ];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans selection:bg-[#E5AD35] selection:text-[#0B2C43]">
      {/* Premium Editorial Header */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        {/* Subtle geometric background watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <Container className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              {page.section || "PACE ITS Institutional"}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5AD35]" />
              UGC Autonomous • NAAC 'A' Grade
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {page.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            PACE Institute of Technology & Sciences — Autonomous engineering institution permanently affiliated to JNTUK Kakinada and approved by AICTE, New Delhi.
          </p>

          {/* Institutional Fast Facts Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 text-xs">
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Established</span>
              <span className="font-bold text-white text-sm">2008 (18+ Yrs)</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Status</span>
              <span className="font-bold text-[#E5AD35] text-sm">UGC Autonomous</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Affiliation</span>
              <span className="font-bold text-white text-sm">Permanent JNTUK</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider">Counseling Code</span>
              <span className="font-bold text-[#E5AD35] text-sm">EAPCET: PACE</span>
            </div>
          </div>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Executive Briefing Card (Lead Paragraph) */}
            {leadParagraph && (
              <div className="bg-white rounded-2xl border-l-4 border-l-[#E5AD35] border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#123D5A] mb-3">
                  <Sparkles className="w-4 h-4 text-[#E5AD35]" />
                  <span>Executive Institutional Briefing</span>
                </div>
                <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
                  {leadParagraph}
                </p>
              </div>
            )}

            {/* 2. Structured Institutional Pillars (For Multi-Paragraph Pages) */}
            {subsequentParagraphs.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#123D5A] uppercase tracking-wide">
                    Institutional Framework & Initiatives
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {subsequentParagraphs.length} Key Focus Areas
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {subsequentParagraphs.map((para, idx) => {
                    const theme = thematicIcons[idx % thematicIcons.length];
                    const IconComponent = theme.icon;

                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] group-hover:bg-[#E5AD35]/15 text-[#123D5A] group-hover:text-[#0B2C43] flex items-center justify-center shrink-0 transition-colors">
                            <IconComponent className="w-5 h-5 text-[#123D5A]" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <h4 className="font-heading font-bold text-sm sm:text-base text-[#123D5A] leading-snug">
                              {theme.title}
                            </h4>
                            <p className="text-slate-700 text-sm leading-relaxed">
                              {para}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Fallback for Empty Content */}
            {!leadParagraph && paragraphs.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="font-heading font-bold text-lg text-slate-800">
                  Institutional Records Available Upon Formal Request
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Official statutory declarations, regulatory files, and institutional records of PACE Institute of Technology & Sciences.
                </p>
              </div>
            )}

            {/* 3. Institutional Quality Benchmark Highlights (4-Pillar Grid) */}
            <div className="bg-gradient-to-br from-[#0B2C43] to-[#123D5A] rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Core Foundations
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  Why PACE Stands Out as an Autonomous Leader
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#E5AD35]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Autonomous Curricula (PR-23)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Designed in consultation with top academic experts and corporate partners to ensure immediate industry readiness.
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#E5AD35]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>AICTE IDEA Lab & Innovation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Advanced prototyping, 3D printing, laser CNC, and robotics research centers open 24/7 for student enterprise.
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#E5AD35]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>International Alliances</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Joint research and faculty/student exchange protocols with universities including Universiti Teknikal Malaysia Melaka (UTeM).
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm text-[#E5AD35]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Holistic Campus Ecosystem</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    750-seat air-conditioned auditorium, cricket grounds, indoor gymnasium, digitized central library, and hygienic dining.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Data Tables (if page carries schedules or rosters) */}
            {page.tables && page.tables.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-heading text-lg font-bold text-[#123D5A] uppercase tracking-wide">
                    Statutory Data Schedules
                  </h3>
                </div>
                {page.tables.map((table: any, idx: number) => (
                  <DataTable
                    key={idx}
                    headers={table.headers}
                    rows={table.rows}
                    title={`${page.title} — Schedule Table ${idx + 1}`}
                  />
                ))}
              </div>
            )}

            {/* 5. Downloadable Documents */}
            {page.documents && page.documents.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-heading text-lg font-bold text-[#123D5A] uppercase tracking-wide">
                    Related Statutory Documents & Regulatory Filings
                  </h3>
                </div>
                <DocumentList
                  documents={page.documents}
                  title="Official Institutional Gazettes"
                  enableSearch={true}
                />
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Institutional Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-heading font-bold text-sm text-[#123D5A] uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
                  Institutional Overview
                </h3>
                <span className="text-[10px] font-mono text-slate-400">PACE ITS</span>
              </div>
              <ul className="space-y-1">
                {quickLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={`text-xs font-semibold flex items-center justify-between p-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#0B2C43] text-white shadow-sm font-bold'
                            : 'text-slate-700 hover:text-[#123D5A] hover:bg-slate-50'
                        }`}
                      >
                        <span>{item.title}</span>
                        <ArrowRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5AD35]' : 'text-slate-400'}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Official Accreditation Seal Card */}
            <div className="bg-gradient-to-br from-[#123D5A] to-[#071E2E] rounded-2xl p-6 text-white shadow-md border border-[#E5AD35]/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Quality Seal
                </span>
                <span className="text-xs font-mono text-amber-200">Cycle-1</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-heading font-bold text-xl text-white uppercase tracking-tight">
                  NAAC 'A' Grade
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Accredited by National Assessment and Accreditation Council with Institutional CGPA of 3.12/4.0.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span>UGC Autonomy:</span>
                  <span className="font-semibold text-white">Conferred Status</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NBA Accreditation:</span>
                  <span className="font-semibold text-white">EEE, ECE, CSE (UG)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Affiliating University:</span>
                  <span className="font-semibold text-white">Permanent JNTUK</span>
                </div>
              </div>
            </div>

            {/* Direct Admissions Counseling Cell */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
              <h4 className="font-heading font-bold text-sm text-[#123D5A] uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#E5AD35]" />
                Admissions Counseling
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with our academic counselors for Category-B admissions, fee structures, and campus visits.
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Helpline:</span>
                  <a href="tel:+919581456310" className="font-bold text-[#123D5A] hover:text-[#E5AD35]">
                    +91 95814 56310
                  </a>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a href="mailto:principal@pace.ac.in" className="font-bold text-[#123D5A] hover:text-[#E5AD35]">
                    principal@pace.ac.in
                  </a>
                </div>
              </div>

              <Link
                href="/admissions/b-category/apply-online/btech"
                className="w-full inline-flex items-center justify-center gap-1.5 py-3 px-4 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                <span>Apply for Category-B Seats</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Statutory Document Download */}
            <div className="bg-[#F8FAFB] rounded-2xl border border-slate-200 p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                Statutory Disclosures
              </span>
              <a
                href="https://pace.ac.in/public/assets/images/Mandatory%20Disclosure%20PACEITS-KQ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-[#123D5A] text-xs font-semibold text-slate-700 hover:text-[#123D5A] transition group"
              >
                <span>AICTE Mandatory Disclosure</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#123D5A]" />
              </a>
              <Link
                href="/regulations"
                className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 hover:border-[#123D5A] text-xs font-semibold text-slate-700 hover:text-[#123D5A] transition group"
              >
                <span>Academic Regulations (PR-23)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#123D5A]" />
              </Link>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};
