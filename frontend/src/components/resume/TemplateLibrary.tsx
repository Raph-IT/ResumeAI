import React from 'react';
import { useQuery } from 'react-query';
import { templatesApi } from '../../services/api';
import { TemplateBase } from '../../types/templates';

export const TemplateLibrary = () => {
  const { data: templates, isLoading } = useQuery<TemplateBase[]>(
    'templates',
    templatesApi.getTemplates
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {templates?.map((template) => (
        <div key={template.id} className="group cursor-pointer">
          <div className="relative aspect-[210/297] rounded-lg overflow-hidden">
            {template.thumbnail ? (
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
            
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
              <span className="text-white font-medium">Use this template</span>
              <div className="flex gap-2">
                {template.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <h3 className="text-white font-medium">{template.name}</h3>
            <p className="text-sm text-gray-400">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}; 