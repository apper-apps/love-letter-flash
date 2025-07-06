import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-hot-pink to-light-pink text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-misty-rose to-lavender-blush text-hot-pink border-2 border-hot-pink/20 hover:border-hot-pink/40',
    outline: 'bg-transparent border-2 border-hot-pink text-hot-pink hover:bg-hot-pink hover:text-white',
    ghost: 'bg-transparent text-hot-pink hover:bg-hot-pink/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'font-lato font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;