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
}
/**
 * Generates an extensible configuration for the Koji app's backend services.
 *
 * @param config Configuration information for the Koji app.
 */
export declare function generateConfig(config: BackendConfigurationInput): BackendConfiguration;
export declare class Base {
    protected projectId: string;
    protected projectToken: string;
    constructor(config: BackendConfigurationInput);
}
export interface IDatabase extends Base {
}
