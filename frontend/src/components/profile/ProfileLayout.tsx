import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Profile } from '../../pages/Profile';
import { ProfileSettings } from '../../pages/ProfileSettings';
import { Navbar } from '../ui/Navbar';

export const ProfileLayout = () => {
  const [currentView, setCurrentView] = useState<'profile' | 'settings'>('profile');

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar principale */}
      <Navbar />

      {/* Content */}
      <div>
        <AnimatePresence mode="wait">
          {currentView === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Profile setView={setCurrentView} />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileSettings setView={setCurrentView} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 