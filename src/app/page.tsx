'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSlider } from '@/components/homepage/HeroSlider';
import { NewsTicker } from '@/components/homepage/NewsTicker';
import { WelcomeSection } from '@/components/homepage/WelcomeSection';
import { DepartmentsGrid } from '@/components/homepage/DepartmentsGrid';
import { PlacementsHighlight } from '@/components/homepage/PlacementsHighlight';
import { ResearchInnovation } from '@/components/homepage/ResearchInnovation';
import { FacilitiesShowcase } from '@/components/homepage/FacilitiesShowcase';
import { ImportantDownloads } from '@/components/homepage/ImportantDownloads';
import { AdmissionCta } from '@/components/homepage/AdmissionCta';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F5F7F9]">
      {/* Institutional Header with Transparent-to-Solid Scroll Transition */}
      <Header isTransparentDefault={true} />

      {/* Hero Cinematic Slider */}
      <HeroSlider />

      {/* Latest Announcements Marquee */}
      <NewsTicker />

      {/* Welcome & Verified Statistics */}
      <WelcomeSection />

      {/* Schools & Departments (UG, PG, Diploma) */}
      <DepartmentsGrid />

      {/* Training & Placement Highlights */}
      <PlacementsHighlight />

      {/* Research, Patents & AICTE IDEA Lab */}
      <ResearchInnovation />

      {/* Campus Living & Facilities */}
      <FacilitiesShowcase />

      {/* Important Statutory Downloads & Policy Repositories */}
      <ImportantDownloads />

      {/* Admissions Call to Action Banner */}
      <AdmissionCta />

      {/* Institutional Multi-Column Footer */}
      <Footer />
    </main>
  );
}

