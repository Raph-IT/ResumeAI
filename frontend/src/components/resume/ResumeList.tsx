import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { ResumeData } from '../../schemas/resumeSchema';

export const ResumeList = () => {
  const { data: resumes, loading, error } = useFirestore<ResumeData>({
    collection: 'resumes'
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="grid gap-4">
      {resumes.map(resume => (
        <div key={resume.id} className="p-4 border rounded">
          <h3 className="font-bold">{resume.title}</h3>
          <p className="text-gray-600">
            Dernière modification: {new Date(resume.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}; 