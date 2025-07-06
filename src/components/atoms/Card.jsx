import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Card = forwardRef(({ 
  children, 
  className = '',
  elevation = 'md',
  hover = false,
  ...props 
}, ref) => {
  const elevations = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl shadow-hot-pink/10',
  };

  const CardComponent = hover ? motion.div : 'div';

  return (
    <CardComponent
      ref={ref}
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      className={cn(
        'bg-white rounded-xl border border-gray-100 transition-all duration-300',
        elevations[elevation],
        hover && 'hover:shadow-xl hover:shadow-hot-pink/20',
        className
      )}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = 'Card';

export default Card;