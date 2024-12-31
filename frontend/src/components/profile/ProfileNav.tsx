import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings } from 'lucide-react';

interface ProfileNavProps {
  currentView: 'profile' | 'settings';
  setView: (view: 'profile' | 'settings') => void;
}

export const ProfileNav = ({ currentView, setView }: ProfileNavProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700/50 mb-6">
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('profile')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
            ${currentView === 'profile' 
              ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/50 text-white' 
              : 'text-gray-400 hover:bg-gray-800/50'}`}
        >
          <User className="w-4 h-4" />
          <span>Profil CV</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('settings')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
            ${currentView === 'settings' 
              ? 'bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/50 text-white' 
              : 'text-gray-400 hover:bg-gray-800/50'}`}
        >
          <Settings className="w-4 h-4" />
          <span>Paramètres</span>
        </motion.button>
      </div>
    </div>
  );
}; 