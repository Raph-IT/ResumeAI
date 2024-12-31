export interface TemplateBase {
  id: string;
  name: string;
  description: string;
  type: 'resume' | 'coverLetter';
  tags: string[];
  thumbnail?: string;
}

export interface ResumeTemplate extends TemplateBase {
  type: 'resume';
  sections: {
    id: string;
    name: string;
    type: 'text' | 'list' | 'timeline' | 'skills' | 'contact' | 'education';
    required?: boolean;
    maxItems?: number;
  }[];
}

export interface CoverLetterTemplate extends TemplateBase {
  type: 'coverLetter';
  structure: {
    header?: boolean;
    greeting?: boolean;
    sections: string[];
    closing?: boolean;
  };
} 