export interface ReleaseDTO {
  title: string;
  artist: string;
  releaseDate: Date;
  platforms: string[];
  tracks: TrackDTO[];
  metadata: ReleaseMetadata;
}

export interface TrackDTO {
  title: string;
  duration: number;
  fileId: string;
  isrc?: string;
  metadata: TrackMetadata;
}

export interface ReleaseMetadata {
  genre: string[];
  language: string;
  label?: string;
  upc?: string;
  explicit: boolean;
  territories?: string[];
}

export interface TrackMetadata {
  composers?: string[];
  producers?: string[];
  lyrics?: string;
  bpm?: number;
  key?: string;
}

export interface ScheduleResult {
  scheduleId: string;
  releaseDate: Date;
  platforms: string[];
  status: DeliveryStatus;
  errors?: string[];
}

export type DeliveryStatus = 'scheduled' | 'in-progress' | 'completed' | 'failed';

export interface DSPPlatform {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  deliveryTime?: number; // Average delivery time in hours
}

export type DSPList = DSPPlatform[]; 