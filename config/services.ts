export const SERVICE_ENDPOINTS = {
  auth: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3001',
  file: process.env.NEXT_PUBLIC_FILE_SERVICE_URL || 'http://localhost:3002',
  distribution: process.env.NEXT_PUBLIC_DISTRIBUTION_SERVICE_URL || 'http://localhost:3003',
  catalog: process.env.NEXT_PUBLIC_CATALOG_SERVICE_URL || 'http://localhost:3004',
  analytics: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL || 'http://localhost:3005',
  monitoring: process.env.NEXT_PUBLIC_MONITORING_SERVICE_URL || 'http://localhost:3006'
};

export const API_ROUTES = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    verify: '/api/auth/verify'
  },
  file: {
    upload: '/api/files/upload',
    process: '/api/files/process',
    status: '/api/files/status'
  },
  distribution: {
    schedule: '/api/distribution/schedule',
    status: '/api/distribution/status',
    platforms: '/api/distribution/platforms'
  },
  catalog: {
    search: '/api/catalog/search',
    metadata: '/api/catalog/metadata',
    update: '/api/catalog/update'
  }
}; 