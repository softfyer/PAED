import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'accent';
}

export const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const variants = {
    default: 'bg-stone-100 text-stone-600',
    outline: 'border border-stone-200 text-stone-500',
    accent: 'bg-emerald-50 text-emerald-700 border border-emerald-100'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};
