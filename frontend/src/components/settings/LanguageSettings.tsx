import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Globe, Check } from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' }
];

export const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [isPending, setIsPending] = useState(false);

  const handleLanguageChange = async (code: string) => {
    setIsPending(true);
    try {
      setSelectedLanguage(code);
      // TODO: Implémenter le changement de langue dans l'application
      // await updateUserLanguage(code);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="overflow-visible bg-gray-900/80 backdrop-blur-xl border border-gray-800/50">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-medium text-white">Langue de l'interface</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LANGUAGES.map(({ code, name, flag }) => (
            <motion.button
              key={code}
              onClick={() => handleLanguageChange(code)}
              disabled={isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200
                ${selectedLanguage === code 
                  ? 'bg-blue-500/20 border border-blue-500/50 text-white' 
                  : 'hover:bg-gray-800/50 text-gray-400 border border-transparent'}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{flag}</span>
                <span>{name}</span>
              </div>
              {selectedLanguage === code && (
                <Check className="w-5 h-5 text-blue-400" />
              )}
            </motion.button>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-4">
          Cette langue sera utilisée dans toute l'interface de l'application.
        </p>
      </div>
    </Card>
  );
};

export default LanguageSettings; 