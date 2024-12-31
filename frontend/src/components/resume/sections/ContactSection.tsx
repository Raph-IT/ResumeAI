import React from 'react';

interface ContactSectionProps {
  data: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    website?: string;
  };
  preview?: boolean;
}

export const ContactSection = ({ data, preview }: ContactSectionProps) => {
  const textSize = preview ? 'text-[3px]' : 'text-sm';
  
  return (
    <div className="space-y-1">
      {data.email && (
        <div className={`${textSize} flex items-center gap-1`}>
          <span className="w-3 text-gray-400">Email:</span>
          <span>{data.email}</span>
        </div>
      )}
      {data.phone && (
        <div className={`${textSize} flex items-center gap-1`}>
          <span className="w-3 text-gray-400">Tel:</span>
          <span>{data.phone}</span>
        </div>
      )}
      {/* ... autres champs de contact */}
    </div>
  );
}; 