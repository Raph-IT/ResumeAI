import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Project } from '../../../types/profile';
import { TagInput } from '../../ui/TagInput';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Project) => Promise<void>;
  onCancel: () => void;
}

interface ProjectFormData {
  name: string;
  description: string;
  url?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
}

export const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const [isCurrent, setIsCurrent] = useState(project?.current || false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormData>({
    defaultValues: project || {
      current: false
    }
  });

  const onFormSubmit = async (data: ProjectFormData) => {
    await onSubmit({
      id: project?.id || crypto.randomUUID(),
      ...data,
      technologies,
      current: isCurrent,
      endDate: isCurrent ? undefined : data.endDate
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Nom du projet
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Portfolio personnel"
          />
          {errors.name && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            URL du projet
          </label>
          <input
            type="url"
            {...register('url')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            URL de l'image
          </label>
          <input
            type="url"
            {...register('imageUrl')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Date de début
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="rounded border-gray-700 bg-gray-800/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-400">En cours</span>
            </label>
          </div>
          <input
            type="date"
            {...register('startDate')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Date de fin
          </label>
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
          placeholder="Décrivez votre projet..."
        />
        {errors.description && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Technologies utilisées
        </label>
        <TagInput
          tags={technologies}
          onChange={setTechnologies}
          placeholder="Ajouter une technologie"
        />
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
          {project ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}; 