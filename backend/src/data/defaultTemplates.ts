import { ResumeTemplate, CoverLetterTemplate } from '../types/templates';

export const defaultResumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Clean and professional template with a modern touch',
    type: 'resume',
    tags: ['Popular', 'Professional', 'ATS-Friendly'],
    sections: [
      {
        id: 'contact',
        name: 'Contact',
        type: 'contact',
        required: true
      },
      {
        id: 'profile',
        name: 'Professional Profile',
        type: 'text',
        required: true
      },
      {
        id: 'experience',
        name: 'Work Experience',
        type: 'timeline',
        required: true,
        maxItems: 5
      },
      {
        id: 'education',
        name: 'Education',
        type: 'education',
        required: true,
        maxItems: 3
      },
      {
        id: 'skills',
        name: 'Skills',
        type: 'skills',
        required: true
      },
      {
        id: 'languages',
        name: 'Languages',
        type: 'list',
        required: false
      },
      {
        id: 'certifications',
        name: 'Certifications',
        type: 'list',
        required: false
      }
    ]
  },
  {
    id: 'creative-developer',
    name: 'Creative Developer',
    description: 'Stand out with this creative yet professional layout',
    type: 'resume',
    tags: ['Creative', 'Modern', 'Tech'],
    sections: [
      {
        id: 'header',
        name: 'Header',
        type: 'contact',
        required: true
      },
      {
        id: 'skills',
        name: 'Technical Skills',
        type: 'skills',
        required: true
      },
      {
        id: 'profile',
        name: 'About Me',
        type: 'text',
        required: true
      },
      {
        id: 'experience',
        name: 'Experience',
        type: 'timeline',
        required: true,
        maxItems: 4
      },
      {
        id: 'projects',
        name: 'Featured Projects',
        type: 'list',
        required: false,
        maxItems: 3
      },
      {
        id: 'education',
        name: 'Education',
        type: 'education',
        required: true
      }
    ]
  },
  {
    id: 'minimal-tech',
    name: 'Minimal Tech',
    description: 'Minimalist design focused on skills and achievements',
    type: 'resume',
    tags: ['Minimal', 'Clean', 'Modern'],
    sections: [
      {
        id: 'header',
        name: 'Header',
        type: 'contact',
        required: true
      },
      {
        id: 'skills',
        name: 'Skills & Technologies',
        type: 'skills',
        required: true
      },
      {
        id: 'experience',
        name: 'Professional Experience',
        type: 'timeline',
        required: true
      },
      {
        id: 'education',
        name: 'Education',
        type: 'education',
        required: true
      }
    ]
  }
];

export const defaultCoverLetterTemplates: CoverLetterTemplate[] = [
  {
    id: 'professional-letter',
    name: 'Professional Cover Letter',
    description: 'Traditional and professional cover letter format',
    type: 'coverLetter',
    tags: ['Professional', 'Traditional', 'ATS-Friendly'],
    structure: {
      header: true,
      greeting: true,
      sections: [
        'introduction',
        'body',
        'skills',
        'closing'
      ],
      closing: true
    }
  }
]; 