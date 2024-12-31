import { useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';
import { resumeService } from '../services/resumeService';

export const useAutoSave = (
  id: string | undefined,
  data: any,
  enabled: boolean = true,
  delay: number = 2000
) => {
  const savedData = useRef(data);
  const debouncedData = useDebounce(data, delay);

  useEffect(() => {
    if (!enabled || !id || JSON.stringify(debouncedData) === JSON.stringify(savedData.current)) {
      return;
    }

    const saveData = async () => {
      try {
        await resumeService.autoSave(id, debouncedData);
        savedData.current = debouncedData;
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    saveData();
  }, [debouncedData, enabled, id]);

  return {
    lastSavedData: savedData.current
  };
}; 