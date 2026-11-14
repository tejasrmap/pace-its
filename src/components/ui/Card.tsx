import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  bordered = true,
}) => {
  const borderClass = bordered ? 'border border-[#E2E8F0]' : '';
  const hoverClass = hoverEffect
    ? 'hover:shadow-md hover:border-[#123D5A]/40 transition-all duration-200'
    : '';

  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden ${borderClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => (
  <div className={`p-5 border-b border-[#E2E8F0] flex items-start justify-between gap-4 ${className}`}>
    <div>
      {title && <h3 className="font-heading font-bold text-slate-800 text-base leading-snug">{title}</h3>}
      {subtitle && <p className="text-xs text-[#687783] mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-4 bg-[#F8FAFB] border-t border-[#E2E8F0] text-xs text-[#687783] ${className}`}>
    {children}
  </div>
);

