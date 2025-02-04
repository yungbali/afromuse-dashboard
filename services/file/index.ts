import { createServer } from '../auth/server';
import { FileController } from './controllers';
import { StorageService, ProcessingService } from './services';
import type { 
  UploadResult, 
  ProcessingStatus, 
  ValidationResult,
  ProcessingOptions 
} from '@/types/file';

interface FileServiceAPI {
  upload: (file: File) => Promise<UploadResult>;
  process: (fileId: string, options?: ProcessingOptions) => Promise<ProcessingStatus>;
  validate: (fileId: string) => Promise<ValidationResult>;
}

const fileService = createServer({
  controllers: [FileController]
});

export class FileServiceImpl implements FileServiceAPI {
  private storageService: StorageService;
  private processingService: ProcessingService;

  constructor() {
    this.storageService = new StorageService();
    this.processingService = new ProcessingService();
  }

  async upload(file: File): Promise<UploadResult> {
    // Convert File to Multer.File
    const multerFile: Express.Multer.File = {
      buffer: await file.arrayBuffer(),
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
    } as Express.Multer.File;

    return this.storageService.uploadFile(multerFile);
  }

  async process(fileId: string, options?: ProcessingOptions): Promise<ProcessingStatus> {
    return this.processingService.processFile(fileId, options || {});
  }

  async validate(fileId: string): Promise<ValidationResult> {
    return this.processingService.validateFile(fileId);
  }
}

export const fileServiceInstance = new FileServiceImpl();
export default fileService; 