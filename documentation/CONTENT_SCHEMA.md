# PACE ITS — Unified Content & Data Schema

This document specifies the TypeScript interfaces and database schemas that represent all 343 reconstructed PACE ITS pages.

```typescript
export interface PageMetadata {
  title: string;
  description?: string;
  canonicalPath: string;
  section: string;
  category: string;
  breadcrumbs: { name: string; href: string }[];
}

export interface DepartmentData {
  slug: string;
  name: string;
  fullName: string;
  intake?: number;
  vision: string;
  mission: string[];
  peos?: string[];
  pos?: string[];
  psos?: string[];
  hod: {
    name: string;
    designation: string;
    qualification: string;
    email?: string;
    message?: string;
    photoUrl?: string;
  };
  faculty: {
    name: string;
    designation: string;
    qualification: string;
    experience?: string;
    areaOfSpecialization?: string;
  }[];
  laboratories: {
    name: string;
    description?: string;
    equipment?: string[];
    imageUrl?: string;
  }[];
  tabs: {
    id: string;
    title: string;
    contentHtml?: string;
    tables?: { headers: string[]; rows: string[][] }[];
    documents?: { title: string; url: string; academicYear?: string }[];
  }[];
}

export interface CommitteeData {
  slug: string;
  name: string;
  type: 'statutory' | 'non-statutory';
  description: string;
  responsibilities?: string[];
  members: {
    sNo: number;
    name: string;
    designation: string;
    role: string;
    organization?: string;
  }[];
  meetings?: {
    date: string;
    minutesUrl?: string;
    agenda?: string;
  }[];
}

export interface DocumentRecord {
  id: string;
  title: string;
  url: string;
  category: 'examinations' | 'syllabus_regulations' | 'academic_calendars' | 'accreditation_compliance' | 'institutional_policies' | 'placements' | 'general';
  academicYear?: string;
  department?: string;
  filename: string;
}

export interface GalleryEvent {
  id: string;
  title: string;
  date?: string;
  category: string;
  coverImage: string;
  images: { src: string; caption?: string }[];
}
```
