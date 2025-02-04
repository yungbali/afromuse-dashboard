import type {
  ProcessingOptions,
  ProcessingResponse
} from '@/types/file';

export interface FileProcessingService {
  baseUrl: string;
  endpoints: {
    upload: '/files/upload';
    validate: '/files/validate';
    process: '/files/process';
    status: '/files/status';
  };
  
  uploadFile(file: File): Promise<{
    fileId: string;
    status: string;
  }>;
  validateFile(fileId: string): Promise<{
    isValid: boolean;
    errors?: string[];
  }>;
  processFile(fileId: string, options: ProcessingOptions): Promise<ProcessingResponse>;
  getStatus(fileId: string): Promise<{
    status: string;
    progress?: number;
  }>;
}