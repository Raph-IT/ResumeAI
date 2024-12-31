import React, { useState } from 'react';
import { Briefcase, Plus, Pencil, Trash2 } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';

interface Experience {
  id?: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills?: string[];
}

export const ExperienceSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    current: false,
    description: '',
    skills: []
  });

  const handleEdit = (experience: Experience) => {
    setCurrentExperience(experience);
    setEditingExperienceId(experience.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (experienceId: string) => {
    try {
      const updatedExperiences = profile?.experiences.filter(exp => exp.id !== experienceId) || [];
      await updateProfile({
        experiences: updatedExperiences,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!currentExperience.title || !currentExperience.company) return;

      const existingExperiences = profile?.experiences || [];
      let updatedExperiences;

      if (editingExperienceId) {
        updatedExperiences = existingExperiences.map(exp => 
          exp.id === editingExperienceId ? { ...currentExperience, updatedAt: new Date() } : exp
        );
      } else {
        updatedExperiences = [...existingExperiences, {
          ...currentExperience,
          id: Date.now().toString(),
          updatedAt: new Date()
        }];
      }

      await updateProfile({
        experiences: updatedExperiences,
        updatedAt: new Date()
      });
      
      resetForm();
    } catch (error) {
      console.error('Error updating experience:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingExperienceId(null);
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      current: false,
      description: '',
      skills: []
    });
  };

  return (
    <SectionLayout
      title="Expériences professionnelles"
      icon={<Briefcase className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.experiences?.length)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            {editingExperienceId ? 'Modifier l\'expérience' : 'Ajouter une expérience'}
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
              rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Ajouter une expérience
            </button>
          )}
        </div>

        {isEditing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <EditableField
                  label="Titre du poste"
                  value={currentExperience.title}
                  onSave={(value) => setCurrentExperience(prev => ({ ...prev, title: value }))}
                  placeholder="Ex: Développeur Frontend"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Entreprise"
                  value={currentExperience.company}
                  onSave={(value) => setCurrentExperience(prev => ({ ...prev, company: value }))}
                  placeholder="Ex: Google"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Localisation"
                  value={currentExperience.location}
                  onSave={(value) => setCurrentExperience(prev => ({ ...prev, location: value }))}
                  placeholder="Ex: Paris, France"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditableField
                  label="Date de début"
                  type="date"
                  value={currentExperience.startDate}
                  onSave={(value) => setCurrentExperience(prev => ({ ...prev, startDate: value }))}
                />
                <EditableField
                  label="Date de fin"
                  type="date"
                  value={currentExperience.endDate || ''}
                  onSave={(value) => setCurrentExperience(prev => ({ ...prev, endDate: value }))}
                  disabled={currentExperience.current}
                />
              </div>
            </div>

            <div className="space-y-2">
              <EditableField
                label="Description"
                value={currentExperience.description}
                onSave={(value) => setCurrentExperience(prev => ({ ...prev, description: value }))}
                multiline
                placeholder="Décrivez vos responsabilités et réalisations..."
              />
            </div>

            <div className="space-y-2">
              <EditableField
                label="Compétences"
                value={currentExperience.skills?.join(', ')}
                onSave={(value) => {
                  const skills = value.split(',')
                    .map(s => s.trim())
                    .filter(Boolean);
                  setCurrentExperience(prev => ({
                    ...prev,
                    skills
                  }));
                }}
                placeholder="Ex: React, TypeScript, Node.js"
              />
              <p className="text-sm text-gray-400">
                Séparez les compétences par des virgules
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentExperience({
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    current: false,
                    description: '',
                    skills: []
                  });
                }}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={!currentExperience.title || !currentExperience.company}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {!isEditing && profile?.experiences?.length > 0 && (
          <div className="space-y-6">
            {profile.experiences.map((exp) => (
              <div 
                key={exp.id}
                className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{exp.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{exp.company}</span>
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id!)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span>{exp.startDate} - {exp.current ? 'Présent' : exp.endDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEditing && !profile?.experiences?.length && (
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                <Briefcase className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Aucune expérience</h3>
              <p className="text-gray-400 mb-6">
                Ajoutez vos expériences professionnelles pour compléter votre profil
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}; 