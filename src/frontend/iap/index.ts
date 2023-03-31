import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { IAPToken } from '../../types';

/**
 * Represents a file related to a purchase.
 */
export interface PurchaseFile {
  /** Name of the file. */
  name?: string
  /** URL of the file. */
  url: string
}

/**
 * Optional information to add to a {@doclink core-backend-iap#IapReceipt | transaction receipt} for a given in-app purchase.
 */
export interface PurchaseOptions {
  /** Amount of the purchase, in cents. */
  amount?: number;
  /** Custom message associated with the purchase. This value is stored as a custom attribute on the transaction receipt. */
  customMessage?: string;
  /** Files to be included on the transaction receipts page, making it easy for the customers to access important files related to their purchase. */
  files?: PurchaseFile[];
}

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

/**
 * Manages in-app purchase transactions on the frontend of your Koji app.
 */
export class IAP extends KojiBridge {
  /**
   * Generates an IAP token for the current user that can be used to resolve receipts on the backend.
   *
   * @param  promptAuth   If true, logged-out users will be prompted to sign in. This is useful for restoring purchases when a user may be logged out (e.g., purchased a product inside TikTok webview, and then later visited the same app via Safari and is no longer logged in), but should only be used when actively requested by a user (e.g., a "Restore Purchases" button). Otherwise, this should be left false to get the token passively.
   * @return              Short-lived IAP token for the current user.
   *
   * @example
   * ``` javascript
   * const iapToken = await Koji.iap.getToken();
   * ```
   */
  @client
  public async getToken(promptAuth: boolean = false): Promise<IAPToken> {
    const { userToken } = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: '@@koji/iap/getToken',
        data: {
          promptAuth,
        },
      },
      'KojiIap.TokenCreated',
    );

    return userToken;
  }

  /**
   * Prompts the user to purchase a product from the Koji app. Products are defined in the entitlements file and registered or updated when the project is deployed.
   *
   * NOTE: If your IAP product is defined with the `captureOnPurchase` key set to `false`, the transaction is held in a pending state until you manually invoke {@doclink core-backend-iap#captureTransaction | Iap.captureTransaction} on the backend of your Koji app.
   * Funds are not available in the seller's account until the transaction is captured.
   * If you do not capture the transaction before the `captureExpiryPeriod`, the transaction is automatically reversed and the buyer is refunded.
   * This period can be specified in the product definition from 0 to 7 days (default is 0).
   *
   * @param  sku               Identifier for the product to purchase.
   * @param  purchaseOptions   Optional information to add to the transaction receipt.
   * @param  customAttributes  Optional key-value pairs to add to the receipt. These attribute values can be referenced or updated by resolving receipts on the backend of the Koji app.
   *
   * @return                   Results of the in-app purchase transaction.
   *
   * @example
   * ``` javascript
   * const purchase = await Koji.iap.startPurchase(sku);
   *
   * // with optional parameters
   * const purchase = await Koji.iap.startPurchase(sku, { customMessage: 'Your credit is now available' }, { isConsumed: false });
   * ```
   */
  @client
  public async startPurchase(
    sku: string,
    purchaseOptions: PurchaseOptions = {},
    customAttributes: {[index: string]: any} = {},
  ): Promise<Purchase> {
    const { success, userToken, receiptId } = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: '@@koji/iap/promptPurchase',
        data: {
          sku,
          purchaseOptions,
          customAttributes,
        },
      },
      'KojiIap.PurchaseFinished',
    );

    return {
      success,
      iapToken: userToken,
      receiptId,
    };
  }
}

export const iap = new IAP();
