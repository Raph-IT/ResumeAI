import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../hooks/useProfile';
import { ProfilePhotoUpload } from './ProfilePhotoUpload';
import { SparklesEffect } from '../ui/SparklesEffect';
import { Briefcase, MapPin, Mail, Check, AlertCircle } from 'lucide-react';

export const ProfileHeader = () => {
  const { profile, getProfileCompletion } = useProfile();
  const completion = getProfileCompletion(); // Retourne un pourcentage

  return (
    <div className="mt-10 relative mb-8">
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          <div className="relative">
            <ProfilePhotoUpload />
            {completion === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          <div>
            <SparklesEffect>
              <h1 className="text-2xl font-bold text-white mb-2">
                {profile?.firstName} {profile?.lastName}
              </h1>
            </SparklesEffect>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{profile?.title}</span>
              <span>•</span>
              <span>{profile?.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-400">Profil complété à</span>
            <span className="text-lg font-semibold text-white">{completion}%</span>
          </div>
          {completion < 100 && (
            <div className="flex items-center gap-2 text-amber-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Complétez votre profil pour plus de visibilité</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 