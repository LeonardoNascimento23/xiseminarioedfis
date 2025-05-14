import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <div className="relative">
            <input
              type="checkbox"
              ref={ref}
              className={cn(
                'peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                {
                  'border-red-500 focus:ring-red-500/20': error,
                },
                className
              )}
              {...props}
            />
            <Check
              className={cn(
                'pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100'
              )}
            />
          </div>
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

Checkbox.displayName = 'Checkbox'; 