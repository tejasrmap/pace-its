'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ChevronDown, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { mainNavigation, quickLinks } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { TopBar } from './TopBar';
import { SearchModal } from './SearchModal';
import { MobileNav } from './MobileNav';

interface HeaderProps {
  isTransparentDefault?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isTransparentDefault = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerBgClass = isScrolled
    ? 'bg-[#073B60] shadow-xl py-2.5 border-b border-[#0A4A78]'
    : isTransparentDefault
    ? 'bg-gradient-to-b from-[#052D49]/90 to-transparent py-4'
    : 'bg-[#073B60] py-3 shadow-md border-b border-[#0A4A78]';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerBgClass}`}>
        <TopBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Institutional Logo & Identity */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E9AC21] to-[#F6C54A] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform flex-shrink-0">
                <span className="font-condensed font-black text-2xl text-[#052D49]">P</span>
              </div>
              <div className="flex flex-col">
                <span className="font-condensed text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight uppercase group-hover:text-[#F6C54A] transition-colors">
                  PACE ITS
                </span>
                <span className="text-[10px] text-gray-200 tracking-wider font-semibold flex items-center gap-1">
                  <span>AUTONOMOUS</span>
                  <span className="text-[#E9AC21]">•</span>
                  <span>NAAC 'A' GRADE</span>
                  <span className="text-[#E9AC21]">•</span>
                  <span>NBA</span>
                </span>
              </div>
            </Link>

            {/* CENTER: Primary Flame-inspired Institutional Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
              {mainNavigation.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-[#E9AC21] rounded-lg transition-colors"
                  >
                    <span>{item.title}</span>
                    {item.children && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 group-hover:text-[#E9AC21] transition-transform" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.title && (
                    <div className="absolute top-full left-0 w-72 bg-[#052D49] border border-[#0A4A78] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="space-y-1">
                        {item.children.map((subItem) => (
                          <div key={subItem.title}>
                            {subItem.children ? (
                              <div className="p-2 border-b border-[#073B60]">
                                <span className="text-[11px] font-bold text-[#E9AC21] uppercase tracking-wider block mb-1">
                                  {subItem.title}
                                </span>
                                <div className="space-y-0.5">
                                  {subItem.children.slice(0, 7).map((child) => (
                                    <Link
                                      key={child.title}
                                      href={child.href}
                                      className="block px-2 py-1 text-xs text-gray-300 hover:text-[#E9AC21] hover:bg-[#073B60]/50 rounded transition-colors"
                                    >
                                      {child.title}
                                    </Link>
                                  ))}
                                  {subItem.children.length > 7 && (
                                    <Link
                                      href={subItem.href}
                                      className="block px-2 py-1 text-[11px] text-[#E9AC21] font-semibold hover:underline"
                                    >
                                      View All ({subItem.children.length}) →
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className="flex items-center justify-between px-3 py-2 text-xs text-gray-200 hover:text-white hover:bg-[#073B60] rounded-lg transition-colors group/sub"
                              >
                                <span>{subItem.title}</span>
                                {subItem.badge ? (
                                  <span className="text-[10px] bg-[#E9AC21] text-[#052D49] font-bold px-1.5 py-0.5 rounded">
                                    {subItem.badge}
                                  </span>
                                ) : (
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 text-[#E9AC21] transition-all" />
                                )}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/admissions/b-category/apply-online/btech"
                className="px-3 py-2 text-sm font-medium text-white hover:text-[#E9AC21] transition-colors"
              >
                Apply
              </Link>
            </nav>

            {/* RIGHT: Search, Apply CTA, and Hamburger Menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="p-2 rounded-xl text-white hover:text-[#E9AC21] hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Gold "APPLY NOW" CTA button */}
              <Link
                href="/admissions/b-category/apply-online/btech"
                className="hidden md:inline-flex items-center justify-center px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#052D49] bg-[#E9AC21] hover:bg-[#F6C54A] rounded-xl shadow-lg hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 font-condensed"
              >
                APPLY NOW
              </Link>

              {/* Gold-accented MENU button */}
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-[#E9AC21] text-white hover:text-[#052D49] rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Menu className="w-4 h-4" />
                <span className="font-condensed text-xs hidden sm:inline">MENU</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
};

