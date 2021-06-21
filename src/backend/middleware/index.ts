import { Request, Response, NextFunction } from 'express';
import deepmerge from 'deepmerge';

import { KojiConfig } from '../../frontend';

// ToDo: Make this non-mutating
const decodeObject = (obj: any): any => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') {
      decodeObject(obj[key]);
      return;
    }
    // eslint-disable-next-line no-param-reassign
    obj[key] = decodeURI(obj[key]);
  });
};

/**
 * Executes an [[http://expressjs.com/en/guide/using-middleware.html | Express middleware]], making Koji-specific data available on the `res.locals` property.
 *
 * @param kojiConfig Configuration data for the Koji app.
 *
 * @example
 * ```
 * const app = express();
 * app.use(Koji.middleware(require('koji.json')));
 *
 * app.get('/data', (req, res, next) => {
 *   // Backend constructor
 *   const database = new KojiBackend.Database({ res });
 *   ...
 * });
 * ```
 */
export function middleware(kojiConfig: KojiConfig = {}) {
  return function kojiMiddleware(req: Request, res: Response, next: NextFunction) {
    // Explicitly pass the project id and token that are coming in from proxied headers
    res.locals.KOJI_PROJECT_ID = req.headers['x-trusted-koji-project-id'] || process.env.KOJI_PROJECT_ID;
    res.locals.KOJI_PROJECT_TOKEN = req.headers['x-trusted-koji-project-token'] || process.env.KOJI_PROJECT_TOKEN;

    // Use the remixData from the json configuration as the base
    const { remixData = {} } = kojiConfig;

    // Apply version-specific overrides (equivalent of window.KOJI_OVERRIDES.overrides on the client)
    const overrides = req.headers['x-trusted-koji-overrides'];

    const parsedOverrides = typeof overrides === 'string' ? JSON.parse(overrides) : {};

    // Overrides coming from the headers are URL-encoded, so we need to decode them
    // before using them
    decodeObject(parsedOverrides);

    // Pull the remixData property from our overrides (which will include the entire koji.json contents)
    const { remixData: remixDataOverride = {} } = parsedOverrides;

    res.locals.remixData = deepmerge(remixData, remixDataOverride, {
      arrayMerge: (dest, source) => source,
    });

    next();
  };
}
