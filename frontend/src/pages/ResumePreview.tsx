import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { templatesApi } from '../services/api';
import { ResumePreview } from '../components/resume/ResumePreview';

export const ResumePreviewPage = () => {
  const { id } = useParams();
  const { data: template, isLoading: isLoadingTemplate } = useQuery(
    ['template', id],
    () => templatesApi.getTemplateById(id!)
  );

  const { data: resumeData, isLoading: isLoadingData } = useQuery(
    ['resume', id],
    // Remplacer par votre API pour récupérer les données du CV
    () => Promise.resolve({})
  );

  if (isLoadingTemplate || isLoadingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <ResumePreview 
          template={template!}
          data={resumeData}
          scale={1}
        />
      </div>
    </div>
  );
}; 