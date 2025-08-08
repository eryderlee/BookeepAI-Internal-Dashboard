import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost';
  error?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', error, icon, iconPosition = 'left', type = 'text', ...props }, ref) => {
    const hasIcon = !!icon;
    
    return (
      <div className="relative">
        {hasIcon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            // Base styles
            'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            
            // Dark mode
            'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400',
            
            // Variant styles
            {
              // Default with border and background
              'focus:border-primary-500 focus:ring-primary-500/20':
                variant === 'default' && !error,
              
              // Ghost variant
              'border-transparent bg-gray-50 focus:border-primary-500 focus:bg-white focus:ring-primary-500/20 dark:bg-gray-900 dark:focus:bg-gray-800':
                variant === 'ghost' && !error,
            },
            
            // Error states
            {
              'border-error-300 focus:border-error-500 focus:ring-error-500/20 dark:border-error-600':
                error && variant === 'default',
              'border-error-300 bg-error-50 focus:border-error-500 focus:ring-error-500/20 dark:border-error-600 dark:bg-error-900/20':
                error && variant === 'ghost',
            },
            
            // Icon padding
            {
              'pl-10': hasIcon && iconPosition === 'left',
              'pr-10': hasIcon && iconPosition === 'right',
            },
            
            className
          )}
          ref={ref}
          {...props}
        />
        
        {hasIcon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };