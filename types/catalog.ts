export interface SearchQuery {
  term: string;
  filters?: Record<string, any>;
  page?: number;
  limit?: number;
}

export interface SearchResults {
  items: CatalogItem[];
  total: number;
  page: number;
}

export interface CatalogItem {
  id: string;
  title: string;
  artist: string;
  metadata: Metadata;
}

export interface Metadata {
  genre: string[];
  releaseDate: Date;
  isrc?: string;
  upc?: string;
}

export interface UpdateResponse {
  success: boolean;
  item: CatalogItem;
}

export interface MetadataResponse {
  metadata: Metadata;
  lastUpdated: Date;
}

export interface SyncResponse {
  status: 'success' | 'failed';
  message: string;
} 