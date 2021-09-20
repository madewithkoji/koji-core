import { Base, BackendConfigurationInput } from '../base';
import { UserToken } from '../../types';
/**
 * API routes for auth methods.
 */
export declare enum AuthRoutes {
    GET_GRANT = "/v1/apps/auth/consumer/getGrantForToken",
    GET_ROLE = "/v1/apps/auth/consumer/getRoleForToken",
    PUSH_NOTIFICATION = "/v1/apps/auth/consumer/pushNotification"
}
/** Object containing information about capabilities that the user has authorized this Koji to use. */
export interface UserGrants {
    /** Whether the user has granted push notification access. */
    pushNotificationsEnabled: boolean;
}
/**
 * Information about a user of the Koji app. To retrieve a user's information, use [[resolveUserFromToken]].
 */
export interface User {
    /** User’s unique ID for this Koji. */
    id: string | null;
    /** Object containing custom information about the user. */
    attributes: {
        [index: string]: any;
    } | null;
    /** Date the user's information was created or updated on this Koji. */
    dateCreated: string | null;
    /** Object containing information about capabilities that the user has authorized this Koji to use. */
    grants: UserGrants | null;
    /** User’s role for this Koji – the owner/creator (`admin`), not the owner (`user`), or not logged in (`unknown`). */
    role: 'admin' | 'user' | 'unknown' | null;
}
/**
 * Defines a notification to send to a user.
 * Use [[pushNotificationToOwner]] to send notifications to the owner of the Koji app.
 * Use [[pushNotificationToUser]] to send notifications to any user who interacts with the Koji app and has granted the appropriate authorization.
 */
export interface PushNotification {
    /** Headline for the message. For example, the name of the Koji app that generated the notification. */
    appName: string;
    /**  Icon to display next to the message, either the URL of an image or an emoji character. */
    icon: string;
    /** Content of the message. */
    message: string;
    /** Query parameters to append to the Koji app's URL when the notification is tapped. For example, load the admin experience or a dynamic receipt from the notification. */
    ref?: string;
}
/**
 * Manages authentication and authorization on the backend of your Koji app.
 */
export declare class Identity extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * Instantiates the Identity class.
     *
     * @param   config
     *
     * @example
     * ```javascript
     * const identity = new KojiBackend.Identity({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Sends a notification to the user who interacted with the Koji app.
     *
     * @param     userId            User’s unique ID for this Koji. To get the user's ID, see [[resolveUserFromToken]].
     * @param     notification      Notification to send to the user.
     *
     * @example
     * ```javascript
     * const user = identity.resolveUserFromToken(userToken);
     *
     * await identity.pushNotificationToUser(user.id, {
     *  icon: '❓',
     *  appName: 'Ask me anything',
     *  message: 'Your custom video is ready! View now',
     *  ref: '?dynamic-receipt=buyer',
     * });
     * ```
     */
    pushNotificationToUser(userId: string, notification: PushNotification): Promise<void>;
    /**
     *  Sends a notification to the owner of the Koji app.
     *
     * @param     notification      Notification to send to the owner.
     *
     * @example
     * ```javascript
     * await identity.pushNotificationToOwner({
     *  icon: '❓',
     *  appName: 'Ask me anything',
     *  message: 'Someone asked you a question! Respond now',
     *  ref: '?dynamic-receipt=seller',
     * });
     * ```
     */
    pushNotificationToOwner(notification: PushNotification): Promise<void>;
    /**
     * Gets the user's information for this Koji.
     *
     * @param     token      Short-lived token identifying the current user, which is generated with the frontend identity module. See [[getToken]].
     * @return               Object containing information about the user.
     *
     * @example
     * ```javascript
     * // Get the user token (generated using the frontend identity module)
     * const userToken = req.headers.authorization;
     *
     * const user = await identity.resolveUserFromToken(userToken);
     * ```
     */
    resolveUserFromToken(token: UserToken): Promise<User>;
}
