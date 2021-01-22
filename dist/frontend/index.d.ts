import { Analytics } from './analytics';
import { IAP } from './iap';
import { Config } from './config';
import { Identity } from './identity';
import { PlayerState } from './playerState';
import { Remix } from './remix';
import { UI } from './ui';
declare class Koji {
    projectId?: string;
    projectToken?: string;
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
    setProjectValues(id: string, token: string): void;
    getProjectValues(): {
        projectId: string | undefined;
        projectToken: string | undefined;
    };
}
declare const _default: Koji;
export default _default;
