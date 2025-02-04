export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface MetricsResponse {
  totalUploads: number;
  totalDeliveries: number;
  activeUsers: number;
  storageUsed: number;
  metrics: Record<string, number>;
}

export interface ReportConfig {
  type: 'usage' | 'performance' | 'delivery';
  dateRange: DateRange;
  filters?: Record<string, any>;
}

export interface ReportResponse {
  id: string;
  generatedAt: Date;
  data: any;
  format: 'csv' | 'pdf' | 'json';
}

export interface UsageEvent {
  type: string;
  userId: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface PerformanceMetrics {
  deliverySuccess: number;
  processingTime: number;
  errorRate: number;
  uptime: number;
} 