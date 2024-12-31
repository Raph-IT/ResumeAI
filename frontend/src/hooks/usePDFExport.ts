import { useState } from 'react';
import { exportToPDF } from '../services/pdfExport';

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const exportResume = async (elementId: string, filename?: string) => {
    setIsExporting(true);
    setError(null);

    try {
      await exportToPDF(elementId, {
        filename,
        quality: window.devicePixelRatio || 2,
        margin: 0
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to export PDF'));
      throw err;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportResume,
    isExporting,
    error
  };
}; 