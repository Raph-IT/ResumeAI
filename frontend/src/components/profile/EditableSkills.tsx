import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface EditableSkillsProps {
  skills: string[];
  onUpdate: (skills: string[]) => Promise<void>;
}

export const EditableSkills = ({ skills, onUpdate }: EditableSkillsProps) => {
  const [newSkill, setNewSkill] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    await onUpdate([...skills, newSkill.trim()]);
    setNewSkill('');
    setIsAdding(false);
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    await onUpdate(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="group flex items-center gap-1 px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
          >
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        <button
          onClick={() => setIsAdding(true)}
          className="px-3 py-1 rounded-full bg-gray-700/30 text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {isAdding && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Nouvelle compétence..."
            className="bg-gray-700/50 border border-gray-600 rounded px-2 py-1 text-white flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button
            onClick={handleAddSkill}
            className="p-1 hover:bg-green-500/20 rounded-full text-green-400"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-1 hover:bg-red-500/20 rounded-full text-red-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}; 