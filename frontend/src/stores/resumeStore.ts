import { create } from 'zustand';
import { ResumeData } from '../schemas/resumeSchema';
import { resumeService } from '../services/resumeService';

interface ResumeStore {
  resumes: ResumeData[];
  currentResume: ResumeData | null;
  isLoading: boolean;
  error: string | null;
  fetchResumes: () => Promise<void>;
  setCurrentResume: (resume: ResumeData | null) => void;
  updateResume: (id: string, data: Partial<ResumeData>) => Promise<void>;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resumes: [],
  currentResume: null,
  isLoading: false,
  error: null,

  fetchResumes: async () => {
    try {
      set({ isLoading: true, error: null });
      const resumes = await resumeService.getAllByUser();
      set({ resumes, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch resumes', isLoading: false });
    }
  },

  setCurrentResume: (resume) => {
    set({ currentResume: resume });
  },

  updateResume: async (id, data) => {
    try {
      set({ isLoading: true, error: null });
      const updatedResume = await resumeService.update(id, data);
      
      // Mettre à jour le resume dans la liste
      const resumes = get().resumes.map(resume => 
        resume.id === id ? updatedResume : resume
      );
      
      set({ 
        resumes,
        currentResume: updatedResume,
        isLoading: false 
      });
    } catch (error) {
      set({ error: 'Failed to update resume', isLoading: false });
    }
  }
})); 