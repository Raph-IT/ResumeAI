import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface SectionLayoutProps {
  title: string;
  icon: React.ReactNode;
  isComplete: boolean;
  lastUpdated?: Date;
  onEdit?: () => void;
  children: React.ReactNode;
}

export const SectionLayout = ({
  title,
  icon,
  isComplete,
  lastUpdated,
  children
}: SectionLayoutProps) => {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      if (isNaN(dateObj.getTime())) {
        return '';
      }

      const now = new Date();
      const diffInMinutes = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInMinutes < 1) {
        return 'À l\'instant';
      } else if (diffInMinutes < 60) {
        return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
      } else if (diffInHours < 24) {
        return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
      } else if (diffInDays < 7) {
        return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
      } else {
        return new Intl.DateTimeFormat('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).format(dateObj);
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 
        group-hover:opacity-100 transition-opacity" />
      
      <div className="relative border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              {lastUpdated && (
                <p className="text-sm text-gray-400">
                  {formatDate(lastUpdated)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isComplete ? (
              <span className="flex items-center gap-2 text-green-400">
                <Check className="w-4 h-4" />
                Complété
              </span>
            ) : (
              <span className="flex items-center gap-2 text-amber-400">
                <AlertCircle className="w-4 h-4" />
                À compléter
              </span>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}; 