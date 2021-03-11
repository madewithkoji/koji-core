import { KojiBridge } from '../kojiBridge';
import { UserToken } from '../../types';
/**
 * Capabilities that a user can grant the current Koji authorization to use.
 */
export declare type AuthGrantCapability = 
/** Allows the current Koji to send push notifications to the user. */
'push_notifications' | 
/** Creates a unique ID for the user on the current Koji, and allows the Koji to map the user’s token to a persistent user ID in storage, such as a backend database. */
'username';
/**
 * Manages authentication and authorization on the frontend of your Koji.
 */
export declare class Identity extends KojiBridge {
    /**
     * Gets a token identifying the current user.
     *
     * @example
     * ```javascript
     * const token = await Koji.identity.getToken();
     * ```
     */
    getToken(): Promise<UserToken>;
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
    checkGrants(grants?: AuthGrantCapability[]): Promise<boolean>;
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
    requestGrants(grants?: AuthGrantCapability[], usageDescription?: string): Promise<UserToken>;
}
export declare const identity: Identity;
