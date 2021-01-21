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
export declare function generateConfig(config: BackendConfigurationInput): BackendConfiguration;
export declare class Base {
    protected projectId: string;
    protected projectToken: string;
    constructor(config: BackendConfigurationInput);
}
export interface IDatabase extends Base {
}
