import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  eyebrow,
  description,
  align = 'center',
  dark = false,
  className = '',
  action,
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-10 sm:mb-12 ${alignClass} max-w-3xl ${className}`}>
      {eyebrow && (
        <div className="mb-2.5">
          <Badge variant="gold" size="sm">
            {eyebrow}
          </Badge>
        </div>
      )}
      <div className={`flex flex-col sm:flex-row items-baseline gap-4 ${align === 'center' ? 'justify-center' : 'justify-between'}`}>
        <h2
          className={`font-condensed text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight ${
            dark ? 'text-white' : 'text-[#123D5A]'
          }`}
        >
          {title}
        </h2>
        {action && <div className="mt-2 sm:mt-0">{action}</div>}
      </div>
      {description && (
        <p
          className={`mt-2.5 text-sm sm:text-base leading-relaxed ${
            dark ? 'text-slate-300' : 'text-[#687783]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
