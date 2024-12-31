// src/lib/pdf-parser.ts
export async function parsePDFContent(file: File): Promise<string> {
    try {
      // Convertir le fichier en buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Utiliser l'API FileReader comme alternative
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            // Pour le moment on retourne simplement le contenu en texte brut
            resolve(e.target.result.toString());
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
    } catch (error) {
      console.error('Error parsing PDF:', error);
      throw new Error('Failed to parse PDF');
    }
  }
  
  export function extractInformation(text: string) {
    const extractedData = {
      fullName: '',
      jobTitle: '',
      phoneNumber: '',
      linkedinUrl: '',
      location: '',
      experienceLevel: 'Entry',
      minimumSalary: '',
      jobType: 'Full Time' as const
    };
  
    const lines = text.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Nom complet - première ligne qui a plus de 2 mots en majuscules
      if (!extractedData.fullName && 
          /^[A-Z][a-zÀ-ÿ]+(\s+[A-Z][a-zÀ-ÿ]+){1,}$/.test(trimmedLine)) {
        extractedData.fullName = trimmedLine;
      }
      
      // Titre du poste
      if (!extractedData.jobTitle && 
          /(developer|engineer|architect|développeur|ingénieur)/i.test(trimmedLine)) {
        extractedData.jobTitle = trimmedLine;
      }
      
      // Numéro de téléphone
      if (!extractedData.phoneNumber) {
        const phoneMatch = trimmedLine.match(/(?:\+\d{2}|\b\d{2})[\s.-]?(\d{2}[\s.-]?){4}/);
        if (phoneMatch) {
          extractedData.phoneNumber = phoneMatch[0];
        }
      }
      
      // LinkedIn URL
      if (!extractedData.linkedinUrl && 
          /linkedin\.com\/in\/[\w-]+/.test(trimmedLine)) {
        extractedData.linkedinUrl = trimmedLine;
      }
      
      // Location
      if (!extractedData.location && 
          /(location|ville|adresse|city)[\s:]+([^,\n]+)/i.test(trimmedLine)) {
        const locationMatch = trimmedLine.match(/(location|ville|adresse|city)[\s:]+([^,\n]+)/i);
        if (locationMatch) {
          extractedData.location = locationMatch[2].trim();
        }
      }
    }
  
    return extractedData;
  }