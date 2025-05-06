import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHoverable?: boolean;
  withBorder?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  isHoverable = false,
  withBorder = false 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm overflow-hidden
        ${isHoverable ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-1' : ''}
        ${withBorder ? 'border border-gray-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-4 border-t border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`w-full aspect-video overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter, CardImage };