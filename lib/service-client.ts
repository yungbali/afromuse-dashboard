export interface ServiceClient {
  baseURL: string;
  services: {
    auth: string;
    files: string;
    distribution: string;
    catalog: string;
    analytics: string;
  };
}

export function createServiceClient(config: ServiceClient): ServiceClient {
  return {
    baseURL: config.baseURL,
    services: {
      auth: config.services.auth,
      files: config.services.files,
      distribution: config.services.distribution,
      catalog: config.services.catalog,
      analytics: config.services.analytics
    }
  };
} 