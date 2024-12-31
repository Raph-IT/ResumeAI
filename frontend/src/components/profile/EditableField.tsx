import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  type?: 'text' | 'date';
  multiline?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const EditableField = ({
  label,
  value,
  onSave,
  type = 'text',
  multiline = false,
  disabled = false,
  placeholder
}: EditableFieldProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value);
    onSave(e.target.value); // Mise à jour immédiate
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      {multiline ? (
        <textarea
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
        />
      ) : (
        <input
          type={type}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      )}
    </div>
  );
}; 