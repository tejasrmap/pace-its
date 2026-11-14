'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, ExternalLink, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#072B44] text-slate-300 text-xs py-1.5 px-4 border-b border-white/10 hidden lg:block font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Statutory & Institutional Accreditation */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#E5AD35] text-[#0B2C43] tracking-wide uppercase">
            <ShieldCheck className="w-3 h-3" />
            UGC Autonomous
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-200 text-xs font-semibold">
            EAPCET Code: <span className="text-amber-300 font-bold">PACE</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 text-xs">NAAC 'A+' Grade</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 text-xs">NBA Accredited Programs</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-300 text-xs">Permanent JNTUK Affiliation</span>
        </div>

        {/* Right: Hotline & Quick Access */}
        <div className="flex items-center space-x-5 text-xs">
          <a
            href="tel:+919581456310"
            className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-[#E5AD35]" />
            <span className="font-medium">+91 95814 56310</span>
          </a>

          <span className="h-3 w-px bg-white/20" />

          <a
            href="https://ecap.pace.ac.in/default.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 flex items-center gap-1 transition-colors text-slate-300 font-medium"
          >
            <span>ECAP ERP</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <Link
            href="/0/examinations-cell"
            className="hover:text-amber-300 transition-colors text-slate-300 font-medium"
          >
            Examinations
          </Link>

          <Link
            href="/admin/login"
            className="text-amber-300 hover:text-white font-semibold transition-colors flex items-center gap-1"
          >
            <span>Portal Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
