import { KojiBridge } from '../kojiBridge';
import { UserToken } from '../../types';
/**
 * Capabilities that a user can grant the current Koji authorization to use.
 */
export declare type AuthGrantCapability = 
/** Allows the current Koji to send push notifications to the user. */
'push_notifications' | 
/** Creates a unique ID for the user on the current Koji app and allows the app to map the user’s token to a persistent user ID in storage, such as a backend database. */
'username' | 
/** The user's global Koji account ID. This can be used when app needs to identity a user across multiple apps, but should not be used in cases where the anonymized ID is suffience. */
'global_id';
/**
 * User attributes that are determined via a client-side API call.
 */
export interface PresumedAttributes {
    /** Koji username for the user. */
    username?: string;
    /** Koji avatar for the user. */
    profilePicture?: string;
    /** The user's global Koji account ID */
    globalId?: string;
}
/**
 * Identity information for the current user of the Koji app.
 */
export interface IdentityResult {
    /** Short-lived token to identify the user. */
    token: UserToken;
    /** Presumed role of the current user as the owner/creator (`admin`), not the owner (`user`), or not logged in (`unknown`).
    * Admin actions must still be secured on the backend by resolving the user’s role.
    */
    presumedRole: 'admin' | 'user' | 'unknown';
    /** Additional user attributes, which are returned if the user has granted username authorization via [[requestGrants]]. */
    presumedAttributes: PresumedAttributes;
}
/**
 * Manages authentication and authorization on the frontend of your Koji app.
 */
export declare class Identity extends KojiBridge {
    /**
     * Gets a token identifying the current user.
     *
     * @return    Identity information for the current user of the Koji app.
     *
     * @example
     * ```javascript
     * const { token, presumedRole, presumedAttributes  } = await Koji.identity.getToken()
     * ```
     */
    getToken(): Promise<IdentityResult>;
    /**
     * Checks whether the user has granted authorizations to the Koji app. Use this method to determine whether to request authorization for certain capabilities.
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
     * Requests the specified authorization grants from the user for the Koji app.
     *
     * @param   grants            List of authorization grants to request from the user.
     * @param   usageDescription  Custom message to display when requesting the grant.
     *
     * @return                    Indicates whether authorization for the capabilities was successfully obtained from the user.
     *
     * @example
     * ```javascript
     * const hasGrant = await Koji.identity.requestGrants(['username', 'push_notifications']);
     * ```
     */
    requestGrants(grants?: AuthGrantCapability[], usageDescription?: string): Promise<UserToken>;
}
export declare const identity: Identity;
