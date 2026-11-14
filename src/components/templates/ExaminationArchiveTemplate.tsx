'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FileText, Download, Search, Filter, Calendar, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface ExaminationArchiveTemplateProps {
  page: any;
}

export const ExaminationArchiveTemplate: React.FC<ExaminationArchiveTemplateProps> = ({ page }) => {
  const [search, setSearch] = useState('');
  const [regulationFilter, setRegulationFilter] = useState('all');

  const documents = page.documents || [];

  const filteredDocs = documents.filter((d: any) => {
    const text = ((d.title || '') + ' ' + (d.url || '')).toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesReg =
      regulationFilter === 'all'
        ? true
        : text.includes(regulationFilter.toLowerCase());
    return matchesSearch && matchesReg;
  });

  const breadcrumbs = [
    { name: "Academics", href: "/academics/academic-calendar" },
    { name: "Examinations Cell", href: "/0/examinations-cell" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            Office of the Controller of Examinations
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Official repository of {documents.length} autonomous examination circulars, regular & supplementary timetables, mid-exam schedules, and results.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
          {/* Controls: Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E2E8F0]">
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-[#123D5A] uppercase tracking-wide">
                Examination Documents ({filteredDocs.length} Found)
              </h2>
              <p className="text-xs text-[#687783] mt-0.5">Filter by regulation, program or search by subject keyword.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Regulation filter */}
              <select
                value={regulationFilter}
                onChange={(e) => setRegulationFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-[#E2E8F0] outline-none font-semibold text-slate-700 focus:border-[#123D5A] bg-white"
              >
                <option value="all">All Regulations</option>
                <option value="r23">R23 Regulation</option>
                <option value="r21">R21 Regulation</option>
                <option value="r18">R18 Regulation</option>
                <option value="btech">B.Tech</option>
                <option value="mtech">M.Tech</option>
                <option value="mba">MBA</option>
              </select>

              {/* Search input */}
              <div className="relative flex-1 sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search timetable, subject..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E2E8F0] outline-none focus:border-[#123D5A] text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Quick ERP Portal Link Box */}
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-[#123D5A] to-[#0B2C43] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#E5AD35]/30">
            <div>
              <div className="text-xs font-bold uppercase text-[#E5AD35]">LIVE RESULT LOOKUP</div>
              <div className="text-sm font-semibold">Students can view official grade cards and fee payment on the ECAP Portal</div>
            </div>
            <a
              href="https://ecap.pace.ac.in/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 font-condensed"
            >
              <span>ACCESS ECAP ERP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.slice(0, 100).map((doc: any, idx: number) => {
              const isPdf = (doc.url || '').toLowerCase().endsWith('.pdf');
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#123D5A]/40 hover:shadow-md transition-all flex items-start justify-between gap-3 group bg-[#F8FAFB]"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#123D5A]/10 text-[#123D5A] group-hover:bg-[#123D5A] group-hover:text-white transition-colors flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#123D5A] transition-colors line-clamp-2">
                        {doc.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#687783]">
                        {doc.academicYear && <span>Year: {doc.academicYear}</span>}
                        <span>•</span>
                        <span className="uppercase text-[10px] font-semibold text-[#E5AD35]">
                          {isPdf ? 'PDF Circular' : 'Document'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#123D5A] hover:text-white text-slate-600 transition-colors flex-shrink-0 shadow-sm"
                    title="Download Official Notification"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>

          {filteredDocs.length > 100 && (
            <div className="mt-8 text-center text-xs text-[#687783] border-t border-[#E2E8F0] pt-4">
              Showing top 100 of {filteredDocs.length} matching examination notifications. Use the search box above to narrow down results.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};
