import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const SparklesEffect = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('relative inline-block', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-50 blur-lg"
      />
      {children}
    </div>
  );
}; 