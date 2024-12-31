import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as Templates from './templates';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and professional template with a modern touch',
    Component: Templates.ModernTemplate,
    tags: ['Popular', 'Professional', 'ATS-Friendly']
  },
  {
    id: 'minimal',
    name: 'Minimal Tech',
    description: 'Minimalist design focused on skills and achievements',
    Component: Templates.MinimalTemplate,
    tags: ['Minimal', 'Clean', 'ATS-Friendly']
  },
  {
    id: 'creative',
    name: 'Creative Developer',
    description: 'Stand out with this creative yet professional layout',
    Component: Templates.CreativeTemplate,
    tags: ['Creative', 'Modern', 'Unique']
  }
];

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelectionModal = ({ isOpen, onClose }: TemplateSelectionModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/70" onClick={onClose} />
        
        <div className="relative bg-gray-900 rounded-lg w-full max-w-7xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Choose your template</h2>
              <p className="text-gray-400 mt-1">Select from our ATS-friendly templates</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/resume/edit/${template.id}`);
                  onClose();
                }}
              >
                <div className="w-[240px] h-[340px] relative rounded-lg overflow-hidden bg-white">
                  <div className="absolute inset-0">
                    <template.Component preview={true} />
                  </div>
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                    <span className="text-white font-medium text-lg">Use this template</span>
                    <div className="flex gap-2">
                      {template.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white">
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
        </div>
      </div>
    </div>
  );
}; 