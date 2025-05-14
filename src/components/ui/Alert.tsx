import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps {
  variant?: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200'
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  children,
  className,
  onClose
}) => {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        styles[variant],
        className
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {children}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className={cn(
                'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                {
                  'text-green-400 hover:text-green-500 focus:ring-green-500': variant === 'success',
                  'text-red-400 hover:text-red-500 focus:ring-red-500': variant === 'error',
                  'text-yellow-400 hover:text-yellow-500 focus:ring-yellow-500': variant === 'warning',
                  'text-blue-400 hover:text-blue-500 focus:ring-blue-500': variant === 'info'
                }
              )}
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 