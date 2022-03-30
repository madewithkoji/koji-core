import { Response } from 'express';

/**
 * Configuration information for the Koji app.
 */
export interface BackendConfigurationInput {
  /** Unique identifier for the Koji app. Will override data passed through `res`. */
  projectId?: string;
  /** Secret key for the Koji app. Will override data passed through `res`. */
  projectToken?: string;
  /** Express response object. Used in conjunction with middleware to scope environment variables for customized versions of the original Koji app. For the original definition see [[https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L127 | @types/express]]. */
  res?: Response;
}

/**
 * Environment variables that serve as access credentials for the Koji app's backend services.
 */
export interface BackendConfiguration {
  /** Unique identifier for the Koji app. */
  projectId: string;
  /** Secret key for the Koji app. */
  projectToken: string;
  /** Unique identifier for the base Koji app. */
  environmentId: string;
  /** Secret key for the base Koji app. */
  environmentToken: string;
}

/**
 * Generates an extensible configuration for the Koji app's backend services.
 *
 * @param config Configuration information for the Koji app.
 */
export function generateConfig(config: BackendConfigurationInput): BackendConfiguration {
  let projectId;
  let projectToken;

  // If the user is passing a response from express, we expect the project details to be written
  // to res.locals by the middleware.
  if (config.res) {
    ({ KOJI_PROJECT_ID: projectId, KOJI_PROJECT_TOKEN: projectToken } = config.res.locals || {});
    if (!projectId || !projectToken) {
      throw new Error(
        'The res.locals object is missing your project information. Have you implemented KojiBackend.middleware correctly?',
      );
    }
  }

  // If the user is explicitly passing a projectId or projectToken, these values should override
  // other implementations
  projectId = config.projectId || projectId;
  projectToken = config.projectToken || projectToken;

  if (!projectId || !projectToken) throw new Error('Unable to find project details');

  return {
    projectId,
    projectToken,
    environmentId: process.env.KOJI_PROJECT_ID || '',
    environmentToken: process.env.KOJI_PROJECT_TOKEN || '',
  };
}

export class Base {
  protected projectId: string;
  protected projectToken: string;

  protected environmentId: string;
  protected environmentToken: string;

  constructor(config: BackendConfigurationInput) {
    const {
      projectId,
      projectToken,
      environmentId,
      environmentToken,
    } = generateConfig(config);

    this.projectId = projectId;
    this.projectToken = projectToken;
    this.environmentId = environmentId;
    this.environmentToken = environmentToken;
  }
}

export interface IDatabase extends Base {}
