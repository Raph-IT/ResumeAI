import { api } from './api';

export const aiSuggestionService = {
  getSuggestions: async (resumeData: any) => {
    const response = await api.post('/ai/analyze-resume', resumeData);
    return response.data;
  },

  improveDescription: async (text: string) => {
    const response = await api.post('/ai/improve-description', { text });
    return response.data;
  },

  suggestSkills: async (experience: string) => {
    const response = await api.post('/ai/suggest-skills', { experience });
    return response.data;
  }
}; 