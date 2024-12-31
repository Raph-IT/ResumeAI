import React, { useState } from 'react';
import { ResumeTemplateCard } from '../components/resume/ResumeTemplateCard';
import { templates } from '../data/resumeTemplates';
import { Upload } from 'lucide-react';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';

export const Dashboard = () => {
  const [isRescraping, setIsRescraping] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <button
            onClick={() => setIsRescraping(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            <Upload className="w-4 h-4" />
            Charger un nouveau CV
          </button>
        </div>

        {isRescraping && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 bg-black opacity-75" />
              
              <div className="relative bg-gray-900 rounded-lg w-full max-w-3xl mx-4">
                <OnboardingFlow 
                  onComplete={() => setIsRescraping(false)}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CV récents */}
          <div className="col-span-full">
            <h2 className="text-2xl font-bold text-white mb-4">CV récents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Liste des CV récents */}
            </div>
          </div>

          {/* Nouveaux templates */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Créer un nouveau CV</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <ResumeTemplateCard
                  key={template.id}
                  template={template}
                  onClick={() => {/* Navigation vers l'éditeur */}}
                />
              ))}
            </div>
          </div>

          {/* Section lettres de motivation */}
          <div className="col-span-full mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Lettres de motivation</h2>
            {/* Similaire aux CV */}
          </div>
        </div>
      </div>
    </div>
  );
};