'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-white shadow-sm transition-all"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left hover:bg-[#F8FAFB] transition-colors"
            >
              <div className="flex items-center gap-3 pr-4">
                <span className="font-sans font-bold text-slate-800 text-sm sm:text-base">
                  {item.title}
                </span>
                {item.badge && (
                  <span className="text-[10px] bg-[#E5AD35]/20 text-[#B08221] px-2 py-0.5 rounded-full font-bold uppercase">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#687783] flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#123D5A]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-sm text-[#687783] leading-relaxed border-t border-[#E2E8F0]/60 bg-white">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
