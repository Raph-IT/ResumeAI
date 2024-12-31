import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Profile, getProfileData, updateProfileData } from '../services/profileService';
import { useToast } from './useToast';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const getProfileCompletion = useCallback(() => {
    if (!profile) return 0;

    const fields = [
      'firstName',
      'lastName',
      'title',
      'bio',
      'email',
      'phone',
      'location'
    ];

    const sections = [
      Boolean(profile.experiences?.length),
      Boolean(profile.education?.length),
      Boolean(profile.skills?.length),
      Boolean(profile.certifications?.length),
      Boolean(profile.projects?.length)
    ];

    const completedFields = fields.filter(field => Boolean(profile[field])).length;
    const completedSections = sections.filter(Boolean).length;

    return Math.round(
      ((completedFields / fields.length) * 0.5 + 
      (completedSections / sections.length) * 0.5) * 100
    );
  }, [profile]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const profileData = await getProfileData(user.uid);
        setProfile(profileData);
      } catch (err) {
        setError(err as Error);
        toast({
          type: 'error',
          message: 'Erreur lors du chargement du profil'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  useEffect(() => {
    const syncProfile = async () => {
      if (!user || !profile) return;

      try {
        const updates = {
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ').slice(1).join(' '),
          email: user.email,
          photo: user.photoURL
        };

        const filteredUpdates = Object.entries(updates).reduce((acc, [key, value]) => {
          if (value && !profile[key]) {
            acc[key] = value;
          }
          return acc;
        }, {});

        if (Object.keys(filteredUpdates).length > 0) {
          await updateProfile(filteredUpdates);
        }
      } catch (error) {
        console.error('Error syncing profile:', error);
      }
    };

    syncProfile();
  }, [user, profile]);

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      console.log('Updating profile with data:', data); // Debug

      // Mise à jour dans la base de données
      await updateProfileData(user.uid, data);

      // Mise à jour du state local
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        type: 'success',
        message: 'Profil mis à jour avec succès'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        type: 'error',
        message: 'Erreur lors de la mise à jour du profil'
      });
      throw error;
    }
  }, [user, toast]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    getProfileCompletion
  };
}; 