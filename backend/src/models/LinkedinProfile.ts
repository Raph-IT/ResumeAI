interface LinkedinProfile {
    id: string;
    userId: string;
    url: string;
    data: {
      fullName: string;
      currentTitle: string;
      location: string;
      experiences: Array<{
        title: string;
        company: string;
        duration: string;
      }>;
    };
    scrapedAt: string;
    status: 'pending' | 'scraped' | 'failed';
   }
   
   export type { User, Resume, LinkedinProfile };