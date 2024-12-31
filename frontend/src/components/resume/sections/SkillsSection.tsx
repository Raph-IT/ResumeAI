import React from 'react';

interface Skill {
  name: string;
  level?: number; // 0-100
  category?: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  preview?: boolean;
  showLevel?: boolean;
}

export const SkillsSection = ({ skills, preview, showLevel = true }: SkillsSectionProps) => {
  const titleSize = preview ? 'text-[4px]' : 'text-base';
  const textSize = preview ? 'text-[3px]' : 'text-sm';

  // Grouper les skills par catégorie
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-3">
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div key={category}>
          <h3 className={`${titleSize} font-medium text-gray-700 mb-2`}>{category}</h3>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <span className={`${textSize}`}>{skill.name}</span>
                  {showLevel && skill.level && (
                    <span className={`${textSize} text-gray-500`}>
                      {skill.level}%
                    </span>
                  )}
                </div>
                {showLevel && skill.level && (
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 