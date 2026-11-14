'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { Briefcase, TrendingUp, Building2, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface PlacementTemplateProps {
  page: any;
}

export const PlacementTemplate: React.FC<PlacementTemplateProps> = ({ page }) => {
  const [selectedTable, setSelectedTable] = useState<number>(0);

  const tables = page.tables || [];

  const breadcrumbs = [
    { name: "Training & Placements", href: "/trainings-and-placements" },
    { name: page.title }
  ];

  const placementLinks = [
    { title: "Placements Overview", href: "/trainings-and-placements" },
    { title: "Placement Records (Year-Wise)", href: "/placements-records" },
    { title: "Skill Development Cell", href: "/skill-development" },
    { title: "Career Guidance Cell", href: "/career-guidance-cell" },
    { title: "From The Desk of TPO", href: "/tpo" },
  ];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Header Banner */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            Training & Placement Cell
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Empowering students with pre-placement corporate readiness, technical problem-solving, and high-impact campus recruitment drives across top multinationals.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Records Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm">
              <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Verified Institutional Data
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                  Selection Rosters & Recruitment Statistics
                </h2>
              </div>

              {/* Table Selector Tabs */}
              {tables.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tables.map((tbl: any, idx: number) => {
                    const label = tbl.headers?.[0] || `Placement Table ${idx + 1}`;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTable(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-condensed transition-all ${
                          selectedTable === idx
                            ? 'bg-[#123D5A] text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {label.length > 30 ? label.slice(0, 30) + '...' : label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Active Selected Table */}
              {tables[selectedTable] && (
                <DataTable
                  headers={tables[selectedTable].headers}
                  rows={tables[selectedTable].rows}
                  title={tables[selectedTable].headers?.[0] || `Placement Report ${selectedTable + 1}`}
                />
              )}

              {/* All other tables stacked */}
              {tables.length > 1 && (
                <div className="mt-8 space-y-6 pt-6 border-t border-[#E2E8F0]">
                  <h3 className="font-heading font-bold text-lg text-[#123D5A] uppercase tracking-wide">
                    Additional Placement Archives ({tables.length} Total Registers)
                  </h3>
                  {tables.map((tbl: any, idx: number) => {
                    if (idx === selectedTable) return null;
                    return (
                      <DataTable
                        key={idx}
                        headers={tbl.headers}
                        rows={tbl.rows}
                        title={tbl.headers?.[0] || `Placement Register ${idx + 1}`}
                      />
                    );
                  })}
                </div>
              )}

              {/* Downloadable Documents */}
              {page.documents && page.documents.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                  <DocumentList
                    documents={page.documents}
                    title="Placement Circulars & Offer Verification"
                    enableSearch={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Navigation Drawer */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider pb-3 border-b border-[#E2E8F0]">
                Placement Cell
              </h3>
              <ul className="space-y-1">
                {placementLinks.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-xs font-semibold text-[#172B3A] hover:text-[#123D5A] flex items-center justify-between p-2 rounded-lg hover:bg-[#F1F4F6] transition-colors"
                    >
                      <span>{item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5AD35]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Placement Highlights Callout */}
            <div className="bg-gradient-to-br from-[#123D5A] to-[#0B2C43] rounded-2xl p-6 text-white shadow-md border border-[#E5AD35]/30 space-y-3">
              <span className="text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] px-2.5 py-0.5 rounded-full uppercase">
                Annual Achievements
              </span>
              <h4 className="font-heading font-bold text-lg text-white uppercase">
                1200+ Offers in 2024–25
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highest Package: <strong className="text-white">₹18.5 LPA</strong>. Prominent recruiters include TCS, Wipro, Infosys, Virtusa, Cognizant, Tech Mahindra, and HCL Technologies.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
