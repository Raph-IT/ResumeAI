import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Certification } from '../../../types/profile';

interface CertificationFormProps {
  certification?: Certification;
  onSubmit: (data: Certification) => Promise<void>;
  onCancel: () => void;
}

interface CertificationFormData {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export const CertificationForm = ({ certification, onSubmit, onCancel }: CertificationFormProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CertificationFormData>({
    defaultValues: certification || {}
  });

  const onFormSubmit = async (data: CertificationFormData) => {
    await onSubmit({
      id: certification?.id || crypto.randomUUID(),
      ...data,
      name: data.name.trim(),
      organization: data.organization.trim(),
      credentialUrl: data.credentialUrl?.trim(),
      credentialId: data.credentialId?.trim(),
      description: data.description?.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Nom de la certification
          </label>
          <input
            {...register('name', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: AWS Solutions Architect"
          />
          {errors.name && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Organisation
          </label>
          <input
            {...register('organization', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Amazon Web Services"
          />
          {errors.organization && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Date d'obtention
          </label>
          <input
            type="date"
            {...register('issueDate', { required: true })}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.issueDate && (
            <span className="text-sm text-red-500">Ce champ est requis</span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Date d'expiration
          </label>
          <input
            type="date"
            {...register('expiryDate')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Identifiant
          </label>
          <input
            {...register('credentialId')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: AWS-SAA-001"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            URL de vérification
          </label>
          <input
            type="url"
            {...register('credentialUrl')}
            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Décrivez brièvement cette certification..."
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
          {certification ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}; 