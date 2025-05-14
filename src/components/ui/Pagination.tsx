import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const pages = React.useMemo(() => {
    const pagesArray = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
        pagesArray.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pagesArray.push(1);
        pagesArray.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pagesArray.push(i);
        }
      } else {
        pagesArray.push(1);
        pagesArray.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
        pagesArray.push(totalPages);
      }
    }

    return pagesArray;
  }, [currentPage, totalPages]);

  return (
    <nav
      className={cn('flex items-center justify-center space-x-2', className)}
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          {
            'cursor-not-allowed opacity-50': currentPage === 1,
          }
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Página anterior</span>
      </button>

      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-sm text-gray-700">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                'inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                {
                  'border-primary bg-primary text-white': page === currentPage,
                  'border-gray-300 bg-white text-gray-700 hover:bg-gray-50':
                    page !== currentPage,
                }
              )}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          {
            'cursor-not-allowed opacity-50': currentPage === totalPages,
          }
        )}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Próxima página</span>
      </button>
    </nav>
  );
}; 