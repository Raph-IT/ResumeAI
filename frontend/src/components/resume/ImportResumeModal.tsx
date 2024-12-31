import React, { useState } from 'react';
import { X, Upload, Loader } from 'lucide-react';
import { Button } from '../ui/Button';
import { uploadResume } from '../../services/api';
import { ResumeForm } from './ResumeForm';

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImportResumeModal = ({ isOpen, onClose }: ImportResumeModalProps) => {
  const [step, setStep] = useState<'upload' | 'loading' | 'form'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (file: File) => {
    setFile(file);
    setStep('loading');
    setError(null);
    
    try {
      const parsedData = await uploadResume(file);
      setResumeData(parsedData);
      setStep('form');
    } catch (error) {
      console.error('Error processing resume:', error);
      setError('Une erreur est survenue lors de l\'analyse de votre CV. Veuillez réessayer.');
      setStep('upload');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/70" onClick={onClose} />
        
        <div className="relative bg-gray-900 rounded-lg w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Importer un CV</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}

          {step === 'upload' && (
            <div className="text-center space-y-4">
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
                  <span className="text-xs text-gray-500 mt-2">
                    Formats acceptés : PDF, DOC, DOCX
                  </span>
                </label>
              </div>
            </div>
          )}

          {step === 'loading' && (
            <div className="text-center py-12">
              <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
              <p className="text-gray-400">Analyse de votre CV en cours...</p>
              <p className="text-sm text-gray-500 mt-2">
                Cette opération peut prendre quelques secondes...
              </p>
            </div>
          )}

          {step === 'form' && resumeData && (
            <ResumeForm
              initialData={resumeData}
              onSubmit={(data) => {
                // Créer le CV avec les données validées
                console.log('Form submitted:', data);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 