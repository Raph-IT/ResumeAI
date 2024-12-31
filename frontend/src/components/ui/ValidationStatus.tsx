import { Check, AlertCircle } from 'lucide-react';

interface ValidationStatusProps {
  field: string;
  isValid: boolean;
  message?: string;
}

export const ValidationStatus = ({ field, isValid, message }: ValidationStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      {isValid ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <AlertCircle className="w-4 h-4 text-amber-400" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-400' : 'text-amber-400'}`}>
        {message || `${field} ${isValid ? 'validé' : 'à compléter'}`}
      </span>
    </div>
  );
}; 