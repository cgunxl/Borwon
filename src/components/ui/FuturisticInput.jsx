import React, { forwardRef, useState } from 'react';

const FuturisticInput = forwardRef(({
  label,
  placeholder,
  type = 'text',
  error,
  success,
  disabled = false,
  required = false,
  className = '',
  icon,
  iconPosition = 'left',
  onFocus,
  onBlur,
  onChange,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    onChange?.(e);
  };

  const baseClasses = 'relative w-full transition-all duration-200';
  
  const inputClasses = [
    'w-full px-4 py-3 bg-bg-raised border rounded-xl text-text-primary placeholder-text-muted',
    'transition-all duration-200 outline-none',
    'focus:border-accent-primary-2 focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-bg-deep',
    isFocused && 'border-accent-primary-2',
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
    success && 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
    disabled && 'opacity-50 cursor-not-allowed bg-surface-2',
    className
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'block text-sm font-medium text-text-secondary mb-2 transition-colors duration-200',
    isFocused && 'text-accent-primary',
    error && 'text-red-400',
    success && 'text-green-400'
  ].filter(Boolean).join(' ');

  const iconClasses = [
    'absolute top-1/2 transform -translate-y-1/2 text-text-muted transition-colors duration-200',
    iconPosition === 'left' ? 'left-3' : 'right-3',
    isFocused && 'text-accent-primary',
    error && 'text-red-400',
    success && 'text-green-400'
  ].filter(Boolean).join(' ');

  return (
    <div className={baseClasses}>
      {/* Label */}
      {label && (
        <label className={labelClasses}>
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className={`${iconClasses} left-3`}>
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{
            paddingLeft: icon && iconPosition === 'left' ? '3rem' : undefined,
            paddingRight: icon && iconPosition === 'right' ? '3rem' : undefined
          }}
          {...props}
        />

        {/* Right Icon */}
        {icon && iconPosition === 'right' && (
          <div className={`${iconClasses} right-3`}>
            {icon}
          </div>
        )}

        {/* Focus Line Animation */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-primary to-accent-aqua transition-all duration-300 ${
          isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'
        }`} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 flex items-center text-red-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-2 flex items-center text-green-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {success}
        </div>
      )}
    </div>
  );
});

FuturisticInput.displayName = 'FuturisticInput';

export default FuturisticInput;