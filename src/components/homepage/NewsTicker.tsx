'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';

const newsItems = [
  { text: "Admissions Open for Academic Year 2026–27 (B.Tech, M.Tech, MBA & Polytechnic Diploma) — Apply Online", href: "/admissions/b-category/apply-online/btech" },
  { text: "Autonomous B.Tech Academic Regulations PR-23 & Detailed Syllabi Published — View Department Copies", href: "/regulations" },
  { text: "Campus Placements: Annual Placement Drives with Top Multinational Corporates — View Records", href: "/placements-records" },
  { text: "Autonomous Examinations Cell: Semester End Time Tables and Hall Tickets Available", href: "/0/examinations-cell" },
  { text: "AICTE IDEA LAB Innovation Workshop & Project Exhibitions Scheduled for Next Month", href: "/aicte-idea-lab" },
];

export const NewsTicker: React.FC = () => {
  return (
    <div className="bg-[#072438] border-y border-white/10 text-white py-2.5 px-4 overflow-hidden relative shadow-sm font-sans">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left Ticker Label */}
        <div className="flex items-center gap-2 pr-4 shrink-0 bg-[#072438] z-10 border-r border-white/15">
          <span className="p-1 rounded bg-[#E5AD35] text-[#072438]">
            <Bell className="w-3 h-3" />
          </span>
          <span className="font-heading font-bold text-[11px] uppercase tracking-wider text-[#E5AD35]">
            Official Circulars:
          </span>
        </div>

        {/* Animated Scrolling Ticker */}
        <div className="flex-1 overflow-hidden whitespace-nowrap pl-4">
          <div className="inline-block animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
            {newsItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center mr-10 text-xs text-slate-300 hover:text-white transition-colors">
                <Link href={item.href} className="flex items-center gap-1.5 hover:underline">
                  <span>{item.text}</span>
                  <ArrowRight className="w-3 h-3 text-[#E5AD35]" />
                </Link>
                <span className="mx-4 text-slate-600">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
