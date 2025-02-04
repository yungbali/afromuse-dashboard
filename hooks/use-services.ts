import { useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  authService,
  fileService,
  distributionService,
  catalogService
} from '@/services';

export function useServices() {
  const { toast } = useToast();

  const handleError = useCallback((error: Error, message: string) => {
    console.error(error);
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive'
    });
  }, [toast]);

  return {
    auth: {
      login: async (credentials: { email: string; password: string }) => {
        try {
          return await authService.login(credentials);
        } catch (error) {
          handleError(error as Error, 'Login failed');
          throw error;
        }
      },
      // ... other auth methods
    },
    files: {
      upload: async (file: File) => {
        try {
          return await fileService.upload(file);
        } catch (error) {
          handleError(error as Error, 'File upload failed');
          throw error;
        }
      },
      // ... other file methods
    },
    // ... other services
  };
} 