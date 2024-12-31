export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  title?: string;
  birthDate?: string;
  bio?: string;
  photo?: string;
  skills?: Skill[];
  education?: Education[];
  experiences?: Experience[];
  certifications?: Certification[];
  projects?: Project[];
} 