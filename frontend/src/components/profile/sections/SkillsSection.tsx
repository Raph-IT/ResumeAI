import React, { useState } from 'react';
import { Wrench, Plus, Pencil, Trash2 } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';

interface Skill {
  id?: string;
  name: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  category: string;
}

const SKILL_LEVELS = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];
const SKILL_CATEGORIES = [
  'Langages de programmation',
  'Frameworks & Librairies',
  'Base de données',
  'DevOps & Cloud',
  'Outils & Méthodologies',
  'Soft Skills'
];

export const SkillsSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    name: '',
    level: 'Débutant',
    category: SKILL_CATEGORIES[0]
  });
  const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0]);

  const handleEdit = (skill: Skill) => {
    setCurrentSkill(skill);
    setEditingSkillId(skill.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (skillId: string) => {
    try {
      const updatedSkills = profile?.skills.filter(skill => skill.id !== skillId) || [];
      await updateProfile({
        skills: updatedSkills,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!currentSkill.name) return;

      const existingSkills = profile?.skills || [];
      let updatedSkills;

      if (editingSkillId) {
        updatedSkills = existingSkills.map(skill => 
          skill.id === editingSkillId ? { ...currentSkill, updatedAt: new Date() } : skill
        );
      } else {
        updatedSkills = [...existingSkills, {
          ...currentSkill,
          id: Date.now().toString(),
          updatedAt: new Date()
        }];
      }

      await updateProfile({
        skills: updatedSkills,
        updatedAt: new Date()
      });
      
      resetForm();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingSkillId(null);
    setCurrentSkill({
      name: '',
      level: 'Débutant',
      category: SKILL_CATEGORIES[0]
    });
  };

  const getSkillsByCategory = (category: string) => {
    return profile?.skills?.filter(skill => skill.category === category) || [];
  };

  return (
    <SectionLayout
      title="Compétences"
      icon={<Wrench className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.skills?.length)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            {editingSkillId ? 'Modifier la compétence' : 'Ajouter une compétence'}
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
              rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Ajouter une compétence
            </button>
          )}
        </div>

        {/* Catégories de compétences */}
        <div className="flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {isEditing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <EditableField
                  label="Nom de la compétence"
                  value={currentSkill.name}
                  onSave={(value) => setCurrentSkill(prev => ({ ...prev, name: value }))}
                  placeholder="Ex: React.js"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Niveau</label>
                <select
                  value={currentSkill.level}
                  onChange={(e) => setCurrentSkill(prev => ({ 
                    ...prev, 
                    level: e.target.value as Skill['level']
                  }))}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {SKILL_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Catégorie</label>
                <select
                  value={currentSkill.category}
                  onChange={(e) => setCurrentSkill(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {SKILL_CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
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
                disabled={!currentSkill.name}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="space-y-8">
            {SKILL_CATEGORIES.map(category => {
              const skills = getSkillsByCategory(category);
              if (skills.length === 0) return null;

              return (
                <div key={category} className="space-y-4">
                  <h3 className="text-lg font-medium text-white">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <div 
                        key={skill.id}
                        className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-4"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                        <div className="relative flex items-center justify-between">
                          <div>
                            <h4 className="text-white">{skill.name}</h4>
                            <p className="text-sm text-gray-400">{skill.level}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(skill)}
                              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(skill.id!)}
                              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isEditing && !profile?.skills?.length && (
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                <Wrench className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Aucune compétence</h3>
              <p className="text-gray-400 mb-6">
                Ajoutez vos compétences pour mettre en valeur votre profil
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}; 