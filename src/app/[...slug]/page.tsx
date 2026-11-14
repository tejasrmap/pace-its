import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { DepartmentTemplate } from '@/components/templates/DepartmentTemplate';
import { InstitutionalTemplate } from '@/components/templates/InstitutionalTemplate';
import { AdminProfileTemplate } from '@/components/templates/AdminProfileTemplate';
import { AdmissionsTemplate } from '@/components/templates/AdmissionsTemplate';
import { CommitteeDetailTemplate } from '@/components/templates/CommitteeDetailTemplate';
import { ExaminationArchiveTemplate } from '@/components/templates/ExaminationArchiveTemplate';
import { GalleryEventTemplate } from '@/components/templates/GalleryEventTemplate';
import { PlacementTemplate } from '@/components/templates/PlacementTemplate';
import { ResearchTemplate } from '@/components/templates/ResearchTemplate';
import { CampusFacilityTemplate } from '@/components/templates/CampusFacilityTemplate';
import { AcademicRegulationsTemplate } from '@/components/templates/AcademicRegulationsTemplate';
import pagesDataRaw from '@/data/canonicalPages.json';

const pagesData = pagesDataRaw as Record<string, any>;

interface PageProps {
  params: {
    slug: string[];
  };
}

// Generate static params for all 343 canonical routes
export async function generateStaticParams() {
  const paths = Object.keys(pagesData).filter((p) => p !== '/');
  return paths.map((path) => ({
    slug: path.replace(/^\//, '').split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const currentPath = '/' + params.slug.join('/');
  const page =
    pagesData[currentPath] ||
    Object.values(pagesData).find((p: any) => p.canonicalPath === currentPath);

  if (!page) {
    return {
      title: 'Page Not Found | PACE ITS',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: `${page.title} | PACE ITS`,
    description: page.fullText
      ? page.fullText.slice(0, 160)
      : `Official ${page.title} information of PACE Institute of Technology & Sciences.`,
  };
}

export default function DynamicPage({ params }: PageProps) {
  const currentPath = '/' + params.slug.join('/');

  // Exact match or fallback
  let page = pagesData[currentPath];
  if (!page) {
    // Try finding matching path regardless of slight formatting differences
    page = Object.values(pagesData).find(
      (p: any) => p.canonicalPath.toLowerCase() === currentPath.toLowerCase()
    );
  }

  if (!page) {
    // If route is a parent category like /committees/statutory-committees, provide directory
    if (
      currentPath === '/committees/statutory-committees' ||
      currentPath === '/committees/non-statutory-committees'
    ) {
      page = {
        canonicalPath: currentPath,
        title: currentPath.includes('non-statutory')
          ? 'Non-Statutory Committees'
          : 'Statutory Committees',
        section: 'Committees',
        category: 'Committees',
        template: 'CommitteeDetailTemplate',
        fullText:
          'PACE Institute of Technology & Sciences statutory and non-statutory committees ensuring transparent academic administration and student welfare under UGC Autonomous guidelines.',
        tables: [],
        documents: [],
        tabs: [],
      };
    } else {
      notFound();
    }
  }

  const renderTemplate = () => {
    // Gallery & Events
    if (
      currentPath.startsWith('/display-events-gallery') ||
      currentPath.startsWith('/display-gallery') ||
      currentPath === '/college-events'
    ) {
      return <GalleryEventTemplate page={page} />;
    }

    // Placements
    if (
      currentPath === '/placements-records' ||
      currentPath === '/trainings-and-placements' ||
      page.template === 'PlacementTemplate'
    ) {
      return <PlacementTemplate page={page} />;
    }

    // Research & Development
    if (
      currentPath.startsWith('/research-and-development') ||
      page.template === 'ResearchTemplate'
    ) {
      return <ResearchTemplate page={page} />;
    }

    // Campus & Facilities
    if (
      currentPath.startsWith('/campus') ||
      currentPath === '/careers' ||
      page.template === 'CampusFacilityTemplate'
    ) {
      return <CampusFacilityTemplate page={page} />;
    }

    // Academic Regulations & Calendar
    if (
      currentPath === '/regulations' ||
      currentPath === '/curriculum_syllabus' ||
      currentPath === '/academics/academic-calendar' ||
      page.template === 'AcademicRegulationsTemplate'
    ) {
      return <AcademicRegulationsTemplate page={page} />;
    }

    switch (page.template) {
      case 'DepartmentTemplate':
      case 'PolytechnicTemplate':
        return <DepartmentTemplate page={page} />;
      case 'AdminProfileTemplate':
        return <AdminProfileTemplate page={page} />;
      case 'AdmissionsTemplate':
        return <AdmissionsTemplate page={page} />;
      case 'CommitteeDetailTemplate':
      case 'CommitteeDirectoryTemplate':
        return <CommitteeDetailTemplate page={page} />;
      case 'ExaminationArchiveTemplate':
        return <ExaminationArchiveTemplate page={page} />;
      case 'GalleryEventTemplate':
        return <GalleryEventTemplate page={page} />;
      case 'PlacementTemplate':
        return <PlacementTemplate page={page} />;
      case 'InstitutionalTemplate':
      default:
        return <InstitutionalTemplate page={page} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] font-sans">
      <Header isTransparentDefault={false} />
      <main className="flex-1">{renderTemplate()} </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
