import { createMonitoring } from '../monitoring'; // Adjusted path to fix import error
import { MetricsService, LoggingService } from '../services'; // Adjusted path to fix import error

const monitoring = createMonitoring({
  services: [MetricsService, LoggingService],
  config: {
    metrics: {
      interval: 60000, // 1 minute
      endpoints: ['/health', '/metrics']
    },
    logging: {
      level: 'info',
      format: 'json'
    }
  }
});

export default monitoring; 