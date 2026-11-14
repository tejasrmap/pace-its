'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSlider } from '@/components/homepage/HeroSlider';
import { NewsTicker } from '@/components/homepage/NewsTicker';
import { WelcomeSection } from '@/components/homepage/WelcomeSection';
import { AcademicPrograms } from '@/components/homepage/AcademicPrograms';
import { DepartmentsGrid } from '@/components/homepage/DepartmentsGrid';
import { FacilitiesShowcase } from '@/components/homepage/FacilitiesShowcase';
import { ResearchInnovation } from '@/components/homepage/ResearchInnovation';
import { PlacementsHighlight } from '@/components/homepage/PlacementsHighlight';
import { CampusGallery } from '@/components/homepage/CampusGallery';
import { ImportantDownloads } from '@/components/homepage/ImportantDownloads';
import { AdmissionCta } from '@/components/homepage/AdmissionCta';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFB] font-sans">
      {/* Sections A & B: Top Announcement Bar & Header */}
      <Header isTransparentDefault={true} />

      {/* Section C: Hero Section (Cinematic Campus Slider) */}
      <HeroSlider />

      {/* Section K: Live News & Notification Ticker */}
      <NewsTicker />

      {/* Sections D & E: Institutional Introduction & Verified Statistics */}
      <WelcomeSection />

      {/* Section F: Academic Programs & Degree Pathways */}
      <AcademicPrograms />

      {/* Section G: Academic Departments (B.Tech, PG & Polytechnic) */}
      <DepartmentsGrid />

      {/* Section H: Campus Living & Modern Facilities */}
      <FacilitiesShowcase />

      {/* Section I: Research, Innovation & AICTE IDEA Lab */}
      <ResearchInnovation />

      {/* Section J: Training & Placement Records */}
      <PlacementsHighlight />

      {/* Section L: Campus Gallery & Student Events */}
      <CampusGallery />

      {/* Section K (Sub): Statutory Downloads & Examination Circulars */}
      <ImportantDownloads />

      {/* Section Admissions CTA */}
      <AdmissionCta />

      {/* Section M: Institutional Multi-Column Footer */}
      <Footer />

      {/* Smooth Scroll to Top Floating Button */}
      <BackToTop />
    </main>
  );
}
