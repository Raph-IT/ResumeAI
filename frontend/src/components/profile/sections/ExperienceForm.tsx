import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { TagInput } from '../../ui/TagInput';
import { EditableField } from '../EditableField';

interface ExperienceFormProps {
  experience?: Experience;
  onSubmit: (data: Experience) => Promise<void>;
  onCancel: () => void;
}

interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export const ExperienceForm = ({ experience, onSubmit, onCancel }: ExperienceFormProps) => {
  const [skills, setSkills] = useState<string[]>(experience?.skills || []);
  const [isCurrent, setIsCurrent] = useState(experience?.current || false);
  const { register, handleSubmit, formState: { errors } } = useForm<ExperienceFormData>({
    defaultValues: experience || {
      current: false
    }
  });

  const onFormSubmit = async (data: ExperienceFormData) => {
    const formattedData = {
      id: experience?.id || crypto.randomUUID(),
      ...data,
      skills,
      current: isCurrent,
      endDate: isCurrent ? undefined : data.endDate
    };
    await onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Titre du poste
          </label>
          <input
            {...register('title', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Développeur Full Stack"
          />
          {errors.title && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Entreprise
          </label>
          <input
            {...register('company', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Google"
          />
          {errors.company && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Localisation
          </label>
          <input
            {...register('location', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Paris, France"
          />
          {errors.location && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Date de début
          </label>
          <input
            type="date"
            {...register('startDate', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.startDate && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Date de fin
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="rounded border-gray-700 bg-gray-800/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400">Poste actuel</span>
            </label>
          </div>
          <input
            type="date"
            {...register('endDate')}
            disabled={isCurrent}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          {...register('description', { required: true })}
          rows={4}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Décrivez vos responsabilités et réalisations..."
        />
        {errors.description && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Compétences
        </label>
        <TagInput
          tags={skills}
          onChange={setSkills}
          placeholder="Ajouter une compétence"
        />
      </div>

      <div className="flex items-center justify-end gap-4">
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
          {experience ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}; 