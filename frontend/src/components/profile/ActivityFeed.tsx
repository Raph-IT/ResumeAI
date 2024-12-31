interface Activity {
  id: string;
  type: 'resume_created' | 'resume_updated' | 'letter_created' | 'profile_updated';
  timestamp: Date;
  details: {
    title?: string;
    changes?: string[];
  };
} 