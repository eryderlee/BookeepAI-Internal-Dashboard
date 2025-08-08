import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center font-medium rounded-full transition-colors',
          
          // Size variants
          {
            'px-2 py-0.5 text-2xs': size === 'sm',
            'px-2.5 py-1 text-xs': size === 'md',
            'px-3 py-1.5 text-sm': size === 'lg',
          },
          
          // Color variants
          {
            // Default
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300':
              variant === 'default',
            
            // Success (Green)
            'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300':
              variant === 'success',
            
            // Warning (Amber)
            'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300':
              variant === 'warning',
            
            // Error (Red)
            'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300':
              variant === 'error',
            
            // Info (Blue)
            'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300':
              variant === 'info',
            
            // Outline
            'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300':
              variant === 'outline',
            
            // Ghost
            'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700':
              variant === 'ghost',
          },
          
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };