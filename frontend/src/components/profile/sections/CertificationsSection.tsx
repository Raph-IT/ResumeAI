import React, { useState } from 'react';
import { Award, Plus, Pencil, Trash2 } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { EditableField } from '../EditableField';

interface Certification {
  id?: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  description?: string;
}

export const CertificationsSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);
  const [currentCertification, setCurrentCertification] = useState<Certification>({
    name: '',
    issuer: '',
    issueDate: '',
    credentialUrl: '',
    description: ''
  });

  const handleEdit = (certification: Certification) => {
    setCurrentCertification(certification);
    setEditingCertificationId(certification.id || null);
    setIsEditing(true);
  };

  const handleDelete = async (certificationId: string) => {
    try {
      const updatedCertifications = profile?.certifications.filter(cert => cert.id !== certificationId) || [];
      await updateProfile({
        certifications: updatedCertifications,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error deleting certification:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!currentCertification.name || !currentCertification.issuer) return;

      const existingCertifications = profile?.certifications || [];
      let updatedCertifications;

      if (editingCertificationId) {
        updatedCertifications = existingCertifications.map(cert => 
          cert.id === editingCertificationId ? { ...currentCertification, updatedAt: new Date() } : cert
        );
      } else {
        updatedCertifications = [...existingCertifications, {
          ...currentCertification,
          id: Date.now().toString(),
          updatedAt: new Date()
        }];
      }

      await updateProfile({
        certifications: updatedCertifications,
        updatedAt: new Date()
      });
      
      resetForm();
    } catch (error) {
      console.error('Error updating certification:', error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingCertificationId(null);
    setCurrentCertification({
      name: '',
      issuer: '',
      issueDate: '',
      credentialUrl: '',
      description: ''
    });
  };

  return (
    <SectionLayout
      title="Certifications"
      icon={<Award className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.certifications?.length)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">
            {editingCertificationId ? 'Modifier la certification' : 'Ajouter une certification'}
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 
              rounded-lg hover:bg-blue-500/20 transition-colors group"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              Ajouter une certification
            </button>
          )}
        </div>

        {isEditing && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <EditableField
                  label="Nom de la certification"
                  value={currentCertification.name}
                  onSave={(value) => setCurrentCertification(prev => ({ ...prev, name: value }))}
                  placeholder="Ex: AWS Certified Solutions Architect"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Organisme émetteur"
                  value={currentCertification.issuer}
                  onSave={(value) => setCurrentCertification(prev => ({ ...prev, issuer: value }))}
                  placeholder="Ex: Amazon Web Services"
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Date d'obtention"
                  type="date"
                  value={currentCertification.issueDate}
                  onSave={(value) => setCurrentCertification(prev => ({ ...prev, issueDate: value }))}
                />
              </div>

              <div className="space-y-2">
                <EditableField
                  label="Date d'expiration (optionnel)"
                  type="date"
                  value={currentCertification.expiryDate || ''}
                  onSave={(value) => setCurrentCertification(prev => ({ ...prev, expiryDate: value }))}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <EditableField
                  label="URL de vérification"
                  value={currentCertification.credentialUrl || ''}
                  onSave={(value) => setCurrentCertification(prev => ({ ...prev, credentialUrl: value }))}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <EditableField
                label="Description"
                value={currentCertification.description || ''}
                onSave={(value) => setCurrentCertification(prev => ({ ...prev, description: value }))}
                multiline
                placeholder="Décrivez votre certification..."
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
                disabled={!currentCertification.name || !currentCertification.issuer}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        )}

        {!isEditing && profile?.certifications?.length > 0 && (
          <div className="space-y-6">
            {profile.certifications.map((cert) => (
              <div 
                key={cert.id}
                className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">{cert.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{cert.issuer}</span>
                      <button
                        onClick={() => handleEdit(cert)}
                        className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cert.id!)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {cert.description && (
                    <p className="text-gray-300 mb-4">{cert.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Obtenue le {cert.issueDate}</span>
                    {cert.expiryDate && (
                      <>
                        <span>•</span>
                        <span>Expire le {cert.expiryDate}</span>
                      </>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Voir le certificat
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!isEditing && !profile?.certifications?.length && (
          <div className="relative rounded-xl border border-gray-800 bg-gray-900/50 hover:bg-gray-900/80 transition-colors p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 text-gray-600 mb-4">
                <Award className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">Aucune certification</h3>
              <p className="text-gray-400 mb-6">
                Ajoutez vos certifications pour valoriser vos compétences
              </p>
            </div>
          </div>
        )}
      </div>
    </SectionLayout>
  );
}; 