import axios from 'axios';
import { server } from '../@decorators/server';
import { Base, BackendConfigurationInput } from '../base';
import { UserToken } from '../../types';

/**
 * API routes for auth methods.
 */
export enum AuthRoutes {
  GET_GRANT = '/v1/apps/auth/consumer/getGrantForToken',
  GET_ROLE = '/v1/apps/auth/consumer/getRoleForToken',
  PUSH_NOTIFICATION = '/v1/apps/auth/consumer/pushNotification',
}

/**
 * Possible values for a user's role within a Koji.
 */
export enum UserRole {
  ADMIN = 'admin',
  UNKNOWN = 'unknown',
  USER = 'user',
}

/**
 * Information about a user of the Koji. To retrieve a user's information, use [[resolveUserFromToken]].
 */
export interface User {
  /** User’s unique ID for this Koji. */
  id: string | null;
  /** Object containing custom information about the user. */
  attributes: { [index: string]: any } | null;
  /** Date the user's information was created or updated on this Koji. */
  dateCreated: string | null;
  /** Object containing information about capabilities that the user has authorized this Koji to use. */
  grants: {
    pushNotificationsEnabled: boolean;
  } | null;
  /** User’s role for this Koji – the owner/creator (`admin`), not the owner (`user`), or not logged in (`unknown`). */
  role: UserRole | null;
}

/**
 * Defines a notification to send to a user’s Koji account.
 * Send notifications with [[pushNotificationToOwner]], for the user who created the Koji, or [[pushNotificationToUser]], for a user who interacts with the Koji and has granted the appropriate authorization.
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
 * Manages authentication and authorization on the backend of your Koji template.
 */
export class Identity extends Base {
  private rootPath: string;
  private rootHeaders: Object;

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
  public constructor(config: BackendConfigurationInput) {
    super(config);

    this.rootPath = 'https://rest.api.gokoji.com';

    this.rootHeaders = {
      'X-Koji-Project-Id': this.projectId,
      'X-Koji-Project-Token': this.projectToken,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Sends a notification to the Koji account of a user who interacted with the Koji.
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
  @server
  public async pushNotificationToUser(userId: string, notification: PushNotification): Promise<void> {
    const { data } = await axios.post(
      `${this.rootPath}${AuthRoutes.PUSH_NOTIFICATION}`,
      {
        destination: userId,
        notification,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

  /**
   *  Sends a notification to the Koji account of the user who created the Koji.
   *
   * @param     notification      Notification to send to the owner.
   *
   * @example
   * ```javascript
   * await identity.pushNotificationToOwner({
   *  icon: '❓',
   *  appName: 'Ask me anything',
   *  message: 'Someone asked you a question! Respond now',
   *  ref: '?context=admin',
   * });
   * ```
   */
  @server
  public async pushNotificationToOwner(notification: PushNotification): Promise<void> {
    const { data } = await axios.post(
      `${this.rootPath}${AuthRoutes.PUSH_NOTIFICATION}`,
      {
        destination: 'owner',
        notification,
      },
      { headers: this.rootHeaders },
    );

    return data;
  }

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
   * const user = identity.resolveUserFromToken(userToken);
   * ```
   */
  @server
  public async resolveUserFromToken(token: UserToken): Promise<User> {
    const data = await axios.all([
      axios.post(
        `${this.rootPath}${AuthRoutes.GET_ROLE}`,
        {},
        {
          headers: {
            ...this.rootHeaders,
            'X-Koji-Auth-Callback-Token': token,
          },
        },
      ),
      axios.post(
        `${this.rootPath}${AuthRoutes.GET_GRANT}`,
        {},
        {
          headers: {
            ...this.rootHeaders,
            'X-Koji-Auth-Callback-Token': token,
          },
        },
      ),
    ]);

    const [{ data: { role } }, { data: { grant } }] = data;

    // If the user hasn't granted any permissions, the only thing
    // we return is the role.
    if (!grant) {
      return {
        id: null,
        attributes: null,
        dateCreated: null,
        grants: null,
        role,
      };
    }

    // If the user has made a grant, we can look for specific attributes
    // and properties from the grant declaration.
    return {
      id: grant.userId,
      attributes: grant.attributes,
      dateCreated: grant.dateCreated,
      grants: {
        pushNotificationsEnabled: grant.pushNotificationsEnabled,
      },
      role,
    };
  }
}
