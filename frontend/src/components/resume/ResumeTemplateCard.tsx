import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeTemplate } from '../../data/resumeTemplates';

interface ResumeTemplateCardProps {
  template: ResumeTemplate;
  onClick?: () => void;
}

export const ResumeTemplateCard = ({ template, onClick }: ResumeTemplateCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/resume/edit/${template.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
    >
      <div className="aspect-[210/297] relative">
        <img
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Utiliser ce template
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{template.name}</h3>
        <p className="text-gray-400 text-sm">{template.description}</p>
      </div>
    </div>
  );
}; 