import { Request, Response, NextFunction } from 'express';
import deepmerge from 'deepmerge';

export interface KojiConfig {
  /** Instructions for setting up the services in a development/editor environment. */
  develop?: any;
  /** Instructions for deploying the services to production. */
  deploy?: any;
  /** Default values for the customizable remix data. */
  remixData?: any;
  /** Placeholder values for new remixes. */
  '@@initialTransform'?: any;
}

/**
 * Executes middleware, making koji-specific data available on the res.locals property.
 *
 * @param kojiConfig Configuration data for the Koji.
 *
 * @example
 * ```
 * app.use(Koji.middleware(require('koji.json'));
 * ```
 */
export function middleware(kojiConfig: KojiConfig = {}) {
  return function kojiMiddleware(req: Request, res: Response, next: NextFunction) {
    // Explicitly pass the project id and token that are coming in from proxied headers
    res.locals.KOJI_PROJECT_ID = req.headers['x-trusted-koji-project-id'] || process.env.KOJI_PROJECT_ID;
    res.locals.KOJI_PROJECT_TOKEN = req.headers['x-trusted-koji-project-token'] || process.env.KOJI_PROJECT_TOKEN;

    // Use the remixData from the json configuration as the base
    const { remixData = {} } = kojiConfig;

    // Apply remix-specific overrides (equivalent of window.KOJI_OVERRIDES.overrides on the client)
    const overrides = req.headers['x-trusted-koji-overrides'] || {};

    res.locals.remixData = deepmerge(remixData, overrides, {
      arrayMerge: (dest, source) => source,
    });

    next();
  };
}
