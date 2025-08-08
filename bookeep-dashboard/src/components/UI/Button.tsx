import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed',
          
          // Size variants
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
          },
          
          // Color variants
          {
            // Primary
            'bg-primary-600 text-white shadow-sm hover:bg-primary-700 hover:shadow-md focus:ring-primary-500 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400':
              variant === 'primary',
            
            // Secondary
            'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 hover:shadow-md focus:ring-gray-400 active:scale-[0.98] disabled:bg-gray-50 disabled:text-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:disabled:bg-gray-800 dark:disabled:text-gray-500':
              variant === 'secondary',
            
            // Ghost
            'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400 active:scale-[0.98] disabled:text-gray-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:disabled:text-gray-600':
              variant === 'ghost',
            
            // Outline
            'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md focus:ring-gray-400 active:scale-[0.98] disabled:bg-gray-50 disabled:text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-500':
              variant === 'outline',
            
            // Destructive
            'bg-error-600 text-white shadow-sm hover:bg-error-700 hover:shadow-md focus:ring-error-500 active:scale-[0.98] disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400':
              variant === 'destructive',
          },
          
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };