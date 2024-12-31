import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SignUpForm } from '../components/auth/SignUpForm';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { SparklesCore } from '../components/ui/SparklesCore';

export const SignUp = () => {
  const { user } = useAuth();

  // Redirection si déjà connecté
  if (user) {
    return <Navigate to="/resumes" replace />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Effet de particules en arrière-plan */}
      <SparklesCore
        id="signup-sparkles"
        className="absolute inset-0"
        particleColor="#4F46E5"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-3xl font-bold text-white"
          >
            Créez votre compte gratuitement
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="mt-2 text-sm text-gray-400">
              Ou{' '}
              <Link to="/signin" className="font-medium text-blue-500 hover:text-blue-400">
                connectez-vous à votre compte existant
              </Link>
            </p>
          </motion.div>
        </div>

        <SignUpForm />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-center text-gray-500"
        >
          En vous inscrivant, vous acceptez nos{' '}
          <Link to="/terms" className="text-blue-500 hover:text-blue-400">
            conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link to="/privacy" className="text-blue-500 hover:text-blue-400">
            politique de confidentialité
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp; 