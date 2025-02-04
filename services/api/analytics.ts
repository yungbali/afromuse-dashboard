export interface AnalyticsService {
  baseUrl: string;
  endpoints: {
    metrics: '/analytics/metrics';
    reports: '/analytics/reports';
    performance: '/analytics/performance';
    usage: '/analytics/usage';
  };
  
  getMetrics(timeRange: { startDate: Date; endDate: Date }): Promise<{
    totalUsers: number;
    activeUsers: number;
    engagementRate: number;
  }>;
  generateReport(reportConfig: {
    type: 'daily' | 'weekly' | 'monthly';
    metrics: string[];
  }): Promise<{
    data: Record<string, any>;
    timestamp: string;
  }>;
  trackUsage(event: {
    name: string;
    properties?: Record<string, any>;
  }): Promise<void>;
  getPerformance(trackId: string): Promise<{
    loadTime: number;
    responseTime: number;
    errorRate: number;
  }>;
}