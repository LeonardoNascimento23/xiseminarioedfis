import React from 'react';
import { cn } from '@/lib/utils';
import { useForm, UseFormProps, FieldValues, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProps<T extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  schema: z.ZodType<T>;
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>['defaultValues'];
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({
  schema,
  onSubmit,
  defaultValues,
  children,
  className,
  ...props
}: FormProps<T>) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      {...props}
    >
      {typeof children === 'function'
        ? children({ register, errors })
        : children}
    </form>
  );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: any;
}

export function FormField({
  label,
  error,
  register,
  name,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        {...register(name)}
        {...props}
        id={name}
        className={cn(
          'block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm',
          {
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  register: any;
}

export function FormTextArea({
  label,
  error,
  register,
  name,
  className,
  ...props
}: FormTextAreaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        {...register(name)}
        {...props}
        id={name}
        className={cn(
          'block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm',
          {
            'border-red-500 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      />
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
} 