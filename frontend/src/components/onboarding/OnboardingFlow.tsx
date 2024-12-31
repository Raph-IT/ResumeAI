import React, { useState } from 'react';
import { Upload, Linkedin, X } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState<'upload' | 'linkedin' | 'processing'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');

  const handleFileUpload = async (file: File) => {
    setFile(file);
    setStep('processing');
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${process.env.BACKEND_URL}/api/scrape-cv`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      // Utiliser les données scrapées
      setStep('linkedin');
    } catch (error) {
      console.error('Error processing CV:', error);
    }
  };

  const handleLinkedinSubmit = async () => {
    setStep('processing');
    try {
      // TODO: Envoyer l'URL LinkedIn à l'API pour le scraping
      await Promise.all([
        // Traitement du CV
        // Scraping LinkedIn
      ]);
      onComplete();
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6 relative">
      <button 
        onClick={onComplete}
        className="absolute top-2 right-2 text-gray-400 hover:text-white p-2"
      >
        <X className="w-6 h-6" />
      </button>

      {step === 'upload' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Commençons par votre CV</h2>
          <p className="text-gray-400">
            Téléchargez votre CV existant pour que nous puissions extraire vos informations
          </p>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              id="cv-upload"
            />
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <Upload className="w-12 h-12 text-gray-500 mb-4" />
              <span className="text-sm text-gray-400">
                Cliquez pour sélectionner ou déposez votre fichier ici
              </span>
            </label>
          </div>
        </div>
      )}

      {step === 'linkedin' && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Ajoutez votre profil LinkedIn</h2>
          <p className="text-gray-400">
            Facultatif : nous pouvons enrichir votre profil avec vos données LinkedIn
          </p>
          <div className="flex gap-4">
            <input
              type="url"
              placeholder="https://linkedin.com/in/votre-profil"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <button
              onClick={handleLinkedinSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Continuer
            </button>
          </div>
          <button 
            onClick={onComplete}
            className="text-gray-400 hover:text-white"
          >
            Passer cette étape
          </button>
        </div>
      )}

      {step === 'processing' && (
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
          <p className="text-gray-400">Traitement de vos informations en cours...</p>
        </div>
      )}
    </div>
  );
}; 