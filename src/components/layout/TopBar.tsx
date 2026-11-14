'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, ExternalLink, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#0B2C43] text-slate-300 text-xs py-2 px-4 border-b border-[#123D5A]/40 hidden lg:block font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Accreditation & Autonomous Badges */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E5AD35] text-[#0B2C43]">
            <ShieldCheck className="w-3.5 h-3.5" />
            UGC AUTONOMOUS
          </span>
          <span className="text-slate-200 text-xs font-medium">
            EAPCET Code: <strong className="text-white">PACE</strong> • NAAC 'A+' Grade • NBA Accredited • JNTUK Permanent Affiliation • AICTE Approved
          </span>
        </div>

        {/* Quick Portals & Contact */}
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-4">
            <a
              href="tel:+919581456310"
              className="flex items-center gap-1.5 hover:text-[#E5AD35] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5AD35]" />
              <span>+91 95814 56310</span>
            </a>
            <a
              href="mailto:principal@pace.ac.in"
              className="flex items-center gap-1.5 hover:text-[#E5AD35] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E5AD35]" />
              <span>principal@pace.ac.in</span>
            </a>
          </div>

          <div className="h-3 w-px bg-slate-600/60" />

          <div className="flex items-center space-x-4">
            <a
              href="https://ecap.pace.ac.in/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5AD35] flex items-center gap-1 transition-colors font-medium text-slate-200"
            >
              <span>ECAP ERP</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href="https://alumni.pace.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5AD35] flex items-center gap-1 transition-colors font-medium text-slate-200"
            >
              <span>Alumni</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <Link
              href="/0/examinations-cell"
              className="hover:text-[#E5AD35] transition-colors font-medium text-slate-200"
            >
              Examinations
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-[#E5AD35] transition-colors font-semibold text-amber-300"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
