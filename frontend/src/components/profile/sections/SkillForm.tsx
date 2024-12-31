import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Skill } from '../../../types/profile';

interface SkillFormProps {
  skill?: Skill;
  onSubmit: (data: Skill) => Promise<void>;
  onCancel: () => void;
}

interface SkillFormData {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

const skillCategories = [
  'Langages de programmation',
  'Frameworks & Librairies',
  'Base de données',
  'DevOps & Cloud',
  'Outils & Méthodologies',
  'Soft Skills'
];

const skillLevels = {
  beginner: { label: 'Débutant', color: 'bg-blue-500/20 text-blue-400' },
  intermediate: { label: 'Intermédiaire', color: 'bg-green-500/20 text-green-400' },
  advanced: { label: 'Avancé', color: 'bg-yellow-500/20 text-yellow-400' },
  expert: { label: 'Expert', color: 'bg-purple-500/20 text-purple-400' }
};

export const SkillForm = ({ skill, onSubmit, onCancel }: SkillFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SkillFormData>({
    defaultValues: skill || {
      level: 'beginner',
      category: skillCategories[0]
    }
  });

  const selectedLevel = watch('level');

  const onFormSubmit = async (data: SkillFormData) => {
    await onSubmit({
      ...data,
      name: data.name.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Nom de la compétence
        </label>
        <input
          {...register('name', { required: true })}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: React, Node.js, UI/UX Design..."
        />
        {errors.name && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Catégorie
        </label>
        <select
          {...register('category', { required: true })}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {skillCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Niveau de maîtrise
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(skillLevels).map(([level, { label, color }]) => (
            <label
              key={level}
              className={`
                flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all
                ${selectedLevel === level 
                  ? color + ' border border-current' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                }
              `}
            >
              <input
                type="radio"
                {...register('level')}
                value={level}
                className="hidden"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {skill ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}; 