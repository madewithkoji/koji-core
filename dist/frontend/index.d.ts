import { Analytics } from './analytics';
import { IAP } from './iap';
import { Identity } from './identity';
import { Remix } from './remix';
import { UI } from './ui';
declare class Koji {
    projectId?: string;
    projectToken?: string;
    isReady: boolean;
    analytics: Analytics;
    iap: IAP;
    identity: Identity;
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
