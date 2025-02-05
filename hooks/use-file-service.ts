import { useState } from 'react';
import type { UploadResult, ProcessingStatus } from '@/types/file';
import { uploadData, downloadData } from 'aws-amplify/storage';

export function useFileService() {
  const [fileList, setFileList] = useState<UploadResult[]>([]);

  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      const result = await uploadData({
        path: `uploads/${file.name}`,
        data: file,
        options: {
          contentType: file.type
        }
      }).result;

      const { url } = await downloadData({ path: result.path! });
      
      return {
        fileId: result.path!,
        url: url.toString(),
        status: 'pending',
        metadata: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      };
    } catch (error) {
      handleError(error as Error, 'Upload failed');
      throw error;
    }
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