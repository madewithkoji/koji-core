import { UserToken } from '../../../types/UserToken';
import { PresumedAttributes } from './PresumedAttributes';

/**
 * Identity information for the current user of the Koji.
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
