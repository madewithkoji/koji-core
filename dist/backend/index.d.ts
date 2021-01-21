import { IAP } from './iap';
import { middleware } from './middleware';
import { Database } from './database';
import { Dispatch } from './dispatch';
import { Identity } from './identity';
import { Secret } from './secret';
export declare const KojiBackend: {
    Database: typeof Database;
    IAP: typeof IAP;
    Dispatch: typeof Dispatch;
    Identity: typeof Identity;
    Secret: typeof Secret;
    middleware: typeof middleware;
};
