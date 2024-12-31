import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from './Calendar';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export const DatePicker = ({ value, onChange, placeholder = "Sélectionner une date", label, required }: DatePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <motion.button
        type="button"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 hover:border-gray-600 transition-colors text-left"
      >
        <CalendarIcon className="w-4 h-4 text-gray-400" />
        <span className={value ? 'text-white' : 'text-gray-400'}>
          {value ? format(value, 'dd MMMM yyyy', { locale: fr }) : placeholder}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute z-50 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
            >
              <Calendar
                mode="single"
                selected={value}
                onSelect={(date) => {
                  onChange(date);
                  setIsOpen(false);
                }}
                initialFocus
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 