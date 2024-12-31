import React from "react";
import { useQuery } from "@tanstack/react-query";
import { aiSuggestionService } from "../../services/aiSuggestionService";

interface AISuggestionPanelProps {
  resumeData: any;
  onApplySuggestion: (suggestion: any) => void;
}

export const AISuggestionPanel = ({ resumeData, onApplySuggestion }: AISuggestionPanelProps) => {
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['suggestions', resumeData],
    queryFn: () => aiSuggestionService.getSuggestions(resumeData),
    enabled: !!resumeData
  });

  if (isLoading) {
    return <div>Chargement des suggestions...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Suggestions AI</h3>
      {/* Contenu des suggestions */}
    </div>
  );
}; 