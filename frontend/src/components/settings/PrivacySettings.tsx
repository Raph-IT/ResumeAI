import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Shield, Eye, Lock, Trash2, AlertCircle } from 'lucide-react';
import { Switch } from '../ui/Switch';

export const PrivacySettings = () => {
  const [settings, setSettings] = useState({
    profileVisibility: true,
    dataCollection: true,
    emailNotifications: true,
    twoFactorAuth: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDeleteAccount = async () => {
    if (deleteInput.toLowerCase() !== 'supprimer') return;
    
    try {
      // TODO: Implémenter la suppression du compte
      console.log('Compte supprimé');
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Visibilité du profil */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Visibilité du profil</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="space-y-1">
                <p className="text-white">Profil public</p>
                <p className="text-sm text-gray-400">
                  Permettre aux recruteurs de voir votre profil
                </p>
              </div>
              <Switch
                checked={settings.profileVisibility}
                onCheckedChange={() => handleSettingChange('profileVisibility')}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
              <div className="space-y-1">
                <p className="text-white">Collecte de données</p>
                <p className="text-sm text-gray-400">
                  Autoriser l'analyse pour améliorer nos services
                </p>
              </div>
              <Switch
                checked={settings.dataCollection}
                onCheckedChange={() => handleSettingChange('dataCollection')}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Sécurité avancée */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Sécurité avancée</h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50">
            <div className="space-y-1">
              <p className="text-white">Double authentification</p>
              <p className="text-sm text-gray-400">
                Ajouter une couche de sécurité supplémentaire
              </p>
            </div>
            <Switch
              checked={settings.twoFactorAuth}
              onCheckedChange={() => handleSettingChange('twoFactorAuth')}
            />
          </div>
        </div>
      </Card>

      {/* Suppression du compte */}
      <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-medium text-white">Supprimer le compte</h3>
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-red-400">
                  La suppression de votre compte est irréversible
                </p>
                <p className="text-sm text-gray-400">
                  Toutes vos données seront définitivement effacées, y compris vos CV et vos informations personnelles.
                </p>
              </div>
            </div>
          </div>

          {!showDeleteConfirm ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 
                       transition-colors duration-200"
            >
              Supprimer mon compte
            </motion.button>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="Tapez 'supprimer' pour confirmer"
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300"
                >
                  Annuler
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  disabled={deleteInput.toLowerCase() !== 'supprimer'}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:bg-red-600 transition-colors duration-200"
                >
                  Confirmer la suppression
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PrivacySettings; 