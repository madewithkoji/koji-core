import { Analytics } from './analytics';
import { Dispatch } from './dispatch';
import { IAP } from './iap';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
/**
 * Configuration data for the Koji app.
 */
export interface KojiConfig {
    /** Instructions for setting up the services in a development/editor environment. */
    develop?: {
        [index: string]: any;
    };
    /** Instructions for deploying the services to production. */
    deploy?: {
        [index: string]: any;
    };
    /** Metadata about the project and creator. */
    metadata?: KojiMetadata;
    /** Default values for the configuration data. */
    remixData?: {
        [index: string]: any;
    };
    /** Placeholder values for new customized versions. */
    '@@initialTransform'?: {
        [index: string]: any;
    };
}
/**
 * Key-value pairs of services and endpoints.
 */
export declare type Services = {
    [key: string]: string | undefined;
};
/**
 * Configuration options for the Koji app.
 */
export interface KojiConfigOptions {
    /** Unique identifier for the Koji app. */
    projectId?: string;
    /** Defines services for the Koji app. */
    services: Services;
    /** Overrides for the platform-provided metadata. */
    metadata?: KojiMetadata;
}
/**
 * Metadata about the project and creator.
 * This information is provided by the platform but can be overridden when the Koji app is initialized.
 */
export interface KojiMetadata {
    /** Unique identifier for the Koji app. */
    projectId: string;
    /** Creator's username. */
    creatorUsername: string;
    /** URL reference to the creator's current profile picture. */
    creatorProfilePicture: string;
}
/**
 * Provides frontend methods for your Koji app.
 */
export declare class Koji {
    /** Indicates that the Koji.ready() call has been made. */
    isReady: boolean;
    /** Indicates that the Koji.config() call has been made. */
    configInitialized: boolean;
    /** The configured service endpoints. */
    services: Services;
    /** The project's id. */
    projectId?: string;
    /** Metadata about the project and creator. */
    metadata?: KojiMetadata;
    analytics: Analytics;
    dispatch: Dispatch;
    iap: IAP;
    identity: Identity;
    playerState: PlayerState;
    remix: Remix;
    ui: UI;
    constructor();
    /**
     * Initializes this package for use with configuration data from the `koji.json` file. This method sets up the services, customization values, development environment, and deployment instructions for your Koji app. It also performs some basic structural checks.
     *
     * NOTE: The app must initialize the package before any data is rendered. Initialization must be done exactly once.
     *
     * @param kojiConfig Configuration data for the Koji app.
     *
     * @example
     * ```
     * Koji.config(require('koji.json'));
     * ```
     */
    config(kojiConfig?: KojiConfig, kojiConfigOptions?: KojiConfigOptions): void;
    private resolveMetadata;
    private resolveServices;
    private addClickListeners;
    private addContextPassthroughListeners;
    /**
     * Indicates that the Koji app is ready to start receiving events.
     *
     * NOTE: You must call this function after initializing the package and subscribing to customization changes but before advancing to the preview with `Koji.remix.finish`.
     *
     * @example
     * ```javascript
     * Koji.ready();
     * ```
     */
    ready(): void;
}
declare const _default: Koji;
export default _default;
