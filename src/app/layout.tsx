import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/data/siteConfig';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#073B60',
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Autonomous Institution`,
    template: `%s | ${siteConfig.name}`,
  },
  description: "PACE Institute of Technology & Sciences is an Autonomous Engineering College in Ongole, AP. Accredited by NAAC with 'A' Grade, NBA accredited, approved by AICTE, permanently affiliated to JNTUK.",
  keywords: [
    "PACE ITS", "PACE Ongole", "PACE Institute of Technology and Sciences",
    "Engineering college in Ongole", "Autonomous Engineering AP", "B.Tech Admissions AP",
    "NAAC A Grade College AP", "AI & Data Science Ongole", "Cyber Security Engineering AP"
  ],
  authors: [{ name: "GT InnoX LLP", url: "https://pace.ac.in" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#E9AC21] selection:text-[#052D49]">
        {children}
      </body>
    </html>
  );
}
