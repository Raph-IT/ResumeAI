import { api } from './api';

export const parseResume = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const response = await api.post('/resume/parse', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw new Error('Erreur lors de l\'analyse du CV');
  }
}; 