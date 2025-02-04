import { Router, Request, Response } from 'express';
import { DSPService, SchedulingService } from './services';
import type { 
  ReleaseDTO, 
  ScheduleResult, 
  DeliveryStatus,
  DSPList 
} from '@/types/distribution';
import { AppError } from '../auth/middleware/app-error';

export class DistributionController {
  public router: Router;
  private dspService: DSPService;
  private schedulingService: SchedulingService;

  constructor() {
    this.router = Router();
    this.dspService = new DSPService();
    this.schedulingService = new SchedulingService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/distribution/schedule', this.scheduleRelease.bind(this));
    this.router.get('/distribution/status/:releaseId', this.getDeliveryStatus.bind(this));
    this.router.get('/distribution/platforms', this.getPlatforms.bind(this));
    this.router.post('/distribution/cancel/:scheduleId', this.cancelSchedule.bind(this));
  }

  private async scheduleRelease(req: Request, res: Response) {
    try {
      const releaseData = req.body as ReleaseDTO;
      
      if (!releaseData.title || !releaseData.artist || !releaseData.tracks?.length) {
        throw new AppError('Invalid release data', 400);
      }

      const result = await this.schedulingService.scheduleRelease(releaseData);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Failed to schedule release' });
      }
    }
  }

  private async getDeliveryStatus(req: Request, res: Response) {
    try {
      const { releaseId } = req.params;
      
      if (!releaseId) {
        throw new AppError('Release ID is required', 400);
      }

      const status = await this.dspService.checkDeliveryStatus(releaseId);
      res.status(200).json({ status });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Failed to get delivery status' });
      }
    }
  }

  private async getPlatforms(req: Request, res: Response) {
    try {
      const platforms = await this.dspService.getAvailablePlatforms();
      res.status(200).json(platforms);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Failed to get platforms' });
      }
    }
  }

  private async cancelSchedule(req: Request, res: Response) {
    try {
      const { scheduleId } = req.params;
      
      if (!scheduleId) {
        throw new AppError('Schedule ID is required', 400);
      }

      await this.schedulingService.cancelSchedule(scheduleId);
      res.status(200).json({ message: 'Schedule cancelled successfully' });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Failed to cancel schedule' });
      }
    }
  }
} 