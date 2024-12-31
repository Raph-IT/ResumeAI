import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Upload } from 'lucide-react';
import { EditableField } from './EditableField';
import { useProfile } from '../../hooks/useProfile';
import { ProfilePhotoUpload } from './ProfilePhotoUpload';
import { Card } from '../ui/Card';
import { SparklesEffect } from '../ui/SparklesEffect';
import { ImportResume } from './ImportResume';

interface ProfileInfoProps {
  activeTab: 'personal' | 'contact';
}

export const ProfileInfo = ({ activeTab }: ProfileInfoProps) => {
  const { profile, updateProfile } = useProfile();

  const handleFieldUpdate = async (field: string, value: string) => {
    try {
      await updateProfile({ [field]: value });
    } catch (error) {
      console.error('Error updating field:', error);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {activeTab === 'personal' ? (
          <motion.div
            key="personal"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* En-tête */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                Informations personnelles
              </h2>
            </div>

            {/* Section principale */}
            <Card className="mb-6">
              <div className="flex items-start gap-6">
                {/* Photo de profil */}
                <div className="flex-shrink-0">
                  <ProfilePhotoUpload />
                </div>

                {/* Informations principales */}
                <div className="flex-grow space-y-4">
                  <SparklesEffect>
                    <h2 className="text-2xl font-bold text-white">
                      {profile?.firstName} {profile?.lastName}
                    </h2>
                  </SparklesEffect>
                  <p className="text-gray-400">{profile?.title || 'Votre titre professionnel'}</p>
                </div>
              </div>
            </Card>

            {/* Import CV avec design amélioré */}
            <Card className="p-8 border-2 border-dashed border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Importez votre CV pour démarrer
                  </h3>
                  <p className="text-gray-400 mt-1">
                    Nous extrairons automatiquement vos informations
                  </p>
                </div>
                <ImportResume />
              </div>
            </Card>

            {/* Formulaire d'informations */}
            <Card className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableField
                  label="Prénom"
                  value={profile?.firstName || ''}
                  icon={<User className="w-4 h-4" />}
                  onSave={(value) => handleFieldUpdate('firstName', value)}
                />
                <EditableField
                  label="Nom"
                  value={profile?.lastName || ''}
                  icon={<User className="w-4 h-4" />}
                  onSave={(value) => handleFieldUpdate('lastName', value)}
                />
                <EditableField
                  label="Titre professionnel"
                  value={profile?.title || ''}
                  icon={<Briefcase className="w-4 h-4" />}
                  onSave={(value) => handleFieldUpdate('title', value)}
                />
                <EditableField
                  label="Date de naissance"
                  value={profile?.birthDate || ''}
                  icon={<Calendar className="w-4 h-4" />}
                  type="date"
                  onSave={(value) => handleFieldUpdate('birthDate', value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Biographie</label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Parlez-nous de vous..."
                  value={profile?.bio || ''}
                  onChange={(e) => handleFieldUpdate('bio', e.target.value)}
                />
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableField
                  label="Email"
                  value={profile?.email || ''}
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  onSave={(value) => handleFieldUpdate('email', value)}
                />
                <EditableField
                  label="Téléphone"
                  value={profile?.phone || ''}
                  icon={<Phone className="w-4 h-4" />}
                  type="tel"
                  onSave={(value) => handleFieldUpdate('phone', value)}
                />
                <EditableField
                  label="Localisation"
                  value={profile?.location || ''}
                  icon={<MapPin className="w-4 h-4" />}
                  onSave={(value) => handleFieldUpdate('location', value)}
                />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};