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

  @client
  async startPurchase(sku: string, purchaseOptions: PurchaseOptions = {}): Promise<Purchase> {
    const { success, userToken, receiptId } = await this.sendMessageAndAwaitResponse({
      kojiEventName: '@@koji/iap/promptPurchase',
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
