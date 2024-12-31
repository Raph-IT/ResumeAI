import React from 'react';
import { PersonalInfoSection } from './sections/PersonalInfoSection';
import { ContactSection } from './sections/ContactSection';
import { useProfileForm } from '../../hooks/useProfileForm';

interface ProfileFormProps {
  sections: any[];
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const ProfileForm = ({ sections, currentSection, onSectionChange }: ProfileFormProps) => {
  const {
    formData,
    handleChange,
    handleLocationChange,
    handleSummaryChange
  } = useProfileForm();

  const renderSection = () => {
    switch (currentSection) {
      case 'personal':
        return (
          <PersonalInfoSection
            formData={formData}
            handleChange={handleChange}
            handleLocationChange={handleLocationChange}
            handleSummaryChange={handleSummaryChange}
          />
        );
      case 'contact':
        return (
          <ContactSection
            formData={formData}
            handleChange={handleChange}
          />
        );
      // ... autres sections
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderSection()}
    </div>
  );
}; 