import React from 'react';
import { motion } from 'framer-motion';

export const ProfileResumes = () => {
  return (
    <div className="space-y-4">
      {/* Liste des CV avec options de modification/suppression */}
      <div className="grid gap-4">
        {[1, 2, 3].map((resume) => (
          <motion.div
            key={resume}
            className="bg-gray-900/50 rounded-xl p-4 flex justify-between items-center"
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <h3 className="text-white font-medium">CV Développeur Web</h3>
              <p className="text-sm text-gray-400">Modifié le 12 mars 2024</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg">
                Modifier
              </button>
              <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg">
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 