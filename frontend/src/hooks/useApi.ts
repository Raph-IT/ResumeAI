import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { useToast } from './useToast';

interface UseApiOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const useApi = <T>(options: UseApiOptions = {}) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const execute = useCallback(async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    body?: any
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api[method](url, body);
      setData(response.data);

      if (options.successMessage) {
        showToast(options.successMessage, 'success');
      }

      options.onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      setError(err);
      
      if (options.errorMessage) {
        showToast(options.errorMessage, 'error');
      }

      options.onError?.(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [options, showToast]);

  return {
    data,
    isLoading,
    error,
    execute
  };
}; 