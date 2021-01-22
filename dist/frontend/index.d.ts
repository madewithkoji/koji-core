import { Analytics } from './analytics';
import { IAP } from './iap';
import { Config } from './config';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
declare class Koji {
    isReady: boolean;
    analytics: Analytics;
    config: Config;
    iap: IAP;
    identity: Identity;
    playerState: PlayerState;
    remix: Remix;
    ui: UI;
    constructor();
    ready(): void;
}
declare const _default: Koji;
export default _default;
