import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Text = forwardRef(({ 
  children, 
  variant = 'body', 
  color = 'default',
  className = '',
  as: Component = 'p',
  ...props 
}, ref) => {
  const variants = {
    display: 'text-4xl md:text-5xl lg:text-6xl font-playfair font-bold',
    h1: 'text-3xl md:text-4xl font-playfair font-bold',
    h2: 'text-2xl md:text-3xl font-playfair font-semibold',
    h3: 'text-xl md:text-2xl font-playfair font-semibold',
    h4: 'text-lg md:text-xl font-playfair font-medium',
    body: 'text-base font-lato',
    caption: 'text-sm font-lato',
    small: 'text-xs font-lato',
  };

  const colors = {
    default: 'text-gray-800',
    muted: 'text-gray-600',
    light: 'text-gray-500',
    primary: 'text-hot-pink',
    gradient: 'bg-gradient-to-r from-hot-pink to-light-pink bg-clip-text text-transparent',
    white: 'text-white',
  };

  return (
    <Component
      ref={ref}
      className={cn(
        variants[variant],
        colors[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Text.displayName = 'Text';

export default Text;