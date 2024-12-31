import React from 'react';
import { motion } from 'framer-motion';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
  disabled?: boolean;
}

export const Switch = ({ checked, onCheckedChange, disabled = false }: SwitchProps) => {
  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onCheckedChange}
      className={`
        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full 
        transition-colors duration-200 ease-in-out focus:outline-none 
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${checked ? 'bg-blue-500' : 'bg-gray-700'}
      `}
    >
      <motion.span
        className={`
          pointer-events-none inline-block h-5 w-5 transform rounded-full 
          bg-white shadow-lg ring-0 transition duration-200 ease-in-out
        `}
        animate={{
          x: checked ? '1.25rem' : '0.125rem',
          y: '0.125rem'
        }}
      />
    </motion.button>
  );
};

export default Switch; 