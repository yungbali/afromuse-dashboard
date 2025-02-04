import { 
  ReleaseDTO, 
  ScheduleResult, 
  DeliveryStatus, 
  DSPPlatform,
  DSPList 
} from '@/types/distribution';
import { AppError } from '../auth/middleware/app-error';
import { Queue } from 'bull';
import Redis from 'ioredis';

export class DSPService {
  private redis: Redis;
  private platforms: DSPPlatform[] = [
    { 
      id: 'spotify',
      name: 'Spotify',
      status: 'active',
      deliveryTime: 24
    },
    { 
      id: 'apple',
      name: 'Apple Music',
      status: 'active',
      deliveryTime: 48
    },
    { 
      id: 'amazon',
      name: 'Amazon Music',
      status: 'active',
      deliveryTime: 24
    },
    { 
      id: 'deezer',
      name: 'Deezer',
      status: 'active',
      deliveryTime: 24
    }
  ];
  constructor() {
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
        throw new Error('REDIS_URL environment variable is not set');
    }
    this.redis = new Redis(redisUrl);
  }

  async getAvailablePlatforms(): Promise<DSPList> {
    return this.platforms.filter(p => p.status === 'active');
  }

  async checkDeliveryStatus(releaseId: string): Promise<DeliveryStatus> {
    const status = await this.redis.get(`release:${releaseId}:status`);
    if (!status) {
      throw new AppError('Release not found', 404);
    }
    return status as DeliveryStatus;
  }

  async deliverToPlatform(platform: string, releaseData: ReleaseDTO): Promise<boolean> {
    const dsp = this.platforms.find(p => p.id === platform);
    if (!dsp || dsp.status !== 'active') {
      throw new AppError(`Platform ${platform} is not available`, 400);
    }

    // Simulate platform-specific delivery logic
    switch (platform) {
      case 'spotify':
        return this.deliverToSpotify(releaseData);
      case 'apple':
        return this.deliverToAppleMusic(releaseData);
      case 'amazon':
        return this.deliverToAmazonMusic(releaseData);
      default:
        return this.deliverToGenericPlatform(platform, releaseData);
    }
  }

  private async deliverToSpotify(releaseData: ReleaseDTO): Promise<boolean> {
    // Implement Spotify-specific delivery logic
    await this.simulateDelivery('spotify');
    return true;
  }

  private async deliverToAppleMusic(releaseData: ReleaseDTO): Promise<boolean> {
    // Implement Apple Music-specific delivery logic
    await this.simulateDelivery('apple');
    return true;
  }

  private async deliverToAmazonMusic(releaseData: ReleaseDTO): Promise<boolean> {
    // Implement Amazon Music-specific delivery logic
    await this.simulateDelivery('amazon');
    return true;
  }

  private async deliverToGenericPlatform(platform: string, releaseData: ReleaseDTO): Promise<boolean> {
    // Generic delivery logic for other platforms
    await this.simulateDelivery(platform);
    return true;
  }

  private async simulateDelivery(platform: string): Promise<void> {
    const dsp = this.platforms.find(p => p.id === platform);
    const delay = (dsp?.deliveryTime || 24) * 1000; // Use milliseconds for demo
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export class SchedulingService {
  private deliveryQueue: Queue;
  private redis: Redis;
  private dspService: DSPService;

  constructor() {
    this.deliveryQueue = new Queue('music-delivery', {
      redis: {
        host: process.env.REDIS_URL
      }
    });
    this.redis = new Redis(process.env.REDIS_URL);
    this.dspService = new DSPService();

    this.setupQueueHandlers();
  }

  private setupQueueHandlers() {
    this.deliveryQueue.process(async (job) => {
      const { releaseId, platform, releaseData } = job.data;
      try {
        await this.dspService.deliverToPlatform(platform, releaseData);
        await this.updateDeliveryStatus(releaseId, 'completed');
      } catch (error) {
        await this.updateDeliveryStatus(releaseId, 'failed');
        throw error;
      }
    });
  }

  async scheduleRelease(releaseData: ReleaseDTO): Promise<ScheduleResult> {
    const scheduleId = `rel_${Date.now()}`;
    const platforms = await this.dspService.getAvailablePlatforms();

    // Validate release date
    const releaseDate = new Date(releaseData.releaseDate);
    if (releaseDate < new Date()) {
      throw new AppError('Release date must be in the future', 400);
    }

    // Schedule for each platform
    const jobs = platforms.map(platform => 
      this.deliveryQueue.add({
        releaseId: scheduleId,
        platform: platform.id,
        releaseData
      }, {
        delay: releaseDate.getTime() - Date.now()
      })
    );

    await Promise.all(jobs);
    await this.updateDeliveryStatus(scheduleId, 'scheduled');

    return {
      scheduleId,
      releaseDate,
      platforms: platforms.map(p => p.id),
      status: 'scheduled'
    };
  }

  async cancelSchedule(scheduleId: string): Promise<void> {
    const status = await this.redis.get(`release:${scheduleId}:status`);
    if (!status) {
      throw new AppError('Schedule not found', 404);
    }

    if (status === 'completed' || status === 'failed') {
      throw new AppError('Cannot cancel completed or failed releases', 400);
    }

    // Remove jobs from queue
    const jobs = await this.deliveryQueue.getJobs(['delayed', 'waiting']);
    for (const job of jobs) {
      if (job.data.releaseId === scheduleId) {
        await job.remove();
      }
    }

    await this.updateDeliveryStatus(scheduleId, 'failed');
  }

  private async updateDeliveryStatus(releaseId: string, status: DeliveryStatus): Promise<void> {
    await this.redis.set(`release:${releaseId}:status`, status);
  }
} 