import { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { PersonalInfoSection } from '../components/profile/sections/PersonalInfoSection';
import { ExperienceSection } from '../components/profile/sections/ExperienceSection';
import { EducationSection } from '../components/profile/sections/EducationSection';
import { SkillsSection } from '../components/profile/sections/SkillsSection';
import { CertificationsSection } from '../components/profile/sections/CertificationsSection';
import { ProjectsSection } from '../components/profile/sections/ProjectsSection';

export const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-8 pt-16">
      <ProfileHeader />
      
      <div className="space-y-6">
        <PersonalInfoSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
      </div>
    </div>
  );
};

export default Profile; 