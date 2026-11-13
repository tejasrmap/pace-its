'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Sparkles } from 'lucide-react';

interface Slide {
  id: number;
  tag: string;
  headline: string;
  accentText: string;
  subhead: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  statsBadge?: { number: string; label: string };
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "UGC AUTONOMOUS • NAAC 'A' GRADE",
    headline: "SHAPING THE ENGINEERS",
    accentText: "& LEADERS OF TOMORROW",
    subhead: "Discover a premier learning ecosystem where transformative knowledge meets cutting-edge technological innovation.",
    primaryCtaText: "EXPLORE PROGRAMS",
    primaryCtaLink: "/admissions/courses-offered",
    secondaryCtaText: "VIRTUAL CAMPUS TOUR",
    secondaryCtaLink: "/campus/facilities",
    imageUrl: "https://pace.ac.in/public/assets/images/slider/banner1.jpg",
    statsBadge: { number: "NAAC 'A'", label: "National Accreditation" }
  },
  {
    id: 2,
    tag: "ACADEMIC YEAR 2026–27",
    headline: "ADMISSIONS OPEN FOR",
    accentText: "B.TECH, M.TECH & MBA",
    subhead: "Choose from 13 future-ready disciplines in AI, Machine Learning, Cyber Security, Data Science, and Core Engineering.",
    primaryCtaText: "APPLY ONLINE NOW",
    primaryCtaLink: "/admissions/b-category/apply-online/btech",
    secondaryCtaText: "ADMISSION PROCEDURE",
    secondaryCtaLink: "/admissions/admission-procedure",
    imageUrl: "https://pace.ac.in/public/assets/images/slider/banner2.jpg",
    statsBadge: { number: "13+", label: "Undergraduate & PG Programs" }
  },
  {
    id: 3,
    tag: "TRAINING & PLACEMENT CELL",
    headline: "INDUSTRY 4.0 CAREERS",
    accentText: "& RECORD PLACEMENTS",
    subhead: "1,200+ annual placement offers from premier global recruiters including TCS, Infosys, Wipro, Cognizant, Tech Mahindra & Amazon.",
    primaryCtaText: "VIEW PLACEMENT RECORDS",
    primaryCtaLink: "/placements-records",
    secondaryCtaText: "OUR RECRUITERS",
    secondaryCtaLink: "/trainings-and-placements",
    imageUrl: "https://pace.ac.in/public/assets/images/slider/banner3.jpg",
    statsBadge: { number: "1200+", label: "Annual Offers" }
  },
  {
    id: 4,
    tag: "RESEARCH & INCUBATION",
    headline: "ADVANCING PATENTS",
    accentText: "& AICTE IDEA LAB",
    subhead: "Empowering visionary engineering minds through patents, startup incubation, sponsored research grants, and international journals.",
    primaryCtaText: "EXPLORE R&D CELL",
    primaryCtaLink: "/research-and-development/about-research-and-development",
    secondaryCtaText: "VIEW PATENTS",
    secondaryCtaLink: "/research-and-development/patents",
    imageUrl: "https://pace.ac.in/public/assets/images/slider/banner4.jpg",
    statsBadge: { number: "15+", label: "Published Patents" }
  }
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <div className="relative min-h-[650px] lg:h-[85vh] bg-[#052D49] overflow-hidden pt-24 lg:pt-32 flex flex-col justify-between">
      {/* Background Architectural & Radial Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#073B60] opacity-50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#E9AC21] opacity-10 blur-3xl pointer-events-none" />
        
        {/* Subtle geometric grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Hero Slider Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex items-center w-full py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* LEFT: Text Hierarchy & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Golden Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E9AC21]/15 border border-[#E9AC21]/30 text-[#F6C54A] text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#E9AC21]" />
                  <span>{slide.tag}</span>
                </div>

                {/* Condensed Oswald Headline */}
                <h1 className="font-condensed text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
                  <span>{slide.headline}</span> <br />
                  <span className="text-[#E9AC21]">{slide.accentText}</span>
                </h1>

                {/* Subtitle / Description */}
                <p className="text-gray-200 text-base sm:text-lg max-w-2xl leading-relaxed font-light">
                  {slide.subhead}
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={slide.primaryCtaLink}
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-lg hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={slide.secondaryCtaLink}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-condensed font-semibold text-sm sm:text-base uppercase tracking-wider rounded-xl transition-all"
                  >
                    <span>{slide.secondaryCtaText}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Photography & Architectural Composition */}
          <div className="lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* Decorative Navy / Gold frame */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 aspect-[4/3] sm:aspect-[16/11] bg-[#073B60]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.headline}
                    onError={(e) => {
                      // Fallback image if source slider image is temporarily unreachable
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#052D49]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Accent Box */}
                  <div className="absolute top-4 right-4 bg-[#052D49]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E9AC21]/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E9AC21] animate-pulse" />
                    <span className="text-[11px] font-bold text-white tracking-wide uppercase">AUTONOMOUS</span>
                  </div>

                  {/* Floating Stats Badge */}
                  {slide.statsBadge && (
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border-l-4 border-[#E9AC21] text-[#052D49]">
                      <div className="font-condensed font-black text-2xl leading-none text-[#073B60]">
                        {slide.statsBadge.number}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                        {slide.statsBadge.label}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* BOTTOM: Golden Horizontal Separator & Carousel Controls */}
      <div className="relative z-20 border-t border-[#0A4A78] bg-[#04243A]/80 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Slide Indicator Dots */}
          <div className="flex items-center space-x-3">
            {slides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => {
                  setAutoPlay(false);
                  setCurrent(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  current === index
                    ? 'w-10 h-2.5 bg-[#E9AC21]'
                    : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <span className="text-xs text-gray-400 font-mono pl-2">
              0{current + 1} / 0{slides.length}
            </span>
          </div>

          {/* Quick Nav Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="p-2 rounded-lg bg-white/5 hover:bg-[#E9AC21] text-gray-300 hover:text-[#052D49] transition-colors border border-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="p-2 rounded-lg bg-white/5 hover:bg-[#E9AC21] text-gray-300 hover:text-[#052D49] transition-colors border border-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

