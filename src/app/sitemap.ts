import { MetadataRoute } from 'next';
import pagesDataRaw from '@/data/canonicalPages.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pace.ac.in';
  const pagesData = pagesDataRaw as Record<string, any>;

  // Exactly 343 verified canonical public routes
  return Object.keys(pagesData)
    .filter((path) => {
      // Exclude admin CMS portal, api, or login routes (do not confuse with public /administration/*)
      if (path === '/admin' || path.startsWith('/admin/') || path.startsWith('/api/') || path.includes('/login')) {
        return false;
      }
      return true;
    })
    .sort()
    .map((path) => {
      const isHome = path === '/';
      const cleanPath = isHome ? '' : path;
      // In Sitemaps XML, ampersands and special characters must be XML entity-escaped
      const url = `${baseUrl}${cleanPath}`.replace(/&/g, '&amp;');

      let priority = 0.6;
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

      if (isHome) {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (path.startsWith('/admissions')) {
        priority = 0.9;
        changeFrequency = 'weekly';
      } else if (path.startsWith('/academics')) {
        priority = 0.85;
        changeFrequency = 'weekly';
      } else if (path.startsWith('/research-and-development') || path.startsWith('/committees')) {
        priority = 0.75;
        changeFrequency = 'monthly';
      } else if (path.startsWith('/display-') || path.startsWith('/college-events')) {
        priority = 0.5;
        changeFrequency = 'monthly';
      }

      return {
        url,
        lastModified: new Date('2026-11-01T00:00:00.000Z'),
        changeFrequency,
        priority,
      };
    });
}


