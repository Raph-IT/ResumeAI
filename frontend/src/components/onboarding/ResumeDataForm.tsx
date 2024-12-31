import React from 'react';
import { Button } from '../ui/Button';

export const ResumeDataForm = ({ 
  scrapedData,
  onSubmit,
  onCancel 
}: { 
  scrapedData: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Champs pré-remplis avec scrapedData */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button onClick={() => onSubmit(scrapedData)}>
          Valider
        </Button>
      </div>
    </div>
  );
}; 