import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items matching your criteria at this moment.',
  icon = <FileQuestion className="w-10 h-10 text-slate-400" />,
  actionLabel,
  onAction,
  actionHref,
  className = '',
}) => {
  return (
    <div
      className={`text-center py-12 px-6 rounded-2xl border-2 border-dashed border-[#E2E8F0] bg-[#F8FAFB] flex flex-col items-center justify-center max-w-md mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="font-heading font-bold text-slate-800 text-base">{title}</h4>
      <p className="text-xs text-[#687783] mt-1.5 max-w-xs">{description}</p>
      {(actionLabel && (onAction || actionHref)) && (
        <div className="mt-5">
          {actionHref ? (
            <Button variant="primary" size="sm" href={actionHref}>
              {actionLabel}
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

