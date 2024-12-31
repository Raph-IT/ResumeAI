import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { Experience } from '../../../types/profile';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Card } from '../../ui/Card';
import { ExperienceForm } from './ExperienceForm';

interface ExperienceCardProps {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate: (experience: Experience) => void;
  onDelete: () => void;
}

export const ExperienceCard = ({ 
  experience, 
  isExpanded, 
  onToggle, 
  onUpdate, 
  onDelete 
}: ExperienceCardProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ExperienceForm
              experience={experience}
              onSubmit={(updatedExperience) => {
                onUpdate(updatedExperience);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* En-tête */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {experience.title}
                </h3>
                <p className="text-gray-400">
                  {experience.company} • {experience.location}
                </p>
                <p className="text-sm text-gray-500">
                  {format(new Date(experience.startDate), 'MMM yyyy', { locale: fr })} - 
                  {experience.current ? 
                    ' Présent' : 
                    format(new Date(experience.endDate!), 'MMM yyyy', { locale: fr })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  <Pencil className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDelete}
                  className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggle}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                  {isExpanded ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </motion.button>
              </div>
            </div>

            {/* Contenu détaillé */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  {/* Description */}
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: experience.description }}
                  />

                  {/* Réalisations */}
                  {experience.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Réalisations clés
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-400">
                        {experience.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {experience.technologies && experience.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">
                        Technologies utilisées
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}; 