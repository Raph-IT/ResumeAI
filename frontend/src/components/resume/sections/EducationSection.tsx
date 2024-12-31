import React from 'react';

interface Education {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  achievements?: string[];
}

interface EducationSectionProps {
  education: Education[];
  preview?: boolean;
}

export const EducationSection = ({ education, preview }: EducationSectionProps) => {
  const titleSize = preview ? 'text-[4px]' : 'text-base';
  const textSize = preview ? 'text-[3px]' : 'text-sm';

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`${titleSize} font-medium`}>{edu.degree}</h3>
              <p className={`${textSize} text-gray-600`}>
                {edu.institution}
                {edu.location && ` • ${edu.location}`}
              </p>
            </div>
            <span className={`${textSize} text-gray-500`}>
              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
            </span>
          </div>
          
          {edu.gpa && (
            <p className={`${textSize} text-gray-600`}>GPA: {edu.gpa}</p>
          )}
          
          {edu.achievements && edu.achievements.length > 0 && (
            <ul className={`${textSize} text-gray-600 list-disc list-inside`}>
              {edu.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}; 