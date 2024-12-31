import React from 'react';

interface CreativeTemplateProps {
  preview?: boolean;
}

export const CreativeTemplate = ({ preview = false }: CreativeTemplateProps) => {
  const baseSize = preview ? 'text-[4px]' : 'text-base';
  const titleSize = preview ? 'text-[5px]' : 'text-lg';
  const subtitleSize = preview ? 'text-[3.5px]' : 'text-sm';
  const smallSize = preview ? 'text-[3px]' : 'text-xs';
  const spacing = preview ? 'space-y-[2px]' : 'space-y-2';
  const padding = preview ? 'p-[4px]' : 'p-4';

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#151823] to-[#1F2937]">
      <div className={`h-full ${padding} ${baseSize}`}>
        {/* En-tête */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`${titleSize} text-indigo-500 font-bold`}>John Doe</h1>
            <p className={`${smallSize} text-gray-400`}>
              Creative Technologist & Full-Stack Developer
            </p>
          </div>
          <div className="flex gap-1">
            {['React', 'Node', 'AI', 'Cloud'].map((tech) => (
              <span
                key={tech}
                className={`${smallSize} px-[2px] py-[1px] text-indigo-400 bg-indigo-400/10`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className={`${subtitleSize} text-gray-400 mt-2`}>
          Crafting innovative digital experiences with cutting-edge technologies. 
          Specialized in building scalable applications and AI-driven solutions.
        </p>

        {/* Sections */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <h3 className={`${smallSize} text-indigo-400 uppercase`}>Latest Project</h3>
            <p className={`${smallSize} text-gray-400`}>AI-Powered Analytics Platform</p>
          </div>
          <div>
            <h3 className={`${smallSize} text-indigo-400 uppercase`}>Expertise</h3>
            <p className={`${smallSize} text-gray-400`}>Full-Stack Development</p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-auto pt-2 flex gap-2">
          <span className={`${smallSize} text-gray-400`}>john@doe.dev</span>
          <span className={`${smallSize} text-gray-400`}>johndoe.dev</span>
        </div>
      </div>
    </div>
  );
}; 