import { Analytics } from './analytics';
import { IAP } from './iap';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
import { ServiceMap } from './serviceMap';
declare class Koji {
    isReady: boolean;
    analytics: Analytics;
    iap: IAP;
    identity: Identity;
    playerState: PlayerState;
    remix: Remix;
    serviceMap: ServiceMap;
    ui: UI;
    constructor();
    ready(): void;
}
declare const _default: Koji;
export default _default;
