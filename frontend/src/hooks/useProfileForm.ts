import { useState } from 'react';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  title: string;
  birthDate?: string;
  summary: string;
  location: {
    address?: string;
    city: string;
    country: string;
    postalCode?: string;
  };
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

const initialFormData: ProfileFormData = {
  firstName: '',
  lastName: '',
  title: '',
  birthDate: '',
  summary: '',
  location: {
    address: '',
    city: '',
    country: '',
    postalCode: ''
  },
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  website: ''
};

export const useProfileForm = () => {
  const [formData, setFormData] = useState<ProfileFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (field: keyof typeof formData.location, value: string) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleSummaryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      summary: value
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleLocationChange,
    handleSummaryChange
  };
}; 