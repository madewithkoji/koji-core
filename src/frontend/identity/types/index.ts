/**
 * Capabilities that a user can grant the current Koji authorization to use.
 */
export type AuthGrantCapability =
  /** Allows the current Koji to send push notifications to the user. */
  | 'push_notifications'
  /** Creates a unique ID for the user on the current Koji, and allows the Koji to map the user’s token to a persistent user ID in storage, such as a backend database. */
  | 'username';
