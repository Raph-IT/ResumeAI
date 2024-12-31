import React from 'react';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
  preview?: boolean;
}

export const ProjectsSection = ({ projects, preview }: ProjectsSectionProps) => {
  const titleSize = preview ? 'text-[4px]' : 'text-base';
  const textSize = preview ? 'text-[3px]' : 'text-sm';

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className={`${titleSize} font-medium`}>{project.name}</h3>
            {project.startDate && (
              <span className={`${textSize} text-gray-500`}>
                {project.startDate}
                {project.endDate && ` - ${project.endDate}`}
              </span>
            )}
          </div>
          
          <p className={`${textSize} text-gray-600`}>{project.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className={`${textSize} px-2 py-0.5 bg-gray-100 text-gray-600 rounded`}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${textSize} text-indigo-600 hover:underline`}
            >
              View Project →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}; 