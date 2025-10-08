/**
 * Avatar component for user profile pictures and initials
 * Built with Tailwind CSS
 */

import * as React from 'react';
import { cn, getInitials, generateAvatarColor } from '@/lib/utils';

export interface IAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, IAvatarProps>(
  ({ className, src, alt, name, size = 'md', fallback, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const sizeClasses = {
      sm: 'h-6 w-6 text-xs',
      md: 'h-8 w-8 text-sm',
      lg: 'h-10 w-10 text-base',
      xl: 'h-12 w-12 text-lg',
    };

    const displayName = name || alt || fallback || 'User';
    const initials = getInitials(displayName);
    const backgroundColor = generateAvatarColor(displayName);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || displayName}
            className='aspect-square h-full w-full object-cover'
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className='flex h-full w-full items-center justify-center font-medium text-background'
            style={{ backgroundColor }}
            aria-label={displayName}
          >
            {initials}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
