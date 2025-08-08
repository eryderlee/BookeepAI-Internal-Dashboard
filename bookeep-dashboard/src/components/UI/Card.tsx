import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'ghost' | 'bordered';
  hoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl transition-all duration-200',
          
          // Variant styles
          {
            // Default card with background and shadow
            'bg-white shadow-sm border border-gray-200/50 dark:bg-gray-800 dark:border-gray-700/50 dark:shadow-lg':
              variant === 'default',
            
            // Ghost card with subtle background
            'bg-gray-50/50 border border-gray-100 dark:bg-gray-900/50 dark:border-gray-800':
              variant === 'ghost',
            
            // Bordered card without background
            'border border-gray-200 dark:border-gray-700':
              variant === 'bordered',
          },
          
          // Hoverable styles
          {
            'hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-gray-300 dark:hover:border-gray-600':
              hoverable && variant === 'default',
            'hover:bg-gray-100/50 dark:hover:bg-gray-800/50':
              hoverable && variant === 'ghost',
            'hover:border-gray-300 hover:shadow-sm dark:hover:border-gray-600':
              hoverable && variant === 'bordered',
          },
          
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6 pb-4', className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-gray-600 dark:text-gray-400', className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
    );
  }
);

CardContent.displayName = 'CardContent';

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };