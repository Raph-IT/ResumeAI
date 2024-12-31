import React, { useEffect } from 'react';
import { useResumeStore } from '../../stores/resumeStore';
import { useAutoSave } from '../../hooks/useAutoSave';
import { exportToPDF } from '../../utils/pdfExport';
import { templates } from '../../data/resumeTemplates';
import { Save, Download, History } from 'lucide-react';

export const ResumeEditor = ({ templateId }: { templateId: string }) => {
  const { data, updateSection, versions, saveVersion, switchVersion } = useResumeStore();
  
  // Autosave
  useAutoSave(data, `resumes/${templateId}`);

  const handleExport = () => {
    exportToPDF('resume-preview', `resume-${templateId}`);
  };

  const handleSaveVersion = () => {
    const name = prompt('Nom de la version:');
    if (name) {
      saveVersion(name);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8 h-screen">
      {/* Panneau d'édition */}
      <div className="p-6 overflow-y-auto">
        <div className="flex justify-between mb-6">
          <button
            onClick={handleSaveVersion}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
          >
            <Save className="w-4 h-4" />
            Sauvegarder version
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white"
          >
            <Download className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>

        {/* Versions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <History className="w-4 h-4" />
            Versions
          </h3>
          <div className="space-y-2">
            {versions.map((version) => (
              <button
                key={version.id}
                onClick={() => switchVersion(version.id)}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700/50"
              >
                {version.name} - {new Date(version.timestamp).toLocaleDateString()}
              </button>
            ))}
          </div>
        </div>

        {/* Sections d'édition */}
        {/* ... reste du code ... */}
      </div>

      {/* Prévisualisation */}
      <div id="resume-preview" className="bg-white rounded-lg shadow-xl p-8 overflow-y-auto">
        {/* Rendu du template */}
      </div>
    </div>
  );
}; 