import { KojiMetadata } from './KojiMetadata';

/**
 * Configuration data for the Koji.
 */
export interface KojiConfig {
  /** Instructions for setting up the services in a development/editor environment. */
  develop?: { [index: string]: any };

  /** Instructions for deploying the services to production. */
  deploy?: { [index: string]: any };

  /** Metadata about the project and creator. */
  metadata?: KojiMetadata;

  /** Default values for the customizable remix data. */
  remixData?: { [index: string]: any };

  /** Placeholder values for new remixes. */
  '@@initialTransform'?: { [index: string]: any };
}
