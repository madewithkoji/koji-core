import { IAP } from './iap';
import { middleware } from './middleware';
import { Database } from './database';
import { Dispatch } from './dispatch';
import { Identity } from './identity';
import { Secret } from './secret';

export const KojiBackend = {
  Database,
  IAP,
  Dispatch,
  Identity,
  Secret,
  middleware,
};
