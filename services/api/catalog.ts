import type {
  SearchQuery,
  SearchResults,
  SyncResponse,
  Metadata,
  UpdateResponse,
  MetadataResponse,
  CatalogItem
} from '@/types/catalog';

export interface CatalogService {
  baseUrl: string;
  endpoints: {
    search: '/catalog/search';
    sync: '/catalog/sync';
    metadata: '/catalog/metadata';
    update: '/catalog/update';
  };
  
  searchCatalog(query: SearchQuery): Promise<SearchResults>;
  syncCatalog(catalogId: string): Promise<SyncResponse>;
  updateMetadata(trackId: string, metadata: Metadata): Promise<UpdateResponse>;
  getMetadata(trackId: string): Promise<MetadataResponse>;
}

// Implementation
export class CatalogServiceImpl implements CatalogService {
  baseUrl = process.env.CATALOG_SERVICE_URL || 'http://localhost:3004';
  
  endpoints = {
    search: '/catalog/search' as const,
    sync: '/catalog/sync' as const,
    metadata: '/catalog/metadata' as const,
    update: '/catalog/update' as const,
  };

  async searchCatalog(query: SearchQuery): Promise<SearchResults> {
    const response = await fetch(`${this.baseUrl}${this.endpoints.search}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error('Failed to search catalog');
    }

    return response.json();
  }

  async syncCatalog(catalogId: string): Promise<SyncResponse> {
    const response = await fetch(`${this.baseUrl}${this.endpoints.sync}/${catalogId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to sync catalog');
    }

    return response.json();
  }

  async updateMetadata(trackId: string, metadata: Metadata): Promise<UpdateResponse> {
    const response = await fetch(`${this.baseUrl}${this.endpoints.update}/${trackId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error('Failed to update metadata');
    }

    return response.json();
  }

  async getMetadata(trackId: string): Promise<MetadataResponse> {
    const response = await fetch(`${this.baseUrl}${this.endpoints.metadata}/${trackId}`);

    if (!response.ok) {
      throw new Error('Failed to get metadata');
    }

    return response.json();
  }
}

// Export a singleton instance
export const catalogService = new CatalogServiceImpl(); 