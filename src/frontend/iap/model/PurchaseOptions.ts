/**
 * Optional information to add to a {@doclink core-backend-iap#IapReceipt | transaction receipt} for a given in-app purchase.
 */
export interface PurchaseOptions {
  /** Amount of the purchase, in cents. */
  amount?: number;
  /** Custom message associated with the purchase. This value is stored as a custom attribute on the transaction receipt. */
  customMessage?: string;
}
