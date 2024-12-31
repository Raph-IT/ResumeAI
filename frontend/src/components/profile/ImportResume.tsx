import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { useProfile } from '../../hooks/useProfile';
import { parseResume } from '../../services/resumeParser';

export const ImportResume = () => {
  const { updateProfile } = useProfile();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsLoading(true);
    try {
      const parsedData = await parseResume(file);
      await updateProfile(parsedData);
    } catch (error) {
      console.error('Error processing resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Importer votre CV
        </h3>
        
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8
            ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
          />

          <div className="flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-center"
                >
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-400">Analyse de votre CV en cours...</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-center"
                >
                  <div className="bg-gray-800/50 rounded-full p-4 inline-block mb-4">
                    <Upload className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-gray-300 mb-2">
                    Glissez-déposez votre CV ici ou
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:text-blue-400 font-medium"
                  >
                    parcourez vos fichiers
                  </button>
                  <p className="text-gray-500 text-sm mt-2">
                    Formats supportés : PDF, DOC, DOCX
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Card>
  );
}; 