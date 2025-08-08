import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Icon = ({ icon: IconComponent, size = 'md', className }: IconProps) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <IconComponent 
      className={cn(sizeClasses[size], className)} 
      strokeWidth={1.5}
    />
  );
};

export default Icon;