import React from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const alignments = {
    start: {
      top: 'left-0 -translate-x-0',
      right: 'top-0 -translate-y-0',
      bottom: 'left-0 -translate-x-0',
      left: 'bottom-0 -translate-y-0',
    },
    center: {
      top: 'left-1/2 -translate-x-1/2',
      right: 'top-1/2 -translate-y-1/2',
      bottom: 'left-1/2 -translate-x-1/2',
      left: 'top-1/2 -translate-y-1/2',
    },
    end: {
      top: 'right-0 translate-x-0',
      right: 'bottom-0 translate-y-0',
      bottom: 'right-0 translate-x-0',
      left: 'top-0 translate-y-0',
    },
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 rounded-md bg-gray-900 px-2 py-1 text-sm text-white shadow-lg',
            positions[side],
            alignments[align][side],
            className
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn('absolute h-2 w-2 rotate-45 bg-gray-900', {
              'bottom-[-4px] left-1/2 -translate-x-1/2': side === 'top',
              'left-[-4px] top-1/2 -translate-y-1/2': side === 'right',
              'top-[-4px] left-1/2 -translate-x-1/2': side === 'bottom',
              'right-[-4px] top-1/2 -translate-y-1/2': side === 'left',
            })}
          />
        </div>
      )}
    </div>
  );
}; 