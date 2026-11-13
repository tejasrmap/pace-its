'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export const TopBar: React.FC = () => {
  return (
    <div className="bg-[#052D49] text-gray-300 text-xs py-2 px-4 border-b border-[#0A4A78]/50 hidden lg:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Accreditation & Autonomous Pill */}
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E9AC21] text-[#052D49]">
            <ShieldCheck className="w-3.5 h-3.5" />
            UGC AUTONOMOUS
          </span>
          <span className="text-gray-300 text-xs font-medium">
            NAAC 'A' Grade • NBA Accredited • Permanently Affiliated to JNTUK • AICTE Approved
          </span>
        </div>

        {/* Quick Portals & Contact */}
        <div className="flex items-center space-x-6 text-xs">
          <div className="flex items-center space-x-4">
            <a 
              href={`tel:${siteConfig.phone}`} 
              className="flex items-center gap-1.5 hover:text-[#E9AC21] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E9AC21]" />
              <span>{siteConfig.phone}</span>
            </a>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="flex items-center gap-1.5 hover:text-[#E9AC21] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E9AC21]" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          <div className="h-3 w-px bg-gray-600" />

          <div className="flex items-center space-x-4">
            <a 
              href={siteConfig.erpPortal} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#E9AC21] flex items-center gap-1 transition-colors"
            >
              <span>ECAP ERP</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a 
              href={siteConfig.alumniPortal} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#E9AC21] flex items-center gap-1 transition-colors"
            >
              <span>Alumni</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <Link href="/0/examinations-cell" className="hover:text-[#E9AC21] transition-colors">
              Examinations
            </Link>
            <a 
              href={siteConfig.grievanceUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#E9AC21] text-amber-300 transition-colors"
            >
              Grievance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

