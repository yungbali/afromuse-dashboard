"use client"

import { createContext, useContext } from 'react';

interface ServiceClient {
  baseURL: string;
  services: Record<string, string>;
}

const ServiceContext = createContext<ServiceClient | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const client = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    services: {
      auth: '/api/auth',
      files: '/api/files',
      distribution: '/api/distribution',
      catalog: '/api/catalog',
      analytics: '/api/analytics'
    }
  };

  return (
    <ServiceContext.Provider value={client}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
} 