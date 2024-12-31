import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { SparklesEffect } from '../components/ui/SparklesEffect';

export const ProfileSettings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative pt-20">
      <BackgroundBeams />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <SparklesEffect>
              <h1 className="text-4xl font-bold text-white">
                Paramètres
              </h1>
            </SparklesEffect>
            <p className="mt-2 text-gray-400">
              Gérez vos préférences et paramètres de compte
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
            <div className="space-y-6">
              {/* Section Email */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Email</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>

              {/* Section Mot de passe */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Sécurité</h2>
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={() => {/* Logique pour changer le mot de passe */}}
                >
                  Changer le mot de passe
                </button>
              </div>

              {/* Section Notifications */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="text-gray-300">Recevoir des emails de mise à jour</span>
                  </label>
                </div>
              </div>

              {/* Section Suppression du compte */}
              <div>
                <h2 className="text-xl font-semibold text-red-500 mb-4">Zone de danger</h2>
                <button
                  className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
                  onClick={() => {/* Logique pour supprimer le compte */}}
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 