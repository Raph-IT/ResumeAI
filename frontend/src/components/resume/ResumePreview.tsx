import React from 'react';
import { motion } from 'framer-motion';
import { CreativeTemplate } from "./templates/CreativeTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { ExportButton } from "./ExportButton";

const templateComponents = {
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
};

interface ResumePreviewProps {
  data: any;
  template?: keyof typeof templateComponents;
}

export const ResumePreview = ({ data, template = 'minimal' }: ResumePreviewProps) => {
  const TemplateComponent = templateComponents[template];

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="relative">
        <div className="aspect-[210/297] w-full">
          <TemplateComponent data={data} />
        </div>
        <div className="absolute top-4 right-4">
          <ExportButton data={data} template={template} />
        </div>
      </div>
    </div>
  );
}; 