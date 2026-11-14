'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSlider } from '@/components/homepage/HeroSlider';
import { NewsTicker } from '@/components/homepage/NewsTicker';
import { LeadershipVoice } from '@/components/homepage/LeadershipVoice';
import { WelcomeSection } from '@/components/homepage/WelcomeSection';
import { AcademicPrograms } from '@/components/homepage/AcademicPrograms';
import { DepartmentsGrid } from '@/components/homepage/DepartmentsGrid';
import { ResearchInnovation } from '@/components/homepage/ResearchInnovation';
import { PlacementsHighlight } from '@/components/homepage/PlacementsHighlight';
import { FacilitiesShowcase } from '@/components/homepage/FacilitiesShowcase';
import { CampusGallery } from '@/components/homepage/CampusGallery';
import { ImportantDownloads } from '@/components/homepage/ImportantDownloads';
import { AdmissionCta } from '@/components/homepage/AdmissionCta';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFB] font-sans antialiased text-[#172B3A]">
      {/* Global Navigation Header with Integrated TopBar */}
      <Header isTransparentDefault={true} />

      {/* Cinematic Hero Slider with Dignified Typography & Metrics */}
      <HeroSlider />

      {/* Official Circulars & Announcement Ribbon */}
      <NewsTicker />

      {/* Executive Leadership & Institutional Visionary Voice */}
      <LeadershipVoice />

      {/* Institutional Overview & Accreditation Milestones */}
      <WelcomeSection />

      {/* Academic Programs & Degree Pathways */}
      <AcademicPrograms />

      {/* Schools & Specialized Academic Departments */}
      <DepartmentsGrid />

      {/* Research, Patents & AICTE IDEA Laboratory */}
      <ResearchInnovation />

      {/* Campus Placements & Corporate Eminence */}
      <PlacementsHighlight />

      {/* Campus Living & World-Class Infrastructure */}
      <FacilitiesShowcase />

      {/* Official Photographic Archives & Student Events */}
      <CampusGallery />

      {/* Statutory Disclosures, Handbook & Syllabi Downloads */}
      <ImportantDownloads />

      {/* Category-B & Management Quota Admissions Call */}
      <AdmissionCta />

      {/* Authoritative Multi-Column Institutional Footer */}
      <Footer />

      {/* Floating Smooth Scroll to Top Action */}
      <BackToTop />
    </main>
  );
}
