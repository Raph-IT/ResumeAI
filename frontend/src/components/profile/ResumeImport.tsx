import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { parseResume } from '../../services/resumeParser';
import { useToast } from '../../hooks/useToast';

interface ResumeImportProps {
  onImport: (data: any) => void;
}

export const ResumeImport = ({ onImport }: ResumeImportProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1
  });

  const handleParse = async () => {
    if (!file) return;

    setParsing(true);
    try {
      const data = await parseResume(file);
      onImport(data);
      toast({
        title: "Succès",
        description: "CV analysé avec succès",
        variant: "success"
      });
      setFile(null);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le CV",
        variant: "error"
      });clear
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        key="dropzone"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-colors ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-gray-300">
              Glissez votre CV ici ou cliquez pour sélectionner
            </p>
            <p className="text-sm text-gray-500">
              Format accepté : PDF
            </p>
          </div>
        </div>
      </motion.div>

      {file && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-gray-900/30 backdrop-blur-sm rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
              }}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleParse}
            disabled={parsing}
            className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600
              transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {parsing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Analyser le CV
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}; 