import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-[#F5F7F9] border-b border-[#E4E9EF] text-xs">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-gray-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#073B60] flex items-center gap-1 transition-colors">
          <Home className="w-3.5 h-3.5 text-[#073B60]" />
          <span>Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#073B60] transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="font-semibold text-[#073B60] truncate max-w-xs sm:max-w-md">
                  {item.name}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

