export interface DistributionService {
  baseUrl: string;
  endpoints: {
    schedule: '/distribution/schedule';
    deliver: '/distribution/deliver';
    status: '/distribution/status';
    platforms: '/distribution/platforms';
  };
  
  scheduleRelease(releaseData: {
    releaseDate: Date;
    contentId: string;
    platforms: string[];
  }): Promise<{
    scheduleId: string;
    status: string;
  }>;
  
  deliverContent(releaseId: string): Promise<{
    deliveryId: string;
    status: string;
  }>;
  
  checkStatus(deliveryId: string): Promise<{
    status: 'pending' | 'in_progress' | 'completed' | 'failed';
    message?: string;
  }>;
  
  getPlatforms(): Promise<{
    id: string;
    name: string;
    type: string;
  }[]>;
}