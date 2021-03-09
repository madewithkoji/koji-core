import { Analytics } from './analytics';
import { Dispatch } from './dispatch';
import { IAP } from './iap';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
/**
 * Defines the configuration data for the Koji.
 */
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
 * Key-value pairs of services and endpoints.
 */
export declare type Services = {
    [key: string]: string | undefined;
};
/**
 * Configuration options for the Koji.
 */
export interface KojiConfigOptions {
    /** Unique identifier for the Koji. */
    projectId?: string;
    /** Defines services for the Koji. */
    services: Services;
}
/**
 * Provides frontend methods for your Koji.
 */
export declare class Koji {
    isReady: boolean;
    configInitialized: boolean;
    services: Services;
    projectId?: string;
    analytics: Analytics;
    dispatch: Dispatch;
    iap: IAP;
    identity: Identity;
    playerState: PlayerState;
    remix: Remix;
    ui: UI;
    constructor();
    /**
     * Initializes this package for use with configuration data from the `koji.json` file. This method sets up the services, remix values, development environment, and deployment instructions for your Koji. It also performs some basic structural checks.
     *
     * @param kojiConfig Configuration data for the Koji.
     *
     * @example
     * ```
     * Koji.config(require('koji.json'));
     * ```
     */
    config(kojiConfig?: KojiConfig, kojiConfigOptions?: KojiConfigOptions): void;
    private setProjectId;
    private setUpServices;
    private addClickListeners;
    private addContextPassthroughListeners;
    /**
     * Indicates that the Koji is ready to start receiving events.
     *
     * @example
     * ```javascript
     * Koji.ready
     * ```
     */
    ready(): void;
}
declare const _default: Koji;
export default _default;
