import { Analytics } from './analytics';
import { IAP } from './iap';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
export interface KojiConfig {
    develop?: any;
    deploy?: any;
    remixData?: any;
    '@@initialTransform'?: any;
}
export declare type Services = {
    [key: string]: string | undefined;
};
export interface KojiConfigOptions {
    services: Services;
}
export declare class Koji {
    isReady: boolean;
    configInitialized: boolean;
    services: Services;
    analytics: Analytics;
    iap: IAP;
    identity: Identity;
    playerState: PlayerState;
    remix: Remix;
    ui: UI;
    constructor();
    /**
     * Prepare this package for use by passing in the data from your koji.json
     * file. In addition to setting up things like your serviceMap and remix values,
     * this function will also do some basic structural checks.
     * @param {Object} kojiConfig Your Koji configuration object (e.g., require('./koji.json'))
     * @param {Object} kojiConfig.develop Instructions to set up the development/editor environment for your services
     * @param {Object} kojiConfig.deploy Instructions to deploy your services to production
     * @param {Object} kojiConfig.remixData The base values for your customizable remix data
     * @param {Object} kojiConfig.['@@initialTransform'] The values that will be loaded for new remixes
     */
    config(kojiConfig?: KojiConfig, kojiConfigOptions?: KojiConfigOptions): void;
    ready(): void;
}
declare const _default: Koji;
export default _default;
