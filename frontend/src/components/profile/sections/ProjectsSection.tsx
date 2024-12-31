import React, { useState } from 'react';
import { Code, Plus, Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';

interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  current: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export const ProjectsSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project>({
    name: '',
    description: '',
    technologies: [],
    startDate: '',
    current: false,
    githubUrl: '',
    liveUrl: '',
    imageUrl: ''
  });

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setEditingProjectId(project.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (projectId: string) => {
    try {
      const updatedProjects = profile?.projects.filter(proj => proj.id !== projectId) || [];
      await updateProfile({
        projects: updatedProjects,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!currentProject.name || !currentProject.description) return;

      const existingProjects = profile?.projects || [];
      let updatedProjects;

      if (editingProjectId) {
        updatedProjects = existingProjects.map(proj => 
          proj.id === editingProjectId ? { ...currentProject, updatedAt: new Date() } : proj
        );
      } else {
        updatedProjects = [...existingProjects, {
          ...currentProject,
          id: Date.now().toString(),
          updatedAt: new Date()
        }];
      }

      await updateProfile({
        projects: updatedProjects,
        updatedAt: new Date()
      });
      
      resetForm();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingProjectId(null);
    setCurrentProject({
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      current: false,
      githubUrl: '',
      liveUrl: '',
      imageUrl: ''
    });
  };

  return (
    <SectionLayout
      title="Projets"
      icon={<Code className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.projects?.length)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            {editingProjectId ? 'Modifier le projet' : 'Ajouter un projet'}
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
              rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Ajouter un projet
            </button>
          )}
        </div>

        {isEditing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <EditableField
                  label="Nom du projet"
                  value={currentProject.name}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, name: value }))}
                  placeholder="Ex: Portfolio personnel"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Technologies utilisées"
                  value={currentProject.technologies.join(', ')}
                  onSave={(value) => setCurrentProject(prev => ({
                    ...prev,
                    technologies: value.split(',').map(t => t.trim()).filter(Boolean)
                  }))}
                  placeholder="Ex: React, TypeScript, Node.js"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditableField
                  label="Date de début"
                  type="date"
                  value={currentProject.startDate}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, startDate: value }))}
                />
                <EditableField
                  label="Date de fin"
                  type="date"
                  value={currentProject.endDate || ''}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, endDate: value }))}
                  disabled={currentProject.current}
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="URL GitHub"
                  value={currentProject.githubUrl || ''}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, githubUrl: value }))}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="URL du projet"
                  value={currentProject.liveUrl || ''}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, liveUrl: value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <EditableField
                  label="Image du projet"
                  value={currentProject.imageUrl || ''}
                  onSave={(value) => setCurrentProject(prev => ({ ...prev, imageUrl: value }))}
                  placeholder="URL de l'image..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <EditableField
                label="Description"
                value={currentProject.description}
                onSave={(value) => setCurrentProject(prev => ({ ...prev, description: value }))}
                multiline
                placeholder="Décrivez votre projet..."
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
                disabled={!currentProject.name || !currentProject.description}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {!isEditing && profile?.projects?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.projects.map((project) => (
              <div 
                key={project.id}
                className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-6"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                <div className="relative">
                  {project.imageUrl && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={project.imageUrl} 
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id!)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Code className="w-4 h-4" />
                        Code source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <LinkIcon className="w-4 h-4" />
                        Voir le projet
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEditing && !profile?.projects?.length && (
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                <Code className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Aucun projet</h3>
              <p className="text-gray-400 mb-6">
                Ajoutez vos projets pour mettre en valeur vos réalisations
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}; 