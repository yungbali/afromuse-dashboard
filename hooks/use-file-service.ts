import { useState } from 'react';
import type { UploadResult, ProcessingStatus } from '@/types/file';

export function useFileService() {
  const [fileList, setFileList] = useState<UploadResult[]>([]);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const result = await response.json();
    setFileList(prev => [...prev, result]);
    return result;
  };

  const processFile = async (fileId: string): Promise<ProcessingStatus> => {
    const response = await fetch(`/api/files/${fileId}/process`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Processing failed');
    }

    return response.json();
  };

  return {
    uploadFile,
    processFile,
    fileList
  };
} 