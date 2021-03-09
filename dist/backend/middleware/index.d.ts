import { Request, Response, NextFunction } from 'express';
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
export declare function middleware(kojiConfig?: KojiConfig): (req: Request, res: Response, next: NextFunction) => void;
