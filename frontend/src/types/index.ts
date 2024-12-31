export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  preferredLanguage: string;
  linkedinUrl?: string;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
}

export interface CoverLetter {
  id: string;
  name: string;
  content: string;
  lastModified: Date;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'pending' | 'applied' | 'interviewing' | 'rejected' | 'accepted';
  resumeId: string;
  coverLetterId: string;
  dateApplied: Date;
}