import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ProfileSkills = () => {
  const [skills, setSkills] = useState<string[]>([
    'React', 'TypeScript', 'Node.js', 'Express'
  ]);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={addSkill} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Ajouter une compétence"
          className="flex-1 bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Ajouter
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-1 text-gray-400 hover:text-red-400"
            >
              ×
            </button>
          </motion.span>
        ))}
      </div>
    </div>
  );
}; 