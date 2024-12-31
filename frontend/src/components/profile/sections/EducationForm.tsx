import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';
import { ValidationStatus } from '../../ui/ValidationStatus';

interface Education {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export const EducationSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<Education | null>(null);

  const handleUpdate = async (education: Education) => {
    try {
      const updatedEducation = profile?.education ? [...profile.education, education] : [education];
      await updateProfile({
        education: updatedEducation,
        updatedAt: new Date()
      });
      setIsEditing(false);
      setCurrentEducation(null);
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  return (
    <SectionLayout
      title="Formation"
      icon={<GraduationCap className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.education?.length)}
      lastUpdated={profile?.updatedAt}
      onEdit={() => setIsEditing(true)}
    >
      {profile?.education?.length ? (
        <div className="space-y-6">
          {profile.education.map((edu, index) => (
            <div 
              key={index}
              className="relative border border-gray-800 rounded-xl p-6 bg-gray-900/50 hover:bg-gray-900/80 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
              <div className="relative">
                <h3 className="text-lg font-medium text-white mb-2">{edu.school}</h3>
                <p className="text-gray-400">{edu.degree} - {edu.field}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {edu.startDate} - {edu.current ? 'Présent' : edu.endDate}
                </p>
                {edu.description && (
                  <p className="mt-4 text-gray-300">{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            Aucune formation
          </h3>
          <p className="text-gray-400 mb-6">
            Ajoutez vos formations pour compléter votre profil
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Ajouter une formation
          </button>
        </div>
      )}

      {isEditing && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              label="École"
              value={currentEducation?.school || ''}
              onSave={(value) => setCurrentEducation(prev => ({ ...prev, school: value }))}
            />
            <EditableField
              label="Diplôme"
              value={currentEducation?.degree || ''}
              onSave={(value) => setCurrentEducation(prev => ({ ...prev, degree: value }))}
            />
            <EditableField
              label="Domaine d'études"
              value={currentEducation?.field || ''}
              onSave={(value) => setCurrentEducation(prev => ({ ...prev, field: value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <EditableField
                label="Date de début"
                type="date"
                value={currentEducation?.startDate || ''}
                onSave={(value) => setCurrentEducation(prev => ({ ...prev, startDate: value }))}
              />
              <EditableField
                label="Date de fin"
                type="date"
                value={currentEducation?.endDate || ''}
                onSave={(value) => setCurrentEducation(prev => ({ ...prev, endDate: value }))}
                disabled={currentEducation?.current}
              />
            </div>
          </div>
          
          <EditableField
            label="Description"
            value={currentEducation?.description || ''}
            onSave={(value) => setCurrentEducation(prev => ({ ...prev, description: value }))}
            multiline
          />
          
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentEducation(null);
              }}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => currentEducation && handleUpdate(currentEducation)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </SectionLayout>
  );
}; 