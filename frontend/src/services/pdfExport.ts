import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ExportOptions {
  filename?: string;
  margin?: number;
  scale?: number;
  quality?: number;
}

export const exportToPDF = async (
  elementId: string, 
  options: ExportOptions = {}
) => {
  const {
    filename = 'resume.pdf',
    margin = 0,
    scale = 2,
    quality = 2
  } = options;

  try {
    // Trouver l'élément à exporter
    const element = document.getElementById(elementId);
    if (!element) throw new Error('Element not found');

    // Configurer html2canvas
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      logging: false,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Calculer les dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Créer le PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Ajouter l'image au PDF
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth - (margin * 2), imgHeight - (margin * 2));

    // Sauvegarder le PDF
    pdf.save(filename);

    return true;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}; 