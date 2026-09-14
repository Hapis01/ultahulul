import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface BirthdayButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glow' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const BirthdayButton: React.FC<BirthdayButtonProps> = ({
  children,
  icon,
  iconRight,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs md:text-sm gap-1.5 min-h-[40px]',
    md: 'px-6 py-3 text-sm md:text-base gap-2.5 min-h-[48px]',
    lg: 'px-8 py-4 text-base md:text-lg gap-3 min-h-[54px] font-medium',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40 border border-sky-400/30 hover:shadow-sky-500/30 hover:border-sky-300',
    glow:
      'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-[0_0_25px_rgba(56,189,248,0.45)] border border-sky-300/60 hover:shadow-[0_0_35px_rgba(56,189,248,0.6)]',
    secondary:
      'bg-blue-950/50 backdrop-blur-md text-sky-200 border border-blue-500/30 hover:bg-blue-900/60 hover:border-sky-400/50 hover:text-white',
    ghost:
      'bg-transparent text-slate-300 hover:text-white hover:bg-blue-900/30 border border-transparent',
  }[variant];

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-sky-400/50 active:ring-0 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </motion.button>
  );
};
