import React from 'react';

const FuturisticCard = ({
  children,
  className = '',
  hover = true,
  glow = true,
  glass = true,
  border = true,
  padding = 'default',
  onClick,
  ...props
}) => {
  const baseClasses = 'relative transition-all duration-300';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const cardClasses = [
    baseClasses,
    glass && 'backdrop-blur-md bg-gradient-to-b from-surface-1/90 to-bg-base/90',
    border && 'border border-stroke-soft',
    glow && 'shadow-card',
    hover && 'hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.01]',
    paddingClasses[padding],
    'rounded-2xl',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {/* Glow Edge Effect */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-primary/20 via-accent-aqua/10 to-accent-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Hover Glow Overlay */}
      {hover && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-aqua/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}
    </div>
  );
};

// Card Header Component
FuturisticCard.Header = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Body Component
FuturisticCard.Body = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer Component
FuturisticCard.Footer = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-4 border-t border-stroke-soft/50 ${className}`} {...props}>
    {children}
  </div>
);

// Card Image Component
FuturisticCard.Image = ({ src, alt, className = '', ...props }) => (
  <div className={`mb-4 overflow-hidden rounded-xl ${className}`} {...props}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-auto transition-transform duration-300 hover:scale-105" 
    />
  </div>
);

// Card Title Component
FuturisticCard.Title = ({ children, className = '', size = 'lg', ...props }) => {
  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-xl font-semibold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold'
  };

  return (
    <h3 className={`text-text-primary mb-2 ${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </h3>
  );
};

// Card Subtitle Component
FuturisticCard.Subtitle = ({ children, className = '', ...props }) => (
  <p className={`text-text-secondary text-sm mb-3 ${className}`} {...props}>
    {children}
  </p>
);

// Card Description Component
FuturisticCard.Description = ({ children, className = '', ...props }) => (
  <p className={`text-text-muted leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export default FuturisticCard;