import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFirebaseAuth } from '../../hooks/useFirebaseAuth';
import { SparklesCore } from '../ui/SparklesCore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { loading, error } = useFirebaseAuth();

  // Effet de chargement élégant
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Effet de particules en arrière-plan */}
          <SparklesCore
            id="auth-sparkles"
            className="absolute inset-0"
            particleColor="#4F46E5"
          />
          
          {/* Logo animé */}
          <motion.div
            className="w-16 h-16 relative z-10"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img 
              src="/logo.svg" 
              alt="Loading" 
              className="w-full h-full"
            />
          </motion.div>

          {/* Texte de chargement */}
          <motion.p
            className="text-white/80 mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Chargement de votre espace...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
        <motion.div
          className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full mx-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-red-500 text-lg font-medium mb-2">
            Erreur d'authentification
          </h3>
          <p className="text-white/80 mb-4">
            {error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Réessayer
          </button>
        </motion.div>
      </div>
    );
  }

  // Rendu des enfants avec animation de transition
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}; 