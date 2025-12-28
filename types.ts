export interface ProcessingOptions {
  fps: number;
  blurStrength: number; // 0.0 to 1.0 (Mapped from 0-100 UI)
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export const FPS_OPTIONS = [30, 60, 120, 240, 480, 960];
