import { createServer } from '../auth/server';
import { DistributionController } from './controllers';
import { DSPService, SchedulingService } from './services';
import type { 
  ReleaseDTO, 
  ScheduleResult, 
  DeliveryStatus, 
  DSPList 
} from '@/types/distribution';

interface DistributionServiceAPI {
  scheduleRelease: (releaseData: ReleaseDTO) => Promise<ScheduleResult>;
  trackDelivery: (releaseId: string) => Promise<DeliveryStatus>;
  getDSPs: () => Promise<DSPList>;
}

const distributionService = createServer({
  controllers: [DistributionController]
});

export class DistributionServiceImpl implements DistributionServiceAPI {
  private dspService: DSPService;
  private schedulingService: SchedulingService;

  constructor() {
    this.dspService = new DSPService();
    this.schedulingService = new SchedulingService();
  }

  async scheduleRelease(releaseData: ReleaseDTO): Promise<ScheduleResult> {
    return this.schedulingService.scheduleRelease(releaseData);
  }

  async trackDelivery(releaseId: string): Promise<DeliveryStatus> {
    return this.dspService.checkDeliveryStatus(releaseId);
  }

  async getDSPs(): Promise<DSPList> {
    return this.dspService.getAvailablePlatforms();
  }
}

export const distributionServiceInstance = new DistributionServiceImpl();
export default distributionService; 