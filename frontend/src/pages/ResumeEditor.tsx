import React from 'react';
import { useParams } from 'react-router-dom';
import { ResumeEditor as ResumeEditorComponent } from '../components/resume/ResumeEditor';

export const ResumeEditor = () => {
  const { templateId } = useParams<{ templateId: string }>();

  if (!templateId) {
    return <div>Template non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-20">
      <div className="container mx-auto px-4">
        <ResumeEditorComponent templateId={templateId} />
      </div>
    </div>
  );
}; 