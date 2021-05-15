import { Services } from '../types/Services';
import { KojiMetadata } from './KojiMetadata';

/**
 * Configuration options for the Koji.
 */
export interface KojiConfigOptions {
  /** Unique identifier for the Koji. */
  projectId?: string;

  /** Defines services for the Koji. */
  services: Services;

  /** Overrides for the platform-provided metadata. */
  metadata?: KojiMetadata;
}
