import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

export class Identity extends KojiBridge {
  /**
   * Get a token for the current user.
   * @returns {Promise} A user string token that can be exchanged on the server to identify the user. Returns null if the user is not logged in.
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

export const identity = new Identity();
