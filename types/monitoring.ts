export interface MonitoringConfig {
  metrics: {
    interval: number;
    endpoints: string[];
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
  };
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: ServiceHealth[];
  timestamp: Date;
}

export interface ServiceHealth {
  service: string;
  status: 'up' | 'down';
  latency: number;
  lastCheck: Date;
}

export interface MetricsData {
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
  latency: number;
} 