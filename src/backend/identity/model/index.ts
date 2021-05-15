/** Object containing information about capabilities that the user has authorized this Koji to use. */
export interface UserGrants {
  /** Whether the user has granted push notification access. */
  pushNotificationsEnabled: boolean;
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
  grants: UserGrants | null;
  /** User’s role for this Koji – the owner/creator (`admin`), not the owner (`user`), or not logged in (`unknown`). */
  role: 'admin' | 'user' | 'unknown' | null;
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
