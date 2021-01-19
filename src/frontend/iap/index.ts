import { KojiBridge } from '../bridge';
import { client } from '../@decorators/client';

export interface PurchaseOptions {
  amount?: number;
  customMessage?: string;
}

export interface Purchase {
  success: boolean;
  userToken: UserToken;
  receiptId?: string;
}

export class IAP extends KojiBridge {
  purchaseCallback?: Function;

  register() {
    window.addEventListener('message', ({ data }) => {
      const { event } = data;

      if (event === 'KojiIap.PurchaseFinished') {
        if (!this.purchaseCallback) throw new Error('Received purchase information but no purchase has been started');

        this.purchaseCallback(data.success, data.userToken, data.receiptId);
        this.purchaseCallback = undefined;
      }
    });
  }

  /**
   * Begin a purchase flow by prompting the user for payment.
   * @param sku The string you have defined in your product entitlement.
   * @param purchaseOptions If you are using dynamic pricing, you can pass an amount and custom message.
   * @returns {Object} purchase Returned after the user completes or cancels the purchase
   * @returns {Boolean} purchase.success Returns true if the purchase was completed
   * @returns {String} purchase.userToken A token identifying the user
   * @returns {String} purchase.receiptId The id of the receipt if the purchase was completed
   */
  @client
  async startPurchase(sku: string, purchaseOptions: PurchaseOptions = {}): Promise<Purchase> {
    const { success, userToken, receiptId } = await this.postToPlatform({
      name: '@@koji/iap/promptPurchase',
      data: {
        sku,
        purchaseOptions,
      },
    }, 'KojiIap.PurchaseFinished');

    return {
      success,
      userToken,
      receiptId,
    };
  }
}

export const iap = new IAP();
