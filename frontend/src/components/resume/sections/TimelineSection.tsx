import React from 'react';

interface TimelineItem {
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string[];
  location?: string;
}

interface TimelineSectionProps {
  items: TimelineItem[];
  preview?: boolean;
}

export const TimelineSection = ({ items, preview }: TimelineSectionProps) => {
  const titleSize = preview ? 'text-[4px]' : 'text-base';
  const textSize = preview ? 'text-[3px]' : 'text-sm';
  
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="relative pl-4 border-l border-gray-200">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-indigo-500 -translate-x-1/2" />
          
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`${titleSize} font-medium`}>{item.title}</h3>
                <p className={`${textSize} text-gray-600`}>{item.organization}</p>
              </div>
              <span className={`${textSize} text-gray-500`}>
                {item.startDate} - {item.current ? 'Present' : item.endDate}
              </span>
            </div>
            
            <ul className={`${textSize} text-gray-600 list-disc list-inside`}>
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}; 