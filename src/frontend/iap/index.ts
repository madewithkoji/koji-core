import { client } from '../@decorators/client';

export interface PurchaseOptions {
  amount?: number;
  customMessage?: string;
}

export class IAP {
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
   * @param callback Called when the purchase flow is completed.
   * @param purchaseOptions If you are using dynamic pricing, you can pass an amount and custom message.
   */
  @client
  startPurchase(
    sku: string,
    callback: (success: boolean, userToken: string, receiptId?: string) => void,
    purchaseOptions: PurchaseOptions = {},
  ) {
    this.purchaseCallback = callback;

    window.parent.postMessage(
      {
        _kojiEventName: '@@koji/iap/promptPurchase',
        sku,
        purchaseOptions,
      },
      '*',
    );
  }
}

export interface IIAP extends IAP {}

export const iap = new IAP();
