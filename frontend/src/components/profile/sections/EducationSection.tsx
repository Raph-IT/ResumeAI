import React, { useState } from 'react';
import { GraduationCap, Plus, Pencil, Trash2 } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';

interface Education {
  id?: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  location?: string;
}

export const EducationSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    current: false,
    description: '',
    location: ''
  });

  const handleEdit = (education: Education) => {
    setCurrentEducation(education);
    setEditingEducationId(education.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (educationId: string) => {
    try {
      const updatedEducation = profile?.education.filter(edu => edu.id !== educationId) || [];
      await updateProfile({
        education: updatedEducation,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!currentEducation.school || !currentEducation.degree) return;

      const existingEducation = profile?.education || [];
      let updatedEducation;

      if (editingEducationId) {
        updatedEducation = existingEducation.map(edu => 
          edu.id === editingEducationId ? { ...currentEducation, updatedAt: new Date() } : edu
        );
      } else {
        updatedEducation = [...existingEducation, {
          ...currentEducation,
          id: Date.now().toString(),
          updatedAt: new Date()
        }];
      }

      await updateProfile({
        education: updatedEducation,
        updatedAt: new Date()
      });
      
      resetForm();
    } catch (error) {
      console.error('Error updating education:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingEducationId(null);
    setCurrentEducation({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      current: false,
      description: '',
      location: ''
    });
  };

  return (
    <SectionLayout
      title="Formation"
      icon={<GraduationCap className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.education?.length)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            {editingEducationId ? 'Modifier la formation' : 'Ajouter une formation'}
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
              rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Ajouter une formation
            </button>
          )}
        </div>

        {isEditing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <EditableField
                  label="École"
                  value={currentEducation.school}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, school: value }))}
                  placeholder="Ex: Université Paris 1"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Diplôme"
                  value={currentEducation.degree}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, degree: value }))}
                  placeholder="Ex: Master"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Domaine d'études"
                  value={currentEducation.field}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, field: value }))}
                  placeholder="Ex: Informatique"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Localisation"
                  value={currentEducation.location || ''}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, location: value }))}
                  placeholder="Ex: Paris, France"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditableField
                  label="Date de début"
                  type="date"
                  value={currentEducation.startDate}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, startDate: value }))}
                />
                <EditableField
                  label="Date de fin"
                  type="date"
                  value={currentEducation.endDate || ''}
                  onSave={(value) => setCurrentEducation(prev => ({ ...prev, endDate: value }))}
                  disabled={currentEducation.current}
                />
              </div>
            </div>

            <div className="space-y-2">
              <EditableField
                label="Description"
                value={currentEducation.description || ''}
                onSave={(value) => setCurrentEducation(prev => ({ ...prev, description: value }))}
                multiline
                placeholder="Décrivez votre formation..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={resetForm}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!currentEducation.school || !currentEducation.degree}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {!isEditing && profile?.education?.length > 0 && (
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <div 
                key={edu.id}
                className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{edu.school}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{edu.degree}</span>
                      <button
                        onClick={() => handleEdit(edu)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(edu.id!)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300">{edu.field}</p>
                  {edu.description && (
                    <p className="text-gray-300 mt-4">{edu.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                    {edu.location && (
                      <>
                        <span>{edu.location}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{edu.startDate} - {edu.current ? 'Présent' : edu.endDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEditing && !profile?.education?.length && (
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                <GraduationCap className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Aucune formation</h3>
              <p className="text-gray-400 mb-6">
                Ajoutez vos formations pour compléter votre profil
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}; 