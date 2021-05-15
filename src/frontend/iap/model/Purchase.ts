import { IAPToken } from '../../../types/IAPToken';

/**
 * Results of an in-app purchase transaction.
 */
export interface Purchase {
  /** Indicates whether the purchase was successful. */
  success: boolean;
  /** Short-lived IAP token for the current user. See [[getToken]]. */
  iapToken: IAPToken;
  /** Unique identifier for the receipt, if the purchase was successful, or `undefined`, if not. */
  receiptId?: string;
}
