import React from 'react';

const FuturisticButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-deep disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent-primary-2 text-bg-deep border-0 shadow-glow hover:bg-accent-primary hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0.5',
    ghost: 'bg-transparent border border-stroke-soft text-text-primary hover:bg-white/5 hover:border-stroke-strong',
    outline: 'bg-transparent border-2 border-accent-primary text-accent-primary hover:bg-accent-primary/10 hover:shadow-glow',
    icon: 'w-10 h-10 rounded-full bg-surface-1 hover:bg-surface-2 hover:shadow-glow',
    text: 'bg-transparent text-accent-primary hover:text-accent-aqua hover:bg-accent-primary/5'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-3 text-base rounded-xl',
    lg: 'px-6 py-4 text-lg rounded-xl',
    xl: 'px-8 py-5 text-xl rounded-2xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const buttonClasses = [
    baseClasses,
    variants[variant],
    variant === 'icon' ? 'w-10 h-10' : sizes[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="mr-2 animate-spin">
          <svg className={iconSizes[size]} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
      
      {icon && !loading && (
        <span className={`mr-2 ${variant === 'icon' ? '' : iconSizes[size]}`}>
          {icon}
        </span>
      )}
      
      {children}
    </button>
  );
};

export default FuturisticButton;