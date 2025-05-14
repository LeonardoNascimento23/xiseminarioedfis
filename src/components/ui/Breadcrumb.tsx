import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
}) => {
  return (
    <nav
      className={cn('flex', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-5 w-5 text-gray-400" />
            {item.href ? (
              <Link
                to={item.href}
                className={cn(
                  'ml-2 text-sm font-medium',
                  index === items.length - 1
                    ? 'text-gray-500'
                    : 'text-gray-700 hover:text-gray-900'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="ml-2 text-sm font-medium text-gray-500"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 