import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { UserToken } from '../../types';

/**
 * Capabilities that a user can grant the current Koji authorization to use.
 */
export type AuthGrantCapability =
  /** Allows the current Koji to send push notifications to the user. */
  'push_notifications' |
  /** Creates a unique ID for the user on the current Koji, and allows the Koji to map the user’s token to a persistent user ID in storage, such as a backend database. */
  'username';

/**
 * Manages authentication and authorization on the frontend of your Koji.
 */
export class Identity extends KojiBridge {
  /**
   * Gets a token identifying the current user.
   *
   * @example
   * ```javascript
   * const token = await Koji.identity.getToken();
   * ```
   */
  @client
  public async getToken(): Promise<UserToken> {
    const { userToken } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/getToken',
      data: {
        grants: [],
        allowAnonymous: true,
      },
    }, 'KojiAuth.TokenCreated');

    return userToken;
  }

  /**
   * Checks whether the user has granted authorizations to the Koji. Use this method to determine whether to request authorization for certain capabilities.
   *
   * @param   grants        List of authorization grants to check for the user.
   * @return                Indicates whether the user has already granted authorization for the capabilities.
   *
   * @example
   * ```javascript
   * const hasGrant = await Koji.identity.checkGrants(['username', 'push_notifications']);
   * ```
   */
  public async checkGrants(grants: AuthGrantCapability[] = []): Promise<boolean> {
    const { hasGrants } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/auth/checkGrant',
      data: {
        grants,
      },
    }, 'KojiAuth.GrantsResolved');

    return hasGrants;
  }

  /**
   * Requests the specified authorization grants from the user for the Koji.
   *
   * @param   grants           List of authorization grants to request from the user.
   * @param   usageDescription Custom message to display when requesting the grant.
   * @return
   *
   * @example
   * ```javascript
   * const hasGrant = await Koji.identity.requestGrants(['username', 'push_notifications']);
   * ```
   */
  public async requestGrants(grants: AuthGrantCapability[] = [], usageDescription?: string): Promise<UserToken> {
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
