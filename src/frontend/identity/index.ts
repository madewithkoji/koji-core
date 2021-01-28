import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { UserToken } from '../../types';

export type AuthGrantCapability = 'push_notifications' | 'username';

export class Identity extends KojiBridge {
  @client
  async getToken(): Promise<UserToken> {
    const { userToken } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/getToken',
      data: {
        grants: [],
        allowAnonymous: true,
      },
    }, 'KojiAuth.TokenCreated');

    return userToken;
  }

  async checkGrants(grants: AuthGrantCapability[] = []): Promise<boolean> {
    const { hasGrants } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/checkGrant',
      data: {
        grants,
      },
    }, 'KojiAuth.GrantsResolved');

    return hasGrants;
  }

  async requestGrants(grants: AuthGrantCapability[] = [], usageDescription?: string): Promise<UserToken> {
    const { userToken } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/getToken',
      data: {
        grants,
        usageDescription,
      },
    }, 'KojiAuth.TokenCreated', 'KojiAuth.GrantsDenied');

    return userToken;
  }
}

export const identity = new Identity();
