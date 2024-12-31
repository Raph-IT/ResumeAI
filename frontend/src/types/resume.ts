export interface ResumeData {
  // Informations personnelles
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    profile: string;
  };

  // Expérience professionnelle
  professionalExperience: Array<{
    position: string;
    company: string;
    duration: string;
    projects?: Array<{
      name: string;
      responsibilities: string[];
      technologies?: string[];
      impact?: string[];
    }>;
    responsibilities?: string[];
  }>;

  // Formation
  education: Array<{
    degree: string;
    school: string;
    duration: string;
    focus: string;
  }>;

  // Compétences techniques
  technicalSkills: {
    programmingLanguages: string[];
    frameworks: string[];
    devops: string[];
    testing: string[];
    cloudInfrastructure: string[];
    methodologies: string[];
    documentation: string[];
  };

  // Langues
  languages: Array<{
    [key: string]: string;
  }>;

  // Centres d'intérêt
  interests: {
    technologyAndInnovation: string[];
    hardwareAndElectronics: string[];
    hobbies: string[];
  };

  // Préférences professionnelles
  preferences?: {
    jobType: string;
    experienceLevel: string;
    minimumSalary?: string;
  };
} 