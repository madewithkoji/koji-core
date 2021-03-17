import { Response } from 'express';

/**
 * Configuration information for the Koji.
 */
export interface BackendConfigurationInput {
  /** Unique identifier for the Koji. Will override data passed through `res`. */
  projectId?: string;
  /** Secret key for the Koji. Will override data passed through `res`. */
  projectToken?: string;
  /** Express response object. Used in conjunction with middleware to scope environment variables for instant remixes of the original Koji. For the original definition see [[https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L127 | @types/express]] */
  res?: Response;
}

/**
 * Environment variables that serve as access credentials for the Koji's backend services.
 */
export interface BackendConfiguration {
  /** Unique identifier for the Koji. */
  projectId: string;
  /** Secret key for the Koji. */
  projectToken: string;
}

/**
 * Generates an extensible configuration for the Koji's backend services.
 *
 * @param config Configuration information for the Koji.
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
  };
}

export class Base {
  protected projectId: string;
  protected projectToken: string;

  constructor(config: BackendConfigurationInput) {
    const { projectId, projectToken } = generateConfig(config);

    this.projectId = projectId;
    this.projectToken = projectToken;
  }
}

export interface IDatabase extends Base {}
