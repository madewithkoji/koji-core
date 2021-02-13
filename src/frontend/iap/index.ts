import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { IAPToken } from '../../types';

/** Custom information to add to a [[IapReceipt | transaction receipt]] for a given in-app purchase. */
export interface PurchaseOptions {
  /** Amount of the purchase. */
  amount?: number;
  /** Custom message associated with the purchase. This value is stored as a custom attribute on the [[IapReceipt | transaction receipt]]. */
  customMessage?: string;
}

/** Results of an in-app purchase transaction. */
export interface Purchase {
  /** Indicates whether the purchase was successful. */
  success: boolean;
  /** Temporary token for the current user’s session. See [[getToken]]. */
  iapToken: IAPToken;
  /** Unique identifier for the receipt, if the purchase was successful, or `undefined`, if not. */
  receiptId?: string;
}
/**
 * Manages in-app purchase transactions on the frontend of your Koji.
 */
export class IAP extends KojiBridge {
  /**
   * Generates an IAP Token (used to resolve receipts in the backend)
   *
   * @example
   * ``` javascript
   * const IAPToken = await Koji.iap.getToken();
   * ```
   */
  @client
  async getToken(): Promise<IAPToken> {
    const { userToken } = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: '@@koji/iap/getToken',
        data: {},
      },
      'KojiIap.TokenCreated',
    );

    return userToken;
  }

  /**
   * Prompts the user to purchase a product from the Koji. Products are defined in the entitlements file and registered or updated when the Koji is published.
   *
   * @param  sku             Identifier for the product to purchase.
   *
   * @example
   * ``` javascript
   * Koji.iap.startPurchase(sku, purchaseOptions);
   * ```
   */
  @client
  async startPurchase(sku: string, purchaseOptions: PurchaseOptions = {}): Promise<Purchase> {
    const { success, userToken, receiptId } = await this.sendMessageAndAwaitResponse(
      {
        kojiEventName: '@@koji/iap/promptPurchase',
        data: {
          sku,
          purchaseOptions,
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
