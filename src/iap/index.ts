import { client } from '../@decorators/client';

export interface PurchaseOptions {
  amount?: number;
  customMessage?: string;
}

export class IAP {
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
