import React from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const TabButton = ({ active, onClick, children }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium transition-colors relative ${
      active ? 'text-white' : 'text-gray-400 hover:text-white'
    }`}
  >
    {children}
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
      />
    )}
  </button>
);

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <div className="border-b border-gray-700">
      <nav className="flex space-x-8">
        <TabButton
          active={activeTab === 'informations'}
          onClick={() => onTabChange('informations')}
        >
          Informations
        </TabButton>
        <TabButton
          active={activeTab === 'cv-lettres'}
          onClick={() => onTabChange('cv-lettres')}
        >
          CV & Lettres
        </TabButton>
        <TabButton
          active={activeTab === 'parametres'}
          onClick={() => onTabChange('parametres')}
        >
          Paramètres
        </TabButton>
      </nav>
    </div>
  );
}; 