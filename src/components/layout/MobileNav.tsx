'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ExternalLink, GraduationCap, Phone, ShieldCheck } from 'lucide-react';
import { mainNavigation, quickLinks } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0B2C43] text-white shadow-2xl flex flex-col z-50 border-l border-[#123D5A]">
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#123D5A] bg-[#071E2E]">
          <div className="flex items-center space-x-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#E5AD35] to-[#F6C54A] text-[#0B2C43] font-black text-xl flex items-center justify-center font-condensed">
              P
            </span>
            <div>
              <div className="font-bold text-sm tracking-wide text-white uppercase font-condensed">
                PACE ITS
              </div>
              <div className="text-[10px] text-[#E5AD35] font-semibold tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>UGC AUTONOMOUS • NAAC A+</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#123D5A] transition"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {mainNavigation.map((item) => (
            <div key={item.title} className="border-b border-[#123D5A]/40 pb-1">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-[#123D5A] text-slate-100 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E5AD35] transition-transform duration-200 ${
                        expandedSection === item.title ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedSection === item.title && (
                    <div className="pl-3 pr-2 py-2 space-y-1 bg-[#071E2E]/60 rounded-xl my-1 border border-[#123D5A]/50">
                      {item.children.map((subItem) => (
                        <div key={subItem.title}>
                          {subItem.children ? (
                            <div className="py-1">
                              <span className="text-[10px] font-bold text-[#E5AD35] uppercase tracking-wider px-2 block mb-1">
                                {subItem.title}
                              </span>
                              <div className="pl-2 space-y-1 border-l-2 border-[#123D5A] ml-2">
                                {subItem.children.map((child) => (
                                  <Link
                                    key={child.title}
                                    href={child.href}
                                    onClick={onClose}
                                    className="block py-1 px-2 text-xs text-slate-300 hover:text-[#E5AD35] transition-colors"
                                  >
                                    {child.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <Link
                              href={subItem.href}
                              onClick={onClose}
                              className="flex items-center justify-between py-1.5 px-2 text-xs text-slate-200 hover:text-[#E5AD35] rounded hover:bg-[#123D5A]/40 transition-colors"
                            >
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <span className="text-[9px] bg-[#E5AD35] text-[#0B2C43] font-bold px-1.5 py-0.2 rounded">
                                  {subItem.badge}
                                </span>
                              )}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-[#123D5A] text-slate-100 transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          {/* Quick Portals & External Links */}
          <div className="pt-4 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#E5AD35] px-3 mb-1">
              Portals & Services
            </div>
            {quickLinks.slice(0, 7).map((ql) => (
              <a
                key={ql.title}
                href={ql.href}
                target={ql.external ? '_blank' : '_self'}
                rel={ql.external ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between py-2 px-3 text-xs text-slate-300 hover:text-white hover:bg-[#123D5A] rounded-lg transition-colors"
              >
                <span>{ql.title}</span>
                {ql.external && <ExternalLink className="w-3 h-3 text-[#E5AD35]" />}
              </a>
            ))}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-[#123D5A] bg-[#071E2E] space-y-2.5">
          <Link
            href="/admissions/b-category/apply-online/btech"
            onClick={onClose}
            className="w-full py-3 text-center font-bold text-xs uppercase tracking-wider bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] rounded-xl transition shadow flex items-center justify-center gap-1.5 font-condensed"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Apply for Admissions (2026–27)</span>
          </Link>
          <div className="text-center text-[11px] text-slate-400">
            Admissions Hotline: <strong className="text-slate-200">+91 95814 56310</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
