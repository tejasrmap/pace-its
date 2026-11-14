'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { UserCheck, Mail, Phone, Award, Quote, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';

interface AdminProfileTemplateProps {
  page: any;
}

export const AdminProfileTemplate: React.FC<AdminProfileTemplateProps> = ({ page }) => {
  const breadcrumbs = [
    { name: "Administration", href: "/administration/chairman-message" },
    { name: page.title }
  ];

  const adminLinks = [
    { title: "Chairman's Message", href: "/administration/chairman-message" },
    { title: "Vice President's Message", href: "/administration/vice-president-message" },
    { title: "Secretary & Correspondent", href: "/administration/secretary-message" },
    { title: "Principal's Profile", href: "/administration/principal-profile" },
    { title: "Chief Administrative Officer", href: "/administration/cao" },
    { title: "Deans & Directors", href: "/administration/deans-and-directors" },
    { title: "HR Manager", href: "/administration/hrmanager" },
  ];

  const paragraphs = page.fullText
    ? page.fullText.split('\n\n').filter((p: string) => p.trim().length > 15)
    : [];

  return (
    <div className="bg-[#F8FAFB] min-h-screen font-sans">
      {/* Editorial Header */}
      <div className="bg-[#0B2C43] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E5AD35]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E5AD35] text-[#0B2C43] uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5" />
            Institutional Leadership
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl font-light leading-relaxed">
            Guiding PACE Institute of Technology & Sciences towards academic distinction, ethical leadership, and technological innovation.
          </p>
        </Container>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Message Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-10 shadow-sm relative">
              <Quote className="w-16 h-16 text-[#E5AD35]/20 absolute top-6 right-6 pointer-events-none" />

              <div className="border-b border-[#E2E8F0] pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E5AD35]">
                  Official Leadership Address
                </span>
                <h2 className="font-condensed text-2xl sm:text-3xl font-extrabold text-[#123D5A] uppercase tracking-tight mt-0.5">
                  {page.title}
                </h2>
              </div>

              {/* Message paragraphs */}
              <div className="prose max-w-none text-[#172B3A] text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                {paragraphs.length > 0 ? (
                  paragraphs.map((para: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="text-[#687783]">
                    Official executive communication, message, and biography for {page.title}.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Administration Directory */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#123D5A] uppercase tracking-wider pb-3 border-b border-[#E2E8F0]">
                Executive Leadership
              </h3>
              <ul className="space-y-1">
                {adminLinks.map((item) => {
                  const isActive = page.canonicalPath === item.href;
                  return (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition ${
                          isActive
                            ? 'bg-[#123D5A] text-white shadow-sm font-bold'
                            : 'text-[#172B3A] hover:bg-[#F1F4F6] hover:text-[#123D5A]'
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
          </div>
        </div>
      </Container>
    </div>
  );
};
