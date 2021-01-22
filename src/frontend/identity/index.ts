import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

export enum AuthGrantCapability {
  PUSH_NOTIFICATIONS = 'push_notifications',
  USERNAME = 'username',
}

export class Identity extends KojiBridge {
  @client
  async getToken(): Promise<UserToken> {
    const { token } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/getToken',
      data: {
        grants: [],
        allowAnonymous: true,
      },
    }, 'KojiAuth.TokenCreated');

    return token;
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
    const { hasGrants } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/getToken',
      data: {
        grants,
        usageDescription,
      },
    }, 'KojiAuth.TokenCreated'); // Would be great to have a method-specific message here

    return hasGrants;
  }
}

export const identity = new Identity();
