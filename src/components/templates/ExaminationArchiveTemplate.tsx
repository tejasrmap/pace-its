'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FileText, Download, Search, Filter, Calendar, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

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
    const matchesReg = regulationFilter === 'all' 
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
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Editorial Header */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <Calendar className="w-3.5 h-3.5" />
            OFFICE OF THE CONTROLLER OF EXAMINATIONS
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            Comprehensive archive of {documents.length} examination circulars, semester schedules, mid-exam notifications, and results.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
          
          {/* Controls: Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
            <div>
              <h2 className="font-condensed text-2xl font-bold text-[#052D49] uppercase tracking-wide">
                Examination Documents ({filteredDocs.length} Found)
              </h2>
              <p className="text-xs text-gray-500">Filter by regulation, program or search by subject keyword.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Regulation filter */}
              <select
                value={regulationFilter}
                onChange={(e) => setRegulationFilter(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none font-semibold text-gray-700 focus:border-[#E9AC21]"
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
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search timetable, subject..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 outline-none focus:border-[#E9AC21]"
                />
              </div>
            </div>
          </div>

          {/* Quick ERP Portal Link Box */}
          <div className="mb-8 p-4 rounded-xl bg-[#073B60] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="text-xs font-bold uppercase text-[#E9AC21]">LIVE RESULT LOOKUP</div>
              <div className="text-sm font-semibold">Students can view official grade cards and fee payment on the ECAP Portal</div>
            </div>
            <a
              href={siteConfig.erpPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#E9AC21] text-[#052D49] hover:bg-[#F6C54A] font-condensed font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 flex-shrink-0"
            >
              <span>ACCESS ECAP PORTAL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[700px] overflow-y-auto pr-2">
            {filteredDocs.map((doc: any, idx: number) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-[#E9AC21] bg-[#F9FAFB] hover:bg-white transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3 pr-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#073B60]/10 text-[#073B60] group-hover:bg-[#E9AC21] group-hover:text-[#052D49] flex items-center justify-center flex-shrink-0 transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-[#052D49] group-hover:text-[#073B60] truncate">
                    {doc.title || doc.url.split('/').pop()}
                  </span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 text-gray-400 group-hover:text-[#E9AC21]">
                  <Download className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

