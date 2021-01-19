import { Response } from 'express';

export interface BackendConfigurationInput {
  projectId?: string;
  projectToken?: string;
  res?: Response;
}

export interface BackendConfiguration {
  projectId: string;
  projectToken: string;
}

/**
 * Extensibly generate a project configuration
 * @param config Information about the project
 * @param config.projectId The projectId (This will override data passed through res)
 * @param config.projectToken The projectToken (This will override data passed through res)
 * @param config.res An express response object (Used in conjunction with KojiBackend.middleware)
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
