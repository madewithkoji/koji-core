import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';

/**
 *
 * Capabilities that a user can grant the current Koji authorization to use.
 */
export enum AuthGrantCapability {
  /** Allows the current Koji to send push notifications to the user.*/
  PUSH_NOTIFICATIONS = 'push_notifications',
  /** Creates a unique ID for the user on the current Koji, and allows the Koji to map the user’s token to a persistent user ID in storage, such as a backend database. */
  USERNAME = 'username',
}

/**
 * Manages authentication and authorization on the frontend of your Koji.
 */
export class Identity extends KojiBridge {
  /**
   *
   * Gets a token identifying the current user.
   * @example
   * ```javascript
   * const token = await Koji.Identity.getToken();
   * ```
   *
   * @return {@link UserToken}
   */
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

  /**
   * Checks whether the user has granted authorizations to the Koji. Use this method to determine whether to request authorization for certain capabilities.
   *
   * @param   grants        List of {@link AuthGrantCapability| authorization grants} to check for the user.
   * @return                Indicates whether the user has already granted authorization for the capabilities.
   * @example
   * ```javascript
   * const hasGrant = await Koji.Identity.checkGrants(['username', 'push_notifications']);
   * ```
   */
  async checkGrants(grants: AuthGrantCapability[] = []): Promise<boolean> {
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
   * @param   grants           List of {@link AuthGrantCapability| authorization grants} to request from the user.
   * @param   usageDescription Custom message to display when requesting the grant.
   * @return                   {@link UserToken}
   * @example
   * ```javascript
   * const hasGrant = await Koji.Identity.requestGrants(['username', 'push_notifications']);
   * ```
   */
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
