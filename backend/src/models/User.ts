// src/models/User.ts
interface User {
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