import { Request, Response, NextFunction } from 'express';
import { KojiConfig } from '../../frontend';
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
export declare function middleware(kojiConfig?: KojiConfig): (req: Request, res: Response, next: NextFunction) => void;
