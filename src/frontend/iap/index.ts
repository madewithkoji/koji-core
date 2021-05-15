import { KojiBridge } from '../kojiBridge';
import { client } from '../@decorators/client';
import { IAPToken } from '../../types/IAPToken';
import { Purchase } from './model/Purchase';
import { PurchaseOptions } from './model/PurchaseOptions';

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
   * Prompts the user to purchase a product from the Koji. Products are defined in the entitlements file and registered or updated when the project is deployed.
   *
   * NOTE: If your IAP product is defined with the `captureOnPurchase` key set to `false`, the transaction is held in a pending state until you manually invoke {@doclink core-backend-iap#captureTransaction | Iap.captureTransaction} on the backend of your Koji.
   * Funds are not available in the seller's account until the transaction is captured.
   * If you do not capture the transaction before the `captureExpiryPeriod`, the transaction is automatically reversed and the buyer is refunded.
   * This period can be specified in the product definition from 0 to 7 days (default is 0).
   *
   * @param  sku               Identifier for the product to purchase.
   * @param  purchaseOptions   Optional information to add to the transaction receipt.
   * @param  customAttributes  Optional key-value pairs to add to the receipt. These attribute values can be referenced or updated by resolving receipts on the backend of the Koji.
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
    customAttributes: { [index: string]: any } = {},
  ): Promise<Purchase> {
    const { success, userToken, receiptId } =
      await this.sendMessageAndAwaitResponse(
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
