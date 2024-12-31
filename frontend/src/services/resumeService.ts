// src/services/resumeService.ts
import { api } from './api';
import { ResumeData } from '../schemas/resumeSchema';

export const resumeService = {
  // Créer un nouveau CV
  create: async (data: Partial<ResumeData>) => {
    const response = await api.post('/resumes', data);
    return response.data;
  },

  // Mettre à jour un CV existant
  update: async (id: string, data: Partial<ResumeData>) => {
    const response = await api.put(`/resumes/${id}`, data);
    return response.data;
  },

  // Récupérer un CV par son ID
  getById: async (id: string) => {
    const response = await api.get(`/resumes/${id}`);
    return response.data;
  },

  // Récupérer tous les CV d'un utilisateur
  getAllByUser: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },

  // Supprimer un CV
  delete: async (id: string) => {
    await api.delete(`/resumes/${id}`);
  },

  // Dupliquer un CV
  duplicate: async (id: string) => {
    const response = await api.post(`/resumes/${id}/duplicate`);
    return response.data;
  },

  // Auto-sauvegarder un CV
  autoSave: async (id: string, data: Partial<ResumeData>) => {
    const response = await api.post(`/resumes/${id}/autosave`, data);
    return response.data;
  },

  // Rechercher des CV
  search: async (params: any) => {
    const response = await api.post('/resumes/search', params);
    return response.data;
  }
};