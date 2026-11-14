import { MetadataRoute } from 'next';
import pagesDataRaw from '@/data/canonicalPages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pace.ac.in';
  const pagesData = pagesDataRaw as Record<string, any>;

  const canonicalRoutes = Object.keys(pagesData).map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date('2026-11-01T00:00:00.000Z'),
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1.0 : path.startsWith('/academics') || path.startsWith('/admissions') ? 0.8 : 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-11-01T00:00:00.000Z'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...canonicalRoutes.filter((r) => r.url !== baseUrl),
  ];
}

