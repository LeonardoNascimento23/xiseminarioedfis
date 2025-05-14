import React from 'react';
import { cn } from '@/lib/utils';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn('min-w-full divide-y divide-gray-200', className)}
        {...props}
      />
    </div>
  );
};

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <thead
      className={cn('bg-gray-50', className)}
      {...props}
    />
  );
};

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({
  className,
  ...props
}) => {
  return (
    <tbody
      className={cn('divide-y divide-gray-200 bg-white', className)}
      {...props}
    />
  );
};

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cn('hover:bg-gray-50', className)}
      {...props}
    />
  );
};

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500',
        className
      )}
      {...props}
    />
  );
};

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

export const TableCell: React.FC<TableCellProps> = ({
  className,
  ...props
}) => {
  return (
    <td
      className={cn('whitespace-nowrap px-6 py-4 text-sm text-gray-500', className)}
      {...props}
    />
  );
};

interface TableEmptyProps {
  message?: string;
  className?: string;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  message = 'Nenhum dado encontrado',
  className,
}) => {
  return (
    <tr>
      <td
        colSpan={100}
        className={cn(
          'px-6 py-4 text-center text-sm text-gray-500',
          className
        )}
      >
        {message}
      </td>
    </tr>
  );
}; 