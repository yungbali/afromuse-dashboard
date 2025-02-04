import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Service Routes Configuration
const routes = {
  auth: 'http://auth-service:3001',
  files: 'http://file-service:3002',
  distribution: 'http://distribution-service:3003',
  catalog: 'http://catalog-service:3004',
  analytics: 'http://analytics-service:3005',
  notifications: 'http://notification-service:3006'
};

// Proxy Configuration
Object.entries(routes).forEach(([path, target]) => {
  app.use(`/api/${path}`, createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: { [`^/api/${path}`]: '' },
  }));
});

export default app; 