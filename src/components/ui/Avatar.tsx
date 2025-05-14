import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  fallback?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', fallback, ...props }, ref) => {
    const [error, setError] = React.useState(false);

    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    };

    const handleError = () => {
      setError(true);
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          sizes[size],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={handleError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            {fallback ? (
              <span className="text-sm font-medium text-gray-600">
                {fallback}
              </span>
            ) : (
              <User className="h-6 w-6 text-gray-400" />
            )}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  className,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const displayCount = max ? Math.min(childrenArray.length, max) : childrenArray.length;
  const remainingCount = max ? childrenArray.length - max : 0;

  return (
    <div
      className={cn('flex -space-x-4', className)}
      {...props}
    >
      {childrenArray.slice(0, displayCount).map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-white"
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white">
          <span className="text-sm font-medium text-gray-600">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}; 