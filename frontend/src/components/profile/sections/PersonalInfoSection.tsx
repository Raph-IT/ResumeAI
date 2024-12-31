import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { SectionLayout } from './SectionLayout';
import { ValidationStatus } from '../../ui/ValidationStatus';
import { EditableField } from '../EditableField';

export const PersonalInfoSection = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (field: string, value: string) => {
    try {
      console.log('Updating field:', field, 'with value:', value); // Debug
      await updateProfile({
        [field]: value,
        updatedAt: new Date() // Ajout de la date de mise à jour
      });
      
      // Feedback visuel optionnel
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  return (
    <SectionLayout
      title="Informations personnelles"
      icon={<User className="w-5 h-5 text-blue-400" />}
      isComplete={Boolean(profile?.firstName && profile?.lastName && profile?.title && profile?.bio)}
      lastUpdated={profile?.updatedAt}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <EditableField
              label="Prénom"
              value={profile?.firstName || ''}
              onSave={(value) => handleUpdate('firstName', value)}
              disabled={!isEditing}
            />
            <ValidationStatus
              field="Prénom"
              isValid={Boolean(profile?.firstName)}
            />
          </div>

          <div className="space-y-2">
            <EditableField
              label="Nom"
              value={profile?.lastName || ''}
              onSave={(value) => handleUpdate('lastName', value)}
              disabled={!isEditing}
            />
            <ValidationStatus
              field="Nom"
              isValid={Boolean(profile?.lastName)}
            />
          </div>

          <div className="space-y-2">
            <EditableField
              label="Titre professionnel"
              value={profile?.title || ''}
              onSave={(value) => handleUpdate('title', value)}
              disabled={!isEditing}
            />
            <ValidationStatus
              field="Titre"
              isValid={Boolean(profile?.title)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <EditableField
            label="Biographie"
            value={profile?.bio || ''}
            onSave={(value) => handleUpdate('bio', value)}
            multiline
            disabled={!isEditing}
          />
          <ValidationStatus
            field="Biographie"
            isValid={Boolean(profile?.bio)}
          />
        </div>
      </div>
    </SectionLayout>
  );
}; 