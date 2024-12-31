import React from 'react';
import { motion } from 'framer-motion';
import { StatusDot } from '../ui/StatusDot';
import { cn } from '../../lib/utils';
import { useProfile } from '../../hooks/useProfile';

interface Section {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isPartial: boolean;
  fields: string[];
}

const sections = [
  {
    id: 'personal',
    title: 'Informations personnelles',
    description: 'Vos informations de base',
    isComplete: false,
    isPartial: true,
    fields: ['firstName', 'lastName', 'title', 'birthDate', 'bio']
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Comment vous joindre',
    isComplete: false,
    isPartial: false,
    fields: ['email', 'phone', 'location']
  },
  {
    id: 'experiences',
    title: 'Expériences professionnelles',
    description: 'Votre parcours professionnel',
    isComplete: false,
    isPartial: false,
    fields: ['experiences']
  },
  {
    id: 'education',
    title: 'Formation',
    description: 'Votre parcours académique',
    isComplete: false,
    isPartial: false,
    fields: ['education']
  },
  {
    id: 'skills',
    title: 'Compétences',
    description: 'Vos compétences techniques et personnelles',
    isComplete: false,
    isPartial: false,
    fields: ['skills']
  },
  {
    id: 'certifications',
    title: 'Certifications',
    description: 'Vos certifications professionnelles',
    isComplete: false,
    isPartial: false,
    fields: ['certifications']
  },
  {
    id: 'projects',
    title: 'Projets',
    description: 'Vos projets personnels',
    isComplete: false,
    isPartial: false,
    fields: ['projects']
  }
];

interface ProfileSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const ProfileSidebar = ({ currentSection, onSectionChange }: ProfileSidebarProps) => {
  const { profile } = useProfile();

  const calculateProgress = () => {
    if (!profile) return 0;
    const totalFields = sections.reduce((acc, section) => acc + section.fields.length, 0);
    const completedFields = sections.reduce((acc, section) => {
      return acc + section.fields.filter(field => {
        const value = profile[field];
        return Array.isArray(value) ? value.length > 0 : Boolean(value);
      }).length;
    }, 0);
    return (completedFields / totalFields) * 100;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sticky top-24"
    >
      {/* En-tête avec progression */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Navigation
          </h2>
          <span className="text-sm font-medium text-white/80">
            {Math.round(calculateProgress())}%
          </span>
        </div>

        <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Liste des sections */}
      <nav className="space-y-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "w-full text-left group px-4 py-3 rounded-xl transition-all",
              currentSection === section.id
                ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20"
                : "hover:bg-white/5"
            )}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-center gap-3">
              <StatusDot 
                status={section.isComplete ? "complete" : section.isPartial ? "partial" : "empty"}
                pulse={currentSection === section.id}
              />
              <div>
                <p className={cn(
                  "font-medium transition-colors",
                  currentSection === section.id ? "text-white" : "text-gray-400"
                )}>
                  {section.title}
                </p>
                <p className="text-sm text-gray-500">
                  {section.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
}; 