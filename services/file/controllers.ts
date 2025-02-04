import { Router, Request, Response } from 'express';
import multer from 'multer';
import { StorageService, ProcessingService } from './services';
import type { 
  UploadResult, 
  ProcessingStatus, 
  ValidationResult,
  ProcessingOptions 
} from '@/types/file';
import { AppError } from '../auth/middleware/app-error';

const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  }
});

export class FileController {
  public router: Router;
  private storageService: StorageService;
  private processingService: ProcessingService;

  constructor() {
    this.router = Router();
    this.storageService = new StorageService();
    this.processingService = new ProcessingService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/files/upload', 
      upload.single('file'), 
      this.uploadFile.bind(this)
    );
    this.router.get('/files/:fileId/status', 
      this.getStatus.bind(this)
    );
    this.router.post('/files/:fileId/process', 
      this.processFile.bind(this)
    );
    this.router.get('/files/:fileId/validate', 
      this.validateFile.bind(this)
    );
  }

  private async uploadFile(req: Request, res: Response) {
    try {
      if (!req.file) {
        throw new AppError('No file uploaded', 400);
      }

      const result = await this.storageService.uploadFile(req.file);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(400).json({ 
          error: 'File upload failed' 
        });
      }
    }
  }

  private async getStatus(req: Request, res: Response) {
    try {
      const { fileId } = req.params;
      
      if (!fileId) {
        throw new AppError('File ID is required', 400);
      }

      const status = await this.processingService.getStatus(fileId);
      res.status(200).json({ status });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(400).json({ 
          error: 'Failed to get file status' 
        });
      }
    }
  }

  private async processFile(req: Request, res: Response) {
    try {
      const { fileId } = req.params;
      const options = req.body as ProcessingOptions;
      
      if (!fileId) {
        throw new AppError('File ID is required', 400);
      }

      const result = await this.processingService.processFile(fileId, options);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(400).json({ 
          error: 'File processing failed' 
        });
      }
    }
  }

  private async validateFile(req: Request, res: Response) {
    try {
      const { fileId } = req.params;
      
      if (!fileId) {
        throw new AppError('File ID is required', 400);
      }

      const validationResult = await this.processingService.validateFile(fileId);
      res.status(200).json(validationResult);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ 
          error: error.message 
        });
      } else {
        res.status(400).json({ 
          error: 'File validation failed' 
        });
      }
    }
  }
} 