import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { IAPToken } from '../../types';

/**
 * Optional information to add to a [[IapReceipt | transaction receipt]] for a given in-app purchase.
 */
export interface PurchaseOptions {
  /** Amount of the purchase. */
  amount?: number;
  /** Custom message associated with the purchase. This value is stored as a custom attribute on the [[IapReceipt | transaction receipt]]. */
  customMessage?: string;
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
 * Manages in-app purchase transactions on the frontend of your Koji.
 */
export class IAP extends KojiBridge {
  /**
   * Generates an IAP token for the current user that can be used to resolve receipts on the backend.
   *
   * @return    Short-lived IAP token for the current user.
   *
   * @example
   * ``` javascript
   * const iapToken = await Koji.iap.getToken();
   * ```
   */
  @client
  public async getToken(): Promise<IAPToken> {
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
   * @param  sku               Identifier for the product to purchase.
   * @param  purchaseOptions   Optional information to add to the transaction receipt.
   * @param  customAttributes  Optional key-value pairs to associate with the receipt. These attribute values can be referenced or updated at a later date.
   *
   * @example
   * ``` javascript
   * const purchase = await Koji.iap.startPurchase(sku);
   *
   * // with optional parameters
   * const purchase = await Koji.iap.startPurchase(sku, { customMessage: 'Your power up has been added' }, { isConsumed: false });
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
