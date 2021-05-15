/**
 * Receipt for a user’s purchase of a product.
 * Resolve receipts with [[resolveReceiptById]], [[resolveReceiptsByIAPToken]], or [[resolveReceiptsBySku]].
 * Add custom attributes for to a receipt with [[updateReceipt]].
 */
export interface IapReceipt {
  /** Unique identifier for the receipt. */
  receiptId: string;
  /** Unique identifier for the product. */
  productId: string;
  /** Price the user paid for the product. */
  purchasedPrice: number;
  /** Object containing a list of custom key-value pairs associated with the receipt.
   * You can use [[updateReceipt]] to update these values.
   * Additionally, the fulfillment information (email, phone, or address) and customMessage are included this object, if set at purchase time.
   */
  attributes: { [index: string]: any };
  /**
   * Object containing references to the associated transaction receipts – `credit` for the user receiving the funds (seller), `debit` for the user sending the funds (buyer).
   * To link to the transaction receipt in the user’s Koji wallet, use the format `https://withkoji.com/payments/transactions/TXN_ID`.
   */
  transactionIds: {
    credit: string;
    debit: string;
  };
  /** Date of the purchase. */
  datePurchased: Date;
  /** Date of the refund, if the transaction has been refunded. Refunds can occur either manually or due to capture expiry of a pending transaction. */
  dateRefunded?: Date;
}

/**
 * Information about a Koji user.
 */
export interface UserArtifact {
  /** Unique identifier for the user. */
  id: string;
  /** The user's profile URL. */
  href: string;

  /** The user's username (if access was granted). */
  username: string;
  /** The user's display name (if access was granted). */
  displayName: string;
  /** The user's profile picture (if access was granted). */
  profilePicture: string | null;
  /** Whether the user is verified. */
  isVerified: boolean;
}

/**
 * Specific product for purchase.
 * Products are defined in the entitlements file of the template and registered or updated when the project is deployed.
 * Use [[loadProduct]] to retrieve the properties associated with a product’s SKU.
 */
export interface IapProduct {
  /** Unique identifier for this version of the product. */
  id: string;
  /** Name of the Koji from which the product was purchased. */
  appId: string;
  /** Koji user name of the Koji creator. */
  ownerUserId: string;

  /** Purchase price of the product. Defined in the entitlements file. */
  price: number;
  /** Indicator of whether a purchase price is defined for the product. Defined in the entitlements file. */
  priceIsUnset: boolean;

  /** Indicator of whether a product can be purchased more than once. Defined in the entitlements file. */
  isConsumable: boolean;
  /**  Whether the transaction receipt can display routes in the Koji. Defined in the entitlements file. If enabled, a query parameter is appended to the URL when the buyer or seller views the receipt. For example, `dynamic-receipt=buyer` or `dynamic-receipt=seller`. */
  dynamicReceipt: boolean;
  /** Whether to capture transactions immediately. If set to false, transactions are held in a pending state until they are manually captured with [[captureTransaction]]. */
  captureOnPurchase: boolean;
  /** Period within which a pending transaction must be captured before it is reversed, from 0 to 7 days. Default is 0. */
  captureExpiryPeriod: number;

  /** Description displayed when the user was prompted to purchase the product. Defined in the entitlements file. */
  name: string;
  /** Identifier of the purchased product. Defined in the entitlements file. */
  sku: string;
  /** Date the product was registered or updated, which happens when the template is deployed. */
  dateCreated: Date;
  /** Indicator of whether the product is still available for purchase. */
  isActive: boolean;

  /** Type of user information collected for order fulfillment. Defined in the entitlements file. */
  fulfillment?: 'email' | 'phone' | 'address';
  /** Total number of times the product can be sold (inventory threshold). Defined in the entitlements file. */
  quantity?: number;
  /** Remaining number of times the product can be sold. Calculated based on the total inventory defined in the entitlements file, less the number of purchases. */
  numAvailable?: number;

  /** Object that represents the Koji creator ("seller"). */
  owner?: UserArtifact;
  /** Array of [[IapReceipt]] objects representing purchases of the product. */
  purchases?: IapReceipt[];
}
