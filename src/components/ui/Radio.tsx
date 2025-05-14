import React from 'react';
import { cn } from '@/lib/utils';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="radio"
            ref={ref}
            className={cn(
              'h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary',
              {
                'border-red-500 text-red-500 focus:ring-red-500': error,
              },
              className
            )}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label
              htmlFor={props.id}
              className="text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            {error && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

interface RadioGroupProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  error,
  children,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-2">{children}</div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}; 