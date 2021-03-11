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
/**
 * Possible values for a user's role within a Koji.
 */
export declare enum UserRole {
    ADMIN = "admin",
    UNKNOWN = "unknown",
    USER = "user"
}
/**
 * Defines an interface for a user.
 */
export interface User {
    id: string | null;
    attributes: {
        [index: string]: any;
    } | null;
    dateCreated: string | null;
    grants: {
        pushNotificationsEnabled: boolean;
    } | null;
    role: UserRole | null;
}
/**
 * Defines a notification to send to a user’s Koji account. Send notifications with [[pushNotificationToOwner]], for the user who created the Koji, or [[pushNotificationToUser]], for a user who interacts with the Koji and has granted the appropriate authorization.
 */
export interface PushNotification {
    /** Headline for the message. For example, the name of the Koji that generated the notification. */
    appName: string;
    /**  Icon to display next to the message, either the URL of an image or an emoji character. */
    icon: string;
    /** Content of the message. */
    message: string;
    /** Query parameters to append to the Koji URL when the notification is tapped. For example, load the admin experience or a dynamic receipt from the notification. */
    ref?: string;
}
/**
 * Implements an Identity class for backend authentication of your Koji.
 */
export declare class Identity extends Base {
    private rootPath;
    private rootHeaders;
    /**
     * @param   config
     *
     * @example
     * ```javascript
     * const identity = new KojiBackend.Identity({ res });
     * ```
     */
    constructor(config: BackendConfigurationInput);
    /**
     * Sends a notification to a user
     *
     * @param     userId            User id.
     * @param     notification      Notification to send to user.
     * @return                      Data object.
     *
     * @example
     * ```javascript
     * identity.pushNotificationToUser(id, notification);
     * ```
     */
    pushNotificationToUser(userId: string, notification: PushNotification): Promise<void>;
    /**
     * Sends a notification to the owner
     *
     * @param     notification      Notification to send to owner.
     * @return                      Data object.
     *
     * @example
     * ```javascript
     * identity.pushNotificationToUser(id, notification);
     * ```
     */
    pushNotificationToOwner(notification: PushNotification): Promise<void>;
    /**
     * Gets user by token
     *
     * @param     token      User token.
     * @return               User.
     *
     * @example
     * ```javascript
     * const user = identity.resolveUserFromToken(token);
     * ```
     */
    resolveUserFromToken(token: UserToken): Promise<User>;
}
