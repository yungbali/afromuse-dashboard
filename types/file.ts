export interface UploadResult {
  fileId: string;
  url: string;
  status: FileStatus;
  metadata: FileMetadata;
}

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  duration?: number;
  format?: string;
  bitrate?: number;
}

export type FileStatus = 'pending' | 'processing' | 'completed' | 'failed';
export type ProcessingStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface ProcessingOptions {
  quality?: 'high' | 'medium' | 'low';
  format?: 'mp3' | 'wav' | 'flac';
  normalize?: boolean;
}

export interface ProcessingResponse {
  fileId: string;
  status: ProcessingStatus;
  outputs: ProcessedFile[];
}

export interface ProcessedFile {
  format: string;
  url: string;
  size: number;
} 