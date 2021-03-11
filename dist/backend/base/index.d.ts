import { Response } from 'express';
/**
 * Configuration information for the Koji.
 */
export interface BackendConfigurationInput {
    /** Unique identifier for the Koji. Will override data passed through `res`. */
    projectId?: string;
    /** Secret key for the Koji. Will override data passed through `res`. */
    projectToken?: string;
    /** Express response object. Used in conjunction with [[middleware]] to scope environment variables for instant remixes of the original Koji. */
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
export declare function generateConfig(config: BackendConfigurationInput): BackendConfiguration;
export declare class Base {
    protected projectId: string;
    protected projectToken: string;
    constructor(config: BackendConfigurationInput);
}
export interface IDatabase extends Base {
}
