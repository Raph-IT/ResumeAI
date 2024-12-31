import axios from 'axios';
import { auth } from '../config/firebase';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      auth.signOut();
    }
    return Promise.reject(error);
  }
);

export const templatesApi = {
  getTemplates: () => api.get('/templates'),
  getTemplateById: (id: string) => api.get(`/templates/${id}`),
  createTemplate: (template: any) => api.post('/templates', template),
  updateTemplate: (id: string, template: any) => api.put(`/templates/${id}`, template),
  deleteTemplate: (id: string) => api.delete(`/templates/${id}`)
}; 