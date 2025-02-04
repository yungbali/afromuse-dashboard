export { authServiceInstance as authService } from './auth';
export { fileServiceInstance as fileService } from './file';
export { distributionServiceInstance as distributionService } from './distribution';
export { catalogService } from './api/catalog';
export type { AnalyticsService as analyticsService } from './api/analytics'; // Corrected to match the exported member name
export type AuthServiceAPI = './types/AuthServiceAPI';
export type FileServiceAPI = './types/FileServiceAPI';
export type DistributionServiceAPI = './types/DistributionServiceAPI';
export type CatalogServiceAPI = './types/CatalogServiceAPI'; // Corrected to match the expected type name
export type { AnalyticsService, MonitoringService } from './types'; 