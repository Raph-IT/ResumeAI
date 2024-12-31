import React from 'react';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceItemProps {
  field: any;
  index: number;
  register: any;
  onRemove: (index: number) => void;
}

export const ExperienceItem = ({ 
  field, 
  index, 
  register, 
  onRemove
}: ExperienceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative border border-gray-800 rounded-xl p-6 space-y-4 bg-gray-900/30"
    >
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-4 right-4 text-red-400 hover:text-red-300"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="grid md:grid-cols-2 gap-4 pt-6">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Poste
          </label>
          <input
            {...register(`experience.${index}.title`)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 
              text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Développeur Full Stack"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Entreprise
          </label>
          <input
            {...register(`experience.${index}.company`)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 
              text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nom de l'entreprise"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Date de début
          </label>
          <input
            type="date"
            {...register(`experience.${index}.startDate`)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 
              text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Date de fin
          </label>
          <input
            type="date"
            {...register(`experience.${index}.endDate`)}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 
              text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Description
          </label>
          <textarea
            {...register(`experience.${index}.description`)}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-700 
              text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Décrivez vos responsabilités et réalisations..."
          />
        </div>
      </div>
    </motion.div>
  );
}; 