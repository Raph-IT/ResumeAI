import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface ExportButtonProps {
  data: any;
  template: string;
}

export const ExportButton = ({ data, template }: ExportButtonProps) => {
  const handleExport = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    try {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`cv-${data.firstName}-${data.lastName}.pdf`);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
        transition-colors flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Exporter
    </button>
  );
}; 