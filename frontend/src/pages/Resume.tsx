import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { TemplateSelectionModal } from '../components/resume/TemplateSelectionModal';

export const Resume = () => {
  const [showTemplateModal, setShowTemplateModal] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Resume
            </h1>
            <p className="text-gray-400 mt-2">
              Create and manage your AI-powered resumes
            </p>
          </div>
          <Button 
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-violet-600 transition-all"
          >
            <Plus className="h-5 w-5" />
            New Resume
          </Button>
        </div>

        {/* Grille des CV */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Carte "Créer nouveau CV" */}
          <button
            onClick={() => setShowTemplateModal(true)}
            className="h-64 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center gap-4 bg-gray-800/30 hover:bg-gray-800/50 transition-all group"
          >
            <div className="p-3 rounded-full bg-gray-800 group-hover:bg-gray-700 transition-colors">
              <Plus className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-center">
              <p className="text-gray-300 font-medium">Create New Resume</p>
              <p className="text-gray-500 text-sm">Generate with AI</p>
            </div>
          </button>

          {/* Les CV existants seront mappés ici */}
        </div>

        {/* Modal de sélection de template */}
        <TemplateSelectionModal
          isOpen={showTemplateModal}
          onClose={() => setShowTemplateModal(false)}
        />
      </div>
    </div>
  );
}; 