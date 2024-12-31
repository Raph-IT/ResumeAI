import React from 'react';
import { useQuery } from 'react-query';
import { creditService } from '../../services/creditService';

export const CreditsDisplay = () => {
  const { data: credits, isLoading } = useQuery(
    'credits',
    () => creditService.getBalance(),
    {
      refetchInterval: 60000 // Rafraîchir toutes les minutes
    }
  );

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-2">
      <svg
        className="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" />
      </svg>
      <span className="font-medium">{credits} crédits</span>
    </div>
  );
}; 