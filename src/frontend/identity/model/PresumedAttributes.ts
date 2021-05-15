/**
 * User attributes that are determined via a client-side API call.
 */

export interface PresumedAttributes {
  /** Koji username for the user. */
  username?: string;
  /** Koji avatar for the user. */
  profilePicture?: string;
}
