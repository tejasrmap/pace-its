'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';

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
}

const slides: Slide[] = [
  {
    id: 1,
    tag: "UGC AUTONOMOUS • NAAC 'A+' GRADE",
    headline: "Shaping the Engineers",
    accentText: "& Innovators of Tomorrow",
    subhead: "A premier engineering campus in Prakasam district offering outcome-based education, state-of-the-art AICTE IDEA labs, and permanent JNTUK affiliation.",
    primaryCtaText: "Explore Programs",
    primaryCtaLink: "/admissions/courses-offered",
    secondaryCtaText: "Virtual Campus Tour",
    secondaryCtaLink: "/campus/facilities",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    tag: "ACADEMIC YEAR 2026–27",
    headline: "Admissions Open for",
    accentText: "B.Tech, M.Tech & MBA",
    subhead: "Future-ready engineering curricula across Artificial Intelligence, Data Science, Cyber Security, Computer Science, and core disciplines.",
    primaryCtaText: "Apply Online Now",
    primaryCtaLink: "/admissions/b-category/apply-online/btech",
    secondaryCtaText: "Admission Guidelines",
    secondaryCtaLink: "/admissions/admission-procedure",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    tag: "TRAINING & PLACEMENT COMMAND",
    headline: "Record Placements with",
    accentText: "Top Global Enterprises",
    subhead: "Consistent annual placements with leading technology corporations including TCS, Infosys, Cognizant, Wipro, Accenture, and Hexaware.",
    primaryCtaText: "Placement Track Record",
    primaryCtaLink: "/placements-records",
    secondaryCtaText: "Our Recruiting Partners",
    secondaryCtaLink: "/trainings-and-placements",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    tag: "RESEARCH & PATENTS",
    headline: "Advancing Innovation",
    accentText: "& AICTE IDEA Laboratory",
    subhead: "32 published patents, ₹1.4 Cr+ external research grants, and dedicated startup incubation centers driving breakthrough solutions.",
    primaryCtaText: "Explore R&D Cell",
    primaryCtaLink: "/research-and-development/about-research-and-development",
    secondaryCtaText: "View Patents Registry",
    secondaryCtaLink: "/research-and-development/patents",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
];

export const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative bg-[#072438] text-white pt-28 sm:pt-36 pb-16 lg:pb-24 overflow-hidden">
      {/* Background Radial Glow & Texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B2C43] via-[#072438] to-[#041624] opacity-95" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5AD35_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {/* Pill Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5AD35]/20 border border-[#E5AD35]/40 text-[#E5AD35] text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{slide.tag}</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-white leading-[1.15] tracking-tight">
                  {slide.headline}{' '}
                  <span className="text-[#E5AD35] block sm:inline">{slide.accentText}</span>
                </h1>

                {/* Refined Subtitle */}
                <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                  {slide.subhead}
                </p>

                {/* Dual CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={slide.primaryCtaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#E5AD35] hover:bg-[#CF9B2D] text-[#0B2C43] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{slide.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={slide.secondaryCtaLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl backdrop-blur-sm transition-all"
                  >
                    <span>{slide.secondaryCtaText}</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Dots & Nav */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      current === idx ? 'w-8 bg-[#E5AD35]' : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono">
                0{current + 1} / 0{slides.length}
              </div>

              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Photographic Showcase */}
          <div className="lg:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 aspect-[4/3] bg-[#072438]"
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.headline}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#072438]/80 via-transparent to-transparent pointer-events-none" />

                {/* Discrete Overlay Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
                  <span className="font-semibold text-slate-200">PACE ITS Ongole Campus</span>
                  <span className="text-[#E5AD35] font-bold">Autonomous</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Docked Institutional Stats Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5AD35]/20 text-[#E5AD35] flex items-center justify-center font-bold text-lg shrink-0 border border-[#E5AD35]/30">
              A+
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">NAAC 'A+' Grade</div>
              <div className="text-xs text-slate-400">National Accreditation</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-lg shrink-0 border border-white/15">
              🎓
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">6,000+ Students</div>
              <div className="text-xs text-slate-400">Vibrant Academic Community</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5AD35]/20 text-[#E5AD35] flex items-center justify-center font-bold text-lg shrink-0 border border-[#E5AD35]/30">
              💼
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">850+ Placements</div>
              <div className="text-xs text-slate-400">Across 60+ Top MNCs</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-lg shrink-0 border border-white/15">
              🏆
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold text-white leading-tight">₹12.50 LPA</div>
              <div className="text-xs text-slate-400">Highest Salary Package</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
