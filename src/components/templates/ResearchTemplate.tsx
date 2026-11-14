'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Microscope, Award, FileText, ExternalLink, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';

interface ResearchTemplateProps {
  page: {
    canonicalPath: string;
    title: string;
    section: string;
    category?: string;
    fullText?: string;
    tables?: Array<{ headers: string[]; rows: string[][] }>;
    documents?: Array<{ title: string; url: string; academicYear?: string; extension?: string }>;
    breadcrumbs?: string[];
  };
}

export const ResearchTemplate: React.FC<ResearchTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: "Research & Development", href: "/research-and-development/about-research-and-development" },
    { name: page.title }
  ];

  const rndLinks = [
    { title: "About R & D Cell", href: "/research-and-development/about-research-and-development" },
    { title: "Patents Granted & Published", href: "/research-and-development/patents" },
    { title: "Publications & Patents", href: "/research-and-development/publications-and-patents" },
    { title: "Recognized Research Centers", href: "/research-and-development/research-centers" },
    { title: "Sponsored Research Projects", href: "/research-and-development/sponsored-projects" },
    { title: "Research Supervisors & Scholars", href: "/research-and-development/scholars" },
    { title: "Consultancy Activities", href: "/research-and-development/consultancy" },
    { title: "MOU Industrial Partners", href: "/research-and-development/mou-partners" },
    { title: "Entrepreneurship Cell (EDC)", href: "/research-and-development/edc" },
    { title: "Institution's Innovation Council (IIC)", href: "/research-and-development/iic" },
    { title: "National Innovation & Startup Policy", href: "/research-and-development/national-innovation-startup-policy" },
  ];

  const paragraphs = page.fullText
    ? page.fullText.split('\n\n').filter(p => p.trim().length > 15)
    : [];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header Banner */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider font-condensed">
            <Microscope className="w-3.5 h-3.5" />
            RESEARCH & INNOVATION CELL
          </div>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Fostering multidisciplinary research, intellectual property generation, industrial consultancy, and entrepreneurial startups at PACE ITS.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Research Content Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview / Introduction Block */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-[#E2E8F0] pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Institutional Record
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                  {page.title}
                </h2>
              </div>

              {paragraphs.length > 0 ? (
                <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4">
                  {paragraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-[#687783] py-4">
                  Detailed documentation and records regarding {page.title} under the PACE Institute of Technology & Sciences Research & Development framework.
                </div>
              )}
            </div>

            {/* Structured Tables (e.g., Patents, Grants, Scholars) */}
            {page.tables && page.tables.length > 0 && (
              <div className="space-y-6">
                {page.tables.map((table, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm overflow-hidden">
                    <DataTable
                      headers={table.headers}
                      rows={table.rows}
                      title={`${page.title} — Official Records (Register ${idx + 1})`}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Downloadable Documents / Policy Circulars */}
            {page.documents && page.documents.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                <div className="border-b border-[#E2E8F0] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-[#123D5A] text-lg uppercase">
                      Research Documents & Downloads
                    </h3>
                    <p className="text-xs text-[#687783]">
                      Official sanction letters, patent certificates, policy documents and circulars
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#123D5A]/10 text-[#123D5A]">
                    {page.documents.length} Files
                  </span>
                </div>
                <DocumentList documents={page.documents} />
              </div>
            )}
          </div>

          {/* Right Navigation & Institutional Context Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Navigation Drawer */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider border-b border-[#E2E8F0] pb-3 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5AD35]" />
                R & D Directories
              </h3>
              <nav className="space-y-1">
                {rndLinks.map((link) => {
                  const isActive = page.canonicalPath === link.href;
                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? 'bg-[#123D5A] text-white shadow-sm font-bold'
                          : 'text-[#172B3A] hover:bg-[#F1F4F6] hover:text-[#123D5A]'
                      }`}
                    >
                      <span className="truncate pr-2">{link.title}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#E5AD35]' : 'text-slate-400'}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* AICTE IDEA Lab Highlight Card */}
            <div className="bg-gradient-to-br from-[#123D5A] to-[#0B2C43] rounded-2xl p-6 text-white shadow-md border border-[#E5AD35]/30 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] uppercase">
                <Lightbulb className="w-3 h-3" />
                AICTE Sanctioned
              </div>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                AICTE IDEA Lab
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                State-of-the-art product ideation and fabrication facility equipped with 3D printers, laser cutters, PCB milling, and IoT testing workstations for student innovators.
              </p>
              <Link
                href="/aicte-idea-lab"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5AD35] hover:text-[#F6C54A] pt-2"
              >
                <span>Explore IDEA Lab</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
