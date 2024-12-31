import React from 'react';
import { motion } from 'framer-motion';

export const SectionDivider = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="my-24 h-16 w-full relative"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-2 border-blue-500/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20" />
        </div>
      </div>
    </motion.div>
  );
}; 