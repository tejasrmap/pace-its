'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ChevronDown, ChevronRight, Phone, Mail, ExternalLink } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#052D49] text-white shadow-2xl flex flex-col z-50">
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#0A4A78]">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-[#E9AC21] text-[#052D49] font-black text-lg flex items-center justify-center font-condensed">
              P
            </span>
            <div>
              <div className="font-bold text-sm tracking-wide">PACE ITS</div>
              <div className="text-[10px] text-[#E9AC21] font-semibold tracking-wider">UGC AUTONOMOUS</div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#073B60]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {mainNavigation.map((item) => (
            <div key={item.title} className="border-b border-[#073B60]/50 pb-1">
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.title)}
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-[#073B60] text-gray-100 transition-colors"
                  >
                    <span>{item.title}</span>
                    <ChevronDown className={`w-4 h-4 text-[#E9AC21] transition-transform duration-200 ${expandedSection === item.title ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedSection === item.title && (
                    <div className="pl-4 pr-2 py-2 space-y-1 bg-[#062C46]/50 rounded-lg my-1">
                      {item.children.map((subItem) => (
                        <div key={subItem.title}>
                          {subItem.children ? (
                            <div className="py-1">
                              <span className="text-[11px] font-bold text-[#E9AC21] uppercase tracking-wider px-2">
                                {subItem.title}
                              </span>
                              <div className="pl-3 mt-1 space-y-1 border-l border-[#0A4A78]">
                                {subItem.children.map((child) => (
                                  <Link
                                    key={child.title}
                                    href={child.href}
                                    onClick={onClose}
                                    className="block py-1.5 px-2 text-xs text-gray-300 hover:text-[#E9AC21] transition-colors"
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
                              className="flex items-center justify-between py-1.5 px-2 text-xs text-gray-200 hover:text-[#E9AC21] rounded hover:bg-[#073B60]/40 transition-colors"
                            >
                              <span>{subItem.title}</span>
                              {subItem.badge && (
                                <span className="text-[9px] bg-[#E9AC21] text-[#052D49] font-bold px-1.5 py-0.5 rounded">
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
                  className="block py-2.5 px-3 rounded-lg text-sm font-semibold hover:bg-[#073B60] text-gray-100 transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}

          {/* Quick links block */}
          <div className="pt-4 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#E9AC21] px-3 mb-1">
              Portals & Services
            </div>
            {quickLinks.slice(0, 6).map((ql) => (
              <a
                key={ql.title}
                href={ql.href}
                target={ql.external ? "_blank" : "_self"}
                rel={ql.external ? "noopener noreferrer" : undefined}
                className="flex items-center justify-between py-2 px-3 text-xs text-gray-300 hover:text-white hover:bg-[#073B60] rounded-lg transition-colors"
              >
                <span>{ql.title}</span>
                {ql.external && <ExternalLink className="w-3 h-3 text-[#E9AC21]" />}
              </a>
            ))}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-[#0A4A78] bg-[#062C46] space-y-3">
          <Link
            href="/admissions/b-category/apply-online/btech"
            onClick={onClose}
            className="block w-full py-2.5 text-center font-bold text-sm bg-[#E9AC21] text-[#052D49] rounded-xl hover:bg-[#F6C54A] transition-colors shadow-lg"
          >
            APPLY NOW 2026–27
          </Link>
          <div className="text-center text-[11px] text-gray-400">
            Admissions Helpline: {siteConfig.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

