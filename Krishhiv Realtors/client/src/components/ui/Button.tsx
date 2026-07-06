import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-textPrimary font-medium rounded-xl hover:border-secondary hover:text-secondary transition-all duration-200',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-8 py-4 text-base',
  lg: 'px-10 py-5 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', size = 'md', loading, icon, iconPosition = 'left',
  children, className, disabled, ...props
}) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    className={cn(variants[variant], sizes[size], className, (disabled || loading) && 'opacity-60 cursor-not-allowed')}
    disabled={disabled || loading}
    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
  >
    {loading ? (
      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      <>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </>
    )}
  </motion.button>
);
