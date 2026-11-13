'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';

const newsItems = [
  { text: "Admissions Open for Academic Year 2026–27 (B.Tech, M.Tech, MBA & Polytechnic Diploma) - Apply Online", href: "/admissions/b-category/apply-online/btech" },
  { text: "B.Tech & M.Tech Academic Regulations R23 / R25 & Syllabi Published - Download Department Copies", href: "/regulations" },
  { text: "Campus Placements 2024–2026: Over 1,200+ Placement Offers Recorded with Top Multinational Companies", href: "/placements-records" },
  { text: "Examinations Cell: End Semester Timetables and Grade Cards Published on ECAP Portal", href: "/0/examinations-cell" },
  { text: "AICTE IDEA LAB Innovation Workshop & Project Exhibitions Scheduled for Next Month", href: "/aicte-idea-lab" },
];

export const NewsTicker: React.FC = () => {
  return (
    <div className="bg-[#073B60] border-b border-[#0A4A78] text-white py-2.5 px-4 overflow-hidden relative shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left Ticker Label */}
        <div className="flex items-center gap-2 pr-4 z-10 flex-shrink-0 bg-[#073B60]">
          <span className="p-1 rounded bg-[#E9AC21] text-[#052D49]">
            <Bell className="w-3.5 h-3.5" />
          </span>
          <span className="font-condensed font-bold text-xs uppercase tracking-wider text-[#F6C54A]">
            LATEST ANNOUNCEMENTS:
          </span>
        </div>

        {/* Animated Scrolling Ticker */}
        <div className="flex-1 overflow-hidden whitespace-nowrap relative">
          <div className="inline-block animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]">
            {newsItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center mr-12 text-xs sm:text-sm text-gray-200 hover:text-[#E9AC21] transition-colors">
                <Link href={item.href} className="flex items-center gap-1.5 underline-offset-4 hover:underline">
                  <span>{item.text}</span>
                  <ArrowRight className="w-3 h-3 text-[#E9AC21]" />
                </Link>
                <span className="mx-4 text-gray-500">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

