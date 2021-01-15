import { PlatformCommunication } from '../platformCommunication';
import { client } from '../@decorators/client';

export type UserToken = string | null;

export enum AuthGrantCapability {
  PUSH_NOTIFICATIONS = 'push_notifications',
  USERNAME = 'username',
}

export class Auth extends PlatformCommunication {
  /**
   * Get a token for the current user. If the user is not logged in, return value will be null.
   */
  @client
  async getToken(): Promise<UserToken> {
    const { token } = await this.postToPlatform({
      name: '@@koji/auth/getToken',
      data: {
        grants: [],
        allowAnonymous: true,
      },
    }, 'KojiAuth.TokenCreated');

    return token;
  }
}

export interface IAuth extends Auth {}

export const auth = new Auth();
